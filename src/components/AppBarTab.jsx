import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const AppBarTab = ({ label, onPress }) => (
  <Pressable style={styles.tab} onPress={onPress}>
    <Text style={styles.text}>{label}</Text>
  </Pressable>
);

export default AppBarTab;
