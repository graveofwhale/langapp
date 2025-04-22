import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';



const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;  
`;

const AnimatedBox = Animated.createAnimatedComponent(Box); // 이 편이 import가 적다
//const Title = styled.Animated.View``;
//useState를 쓰지마라! 값을 줄땐 animated api를 이용, animate 컴포넌트는 따로 존재한다.
export default function App() {
  const [up, setUp] = useState(false);
  const toggleUp = () => setUp((prev) => !prev)
  const Y_POSITION = useRef(new Animated.Value(200)).current;
  //useRef쓰면 재렌더링되어도 값을 유지한다.

  const moveUp = () => {

    Animated.timing(Y_POSITION, {
      toValue: up ? 300 : -300,
      useNativeDriver: true, // nativeDriver를 사용해야 애니메이션을 시작하기전 모든 것을 네이티브로 전송
      duration: 1000,

    }).start(toggleUp) //애니메이션 토글업 함수가 실행되면서 스테이트값을 건드리고 이후 리렌더링이 일어난다. 그러면서 애니메이트 값이 다시 0으로 
  }
  const opacity = Y_POSITION.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.5, 1]
  }) //interpolate는 애니메이션 값(Animated.Value)을 다른 값으로 변환하는 메서드입니다
  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0]
  })
  console.log(opacity)

  // console.log(Y_POSITION)
  // console.log('rendering')
  // Y_POSITION.addListener(() => console.log(Y_POSITION))
  Y_POSITION.addListener(() => {
    console.log('Y Value : ', Y_POSITION)
    console.log('opacity Value : ', opacity)
    console.log('borderRadius Value : ', borderRadius)

  })
  return (
    <Container>
      <Pressable onPress={moveUp} >
        <AnimatedBox style={{
          opacity,
          borderRadius,
          transform: [{ translateY: Y_POSITION },],
        }} />
      </Pressable>
    </Container>
  )
}
