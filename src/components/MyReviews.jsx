import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import { View, StyleSheet, FlatList, Pressable, Alert } from "react-native";
import Text from "./Text";
import { styles as reviewStyles } from "./Repository";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";

const userReviewStyles = StyleSheet.create({
  userReviewContainer: {
    marginVertical: 6,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    padding: 13,
    flex: 0.48,
    alignItems: 'center',
    borderRadius: 4,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
  
const UserReviewItem = ({ review, viewRepository, deleteReview }) => {
  return (
    <View style={userReviewStyles.userReviewContainer}>
      
      <View style={reviewStyles.reviewContainer}>
        <View style={reviewStyles.ratingContainer}>
          <Text style={reviewStyles.ratingText}>{review.rating}</Text>
        </View>

        <View style={reviewStyles.reviewContent}>
          <Text fontWeight="bold">{review.repository.fullName}</Text>
          <Text color="textSecondary">{review.createdAt.substring(0,10)}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>

      <View style={userReviewStyles.buttonsContainer}>
        <Pressable
          style={[userReviewStyles.button, userReviewStyles.viewButton]}
          onPress={viewRepository}
          accessibilityRole="button"
          testID={`view-repo-${review.id}`}
        >
          <Text style={userReviewStyles.buttonText}>View Repository</Text>
        </Pressable>
        
        <Pressable
          style={[userReviewStyles.button, userReviewStyles.deleteButton]}
          onPress={deleteReview}
          accessibilityRole="button"
          testID={`delete-review-${review.id}`}
        >
          <Text style={userReviewStyles.buttonText}>Delete Review</Text>
        </Pressable>
      </View>

    </View>
  );
}

const MyReviews = () => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const { data, loading, error, refetch } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const onPressViewRepository = (repositoryId) => {
    navigate(`/${repositoryId}`);
  };

  const onPressDeleteReview = (reviewId) => {
    console.log("Delete review with id:", reviewId);
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await deleteReview({ variables: { id: reviewId } });
              console.log("Delete review response:", response);
              refetch();
            } catch (e) {
              console.error("Error deleting review:", e);
            }
          }
        }
      ]
    );
  };

  const userReviews = data?.me
    ? data.me.reviews.edges.map(edge => edge.node)
    : [];

  if (loading) {
    return <></>;
  }

  if (error) {
    console.error(error);
    return <></>;
  }

  return (
    <FlatList
      data={userReviews}
      renderItem={({ item }) => (
        <UserReviewItem
          review={item}
          viewRepository={() => onPressViewRepository(item.repository.id)}
          deleteReview={() => onPressDeleteReview(item.id)}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={reviewStyles.separator} />}
    />
  );
};

export default MyReviews;