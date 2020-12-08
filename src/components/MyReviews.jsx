import React from 'react';
import { View, Image, StyleSheet, Button, FlatList } from 'react-native';
import { format, parseISO } from 'date-fns';

import useMyReviews from '../hooks/useMyReviews';

import Text from './Text';

import theme from '../theme';

// Card implementation inspiration from: https://snack.expo.io/@kalleilv/3d045d
const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
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
  languageTag: {
    maxWidth: 100,
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 8,
    borderRadius: 5,
    textAlign: 'center',
  }
});

const CardHeader = ({ ownerAvatarUrl, fullName, description, language }) => {
  return (
    <View style={cardHeaderStyles.container}>

      <View style={cardHeaderStyles.avatarContainer}>
        <Image style={cardHeaderStyles.avatar} source={{ uri: ownerAvatarUrl }} />
      </View>

      <View style={cardHeaderStyles.infoContainer}>
        <Text fontWeight='bold' fontSize='subHeading' style={cardHeaderStyles.infoContainerText} testID='fullName'>{fullName}</Text>
        <Text color='textSecondary' style={cardHeaderStyles.infoContainerText} testID='description'>{description}</Text>
        <Text style={cardHeaderStyles.languageTag} testID='language'>{language}</Text>
      </View>

    </View>
  );
};

const cardBoxStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const CardBox = ({ valueText, titleText }) => {
  const formattedValueText = () => {
    if (Number(valueText) < 1000) {
      return valueText;
    } else {
      let retStr = (Number(valueText) / 1000).toFixed(1);
      return `${retStr}k`;
    }
  };

  return (
    <View style={cardBoxStyles.container}>
      <Text fontWeight='bold' testID={titleText}>{formattedValueText()}</Text>
      <Text>{titleText}</Text>
    </View>
  );
};

const reviewItemStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
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
});

const ReviewItem = ({ review }) => {
  const node = review.node;

  return (
    <View style={reviewItemStyles.container}>
      <View style={cardHeaderStyles.container}>

        <View style={reviewItemStyles.ratingContainer}>
          <Text style={reviewItemStyles.ratingText}>{node.rating}</Text>
        </View>

        <View style={cardHeaderStyles.infoContainer}>
          <Text
            fontWeight='bold'
            fontSize='subHeading'
            style={cardHeaderStyles.infoContainerText}
          >
            {node.repository.fullName}
          </Text>
          <Text color='textSecondary' style={cardHeaderStyles.infoContainerText}>
            {format(parseISO(node.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text>{node.text}</Text>
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
  const { data, loading } = useMyReviews();

  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  const reviews = data && data.authorizedUser && data.authorizedUser.reviews || [];
  //console.log('MyReviews :: ', reviews);

  return (
    <FlatList
      data={reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={item => item.node.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
