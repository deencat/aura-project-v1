"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Trash2, StarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

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
    content: "The Royal Black Scan treatment was amazing! My skin looks younger and more radiant than it has in years. The staff was professional and made me feel comfortable throughout the entire process."
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

export default function EditTestimonialPage({ params }) {
  const router = useRouter()
  const testimonialId = parseInt(params.id)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    clientName: '',
    service: '',
    rating: 5,
    content: '',
    featured: false,
    status: 'Draft',
    date: new Date().toISOString().split('T')[0]
  })

  // Fetch testimonial data
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      const testimonialsData = mockTestimonials
      const testimonial = testimonialsData.find(t => t.id === testimonialId)
      
      if (testimonial) {
        setFormData({
          clientName: testimonial.clientName,
          service: testimonial.service,
          rating: testimonial.rating,
          content: testimonial.content,
          featured: testimonial.featured,
          status: testimonial.status,
          date: testimonial.date
        })
      }
      
      setIsLoading(false)
    }, 500) // Simulate loading delay
  }, [testimonialId])

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
    alert('Testimonial updated successfully (mock)')
    router.push('/admin/testimonials')
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this testimonial
                  and remove the data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <Button className="flex items-center gap-2" onClick={handleSubmit}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
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
              <h3 className="text-lg font-medium mb-4">Client Photo</h3>
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
                    Replace Photo
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500">
                    Remove
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