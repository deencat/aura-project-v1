"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TestimonialMultilingualData } from '@/utils/testimonialUtils'

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
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('english')
  
  // Form data state with multilingual support
  const [formData, setFormData] = useState({
    clientName: '',
    service: '',
    rating: 5,
    content: '',
    featured: false,
    status: 'Draft',
    date: new Date().toISOString().split('T')[0],
    multilingual: {
      english: {
        clientName: '',
        content: ''
      },
      traditional_chinese: {
        clientName: '',
        content: ''
      },
      simplified_chinese: {
        clientName: '',
        content: ''
      }
    }
  })

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Handle multilingual content changes
  const handleMultilingualChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    language: 'english' | 'traditional_chinese' | 'simplified_chinese'
  ) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      multilingual: {
        ...prev.multilingual,
        [language]: {
          ...prev.multilingual[language],
          [name]: value
        }
      }
    }))
    
    // Also update the main fields if editing English content
    if (language === 'english') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  // Handle rating change
  const handleRatingChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      rating: parseInt(value)
    }))
  }

  // Handle featured toggle
  const handleFeaturedChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      featured: checked
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call to create testimonial
    setTimeout(() => {
      console.log('Creating testimonial with data:', formData)
      
      // In a real app, you would send this data to your API
      alert('Testimonial created successfully (mock)')
      setLoading(false)
      router.push('/admin/testimonials')
    }, 1000)
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
        <Button onClick={() => handleSubmit} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          {loading ? 'Saving...' : 'Save Testimonial'}
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Main Form */}
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Testimonial Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="traditional_chinese">Traditional Chinese</TabsTrigger>
                  <TabsTrigger value="simplified_chinese">Simplified Chinese</TabsTrigger>
                </TabsList>
                
                {/* English Content */}
                <TabsContent value="english" className="space-y-4">
                  <div>
                    <Label htmlFor="english-clientName">Client Name (English)</Label>
                    <Input
                      id="english-clientName"
                      name="clientName"
                      placeholder="Enter client name in English"
                      value={formData.multilingual.english.clientName}
                      onChange={(e) => handleMultilingualChange(e, 'english')}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="english-content">Testimonial (English)</Label>
                    <Textarea
                      id="english-content"
                      name="content"
                      placeholder="Enter testimonial content in English"
                      rows={6}
                      value={formData.multilingual.english.content}
                      onChange={(e) => handleMultilingualChange(e, 'english')}
                    />
                  </div>
                </TabsContent>
                
                {/* Traditional Chinese Content */}
                <TabsContent value="traditional_chinese" className="space-y-4">
                  <div>
                    <Label htmlFor="tc-clientName">Client Name (Traditional Chinese)</Label>
                    <Input
                      id="tc-clientName"
                      name="clientName"
                      placeholder="Enter client name in Traditional Chinese"
                      value={formData.multilingual.traditional_chinese.clientName}
                      onChange={(e) => handleMultilingualChange(e, 'traditional_chinese')}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tc-content">Testimonial (Traditional Chinese)</Label>
                    <Textarea
                      id="tc-content"
                      name="content"
                      placeholder="Enter testimonial content in Traditional Chinese"
                      rows={6}
                      value={formData.multilingual.traditional_chinese.content}
                      onChange={(e) => handleMultilingualChange(e, 'traditional_chinese')}
                    />
                  </div>
                </TabsContent>
                
                {/* Simplified Chinese Content */}
                <TabsContent value="simplified_chinese" className="space-y-4">
                  <div>
                    <Label htmlFor="sc-clientName">Client Name (Simplified Chinese)</Label>
                    <Input
                      id="sc-clientName"
                      name="clientName"
                      placeholder="Enter client name in Simplified Chinese"
                      value={formData.multilingual.simplified_chinese.clientName}
                      onChange={(e) => handleMultilingualChange(e, 'simplified_chinese')}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sc-content">Testimonial (Simplified Chinese)</Label>
                    <Textarea
                      id="sc-content"
                      name="content"
                      placeholder="Enter testimonial content in Simplified Chinese"
                      rows={6}
                      value={formData.multilingual.simplified_chinese.content}
                      onChange={(e) => handleMultilingualChange(e, 'simplified_chinese')}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Label>Rating</Label>
                  <RadioGroup 
                    value={formData.rating.toString()} 
                    onValueChange={handleRatingChange}
                    className="flex space-x-2 mt-2"
                  >
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div key={rating} className="flex flex-col items-center">
                        <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} className="sr-only" />
                        <Label
                          htmlFor={`rating-${rating}`}
                          className={`cursor-pointer rounded-full p-1 ${formData.rating >= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
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
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={handleFeaturedChange}
                  />
                  <Label htmlFor="featured">Featured Testimonial</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
} 