"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusCircle, Pencil, Trash2, Search, FilterX, Star } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

// Define types for testimonials
interface Testimonial {
  id: number;
  clientName: string;
  service: string;
  rating: number;
  date: string;
  status: string;
  featured: boolean;
  content: string;
}

// Mock testimonials data
const mockTestimonials: Testimonial[] = [
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

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [testimonialToDelete, setTestimonialToDelete] = useState<number | null>(null)
  
  // Get unique services from testimonials
  const services = Array.from(new Set(testimonials.map(testimonial => testimonial.service)))
  
  // Filtered testimonials based on search and filters
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesService = selectedService ? testimonial.service === selectedService : true
    const matchesStatus = selectedStatus ? testimonial.status === selectedStatus : true
    
    return matchesSearch && matchesService && matchesStatus
  })
  
  // Handle delete confirmation
  const handleDeleteClick = (testimonialId: number) => {
    setTestimonialToDelete(testimonialId)
    setDeleteDialogOpen(true)
  }
  
  // Handle actual deletion
  const confirmDelete = () => {
    if (testimonialToDelete) {
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== testimonialToDelete))
      setDeleteDialogOpen(false)
      setTestimonialToDelete(null)
    }
  }
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('')
    setSelectedService(null)
    setSelectedStatus(null)
  }

  // Toggle featured status
  const toggleFeatured = (id: number) => {
    setTestimonials(
      testimonials.map(testimonial => 
        testimonial.id === id 
          ? { ...testimonial, featured: !testimonial.featured }
          : testimonial
      )
    )
  }

  // Render star ratings
  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
        <Link href="/admin/testimonials/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Testimonial
          </Button>
        </Link>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search testimonials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Service Filter */}
          <select
            value={selectedService || ''}
            onChange={(e) => setSelectedService(e.target.value || null)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">All Services</option>
            {services.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
          
          {/* Status Filter */}
          <select
            value={selectedStatus || ''}
            onChange={(e) => setSelectedStatus(e.target.value || null)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
          
          {/* Reset Filters */}
          {(searchTerm || selectedService || selectedStatus) && (
            <Button variant="ghost" size="icon" onClick={resetFilters}>
              <FilterX className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Testimonials Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTestimonials.length > 0 ? (
              filteredTestimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="font-medium">
                    <Link href={`/admin/testimonials/edit/${testimonial.id}`} className="hover:underline">
                      {testimonial.clientName}
                    </Link>
                  </TableCell>
                  <TableCell>{testimonial.service}</TableCell>
                  <TableCell>
                    {renderRating(testimonial.rating)}
                  </TableCell>
                  <TableCell>{new Date(testimonial.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={testimonial.status === 'Published' ? 'default' : 'secondary'}>
                      {testimonial.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleFeatured(testimonial.id)}
                      title={testimonial.featured ? "Remove from featured" : "Add to featured"}
                    >
                      <Star 
                        className={`h-4 w-4 ${testimonial.featured ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Link href={`/admin/testimonials/edit/${testimonial.id}`}>
                        <Button variant="ghost" size="icon" title="Edit testimonial">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteClick(testimonial.id)}
                        title="Delete testimonial"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No testimonials found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the testimonial
              and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 