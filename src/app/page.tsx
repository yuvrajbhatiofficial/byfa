"use client";

import { useEffect, useRef, Suspense } from 'react';
// import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, Html } from '@react-three/drei';
import Lenis from 'lenis';
import { Instagram, X, Facebook, ShoppingBag } from 'lucide-react';
import { Group } from 'three';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay },
  },
});

const products = [
  {
    id: 1,
    name: "ADIDAS SAMBA OG",
    image: "catalog_001.jpg",
  },
  {
    id: 2,
    name: "NEW BALANCE 550",
    image: "catalog_002.jpg",
  },
  {
    id: 3,
name: "CONVERSE CHUK 70 2004",
    image: "catalog_003.jpg.webp",
  },
  {
    id: 4,
    name: "NIKE DUNK LOW ",
    image: "catalog_004.jpg.webp",
  },
  {
    id: 5,
    name: "NIKE AIR JORDAN 1 MID",
    image: "catalog_005.jpg.webp",
  },
  {
    id: 6,
    name: "PUMA SUEDE CLASSIC",
    image: "catalog_006.jpg.avif",
  },
];

const lookbookImages =[
  {id: 1, image: "IMG_0005.PNG"},
  {id: 2, image: "IMG_0006.PNG"},
  {id: 3, image: "IMG_0007.PNG"},
  {id: 4, image: "IMG_0008.PNG"},
  {id: 5, image: "IMG_0009.PNG"},
  {id: 6, image: "IMG_0010.PNG"}
]

const ModelLoader = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white bg-black/80 px-6 py-4 rounded-xl border border-neutral-800 backdrop-blur-md pointer-events-none shadow-2xl min-w-[160px]">
        <div className="w-8 h-8 border-4 border-neutral-700 border-t-white rounded-full animate-spin mb-3"></div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">Loading Model...</p>
      </div>
    </Html>
  );
};

const SneakerModel = () => {
  const { scene } = useGLTF('/models/jordan.glb');
  const modelRef = useRef<Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      const t = state.clock.getElapsedTime();
      // Add a very subtle organic floating movement
      modelRef.current.position.y = Math.sin(t * 1.5) * 0.05 - 0.1;
    }
  });

  return (
    <Center>
      <primitive
        ref={modelRef}
        object={scene}
        scale={1.3}
        position={[0, -0.15, 0]}
        rotation={[0.1, 2.5, 0]}
      />
    </Center>
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
        <div className="text-white font-bold text-lg">XERODEFAULTS</div>
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
              xerodefaults
            </motion.h1>
            <motion.p
              {...fadeIn(0.4).initial}
              animate="animate"
              className="text-xl md:text-2xl mt-2 tracking-widest text-neutral-300"
            >
              GAME ON INDIA
            </motion.p>
          </motion.div>
        </section>

        <div className="py-8 border-y border-neutral-800 overflow-hidden whitespace-nowrap">
          <div className="animate-marquee flex gap-12 text-2xl uppercase tracking-wider font-semibold">
            <span>Trendiest Store in Town</span><span className='text-neutral-600'>{"//"}</span>
            <span>Limited Drops</span><span className='text-neutral-600'>{"//"}</span>
            <span>Unisex Apparel</span><span className='text-neutral-600'>{"//"}</span>
            <span>Premium Streetwear</span><span className='text-neutral-600'>{"//"}</span>
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
            Searching for the best Kick store in Delhi? <br />
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
                <div className="overflow-hidden bg-neutral-900 aspect-[3/4] relative group">
  <img
    src={`/images/${product.image}`}
    alt={product.name}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

  <div className="absolute bottom-0 left-0 p-4">
    <h4 className="font-bold text-lg text-white">
      {product.name}
    </h4>
  </div>
</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="h-[75vh] w-full my-20 relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none select-none">
            <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold block mb-2">360° Interactive View</span>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight text-white/10">AIR JORDAN 1</h2>
          </div>

          <div className="w-full h-full cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow />
              <directionalLight position={[-5, 5, -5]} intensity={1.2} />
              <pointLight position={[10, -5, 5]} intensity={0.8} />
              
              <Suspense fallback={<ModelLoader />}>
                <SneakerModel />
              </Suspense>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={true}
                autoRotateSpeed={1.2}
                dampingFactor={0.05}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 1.7}
              />
            </Canvas>
          </div>
        </section>

        <section id="lookbook" className="py-20">
          <motion.h3 {...fadeIn().initial} whileInView="animate" viewport={{ once: true }} className="text-center text-4xl font-bold uppercase tracking-wider mb-12">
            The Vibe
          </motion.h3>
          <div className="flex gap-4 overflow-x-auto p-6 hide-scrollbar">
          {lookbookImages.map((item, i) => (
  <motion.div
    key={item.id}
    className="flex-shrink-0 w-[60vw] md:w-[30vw] h-[70vh] relative overflow-hidden rounded-md bg-neutral-800"
    initial={{ opacity: 0, x: 50 }}
    whileInView={{
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: i * 0.15,
      },
    }}
    viewport={{ amount: 0.3, once: true }}
  >
    <img
      src={`/images/${item.image}`}
      alt={`Lookbook ${item.id}`}
      className="w-full h-full object-cover"
    />
  </motion.div>
))}
          </div>
        </section>
      </main>

      <footer className="bg-neutral-900 border-t border-neutral-800 mt-20">
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="text-white font-bold text-lg mb-6">XERODEFAULTS</div>
          <p className="text-neutral-400 mb-6">
            The trendiest store in town. <br /> Located in Delhi.
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Instagram size={24} /></a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors"><X size={24} /></a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Facebook size={24} /></a>
          </div>
          <p className="text-sm text-neutral-500">&copy; {new Date().getFullYear()} XERODEFAULTS Footwears. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
