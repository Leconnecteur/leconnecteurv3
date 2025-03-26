'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

interface Computer3DProps {
  className?: string;
  onModelLoaded?: () => void;
}

interface ModelProps {
  onModelLoaded?: () => void;
}

const Model: React.FC<ModelProps> = ({ onModelLoaded }) => {
  const group = useRef<THREE.Group>(null);
  const loader = new GLTFLoader();

  useEffect(() => {
    loader.load(
      '/models/computer.glb',
      (gltf: GLTF) => {
        if (group.current) {
          group.current.add(gltf.scene);
          // Ajuster la taille du modèle
          const box = new THREE.Box3().setFromObject(gltf.scene);
          const size = box.getSize(new THREE.Vector3());
          const maxDimension = Math.max(size.x, size.y, size.z);
          const scale = 1 / maxDimension;
          gltf.scene.scale.set(scale, scale, scale);
          
          // Appeler la callback de chargement
          if (onModelLoaded) {
            onModelLoaded();
          }
        }
      },
      undefined,
      (error: unknown) => console.error('Error loading model:', error)
    );
  }, [onModelLoaded]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
    }
  });

  return <group ref={group} />;
};

const Computer3D: React.FC<Computer3DProps> = ({ className = '', onModelLoaded }) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="w-full h-full"
      >
        <OrbitControls enableZoom={false} enablePan={false} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model onModelLoaded={onModelLoaded} />
      </Canvas>
    </div>
  );
};

export default Computer3D;
