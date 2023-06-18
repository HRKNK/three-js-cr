// import * as THREE from 'three';

import React, { useRef } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from "@react-three/fiber";

import { animated, useSpring } from '@react-spring/three';

export function Donut(props) {
	const meshRef = useRef(null);

	const TIME_DELAY = 1000;
	const { carouseRotation } = useSpring({
		from: {
			carouseRotation: 0, // начинает с нуля (каждый to должен вернуться обратно к 0)
		}, to: [{
			carouseRotation: -Math.PI / 2,
			delay: TIME_DELAY,
		},
		{
			carouseRotation: -Math.PI,
			delay: TIME_DELAY,
		},
		{
			carouseRotation: -1.5 * Math.PI,
			delay: TIME_DELAY,
		},
		{
			carouseRotation: -2 * Math.PI,
			delay: TIME_DELAY,
		}],
		config: {
			mass: 5,
			tension: 400,
			friction: 50,
		},
		loop: true,
		// immediate: true,
	})

  const moveUp = (e) => {
	if (meshRef.current.position.y === 0)
	  return meshRef.current.position.y += 0.05;
	else return meshRef.current.position.y -= 0.05;
  }

// useFrame выполняется 60 раз в секунду
// Поворачиваем `mesh` по оси `z` на 0.005
//   useFrame(() => (
// 	meshRef.current.rotation.y += 0.005
// 	// meshRef.current.position.y += 0.005
//   ));

  const { nodes, materials } = useGLTF('donut/donut.gltf')
  return (
	<animated.group rotation-y={carouseRotation} onClick={moveUp} {...props} dispose={null} ref={meshRef}>
	  <mesh geometry={nodes.Object_4.geometry} material={materials.donut} position={[0, 0.037, 0]}/>
	  <mesh geometry={nodes.Object_6.geometry} material={materials.icing} position={[0, 0.037, 0]} />
	  <mesh geometry={nodes.Object_8.geometry} material={materials.sprinkles_bake} position={[0.076, 0.082, 0.009]} rotation={[1.448, 0.073, 3.007]} scale={0.141} />
	</animated.group>
  )
}

useGLTF.preload('donut/donut.gltf')
