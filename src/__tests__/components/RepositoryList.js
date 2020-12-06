import React from 'react';
import { render } from '@testing-library/react-native';

import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
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

      // Add your test code here
      const { /*debug,*/ getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      //debug();

      let testIDs = ['fullName', 'description', 'language'];
      for (let i = 0; i < testIDs.length; i++) {
        const testId = testIDs[i];
        let testNodes = getAllByTestId(testId);
        for (let j = 0; j < testNodes.length; j++) {
          expect(testNodes[j]).toHaveTextContent(repositories.edges[j].node[testId]);
        }
      }


      testIDs = [
        { name: 'Stars', val: 'stargazersCount' },
        { name: 'Forks', val: 'forksCount' },
        { name: 'Reviews', val: 'reviewCount' },
        { name: 'Rating', val: 'ratingAverage' }
      ];

      const formattedValueText = (valueText) => {
        if (Number(valueText) < 1000) {
          return valueText;
        } else {
          let retStr = (Number(valueText) / 1000).toFixed(1);
          return `${retStr}k`;
        }
      };

      for (let i = 0; i < testIDs.length; i++) {
        const testId = testIDs[i];
        let testNodes = getAllByTestId(testId.name);
        for (let j = 0; j < testNodes.length; j++) {
          let value = formattedValueText(repositories.edges[j].node[testId.val]);
          expect(testNodes[j]).toHaveTextContent(value);
        }
      }

    });
  });
});