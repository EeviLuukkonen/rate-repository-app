import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {  
  const { data, loading, refetch, error } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    console.error('Error fetching repositories:', error);
  }

  const repositories = data ? data.repositories : undefined;

  return { repositories, loading, refetch };
};

export default useRepositories;
