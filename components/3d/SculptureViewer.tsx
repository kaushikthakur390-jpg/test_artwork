"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows, Html, useProgress, Bounds, Center } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center text-charcoal">
        <Loader2 className="animate-spin mb-4 opacity-50" size={24} strokeWidth={1} />
        <span className="text-xs tracking-widest uppercase opacity-50 font-sans">
          {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  );
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  
  // Very slow continuous rotation for presentation
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

interface SculptureViewerProps {
  modelUrl: string;
}

export function SculptureViewer({ modelUrl }: SculptureViewerProps) {
  const [interacted, setInteracted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full bg-offwhite cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 2, 6], fov: 45 }}>
        <color attach="background" args={['#f8f8f5']} />
        
        {/* Soft, gallery-like lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={1024}
        />
        <directionalLight 
          position={[-5, 5, -5]} 
          intensity={0.3} 
        />
        
        <Suspense fallback={<Loader />}>
          <Bounds fit clip observe margin={1.2}>
            <Center bottom>
              <Model url={modelUrl} />
            </Center>
          </Bounds>
          
          <Environment preset="studio" />
          
          {/* Subtle ground shadow placed exactly at origin (bottom of model) */}
          <ContactShadows 
            position={[0, 0, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4} 
            color="#000000"
          />
        </Suspense>

        <OrbitControls 
          makeDefault
          enablePan={false}
          enableZoom={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.5}
          onStart={() => setInteracted(true)}
          dampingFactor={0.05}
        />
      </Canvas>

      <AnimatePresence>
        {!interacted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <p className="text-xs uppercase tracking-widest opacity-40 font-sans">
              Drag to rotate
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
