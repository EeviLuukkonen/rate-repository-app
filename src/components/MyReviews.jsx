import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import { View } from "react-native";
import Text from "./Text";
import { styles } from "./Repository";
import { FlatList } from "react-native";
import { styles as reviewStyles } from "./Repository";

const UserReviewItem = ({ review }) => {
  return (
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
  );
}

const MyReviews = () => {
  const { data, loading, error } = useQuery(GET_ME, {
    variables: { includeReviews: true },
  });
  
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
      renderItem={({ item }) => <UserReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default MyReviews;