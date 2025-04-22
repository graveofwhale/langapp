import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, TouchableOpacity } from 'react-native';
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
  const Y = useRef(new Animated.Value(0)).current;
  //useRef쓰면 재렌더링되어도 값을 유지한다.

  const moveUp = () => {

    Animated.timing(Y, {
      toValue: up ? 300 : -300,
      easing: Easing.circle,
      // tension: 555,
      // friction: 1, ///마찰력
      useNativeDriver: true, // nativeDriver를 사용해야 애니메이션을 시작하기전 모든 것을 네이티브로 전송
    }).start(toggleUp) //애니메이션 토글업 함수가 실행되면서 스테이트값을 건드리고 이후 리렌더링이 일어난다. 그러면서 애니메이트 값이 다시 0으로 
  }

  console.log(Y)
  console.log('rendering')
  Y.addListener(() => console.log(Y))
  return (
    <Container>
      <TouchableOpacity onPress={moveUp} >
        <AnimatedBox style={{
          transform: [{ translateY: Y },],
        }} />
      </TouchableOpacity>
    </Container>
  )
}
