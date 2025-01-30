"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages';
  // Array of available images with conditional basePath
  const images = [
    `${isGitHubPages ? '/joeyqliu' : ''}/joey.jpeg`,
    `${isGitHubPages ? '/joeyqliu' : ''}/pixel_joey.jpeg`
  ];
  // State to track current image
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Function to select random image
  const selectRandomImage = () => {
    if (!isTransitioning) {
      setIsHovered(true);
      setIsTransitioning(true);
      setTimeout(() => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        setCurrentImage(randomImage);
        setIsTransitioning(false);
      }, 300); // Wait for full fade out before changing image
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with name and about */}
      <header className="w-full px-6 py-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold z-50">
            JOEY LIU
          </Link>
          <Link 
            href="/about" 
            className="text-lg font-[family-name:var(--font-geist-mono)] hover:text-white transition-colors duration-150 cursor-pointer p-2 z-50"
          >
            about
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6 -mt-40">
        <h2 className="text-5xl font-bold text-center max-w-2xl mb-6">
          <span 
            className="relative inline-block group"
            onMouseEnter={selectRandomImage}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute -top-64 left-1/2 -translate-x-1/2 z-10">
              <Image
                src={currentImage}
                alt="Joey Liu"
                width={250}
                height={250}
                className={`rounded-full shadow-lg transition-all duration-500 ease-in-out ${
                  !isHovered ? 'opacity-0 scale-95 invisible' : 
                  isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
                priority
              />
            </div>
            👋 Hello, I&apos;m Joey
          </span>.
        </h2>
        <p className="text-lg text-center max-w-xl text-gray-700">
          I&apos;m a software engineer based in the bay area.
        </p>
      </main>

      {/* Contact Section */}
      <footer className="w-full py-8 mt-auto">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center items-center gap-6 font-[family-name:var(--font-geist-mono)] text-sm">
              <Link href="https://github.com/joeyqliu" target="_blank" className="z-50">GitHub</Link>
              <Link href="https://linkedin.com/in/joeyqliu" target="_blank" className="z-50">LinkedIn</Link>
              <Link href="mailto:joeyqliu@gmail.com" className="z-50">Email</Link>
            </div>
            <span className="font-[family-name:var(--font-geist-mono)] text-sm">
              &lt; = &gt;
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
