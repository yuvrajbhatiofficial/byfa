"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import Lenis from 'lenis';
import { Instagram, X, Facebook, ShoppingBag } from 'lucide-react';
import { Mesh } from 'three';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay },
  },
});

const products = [
  { id: 1, name: 'Embroidered Cross Tee', price: '₹2,499' },
  { id: 2, name: 'Floral Print Shirt', price: '₹2,999' },
  { id: 3, name: 'Possessed Skull Tee', price: '₹2,199' },
  { id: 4, name: 'Lightwash Cargo Denim', price: '₹3,499' },
  { id: 5, name: 'Techwear Trousers', price: '₹3,199' },
  { id: 6, name: 'Vintage Wash Jeans', price: '₹3,299' },
];

const lookbookImages = Array(5).fill(null);

const TshirtModel = () => {
  const meshRef = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(t) * 0.1;
    }
  });
  return (
    <mesh ref={meshRef} scale={2.5}>
      <boxGeometry args={[1, 1, 0.2]} />
      <meshStandardMaterial color="#111111" roughness={0.5} />
    </mesh>
  );
};

export default function ByfaHomePage() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true, amount: 0.5 });

  return (
    <div className="bg-black text-neutral-200 font-sans">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-black/30 backdrop-blur-md"
      >
        <div className="text-white font-bold text-lg">BYFA</div>
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wider">
          <a href="#featured" className="hover:text-white transition-colors">Collections</a>
          <a href="#lookbook" className="hover:text-white transition-colors">Lookbook</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </nav>
        <a href="#" className="p-2 rounded-full hover:bg-neutral-800 transition-colors">
          <ShoppingBag size={22} />
        </a>
      </motion.header>

      <main>
        <section className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <motion.div
            {...fadeIn().initial}
            animate="animate"
            className="z-20 p-4 text-center"
          >
            <motion.h1
              {...fadeIn().initial}
              animate="animate"
              className="text-6xl md:text-9xl font-extrabold uppercase tracking-tighter text-shadow-md"
            >
              BYFA
            </motion.h1>
            <motion.p
              {...fadeIn(0.4).initial}
              animate="animate"
              className="text-xl md:text-2xl mt-2 tracking-widest text-neutral-300"
            >
              GAME ON AJMER
            </motion.p>
          </motion.div>
        </section>

        <div className="py-8 border-y border-neutral-800 overflow-hidden whitespace-nowrap">
          <div className="animate-marquee flex gap-12 text-2xl uppercase tracking-wider font-semibold">
            <span>Trendiest Store in Town</span><span className='text-neutral-600'>//</span>
            <span>Limited Drops</span><span className='text-neutral-600'>//</span>
            <span>Unisex Apparel</span><span className='text-neutral-600'>//</span>
            <span>Premium Streetwear</span><span className='text-neutral-600'>//</span>
          </div>
        </div>

        <section id="about" ref={aboutRef} className="container mx-auto px-6 py-24 md:py-40 text-center">
          <h2 className="text-4xl md:text-7xl font-bold leading-tight"
            style={{
              transform: isInView ? 'none' : 'translateY(50px)',
              opacity: isInView ? 1 : 0,
              transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s'
            }}
          >
            Searching for the best clothing store in Ajmer? <br />
            <span className="text-neutral-400">Your search ends here.</span>
          </h2>
        </section>

        <section id="featured" className="container mx-auto px-6 py-20">
          <motion.h3 {...fadeIn().initial} whileInView="animate" viewport={{ once: true }} className="text-center text-4xl font-bold uppercase tracking-wider mb-12">
            New Arrivals
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }}
                viewport={{ once: true }}
              >
                <div className="overflow-hidden bg-neutral-900 aspect-[3/4] relative flex items-end p-4">
                  <div>
                    <h4 className="font-bold text-lg">{product.name}</h4>
                    <p className="text-neutral-300">{product.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="h-[70vh] w-full my-20 relative">
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none'>
            <h2 className='text-6xl md:text-8xl font-black uppercase text-white/50'>Explore in 3D</h2>
          </div>
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <TshirtModel />
          </Canvas>
        </section>

        <section id="lookbook" className="py-20">
          <motion.h3 {...fadeIn().initial} whileInView="animate" viewport={{ once: true }} className="text-center text-4xl font-bold uppercase tracking-wider mb-12">
            The Vibe
          </motion.h3>
          <div className="flex gap-4 overflow-x-auto p-6 hide-scrollbar">
            {lookbookImages.map((_, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 w-[60vw] md:w-[30vw] h-[70vh] relative overflow-hidden rounded-md bg-neutral-800 flex items-center justify-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut', delay: i * 0.15 } }}
                viewport={{ amount: 0.3, once: true }}
              >
                <p className="text-neutral-500">Image {i + 1}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-neutral-900 border-t border-neutral-800 mt-20">
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="text-white font-bold text-lg mb-6">BYFA</div>
          <p className="text-neutral-400 mb-6">
            The trendiest store in town. <br /> Located in Ajmer, Rajasthan.
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Instagram size={24} /></a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors"><X size={24} /></a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Facebook size={24} /></a>
          </div>
          <p className="text-sm text-neutral-500">&copy; {new Date().getFullYear()} BYFA APPAREL. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
