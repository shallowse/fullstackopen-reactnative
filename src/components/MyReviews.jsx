import React from 'react';
import { View, StyleSheet, Button, FlatList, Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import { useHistory } from 'react-router-native';

import useMyReviews from '../hooks/useMyReviews';
import useDeleteReview from '../hooks/useDeleteReview';

import Text from './Text';

import theme from '../theme';

const reviewItemStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
  },
  containerRow: {
    flexDirection: 'row',
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  infoContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    marginBottom: 5,
  },
  infoContainerText: {
    marginBottom: 10,
  },
  ratingContainer: {
    flexGrow: 0,
    paddingRight: 15,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    paddingLeft: 5,
    fontSize: theme.fontSizes.body,
    color: theme.colors.primary,
  },
  button: {
    marginTop: 10,
    marginLeft: 25,
  }
});

const ReviewItem = ({ review, handleDeleteReview }) => {
  const history = useHistory();
  const node = review.node;

  const handleViewRepository = () => {
    history.push(`/${node.repository.id}`);
  };

  const deleteReview = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'CANCEL',
          onPress: () => console.log('cancelled'),
        },
        {
          text: 'DELETE',
          onPress: () =>  handleDeleteReview(node.id),
        }
      ]
    );
    //console.log('you want to delete');
  };

  return (
    <View style={reviewItemStyles.container}>
      <View style={reviewItemStyles.containerRow}>

        <View style={reviewItemStyles.ratingContainer}>
          <Text style={reviewItemStyles.ratingText}>{node.rating}</Text>
        </View>

        <View style={reviewItemStyles.infoContainer}>
          <Text
            fontWeight='bold'
            fontSize='subHeading'
            style={reviewItemStyles.infoContainerText}
          >
            {node.repository.fullName}
          </Text>
          <Text color='textSecondary' style={reviewItemStyles.infoContainerText}>
            {format(parseISO(node.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text>{node.text}</Text>
        </View>

      </View>

      <View style={reviewItemStyles.containerRow}>
        <View style={reviewItemStyles.button}>
          <Button
            onPress={handleViewRepository}
            title='View repository'
            color={theme.colors.primary}
          />
        </View>

        <View style={reviewItemStyles.button}>
          <Button
            onPress={deleteReview}
            title='Delete review'
            color={'red'}
          />
        </View>
      </View>

    </View>
  );
};

const itemSeparatorStyles = StyleSheet.create({
  separator: {
    height: 15,
  },
});

const ItemSeparator = () => <View style={itemSeparatorStyles.separator} />;

const MyReviews = () => {
  const { data, loading, refetch } = useMyReviews();
  const [deleteReview] = useDeleteReview();

  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  const handleDeleteReview = (id) => {
    deleteReview(id);
    refetch();
  };

  const reviews = data && data.authorizedUser && data.authorizedUser.reviews || [];
  //console.log('MyReviews :: ', reviews);

  return (
    <FlatList
      data={reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item} handleDeleteReview={handleDeleteReview}/>}
      keyExtractor={item => item.node.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
