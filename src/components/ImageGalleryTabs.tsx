"use client"

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TabItem {
  id: string;
  label: string;
}

interface ImageGalleryTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  children?: React.ReactNode;
}

export function ImageGalleryTabs({
  tabs,
  activeTab,
  onTabChange,
  children
}: ImageGalleryTabsProps) {
  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="w-full bg-white border-b border-gray-200 rounded-t-lg rounded-b-none shadow-sm p-0 flex h-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex-1 py-4 border-b-2 border-transparent data-[state=active]:border-primary rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-semibold data-[state=active]:text-primary relative"
            >
              {tab.label}
              {/* Active indicator */}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeTab} className="p-6 bg-white border-x border-b rounded-b-lg">
          {children}
        </TabsContent>
      </Tabs>
    </div>
  )
} 