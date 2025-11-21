import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

const AppBarTab = ({ label, path, onPress }) => (
  <Link to={path} onPress={onPress}>
    <Text style={styles.text}>{label}</Text>
  </Link>
);

export default AppBarTab;
