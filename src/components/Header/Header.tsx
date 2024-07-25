import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import icons from '../icons';
// import { Ionicons } from '@expo/vector-icons';

const Header: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Watch</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Image source={icons.Search} style={{ width: 22, height: 22, resizeMode:'contain'}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
    color:"rgba(32, 44, 67, 1)"
  },
});

export default Header;
