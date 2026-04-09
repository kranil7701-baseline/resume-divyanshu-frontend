"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  useTexture,
  Environment,
  ContactShadows,
  OrbitControls,
  PerspectiveCamera
} from "@react-three/drei";
import * as THREE from "three";
import Head from "next/head";

const images = [
  { url: "/resume1.jpg", title: "Global Talent" },
  { url: "/resume2.jpg", title: "Team Excellence" },
  { url: "/resume3.jpg", title: "Career Path" },
  { url: "/resume4.jpg", title: "Top Roles" },
  { url: "/resume5.jpg", title: "Professionalism" },
];

function Page({ url, index, total }) {
  const ref = useRef();
  const texture = useTexture(url);

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.getElapsedTime();
    // Offset each page's start time
    const localTime = (time - index * 1.5) % (total * 1.5);

    // Page turning logic: flips from 0 to -Math.PI between time 0 and 1.5
    // After it flips, it stays flipped until the cycle restarts
    let targetRotation = 0;
    if (localTime > 0) {
      targetRotation = -Math.PI * Math.min(1, localTime / 1.0);
    }

    // Smoothly interpolate rotation
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotation, 0.1);

    // Z-offset to prevent flickering
    ref.current.position.z = index * 0.02;
  });

  return (
    <group ref={ref}>
      <mesh position={[2.5, 0, 0]}>
        <planeGeometry args={[5, 7, 32, 32]} />
        <meshStandardMaterial map={texture} side={THREE.DoubleSide} transparent roughness={0.1} metalness={0.1} />
      </mesh>
    </group>
  );
}

function Book() {
  return (
    <group position={[-2.5, 0, 0]} rotation={[0.4, 0, 0]}>
      {/* Spine */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[0.3, 7.2, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Pages */}
      {images.map((img, i) => (
        <Page key={i} url={img.url} index={i} total={images.length} />
      ))}

      {/* Back Cover */}
      <mesh position={[2.5, 0, -0.2]} rotation={[0, 0, 0]}>
        <planeGeometry args={[5.2, 7.4]} />
        <meshStandardMaterial color="#0a0a0a" side={THREE.DoubleSide} metalness={0.8} />
      </mesh>
    </group>
  );
}

export default function Home() {
  return (
    <div className="home-container">
      <Head>
        <title>Portfolio Showcase | Masterpiece</title>
      </Head>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Inter:wght@400;600&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          background: #050505;
          color: white;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }
        .home-container {
          width: 100vw;
          height: 100vh;
          position: relative;
          background: radial-gradient(circle at center, #1a1a2e 0%, #050505 100%);
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding-bottom: 10vh;
          box-sizing: border-box;
        }
        .header {
          position: absolute;
          top: 8vh;
          text-align: center;
        }
        h1 {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900;
          letter-spacing: -2px;
          margin: 0;
          background: linear-gradient(135deg, #fff 0%, #4cc9f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: uppercase;
        }
        .subtitle {
          opacity: 0.5;
          margin-top: 0.5rem;
          font-size: 1.1rem;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .btn-exp {
          pointer-events: auto;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: 1rem 3rem;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Outfit', sans-serif;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .btn-exp:hover {
          background: #4cc9f0;
          color: #000;
          transform: translateY(-3px);
        }
      `}</style>

      <div className="overlay">
        <div className="header">
          <h1>DIGITAL ARCHIVE</h1>
          <p className="subtitle">Automatic Experience</p>
        </div>
        <button className="btn-exp">Join the Future</button>
      </div>

      <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={2.5} />
        <spotLight position={[-10, 20, 10]} angle={0.3} penumbra={1} intensity={3} castShadow />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Book />
        </Float>

        <ContactShadows position={[0, -5, 0]} opacity={0.6} scale={30} blur={2.5} far={6} />
        <Environment preset="night" />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}