import { useQuery } from "@apollo/client"
import RepositoryItem from "./RepositoryItem"
import { GET_REPOSITORY } from "../graphql/queries"
import { useParams } from "react-router-native"
import { FlatList, View, StyleSheet } from "react-native"
import Text from "./Text"
import theme from "../theme"

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
  reviewContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
  },
  ratingContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  reviewContent: {
    flex: 1,
    gap: 5,
  },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <RepositoryItem item={repository} buttonVisible={true} />
  )
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>

      <View style={styles.reviewContent}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">{review.createdAt.substring(0,10)}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
};

const ItemSeparator = () => <View style={styles.separator} />;

const Repository = () => {
  const { repositoryId } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId },
  })

  if (loading) {
    return <></>
  }

  if (error) {
    console.log("Error loading repository:", error)
    return <></>
  }

  const repository = data.repository;
  const reviews = repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryInfo repository={repository} />
          <ItemSeparator />
        </>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
}

export default Repository