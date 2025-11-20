import { Image, View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  infoSection: {
    flexDirection: 'column',
    marginBottom: 10,
    gap: 5,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  languageComponent: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    borderRadius: 4,
    padding: 4,
    marginTop: 4,
  }
});

const formatCount = (count) => {
  if (count < 1000) {
    return String(count);
  } else {
    const countInThousands = count/1000
    return String(Math.round(countInThousands * 10) / 10) + 'k'
  }
}

const StatsComponent = ({label, count}) => (
  <View style={{alignItems: 'center'}}>
    <Text fontWeight="bold">{formatCount(count)}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const LanguageComponent = ({language}) => (
  <View style={styles.languageComponent}>
    <Text style={{ color: 'white' }}>{language}</Text>
  </View>
);

const RepositoryItem = ({item}) => (
  <View testID="repositoryItem" style={styles.container}>

    <View style={styles.topSection}>
      <Image source={{uri: item.ownerAvatarUrl}} style={styles.avatar} />

      <View style={styles.infoSection}>
        <Text fontWeight="bold">{item.fullName}</Text>
        <Text color="textSecondary">{item.description}</Text>
        <LanguageComponent language={item.language}></LanguageComponent>
      </View>
    </View>

    <View style={styles.statsSection}>
      <StatsComponent label="Stars" count={item.stargazersCount} />
      <StatsComponent label="Forks" count={item.forksCount} />
      <StatsComponent label="Rating" count={item.ratingAverage} />
      <StatsComponent label="Reviews" count={item.reviewCount} />
    </View>
    
  </View>
);

export default RepositoryItem