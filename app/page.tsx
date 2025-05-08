import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Aura Beauty</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience luxury beauty treatments and services tailored to your needs.
        </p>
      </section>
      
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-pink-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Our Treatments</h2>
            <p className="mb-6">Discover our range of luxury treatments designed to pamper and rejuvenate.</p>
            <Link href="/treatments" className="inline-block bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700">
              View Treatments
            </Link>
          </div>
          
          <div className="bg-pink-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Image Examples</h2>
            <p className="mb-6">See examples of our optimized image components and performance improvements.</p>
            <Link href="/image-examples" className="inline-block bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700">
              View Examples
            </Link>
          </div>
          
          <div className="bg-pink-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">About Us</h2>
            <p className="mb-6">Learn about our story, our values, and our commitment to excellence.</p>
            <Link href="/about" className="inline-block bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700">
              Learn More
            </Link>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-center mb-8">Image Optimization Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Modern Formats</h3>
            <p>WebP and AVIF support for 50-80% smaller file sizes</p>
          </div>
          
          <div className="border border-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Responsive Sizing</h3>
            <p>Automatically serve the right image size for each device</p>
          </div>
          
          <div className="border border-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Lazy Loading</h3>
            <p>Images load only when they enter the viewport</p>
          </div>
          
          <div className="border border-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Blur Placeholders</h3>
            <p>Smooth loading experience with blur-up technique</p>
          </div>
        </div>
      </section>
    </div>
  );
} 