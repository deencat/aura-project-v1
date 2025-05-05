"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  ArrowUpDown,
  Check,
  MoreHorizontal
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// Define Service interface
interface Service {
  id: number;
  name: string;
  category: string;
  price: string;
  duration: string;
  status: string;
  slug: string;
  short_description?: string;
  long_description?: string;
  benefits?: string;
  suitable_for?: string;
  contraindications?: string;
  preparation?: string;
  aftercare?: string;
}

// Categories for filtering
const categories = [
  'All Categories',
  'Body Care',
  'New Doublo',
  'Facial Services',
  'Premium Beauty',
  'Specialized Services',
  'Cell Beauty',
]

// Status options for filtering
const statusOptions = [
  'All Status',
  'Active',
  'Draft',
]

// Create a fetcher function for SWR
const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')

  // Fetch services data with SWR
  const { data: services, error, isLoading, mutate } = useSWR<Service[]>('/api/services', fetcher)

  // Handle error and loading states
  if (error) return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        <Link href="/admin/services/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Service
          </Button>
        </Link>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="mb-4 text-lg font-medium text-red-500">Error loading services</p>
            <p className="text-sm text-gray-500">
              {error.message || 'Failed to load data'}
            </p>
            <Button className="mt-4" onClick={() => mutate()}>
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  if (isLoading || !services) return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        <Link href="/admin/services/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Service
          </Button>
        </Link>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="mb-4 text-lg font-medium">Loading services...</p>
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Filter services based on search query, category, and status
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory
    const matchesStatus = selectedStatus === 'All Status' || service.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Sort services based on sort field and direction
  const sortedServices = [...filteredServices].sort((a, b) => {
    const fieldA = a[sortField as keyof Service]?.toString().toLowerCase() || ''
    const fieldB = b[sortField as keyof Service]?.toString().toLowerCase() || ''
    
    if (sortDirection === 'asc') {
      return fieldA.localeCompare(fieldB)
    } else {
      return fieldB.localeCompare(fieldA)
    }
  })

  // Handle sort toggle
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Handle delete service
  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        const res = await fetch(`/api/services/${id}`, {
          method: 'DELETE',
        })
        
        if (!res.ok) throw new Error('Failed to delete service')
        
        // Refetch services data after successful deletion
        mutate()
      } catch (error) {
        console.error('Error deleting service:', error)
        alert('Failed to delete service')
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        <Link href="/admin/services/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Service
          </Button>
        </Link>
      </div>
      
      {/* Filters Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search services..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-500" />
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            
            <Button variant="outline" onClick={() => {
              setSearchQuery('')
              setSelectedCategory('All Categories')
              setSelectedStatus('All Status')
            }}>
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Services Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50 text-sm font-medium text-gray-500">
                  <th className="px-4 py-3 text-left">
                    <button 
                      className="flex items-center gap-1"
                      onClick={() => handleSort('name')}
                    >
                      Name
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button 
                      className="flex items-center gap-1"
                      onClick={() => handleSort('category')}
                    >
                      Category
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button 
                      className="flex items-center gap-1"
                      onClick={() => handleSort('price')}
                    >
                      Price
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button 
                      className="flex items-center gap-1"
                      onClick={() => handleSort('duration')}
                    >
                      Duration
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedServices.map((service) => (
                  <tr key={service.id} className="border-b text-sm">
                    <td className="px-4 py-3 font-medium">
                      {service.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {service.category}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {service.price}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {service.duration}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        service.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/services/edit/${service.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/${service.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500"
                          onClick={() => handleDelete(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {sortedServices.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="mb-4 text-lg font-medium">No services found</p>
              <p className="text-sm text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 