// src/screens/MyCabScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function MyCabScreen() {
  const [bookedCabs, setBookedCabs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'bookedCabs'), (snapshot) => {
      const bookedCabList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookedCabs(bookedCabList);
    });

    return () => unsubscribe();
  }, []);

  const cancelBooking = async (cabId) => {
    try {
      await deleteDoc(doc(db, 'bookedCabs', cabId));
      Alert.alert('Booking cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling booking: ', error);
      Alert.alert('Failed to cancel booking. Please try again.');
    }
  };

  return (
    <FlatList
      data={bookedCabs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.companyName}</Text>
          <Text>Car Model: {item.carModel}</Text>
          <Text>Passengers Allowed: {item.passengerAllowed}</Text>
          <Text>Rating: {item.rating}</Text>
          <Text>Cost per Hour: {item.costPerHour}</Text>
          <Button title="Cancel Booking" onPress={() => cancelBooking(item.id)} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});