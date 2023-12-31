import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Text, Appearance } from 'react-native';
import io from 'socket.io-client';

const HomeScreen = () => {
    const [connected, setConnected] = useState("");

    useEffect(() => {
        const socket = io('http://82.64.216.185:6971');
      
        socket.on('connect', () => {
          console.log('Connecté au serveur Socket.io');
          setConnected("Tu es connecté au serveur Socket.io");
        });

        socket.on('newMessage', (message) => {
            // Traitez le nouveau message reçu du serveur
            console.log('Nouveau message:', message);
            setConnected(message);
          });
      
        return () => {
          socket.disconnect();
          setConnected("Tu n'es pas connecté au serveur Socket.io");
        };
      }, []);


  return (
    <View>
        <Text>Home Screen</Text>
        <Text>{connected}</Text>
    </View>
  );
};


export default HomeScreen;

