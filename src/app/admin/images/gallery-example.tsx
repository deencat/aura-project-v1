"use client"

import React, { useState } from 'react'
import { ImageGalleryTabs } from '@/components/ImageGalleryTabs'
import { Card } from '@/components/ui/card'

export default function GalleryExample() {
  const [activeTab, setActiveTab] = useState('before-after')
  
  const galleryTabs = [
    { id: 'before-after', label: 'Before & After' },
    { id: 'technology', label: 'Technology' },
    { id: 'comparison', label: 'Comparison' },
    { id: 'testimonials', label: 'Testimonials' }
  ]
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Image Gallery Example</h1>
      
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-bold">Page Images</h2>
        
        <ImageGalleryTabs
          tabs={galleryTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        >
          {activeTab === 'before-after' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Before Image</span>
              </div>
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">After Image</span>
              </div>
            </div>
          )}
          
          {activeTab === 'technology' && (
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Technology Image</span>
            </div>
          )}
          
          {activeTab === 'comparison' && (
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Comparison Image</span>
            </div>
          )}
          
          {activeTab === 'testimonials' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Testimonial 1</span>
              </div>
              <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Testimonial 2</span>
              </div>
              <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Testimonial 3</span>
              </div>
            </div>
          )}
        </ImageGalleryTabs>
      </Card>
    </div>
  )
} 