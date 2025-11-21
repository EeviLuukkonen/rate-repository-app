import { useQuery } from "@apollo/client"
import RepositoryItem from "./RepositoryItem"
import { GET_REPOSITORY } from "../graphql/queries"
import { useParams } from "react-router-native"


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

  console.log("Repository data:", data)

  return (
    <RepositoryItem item={data.repository} buttonVisible={true} />
  )
}

export default Repository