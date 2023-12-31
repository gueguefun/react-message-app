import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Text, Appearance } from 'react-native';
import io from 'socket.io-client';

const HomeScreen = () => {
    const [logs, setLogs] = useState("");
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const socket = io('http://82.64.216.185:6971');
      
        socket.on('connect', () => {
          console.log('Connecté au serveur Socket.io');
        });

        socket.on('conversationsList', (conversationsList) => {
            setConversations(conversationsList);
        });

         // Émettre l'événement pour obtenir la liste des conversations de l'utilisateur (user1 par exemple)
        socket.emit('getConversations', 'john@example.com');
      
        return () => {
          socket.disconnect();
        };
      }, []);


  return (
    <View>
        <Text>Home Screen</Text>
            {conversations.length > 0 ? (
                <View>
                    {conversations.map((conversation) => (
                    <Text key={conversation._id}>{conversation.nom}</Text>
                    ))}
                </View>
            ) : (
                <ActivityIndicator size="large" />
            )}
    </View>
  );
};


export default HomeScreen;

