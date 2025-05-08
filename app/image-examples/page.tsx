import React from 'react';
import TreatmentImage from '@/components/ui/TreatmentImage';
import ResponsiveImage from '@/components/ui/ResponsiveImage';

export default function ImageExamplesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Image Optimization Examples</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">TreatmentImage Component</h2>
        <p className="mb-6">
          Specialized component for treatment images with blur placeholders, responsive sizing, and modern formats.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Priority image (above the fold) */}
          <div>
            <h3 className="text-lg font-medium mb-2">Priority Image</h3>
            <TreatmentImage 
              src="/images/treatments/facial.jpg"
              alt="Luxury Facial Treatment"
              width={600}
              height={400}
              priority={true}
            />
            <p className="text-sm text-gray-500 mt-2">
              Loaded with priority, no lazy loading
            </p>
          </div>
          
          {/* Lazy loaded image */}
          <div>
            <h3 className="text-lg font-medium mb-2">Lazy Loaded Image</h3>
            <TreatmentImage 
              src="/images/treatments/massage.jpg"
              alt="Relaxing Massage"
              width={600}
              height={400}
            />
            <p className="text-sm text-gray-500 mt-2">
              Lazy loaded when scrolled into view
            </p>
          </div>
          
          {/* Custom layout image */}
          <div>
            <h3 className="text-lg font-medium mb-2">Custom Layout Image</h3>
            <TreatmentImage 
              src="/images/treatments/manicure.jpg"
              alt="Manicure Treatment"
              width={600}
              height={400}
              layout="half"
            />
            <p className="text-sm text-gray-500 mt-2">
              Using half-width layout for responsive sizing
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">ResponsiveImage Component</h2>
        <p className="mb-6">
          Generic component for all other images with customizable object-fit and sizes.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cover fit image */}
          <div>
            <h3 className="text-lg font-medium mb-2">Cover Fit</h3>
            <ResponsiveImage 
              src="/images/banner.jpg"
              alt="Banner Image"
              width={800}
              height={400}
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <p className="text-sm text-gray-500 mt-2">
              Object-fit: cover - fills the container while maintaining aspect ratio
            </p>
          </div>
          
          {/* Contain fit image */}
          <div>
            <h3 className="text-lg font-medium mb-2">Contain Fit</h3>
            <ResponsiveImage 
              src="/images/logo.png"
              alt="Logo Image"
              width={800}
              height={400}
              objectFit="contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <p className="text-sm text-gray-500 mt-2">
              Object-fit: contain - ensures the entire image is visible
            </p>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Performance Comparison</h2>
        <p className="mb-6">
          Comparison between original JPG and optimized formats (WebP, AVIF).
        </p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Format</th>
                <th className="py-2 px-4 border-b">File Size</th>
                <th className="py-2 px-4 border-b">Quality</th>
                <th className="py-2 px-4 border-b">Reduction</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Original JPG</td>
                <td className="py-2 px-4 border-b">~250 KB</td>
                <td className="py-2 px-4 border-b">100%</td>
                <td className="py-2 px-4 border-b">-</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">WebP</td>
                <td className="py-2 px-4 border-b">~150 KB</td>
                <td className="py-2 px-4 border-b">85%</td>
                <td className="py-2 px-4 border-b">40% smaller</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">AVIF</td>
                <td className="py-2 px-4 border-b">~100 KB</td>
                <td className="py-2 px-4 border-b">80%</td>
                <td className="py-2 px-4 border-b">60% smaller</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Responsive (mobile)</td>
                <td className="py-2 px-4 border-b">~50 KB</td>
                <td className="py-2 px-4 border-b">75%</td>
                <td className="py-2 px-4 border-b">80% smaller</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
} 