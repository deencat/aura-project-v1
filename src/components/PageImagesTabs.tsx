"use client"

import React, { useState } from 'react'
import { 
  Card,
  CardContent
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronDown } from 'lucide-react'

interface ImageSection {
  id: string;
  name: string;
  type: string;
}

interface PageImagesTabsProps {
  sections: ImageSection[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  renderContent: (tabId: string) => React.ReactNode;
}

export function PageImagesTabs({
  sections,
  activeTab,
  onTabChange,
  renderContent
}: PageImagesTabsProps) {
  // Ensure we have a valid active tab
  const validSections = sections.length > 0;
  const validActiveTab = validSections && sections.some(s => s.id === activeTab);
  const currentTab = validActiveTab ? activeTab : (validSections ? sections[0].id : '');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select value={currentTab} onValueChange={onTabChange}>
          <SelectTrigger className="w-full md:w-[250px]">
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            {sections.map((section) => (
              <SelectItem key={section.id} value={section.id}>
                {section.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Optional: Display a few buttons for frequently used sections */}
        <div className="hidden md:flex space-x-2">
          {sections.slice(0, 3).map((section) => (
            <button
              key={section.id}
              onClick={() => onTabChange(section.id)}
              className={`px-3 py-1.5 text-sm rounded-md ${
                section.id === currentTab 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>
      </div>
      
      <Card>
        <CardContent className="p-4 mt-0">
          {validSections && renderContent(currentTab)}
        </CardContent>
      </Card>
    </div>
  )
} 