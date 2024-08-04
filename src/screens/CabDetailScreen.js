// src/screens/CabDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { doc, getDoc, collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function CabDetailScreen({ route, navigation }) {
  const { cabId } = route.params;
  const [cab, setCab] = useState(null);
  const [bookedCabs, setBookedCabs] = useState([]);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchCab = async () => {
      const docRef = doc(db, 'cabs', cabId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCab({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such document!');
      }
    };

    fetchCab();
  }, [cabId]);

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

  const bookCab = async () => {
    if (isBooking) return;
    setIsBooking(true);

    // Check if the cab is already booked
    const isAlreadyBooked = bookedCabs.some((bookedCab) => bookedCab.id === cabId);

    if (isAlreadyBooked) {
      Alert.alert('This cab is already booked.');
      setIsBooking(false);
      return;
    }

    // Check if user already booked 2 cabs
    if (bookedCabs.length >= 2) {
      Alert.alert('You cannot book more than 2 cabs at a time.');
      setIsBooking(false);
      return;
    }

    try {
      await addDoc(collection(db, 'bookedCabs'), cab);
      Alert.alert('Cab booked successfully!');
      navigation.navigate('My Cab');
    } catch (error) {
      console.error('Error booking cab: ', error);
      Alert.alert('Failed to book cab. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  if (!cab) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cab.companyName}</Text>
      <Text>Car Model: {cab.carModel}</Text>
      <Text>Passengers Allowed: {cab.passengerAllowed}</Text>
      <Text>Rating: {cab.rating}</Text>
      <Text>Cost per Hour: {cab.costPerHour}</Text>
      <Button title="Book Cab" onPress={bookCab} disabled={isBooking} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});