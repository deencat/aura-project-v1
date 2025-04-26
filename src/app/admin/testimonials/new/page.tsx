"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, StarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'

// Mock services for dropdown
const services = [
  "Royal Black Scan",
  "Peeled Egg Skin",
  "Collagen Regeneration",
  "Lymphatic Detox",
  "Hair Removal",
  "Stretch Mark Repair",
  "New Doublo Sculpt & Lift",
  "V-Line Perfection"
]

export default function NewTestimonialPage() {
  const [formData, setFormData] = useState({
    clientName: '',
    service: '',
    rating: 5,
    content: '',
    featured: false,
    status: 'Draft',
    date: new Date().toISOString().split('T')[0]
  })

  // Update form data for text inputs and selects
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Update rating
  const handleRatingChange = (value) => {
    setFormData(prev => ({
      ...prev,
      rating: parseInt(value)
    }))
  }

  // Toggle featured
  const handleFeaturedChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      featured: checked
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would normally send the data to an API
    alert('Testimonial saved successfully (mock)')
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/testimonials">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Testimonials
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">New Testimonial</h1>
        </div>
        <Button className="flex items-center gap-2" onClick={handleSubmit}>
          <Save className="h-4 w-4" />
          Save Testimonial
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Main Form */}
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6">
              <form className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      name="clientName"
                      placeholder="Enter client name"
                      value={formData.clientName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="service">Service</Label>
                    <select
                      id="service"
                      name="service"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="content">Testimonial Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Enter the client's testimonial"
                      rows={6}
                      value={formData.content}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="rating">Rating</Label>
                    <RadioGroup 
                      id="rating" 
                      className="flex space-x-4 mt-2" 
                      value={formData.rating.toString()}
                      onValueChange={handleRatingChange}
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <div key={num} className="flex items-center space-x-1">
                          <RadioGroupItem value={num.toString()} id={`rating-${num}`} />
                          <Label htmlFor={`rating-${num}`} className="flex">
                            {num}
                            <StarIcon className="h-4 w-4 ml-1 text-yellow-400" />
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                  <p className="mt-2 text-xs text-gray-500">
                    Draft testimonials are only visible to administrators.
                  </p>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <Label htmlFor="featured" className="text-base">Featured Testimonial</Label>
                    <p className="text-xs text-gray-500">
                      Featured testimonials appear on the homepage and service pages.
                    </p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={handleFeaturedChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Client Photo (Optional)</h3>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
                <div className="mb-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="relative">
                    Upload Photo
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                  </Button>
                  <p className="text-xs text-gray-500">
                    Recommended: Square 256×256px JPG or PNG
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 