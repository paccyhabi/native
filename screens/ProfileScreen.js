import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('https://final-yr.onrender.com/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch user profile.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete('https://final-yr.onrender.com/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      alert('Failed to delete account.');
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>Username: {user.username}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Phone Number: {user.phoneNumber}</Text>
          <Button title="Delete Account" onPress={handleDeleteAccount} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default ProfileScreen;
