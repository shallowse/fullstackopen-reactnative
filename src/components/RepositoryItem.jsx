import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';

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

const repositoryItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backGround: {
    backgroundColor: 'white',
    padding: 10,
  }
});

const RepositoryItem = ({ item }) => {
  const history = useHistory();

  const onPress = () => {
    //console.log('You clicked', item.id);
    history.push(`/${item.id}`);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={repositoryItemStyles.backGround}>

        <CardHeader
          ownerAvatarUrl={item.ownerAvatarUrl}
          fullName={item.fullName}
          description={item.description}
          language={item.language}
        />

        <View style={repositoryItemStyles.container}>
          <CardBox titleText='Stars' valueText={item.stargazersCount} />
          <CardBox titleText='Forks' valueText={item.forksCount} />
          <CardBox titleText='Reviews' valueText={item.reviewCount} />
          <CardBox titleText='Rating' valueText={item.ratingAverage} />
        </View>

      </View>
    </TouchableOpacity>
  );
};

export default RepositoryItem;
