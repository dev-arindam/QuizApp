import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const EmptyState = ({ title, message, onAction, buttonText }) => {
  return (
    <View style={styles.container}>
      {/* 1. Illustration */}
      <Image 
        source={require('../assets/nodata.jpeg')} 
        style={styles.image} 
      />
      
      {/* 2. Text Content */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      
      {/* 3. Action Button */}
      {buttonText && (
        <TouchableOpacity style={styles.button} onPress={onAction}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#007AFF', // College Brand Color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default EmptyState;