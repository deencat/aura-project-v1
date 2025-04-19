"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusCircle, Pencil, Trash2, Search, FilterX } from 'lucide-react'
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

// Define types for blog posts
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishDate: string;
  status: string;
}

// Mock blog post data
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Benefits of Regular Facials",
    slug: "benefits-of-regular-facials",
    category: "Facial Treatments",
    author: "Sarah Johnson",
    publishDate: "2023-06-15",
    status: "Published"
  },
  {
    id: 2,
    title: "Understanding Skin Types and Care Routines",
    slug: "understanding-skin-types-care-routines",
    category: "Skincare Tips",
    author: "Emma Wilson",
    publishDate: "2023-07-22",
    status: "Published"
  },
  {
    id: 3,
    title: "How to Prepare for Your First Body Treatment",
    slug: "prepare-first-body-treatment",
    category: "Body Care",
    author: "Michael Chen",
    publishDate: "2023-08-10",
    status: "Draft"
  },
  {
    id: 4,
    title: "Top 5 Anti-Aging Treatments for 2023",
    slug: "top-anti-aging-treatments-2023",
    category: "Specialized Services",
    author: "Jessica Lee",
    publishDate: "2023-09-05",
    status: "Published"
  },
  {
    id: 5,
    title: "Winter Skincare: Keeping Your Skin Hydrated",
    slug: "winter-skincare-hydration",
    category: "Skincare Tips",
    author: "Sarah Johnson",
    publishDate: "2023-10-12",
    status: "Draft"
  }
]

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<number | null>(null)
  
  // Get unique categories from posts
  const categories = Array.from(new Set(posts.map(post => post.category)))
  
  // Filtered posts based on search and filters
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true
    const matchesStatus = selectedStatus ? post.status === selectedStatus : true
    
    return matchesSearch && matchesCategory && matchesStatus
  })
  
  // Handle delete confirmation
  const handleDeleteClick = (postId: number) => {
    setPostToDelete(postId)
    setDeleteDialogOpen(true)
  }
  
  // Handle actual deletion
  const confirmDelete = () => {
    if (postToDelete) {
      setPosts(posts.filter(post => post.id !== postToDelete))
      setDeleteDialogOpen(false)
      setPostToDelete(null)
    }
  }
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory(null)
    setSelectedStatus(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
        <Link href="/admin/blog/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Category Filter */}
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
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
          {(searchTerm || selectedCategory || selectedStatus) && (
            <Button variant="ghost" size="icon" onClick={resetFilters}>
              <FilterX className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Blog Posts Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <Link href={`/admin/blog/edit/${post.id}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{new Date(post.publishDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === 'Published' ? 'default' : 'secondary'}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Link href={`/admin/blog/edit/${post.id}`}>
                        <Button variant="ghost" size="icon" title="Edit post">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteClick(post.id)}
                        title="Delete post"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No posts found.
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
              This action cannot be undone. This will permanently delete the blog post
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