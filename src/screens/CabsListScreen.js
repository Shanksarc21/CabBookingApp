// src/screens/CabsListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function CabsListScreen({ navigation }) {
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'cabs'), (snapshot) => {
      const cabList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCabs(cabList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FlatList
      data={cabs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Cab Detail', { cabId: item.id })}>
          <View style={styles.item}>
            <Text style={styles.title}>{item.companyName}</Text>
            <Text>{item.carModel}</Text>
          </View>
        </TouchableOpacity>
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