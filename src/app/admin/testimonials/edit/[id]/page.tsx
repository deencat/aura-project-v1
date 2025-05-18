"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
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

// Mock testimonials data (same as in the listing page)
const mockTestimonials = [
  {
    id: 1,
    clientName: "Emma Thompson",
    service: "Royal Black Scan",
    rating: 5,
    date: "2023-08-15",
    status: "Published",
    featured: true,
    content: "The Royal Black Scan treatment was amazing! My skin looks younger and more radiant than it has in years. The staff was professional and made me feel comfortable throughout the entire process.",
    multilingual: {
      english: {
        clientName: "Emma Thompson",
        content: "The Royal Black Scan treatment was amazing! My skin looks younger and more radiant than it has in years. The staff was professional and made me feel comfortable throughout the entire process."
      },
      traditional_chinese: {
        clientName: "艾瑪·湯普森",
        content: "皇家黑掃描療程真的很棒！我的皮膚看起來比過去幾年更年輕、更有光澤。工作人員非常專業，讓我在整個過程中感到舒適。"
      },
      simplified_chinese: {
        clientName: "艾玛·汤普森",
        content: "皇家黑扫描疗程真的很棒！我的皮肤看起来比过去几年更年轻、更有光泽。工作人员非常专业，让我在整个过程中感到舒适。"
      }
    }
  },
  {
    id: 2,
    clientName: "Michael Wang",
    service: "Collagen Regeneration",
    rating: 4,
    date: "2023-09-22",
    status: "Published",
    featured: false,
    content: "After just three sessions of the Collagen Regeneration treatment, I noticed significant improvement in my skin elasticity. My friends keep asking what my secret is!"
  },
  {
    id: 3,
    clientName: "Sarah Johnson",
    service: "Lymphatic Detox",
    rating: 5,
    date: "2023-10-05",
    status: "Published",
    featured: true,
    content: "The Lymphatic Detox treatment helped reduce my bloating and water retention. I feel lighter and more energetic. Will definitely be coming back for more sessions."
  },
  {
    id: 4,
    clientName: "Jennifer Lee",
    service: "Hair Removal",
    rating: 5,
    date: "2023-10-18",
    status: "Draft",
    featured: false,
    content: "I've tried many hair removal services in Hong Kong, but this one was truly painless and effective. After 3 sessions, I'm already seeing amazing results."
  },
  {
    id: 5,
    clientName: "David Chen",
    service: "Peeled Egg Skin",
    rating: 4,
    date: "2023-11-02",
    status: "Draft",
    featured: false,
    content: "The Peeled Egg Skin treatment gave my skin a smooth, glowing finish. The process was comfortable and the results were visible after just one session."
  }
]

export default function EditTestimonialPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const testimonialId = parseInt(params.id)
  
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('english')
  
  // Form state
  const [formData, setFormData] = useState({
    id: 0,
    clientName: '',
    service: '',
    rating: 5,
    date: '',
    status: 'Draft',
    featured: false,
    content: '',
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
  
  // Fetch testimonial data
  useEffect(() => {
    const fetchTestimonial = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch from your API
        const testimonial = mockTestimonials.find(t => t.id === testimonialId)
        
        if (testimonial) {
          // Initialize multilingual data if it doesn't exist
          const multilingual: TestimonialMultilingualData = testimonial.multilingual || {
            english: {
              clientName: testimonial.clientName || '',
              content: testimonial.content || ''
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
          
          setFormData({
            ...testimonial,
            multilingual
          })
        } else {
          console.error('Testimonial not found')
          router.push('/admin/testimonials')
        }
      } catch (error) {
        console.error('Error fetching testimonial:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchTestimonial()
  }, [testimonialId, router])
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Handle multilingual content changes
  const handleMultilingualChange = (e, language) => {
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
  const handleRatingChange = (value) => {
    setFormData(prev => ({
      ...prev,
      rating: parseInt(value)
    }))
  }
  
  // Handle featured toggle
  const handleFeaturedChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      featured: checked
    }))
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simulate API call to update testimonial
    console.log('Updating testimonial with data:', formData)
    
    // In a real app, you would send this data to your API
    alert('Testimonial updated successfully (mock)')
  }
  
  // Handle deletion
  const handleDelete = () => {
    console.log('Deleting testimonial:', testimonialId)
    // Here you would normally call your API to delete the testimonial
    alert('Testimonial deleted successfully (mock)')
    router.push('/admin/testimonials')
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-medium text-gray-600">Loading testimonial data...</div>
      </div>
    )
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
          <h1 className="text-3xl font-bold tracking-tight">Edit Testimonial</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleDelete} className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
            Delete
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
      </div>
    </div>
  )
} 