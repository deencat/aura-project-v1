"use client"

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TreatmentImage from '@/components/TreatmentImage';

export default function ExampleTreatmentPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">TreatmentImage Component Example</h1>
      
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Usage</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
          <TabsTrigger value="fallbacks">Fallback Behavior</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="p-4 border rounded-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Hero Image</h3>
              <TreatmentImage 
                category="facials" 
                treatment="glow" 
                type="hero" 
                alt="Glow Facial Treatment" 
              />
              <p className="text-sm text-gray-500">
                <code>{`<TreatmentImage category="facials" treatment="glow" type="hero" alt="Glow Facial Treatment" />`}</code>
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Benefits Image</h3>
              <TreatmentImage 
                category="body-care" 
                treatment="hair-removal" 
                type="benefits" 
                index={1}
                alt="Hair Removal Benefits" 
              />
              <p className="text-sm text-gray-500">
                <code>{`<TreatmentImage category="body-care" treatment="hair-removal" type="benefits" index={1} alt="Hair Removal Benefits" />`}</code>
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="p-4 border rounded-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Advanced Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Custom Dimensions</h3>
              <TreatmentImage 
                category="new-doublo" 
                treatment="youth-revival" 
                type="technology" 
                alt="Youth Revival Technology" 
                width={400}
                height={300}
                quality={90}
              />
              <p className="text-sm text-gray-500">
                <code>{`<TreatmentImage category="new-doublo" treatment="youth-revival" type="technology" alt="Youth Revival Technology" width={400} height={300} quality={90} />`}</code>
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Fill Mode with Object Fit</h3>
              <div className="relative w-full h-[300px]">
                <TreatmentImage 
                  category="new-doublo" 
                  treatment="v-line" 
                  type="hero" 
                  alt="V-Line Treatment" 
                  fill
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p className="text-sm text-gray-500">
                <code>{`<TreatmentImage category="new-doublo" treatment="v-line" type="hero" alt="V-Line Treatment" fill objectFit="cover" sizes="(max-width: 768px) 100vw, 50vw" />`}</code>
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="fallbacks" className="p-4 border rounded-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Fallback Behavior</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Placeholder Fallback (Default)</h3>
              <TreatmentImage 
                category="facials" 
                treatment="non-existent-treatment" 
                type="hero" 
                alt="Non-existent Treatment" 
                fallbackBehavior="placeholder"
              />
              <p className="text-sm text-gray-500">
                <code>{`<TreatmentImage category="facials" treatment="non-existent-treatment" type="hero" alt="Non-existent Treatment" fallbackBehavior="placeholder" />`}</code>
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Generic Fallback</h3>
              <TreatmentImage 
                category="body-care" 
                treatment="non-existent-treatment" 
                type="benefits" 
                alt="Non-existent Treatment" 
                fallbackBehavior="generic"
              />
              <p className="text-sm text-gray-500">
                <code>{`<TreatmentImage category="body-care" treatment="non-existent-treatment" type="benefits" alt="Non-existent Treatment" fallbackBehavior="generic" />`}</code>
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">No Fallback</h3>
              <div className="bg-gray-100 p-4 rounded-md min-h-[200px] flex items-center justify-center">
                <TreatmentImage 
                  category="new-doublo" 
                  treatment="non-existent-treatment" 
                  type="results" 
                  alt="Non-existent Treatment" 
                  fallbackBehavior="none"
                />
                <p className="text-gray-400">No image displayed (fallbackBehavior="none")</p>
              </div>
              <p className="text-sm text-gray-500">
                <code>{`<TreatmentImage category="new-doublo" treatment="non-existent-treatment" type="results" alt="Non-existent Treatment" fallbackBehavior="none" />`}</code>
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Implementation Notes</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Always specify the correct <code>category</code> and <code>treatment</code> props</li>
          <li>Use the <code>type</code> prop to indicate what kind of image you're displaying</li>
          <li>Add an <code>index</code> when you have multiple images of the same type</li>
          <li>Set <code>priority</code> for above-the-fold images to improve performance</li>
          <li>Use <code>fill</code> mode with a parent container that has relative positioning and defined dimensions</li>
        </ul>
      </div>
    </div>
  );
} 