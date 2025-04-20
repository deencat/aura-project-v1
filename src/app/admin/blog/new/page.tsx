"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Upload, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckIcon, AlertCircle } from 'lucide-react'

// Mock categories
const categories = [
  "Facial Treatments",
  "Body Care",
  "Specialized Services",
  "Skincare Tips",
  "Beauty Advice",
  "Treatment Reviews"
]

export default function NewBlogPostPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<{
    title: string
    slug: string
    category: string
    content: string
    metaDescription: string
    author: string
    publishDate: string
    status: string
    featuredImage: string | null
  }>({
    title: '',
    slug: '',
    category: categories[0],
    content: '',
    metaDescription: '',
    author: 'Sarah Johnson',
    publishDate: new Date().toISOString().split('T')[0],
    status: 'Draft',
    featuredImage: null
  })

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // Automatically generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-')
      
      setFormData(prev => ({
        ...prev,
        slug
      }))
    }
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to your server/cloud storage
      // For now, we'll just store it in state as if it was uploaded
      setFormData({
        ...formData,
        featuredImage: URL.createObjectURL(file)
      })
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // In a real app, you would send this data to your API
      // This is just a simulation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Form submitted:', formData)
      setSuccess(true)
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          title: '',
          slug: '',
          category: categories[0],
          content: '',
          metaDescription: '',
          author: 'Sarah Johnson',
          publishDate: new Date().toISOString().split('T')[0],
          status: 'Draft',
          featuredImage: null
        })
        setSuccess(false)
      }, 2000)
    } catch (err) {
      setError('Failed to create blog post. Please try again.')
      console.error('Error submitting form:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/blog">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">New Blog Post</h1>
      </div>

      {/* Alert messages */}
      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckIcon className="h-4 w-4 mr-2" />
          <AlertDescription>Blog post created successfully!</AlertDescription>
        </Alert>
      )}
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Blog Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              name="slug"
              placeholder="url-friendly-slug"
              value={formData.slug}
              onChange={handleInputChange}
              required
            />
            <p className="text-xs text-gray-500">
              This will be used for the blog post URL: /blog/{formData.slug}
            </p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Publish Date */}
          <div className="space-y-2">
            <Label htmlFor="publishDate">Publish Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                id="publishDate"
                name="publishDate"
                type="date"
                value={formData.publishDate}
                onChange={handleInputChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              placeholder="Author name"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
        </div>

        {/* Featured Image */}
        <div className="space-y-2">
          <Label htmlFor="featuredImage">Featured Image</Label>
          <div className="flex items-center gap-4">
            <div
              className={`relative flex h-40 w-40 cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 ${
                formData.featuredImage ? 'bg-gray-50' : 'bg-white'
              }`}
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              {formData.featuredImage ? (
                <img
                  src={formData.featuredImage}
                  alt="Featured image preview"
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Click to upload<br />or drag and drop
                  </p>
                </div>
              )}
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Image requirements:</p>
              <ul className="text-xs text-gray-500">
                <li>Recommended size: 1200 × 630 pixels</li>
                <li>Maximum file size: 2MB</li>
                <li>Formats: JPG, PNG, or WebP</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            placeholder="Write your blog post content here..."
            value={formData.content}
            onChange={handleInputChange}
            className="min-h-[300px] resize-y"
            required
          />
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Textarea
            id="metaDescription"
            name="metaDescription"
            placeholder="Brief description for search engines (max 160 characters)"
            value={formData.metaDescription}
            onChange={handleInputChange}
            className="resize-none"
            maxLength={160}
          />
          <p className="text-xs text-gray-500">
            {formData.metaDescription.length}/160 characters
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/blog">
            <Button variant="outline" type="button">Cancel</Button>
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Post'}
          </Button>
        </div>
      </form>
    </div>
  )
} 