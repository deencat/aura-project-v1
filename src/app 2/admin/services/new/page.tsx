"use client"

import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Save,
  Languages,
  ImagePlus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import PlaceholderImage from '@/components/PlaceholderImage'

// Categories for dropdown
const categories = [
  { id: 1, name: 'Premium Beauty' },
  { id: 2, name: 'Facial Treatments' },
  { id: 3, name: 'Specialized Services' },
  { id: 4, name: 'Body Care' },
]

export default function NewServicePage() {
  const [activeTab, setActiveTab] = useState('english')
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    price: '',
    duration: '',
    short_description: '',
    long_description: '',
    benefits: '',
    suitable_for: '',
    contraindications: '',
    preparation: '',
    aftercare: '',
    status: 'draft',
  })

  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-')
      
      setFormData({
        ...formData,
        [name]: value,
        slug,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would normally send the data to an API
    alert('Service saved successfully (mock)')
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/services">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Add New Service</h1>
        </div>
        <Button className="flex items-center gap-2" onClick={handleSubmit}>
          <Save className="h-4 w-4" />
          Save Service
        </Button>
      </div>
      
      {/* Language Tabs */}
      <Card>
        <div className="flex items-center border-b">
          <button
            className={`flex items-center gap-2 px-4 py-3 font-medium ${
              activeTab === 'english' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('english')}
          >
            <Languages className="h-4 w-4" />
            English
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-3 font-medium ${
              activeTab === 'traditional_chinese' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('traditional_chinese')}
          >
            <Languages className="h-4 w-4" />
            Traditional Chinese
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-3 font-medium ${
              activeTab === 'simplified_chinese' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('simplified_chinese')}
          >
            <Languages className="h-4 w-4" />
            Simplified Chinese
          </button>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Main Form */}
        <div className="md:col-span-2 space-y-8">
          <Card className="p-6">
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Service Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Royal Black Scan"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    placeholder="e.g. royal-black-scan"
                    value={formData.slug}
                    onChange={handleChange}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This will be used in the URL: /treatments/{formData.slug || 'example-slug'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      name="status"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      placeholder="e.g. $1,200"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      placeholder="e.g. 120 min"
                      value={formData.duration}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="short_description">Short Description</Label>
                  <Textarea
                    id="short_description"
                    name="short_description"
                    placeholder="Brief description of the service (displayed in listings)"
                    rows={3}
                    value={formData.short_description}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="long_description">Full Description</Label>
                  <Textarea
                    id="long_description"
                    name="long_description"
                    placeholder="Detailed description of the service"
                    rows={8}
                    value={formData.long_description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </Card>
          
          {/* Additional Details */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold">Additional Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="benefits">Benefits</Label>
                <Textarea
                  id="benefits"
                  name="benefits"
                  placeholder="List the benefits of this service"
                  rows={4}
                  value={formData.benefits}
                  onChange={handleChange}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Each benefit on a new line or separated by commas
                </p>
              </div>
              
              <div>
                <Label htmlFor="suitable_for">Suitable For</Label>
                <Textarea
                  id="suitable_for"
                  name="suitable_for"
                  placeholder="Who is this service suitable for?"
                  rows={3}
                  value={formData.suitable_for}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="contraindications">Contraindications</Label>
                <Textarea
                  id="contraindications"
                  name="contraindications"
                  placeholder="Any contraindications or warnings"
                  rows={3}
                  value={formData.contraindications}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="preparation">Preparation</Label>
                  <Textarea
                    id="preparation"
                    name="preparation"
                    placeholder="How should clients prepare for this service?"
                    rows={3}
                    value={formData.preparation}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="aftercare">Aftercare</Label>
                  <Textarea
                    id="aftercare"
                    name="aftercare"
                    placeholder="Aftercare instructions"
                    rows={3}
                    value={formData.aftercare}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Featured Image */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Featured Image</h2>
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                <PlaceholderImage 
                  type="treatment" 
                  aspectRatio="aspect-video"
                  className="h-full w-full object-cover"
                />
              </div>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <ImagePlus className="h-4 w-4" />
                Choose Image
              </Button>
              <p className="text-xs text-gray-500">
                Recommended size: 1200 × 800 pixels
              </p>
            </div>
          </Card>
          
          {/* Gallery Images */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Gallery Images</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-square overflow-hidden rounded bg-gray-100">
                  <PlaceholderImage 
                    type="treatment" 
                    number={1}
                    aspectRatio="aspect-square"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded bg-gray-100">
                  <PlaceholderImage 
                    type="treatment" 
                    number={2}
                    aspectRatio="aspect-square"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded bg-gray-100">
                  <PlaceholderImage 
                    type="treatment" 
                    number={3}
                    aspectRatio="aspect-square"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded bg-gray-100 flex items-center justify-center">
                  <ImagePlus className="h-6 w-6 text-gray-400" />
                </div>
              </div>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <ImagePlus className="h-4 w-4" />
                Add Gallery Images
              </Button>
              <p className="text-xs text-gray-500">
                Upload up to 8 gallery images
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 