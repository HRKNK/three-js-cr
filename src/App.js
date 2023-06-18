import React from 'react';
import { Canvas } from '@react-three/fiber';
import { getProject } from '@theatre/core';
import studio from '@theatre/studio';
import extension from '@theatre/r3f/dist/extension';
import { editable as e, SheetProvider } from '@theatre/r3f';
import { OrbitControls, MeshReflectorMaterial, Stage, Html } from '@react-three/drei';
// import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';

import './App.css';

// Инициализация. Сохраненные настройки проекта (позиции объектов)
import demoProjectState from './Project.theatre-project-state.json';
import { Donut } from './Donut';
const demoSheet = getProject('Demo Project', {state: demoProjectState}).sheet('Demo Sheet');

studio.initialize(); // Графический интерфейс Theatre.js
studio.extend(extension); // Редактор сцены

const App = () => {

// Автозапуск анимации
//   React.useEffect(() => {
// 	demoSheet.project.ready
// 	.then(() => demoSheet.sequence.play({iterationCount: Infinity, range: [0, 8]})); // range - диапазон анимации (от 0 до 9 секунд)
//   }, []);

  return (
	<Canvas shadows
		camera={{ zoom: 1, position: [0, 0.7, 1], fov: 50 }} // Неуправляемая камера
	>
		{/* Цвет фона вьюпорта */}
	  <color attach="background" args={['#ff8cff']} />
	  {/* <fog attach="fog" args={['#ff8cff', 10, 20]} /> */}

	  {/* Провайдер для корректной работы редактора сцены */}
	  <SheetProvider sheet={demoSheet}>
		{/* Управляемая камера (по аналогии объектам) */}
		{/* <PerspectiveCamera theatreKey="Camera" makeDefault/> */}
		{/* Глобальный источник освящения */}
		{/* <ambientLight /> */}
		{/* Префикс "e" разрешает редактирование объекта в редакторе сцены (обязателен ключ - отображается в интерфейсе) */}
		<e.pointLight theatreKey="Light" position={[10, 10, 10]}/> 
		{/* <e.mesh theatreKey="Cube">
		  <boxGeometry args={[1, 1, 1]}/>
		  <meshStandardMaterial color="red"/>
		</e.mesh> */}

		{/* <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}> // аналог OrbitControls */}

		<Stage // Создает «сцену» с правильным студийным освещением, 0/0/0 по центру
			preset='rembrandt' // Настройка освещения, по умолчанию: "rembrandt"
			intensity={0.2} // Интенсивность освещения, по умолчанию: 0,5
			environment="night" // Среда 
			shadows='false' // Управляет тенями земли, по умолчанию: "contact"
		>
			
			<Donut/> {/* ПОНЧИК */}
			{/* <Html scale={0.1} rotation={[0, 0, 0]} position={[0.12, 0.15, 0]} transform>
				<div className="annotation">
					Donut $
				</div>
			</Html> */}

		</Stage>
		<mesh position={[0, -0.035, 0]} theatreKey="reflection" rotation={[-Math.PI / 2, 0, 0]}>
			{/* Геометрия (материал). Поверхность под отражения */}
			<planeGeometry args={[50, 50]} />
			<MeshReflectorMaterial
				// mixBlur='0.5' // Насколько размытие смешивается с шероховатостью поверхности. Дэфолт: 1.0
				// blur={[100, 100]} // Размытие отражений земли (ширина, высота)
				fog='false' // Влияет ли туман на материал
				resolution={2048} // Разрешение отражения
				mixStrength={5} // Cмешать цвет вьюпорта с цветом материала (Сила отражений)
				roughness={1} // Насколько шероховатым выглядит материал. 0,0 зеркало, 1,0 полностью диффузные. Дэфолт: 1.0
				color="#303030" // Цвет материала. Дэфолт: fff
				metalness={0.1} // Насколько материал похож на металл. 0.0-1.0
			/>
		</mesh>

		<OrbitControls
			// makeDefault
			// enablePan={false} // Включение или отключение панорамирования камеры.
			// enableZoom={false} // Включение или отключение масштабирования
			minDistance={0.7} // Минимальное отдаление
			maxDistance={1.8} // Максимальное отдаление
			minPolarAngle={Math.PI / 3} // Как далеко вы можете вращаться по вертикали
			maxPolarAngle={Math.PI / 3} 
		/>
	  </SheetProvider>
	</Canvas>
  )
}

export default App;

/**
 * Оптимизация модели: npm i -g gltf-pipeline
 * Внутри папки с моделью выполнить команду: gltf-pipeline -i scene.gltf -o model.gltf -d
 * Это приводит к генерации файла model.gltf.
 * Выполняем следующую команду: npx gltfjsx model.gltf
 * Получаем JSX файл.
 */

/**
 * Документация: https://github.com/pmndrs/drei // с примерами
 * Events: https://docs.pmnd.rs/react-three-fiber/api/events
 */

/**
 * Примеры: 
 * https://codesandbox.io/s/rrppl0y8l4?file=/src/App.js:668-673
 * https://habr.com/ru/companies/timeweb/articles/704024/
 * 
 */