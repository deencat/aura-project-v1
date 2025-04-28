"use client"

import React, { useState } from 'react'
import Link from 'next/link'
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

// Mock data for services
const mockServices = [
  {
    id: 1,
    name: 'Lymphatic Detox',
    category: 'Body Care',
    price: '$980',
    duration: '90 min',
    status: 'Active',
    slug: 'body-care/lymphatic-detox'
  },
  {
    id: 2,
    name: 'Stretch Mark Treatment',
    category: 'Body Care',
    price: '$850',
    duration: '75 min',
    status: 'Active',
    slug: 'body-care/stretch-mark'
  },
  {
    id: 3,
    name: 'Hair Removal',
    category: 'Body Care',
    price: '$650',
    duration: '60 min',
    status: 'Active',
    slug: 'body-care/hair-removal'
  },
  {
    id: 4,
    name: 'Perfect Buttocks',
    category: 'Body Care',
    price: '$1,100',
    duration: '90 min',
    status: 'Active',
    slug: 'body-care/perfect-buttocks'
  },
  {
    id: 5,
    name: 'Breast Enhancement',
    category: 'Body Care',
    price: '$1,200',
    duration: '90 min',
    status: 'Active',
    slug: 'body-care/breast-enhancement'
  },
  {
    id: 6,
    name: 'Neck Rejuvenation',
    category: 'New Doublo',
    price: '$1,350',
    duration: '60 min',
    status: 'Active',
    slug: 'new-doublo/neck-rejuvenation'
  },
  {
    id: 7,
    name: 'Youth Revival',
    category: 'New Doublo',
    price: '$1,450',
    duration: '75 min',
    status: 'Active',
    slug: 'new-doublo/youth-revival'
  },
  {
    id: 8,
    name: 'V-Line Perfection',
    category: 'New Doublo',
    price: '$1,500',
    duration: '60 min',
    status: 'Active',
    slug: 'new-doublo/v-line'
  },
  {
    id: 9,
    name: 'Sculpt & Lift',
    category: 'New Doublo',
    price: '$1,400',
    duration: '60 min',
    status: 'Active',
    slug: 'new-doublo/sculpt-lift'
  }
]

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

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')

  // Filter services based on search query, category, and status
  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory
    const matchesStatus = selectedStatus === 'All Status' || service.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Sort services based on sort field and direction
  const sortedServices = [...filteredServices].sort((a, b) => {
    const fieldA = a[sortField].toString().toLowerCase()
    const fieldB = b[sortField].toString().toLowerCase()
    
    if (sortDirection === 'asc') {
      return fieldA.localeCompare(fieldB)
    } else {
      return fieldB.localeCompare(fieldA)
    }
  })

  // Handle sort toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
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
                  <th className="px-4 py-3 text-left">
                    <button 
                      className="flex items-center gap-1"
                      onClick={() => handleSort('status')}
                    >
                      Status
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedServices.map((service) => (
                  <tr key={service.id} className="border-b text-sm">
                    <td className="px-4 py-3 font-medium">
                      {service.name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {service.category}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {service.price}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {service.duration}
                    </td>
                    <td className="px-4 py-3">
                      <span 
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          service.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
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
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
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