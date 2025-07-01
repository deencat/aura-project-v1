"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusCircle, Pencil, Trash2, Search, FilterX, Copy, Eye, Percent } from 'lucide-react'
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


// Define types for promotions
interface Promotion {
  id: number;
  code: string;
  name: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'service';
  value: number | string;
  minAmount?: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
  usedCount: number;
  status: 'active' | 'expired' | 'paused' | 'draft';
  applicableServices: string[];
  description: string;
}

// Mock promotions data
const mockPromotions: Promotion[] = [
  {
    id: 1,
    code: "WELCOME20",
    name: "New Client Welcome Offer",
    type: "percentage",
    value: 20,
    minAmount: 500,
    maxDiscount: 200,
    startDate: "2023-01-01",
    endDate: "2024-12-31",
    usageLimit: 100,
    usedCount: 23,
    status: "active",
    applicableServices: ["Royal Black Scan", "Collagen Regeneration"],
    description: "20% off first treatment for new clients"
  },
  {
    id: 2,
    code: "SUMMER30",
    name: "Summer Glow Special",
    type: "percentage",
    value: 30,
    minAmount: 800,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    usageLimit: 50,
    usedCount: 45,
    status: "expired",
    applicableServices: ["Glow Treatment", "Peeled Egg Skin"],
    description: "30% off glow treatments during summer"
  },
  {
    id: 3,
    code: "DOUBLO100",
    name: "New Doublo Launch",
    type: "fixed",
    value: 100,
    minAmount: 1000,
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    usageLimit: 200,
    usedCount: 89,
    status: "active",
    applicableServices: ["New Doublo Sculpt & Lift", "New Doublo V-Line"],
    description: "$100 off New Doublo treatments"
  },
  {
    id: 4,
    code: "BOGO",
    name: "Buy One Get One Free",
    type: "bogo",
    value: "50% off second service",
    startDate: "2023-11-15",
    endDate: "2023-12-15",
    usageLimit: 30,
    usedCount: 12,
    status: "active",
    applicableServices: ["Hair Removal", "Stretch Mark Repair"],
    description: "Buy one treatment, get 50% off the second"
  },
  {
    id: 5,
    code: "VIP15",
    name: "VIP Member Discount",
    type: "percentage",
    value: 15,
    startDate: "2023-01-01",
    endDate: "2024-12-31",
    usedCount: 156,
    status: "active",
    applicableServices: ["All Services"],
    description: "Exclusive 15% discount for VIP members"
  }
]

export default function PromotionsAdminPage() {
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [promotionToDelete, setPromotionToDelete] = useState<number | null>(null)
  // Filtered promotions based on search and filters
  const filteredPromotions = promotions.filter(promotion => {
    const matchesSearch = promotion.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus ? promotion.status === selectedStatus : true
    const matchesType = selectedType ? promotion.type === selectedType : true
    
    return matchesSearch && matchesStatus && matchesType
  })
  
  // Handle delete confirmation
  const handleDeleteClick = (promotionId: number) => {
    setPromotionToDelete(promotionId)
    setDeleteDialogOpen(true)
  }
  
  // Handle actual deletion
  const confirmDelete = () => {
    if (promotionToDelete) {
      setPromotions(promotions.filter(promotion => promotion.id !== promotionToDelete))
      setDeleteDialogOpen(false)
      setPromotionToDelete(null)
      alert("Promotion deleted successfully")
    }
  }
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('')
    setSelectedStatus(null)
    setSelectedType(null)
  }

  // Copy promotion code to clipboard
  const copyCodeToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    alert(`Promotion code "${code}" copied to clipboard`)
  }

  // Toggle promotion status
  const toggleStatus = (id: number) => {
    setPromotions(
      promotions.map(promotion => 
        promotion.id === id 
          ? { 
              ...promotion, 
              status: promotion.status === 'active' ? 'paused' : 'active' as 'active' | 'expired' | 'paused' | 'draft'
            }
          : promotion
      )
    )
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'expired':
        return <Badge variant="secondary">Expired</Badge>
      case 'paused':
        return <Badge variant="outline">Paused</Badge>
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Get type badge
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'percentage':
        return <Badge variant="outline" className="text-blue-600 border-blue-200"><Percent className="w-3 h-3 mr-1" />Percentage</Badge>
      case 'fixed':
        return <Badge variant="outline" className="text-green-600 border-green-200">$ Fixed</Badge>
      case 'bogo':
        return <Badge variant="outline" className="text-purple-600 border-purple-200">BOGO</Badge>
      case 'service':
        return <Badge variant="outline" className="text-orange-600 border-orange-200">Service</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  // Format value based on type
  const formatValue = (promotion: Promotion) => {
    switch (promotion.type) {
      case 'percentage':
        return `${promotion.value}%`
      case 'fixed':
        return `$${promotion.value}`
      case 'bogo':
      case 'service':
        return promotion.value as string
      default:
        return promotion.value
    }
  }

  // Check if promotion is expiring soon (within 7 days)
  const isExpiringSoon = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Promotions & Coupons</h1>
          <p className="text-gray-600 mt-2">Manage discount codes and promotional offers</p>
        </div>
        <Link href="/admin/promotions/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Promotion
          </Button>
        </Link>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-green-600">
              {promotions.filter(p => p.status === 'active').length}
            </div>
            <Badge className="ml-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          <p className="text-sm text-gray-600">Active Promotions</p>
        </div>
        
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">
              {promotions.reduce((total, p) => total + p.usedCount, 0)}
            </div>
          </div>
          <p className="text-sm text-gray-600">Total Uses</p>
        </div>
        
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-orange-600">
              {promotions.filter(p => isExpiringSoon(p.endDate)).length}
            </div>
          </div>
          <p className="text-sm text-gray-600">Expiring Soon</p>
        </div>
        
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-600">
              {promotions.filter(p => p.status === 'draft').length}
            </div>
          </div>
          <p className="text-sm text-gray-600">Draft Promotions</p>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search promotions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Status Filter */}
          <select
            value={selectedStatus || ''}
            onChange={(e) => setSelectedStatus(e.target.value || null)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="paused">Paused</option>
            <option value="draft">Draft</option>
          </select>
          
          {/* Type Filter */}
          <select
            value={selectedType || ''}
            onChange={(e) => setSelectedType(e.target.value || null)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">All Types</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
            <option value="bogo">BOGO</option>
            <option value="service">Service</option>
          </select>
          
          {/* Reset Filters */}
          {(searchTerm || selectedStatus || selectedType) && (
            <Button variant="ghost" size="icon" onClick={resetFilters}>
              <FilterX className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Promotions Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Valid Period</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPromotions.length > 0 ? (
              filteredPromotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell className="font-mono">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{promotion.code}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => copyCodeToClipboard(promotion.code)}
                        title="Copy code"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Link href={`/admin/promotions/edit/${promotion.id}`} className="hover:underline font-medium">
                        {promotion.name}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">{promotion.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(promotion.type)}</TableCell>
                  <TableCell className="font-medium">{formatValue(promotion)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{promotion.usedCount} used</div>
                      {promotion.usageLimit && (
                        <div className="text-gray-500">of {promotion.usageLimit} limit</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(promotion.startDate).toLocaleDateString()}</div>
                      <div className={`${isExpiringSoon(promotion.endDate) ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>
                        to {new Date(promotion.endDate).toLocaleDateString()}
                      </div>
                      {isExpiringSoon(promotion.endDate) && (
                        <Badge variant="outline" className="text-orange-600 border-orange-200 mt-1">
                          Expiring Soon
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(promotion.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Link href={`/admin/promotions/edit/${promotion.id}`}>
                        <Button variant="ghost" size="icon" title="Edit promotion">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleStatus(promotion.id)}
                        title={promotion.status === 'active' ? 'Pause promotion' : 'Activate promotion'}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteClick(promotion.id)}
                        title="Delete promotion"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No promotions found.
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
              This action cannot be undone. This will permanently delete the promotion
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