import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';



const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Box = styled.TouchableOpacity`
  background-color: tomato;
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content:center;
`;
const Title = styled.Text`
  font-size: 40px
`;

export default function App() {
  const [y, setY] = useState(0)
  const [intervalId, setIntervalId] = useState(null);
  const moveUp = () => {
    const id = setInterval(() => setY(prev => prev + 1), 10)
    setIntervalId(id);
  }
  console.log("rendering")
  useEffect(() => {
    if (y === 200) {
      clearInterval()
    }
  })
  return (
    <Container>
      <Box onPress={moveUp} style={{
        transform: [{ translateY: y },],
      }} />
    </Container>
  )
}
