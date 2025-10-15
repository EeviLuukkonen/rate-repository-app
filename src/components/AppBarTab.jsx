import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const AppBarTab = ({ label, path }) => (
  <Link to={path}>
    <Text style={styles.text}>{label}</Text>
  </Link>
);

export default AppBarTab;
