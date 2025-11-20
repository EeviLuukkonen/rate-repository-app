import { render, screen, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />)

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      const fullName = within(firstRepositoryItem).getByText('jaredpalmer/formik');
      const description = within(firstRepositoryItem).getByText('Build forms in React, without the tears');
      const language = within(firstRepositoryItem).getByText('TypeScript');
      const forksCount = within(firstRepositoryItem).getByText('1.6k');
      const stargazersCount = within(firstRepositoryItem).getByText('21.9k');
      const ratingAverage = within(firstRepositoryItem).getByText('88');
      const reviewCount = within(firstRepositoryItem).getByText('3');

      const firstItemFields = [
        fullName,
        description,
        language,
        forksCount,
        stargazersCount,
        ratingAverage,
        reviewCount
      ];

      firstItemFields.forEach(field => {
        expect(field).toBeTruthy();
      });
      
      const fullName2 = within(secondRepositoryItem).getByText('async-library/react-async');
      const description2 = within(secondRepositoryItem).getByText('Flexible promise-based React data loader');
      const language2 = within(secondRepositoryItem).getByText('JavaScript');
      const forksCount2 = within(secondRepositoryItem).getByText('69');
      const stargazersCount2 = within(secondRepositoryItem).getByText('1.8k');
      const ratingAverage2 = within(secondRepositoryItem).getByText('72');
      const reviewCount2 = within(secondRepositoryItem).getByText('3');

      const secondItemFields = [
        fullName2,
        description2,
        language2,
        forksCount2,
        stargazersCount2,
        ratingAverage2,
        reviewCount2
      ];

      secondItemFields.forEach(field => {
        expect(field).toBeTruthy();
      });
    });
  });
});