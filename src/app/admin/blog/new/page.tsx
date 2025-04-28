"use client"

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Upload, Calendar, ImageIcon, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckIcon, AlertCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

// Mock categories
const categories = [
  "Facial Treatments",
  "Body Care",
  "Specialized Services",
  "Skincare Tips",
  "Beauty Advice",
  "Treatment Reviews"
]

// Mock library images
const libraryImages = [
  {
    id: 1,
    name: "hero-background.jpg",
    url: "/images/placeholders/new-doublo-hero-1.jpg",
    category: "Backgrounds",
  },
  {
    id: 2,
    name: "facial-treatment.jpg",
    url: "/images/placeholders/treatment-1.jpg",
    category: "Treatments",
  },
  {
    id: 3,
    name: "neck-rejuvenation.jpg",
    url: "/images/placeholders/new-doublo-neck-1.jpg",
    category: "Treatments",
  },
  {
    id: 4,
    name: "doublo-device.jpg",
    url: "/images/placeholders/new-doublo-device-1.jpg",
    category: "Equipment",
  }
];

// Rich text editor toolbar options
interface ToolbarButtonProps {
  icon: React.ReactNode;
  action: () => void;
  isActive?: boolean;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, action, isActive }) => (
  <button
    className={`p-2 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-primary' : ''}`}
    onClick={action}
    type="button"
  >
    {icon}
  </button>
);

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
  
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("library")
  const [forFeaturedImage, setForFeaturedImage] = useState(false)

  const contentEditorRef = useRef<HTMLDivElement>(null)

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

  // Handle content change from rich text editor
  const handleContentChange = () => {
    if (contentEditorRef.current) {
      setFormData({
        ...formData,
        content: contentEditorRef.current.innerHTML
      })
    }
  }

  // Handle rich text editor toolbar actions
  const handleBold = () => {
    document.execCommand('bold', false)
    handleContentChange()
  }

  const handleItalic = () => {
    document.execCommand('italic', false)
    handleContentChange()
  }

  const handleUnderline = () => {
    document.execCommand('underline', false)
    handleContentChange()
  }

  const handleHeading = (level: number) => {
    document.execCommand('formatBlock', false, `h${level}`)
    handleContentChange()
  }

  const handleParagraph = () => {
    document.execCommand('formatBlock', false, 'p')
    handleContentChange()
  }

  const handleLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      document.execCommand('createLink', false, url)
      handleContentChange()
    }
  }

  const handleUnlink = () => {
    document.execCommand('unlink', false)
    handleContentChange()
  }

  const handleList = (type: 'ol' | 'ul') => {
    if (type === 'ol') {
      document.execCommand('insertOrderedList', false)
    } else {
      document.execCommand('insertUnorderedList', false)
    }
    handleContentChange()
  }

  // Handle image upload for featured image
  const handleFeaturedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Open media library
  const openMediaLibrary = (forFeatured: boolean = false) => {
    setForFeaturedImage(forFeatured)
    setIsMediaLibraryOpen(true)
  }

  // Insert image from library
  const insertImageFromLibrary = (url: string) => {
    if (forFeaturedImage) {
      setFormData({
        ...formData,
        featuredImage: url
      })
    } else {
      document.execCommand('insertHTML', false, `<img src="${url}" alt="Blog image" class="max-w-full h-auto my-4 rounded-md" />`)
      handleContentChange()
    }
    setIsMediaLibraryOpen(false)
  }

  // Upload a new image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to your server/cloud storage
      // For now, we'll just create a URL for the image
      const imageUrl = URL.createObjectURL(file)
      
      if (forFeaturedImage) {
        setFormData({
          ...formData,
          featuredImage: imageUrl
        })
      } else {
        document.execCommand('insertHTML', false, `<img src="${imageUrl}" alt="Blog image" class="max-w-full h-auto my-4 rounded-md" />`)
        handleContentChange()
      }
      
      setIsMediaLibraryOpen(false)
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
        if (contentEditorRef.current) {
          contentEditorRef.current.innerHTML = ''
        }
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
              onClick={() => openMediaLibrary(true)}
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
                    Click to select image
                  </p>
                </div>
              )}
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

        {/* Rich Text Editor */}
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <div className="border rounded-md overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 border-b p-2 bg-gray-50">
              <ToolbarButton icon={<strong>B</strong>} action={handleBold} />
              <ToolbarButton icon={<em>I</em>} action={handleItalic} />
              <ToolbarButton icon={<span className="underline">U</span>} action={handleUnderline} />
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <ToolbarButton icon={<span>H1</span>} action={() => handleHeading(1)} />
              <ToolbarButton icon={<span>H2</span>} action={() => handleHeading(2)} />
              <ToolbarButton icon={<span>H3</span>} action={() => handleHeading(3)} />
              <ToolbarButton icon={<span>P</span>} action={handleParagraph} />
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <ToolbarButton icon={<span>🔗</span>} action={handleLink} />
              <ToolbarButton icon={<span>🚫🔗</span>} action={handleUnlink} />
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <ToolbarButton icon={<span>1.</span>} action={() => handleList('ol')} />
              <ToolbarButton icon={<span>•</span>} action={() => handleList('ul')} />
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <ToolbarButton 
                icon={<ImageIcon className="h-4 w-4" />} 
                action={() => openMediaLibrary(false)} 
              />
            </div>
            
            {/* Editor */}
            <div
              ref={contentEditorRef}
              className="min-h-[300px] p-4 outline-none focus:ring-0"
              contentEditable
              onInput={handleContentChange}
              dangerouslySetInnerHTML={{ __html: formData.content }}
            />
          </div>
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

      {/* Media Library Dialog */}
      <Dialog open={isMediaLibraryOpen} onOpenChange={setIsMediaLibraryOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Media Library</DialogTitle>
            <DialogDescription>
              Select an image for your blog post
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="library" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="library">Library</TabsTrigger>
              <TabsTrigger value="upload">Upload New</TabsTrigger>
            </TabsList>
            
            <TabsContent value="library" className="py-4">
              <div className="grid grid-cols-3 gap-4">
                {libraryImages.map((image) => (
                  <div 
                    key={image.id} 
                    className="cursor-pointer overflow-hidden rounded-md border hover:border-primary"
                    onClick={() => insertImageFromLibrary(image.url)}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={image.url}
                        alt={image.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <p className="truncate text-sm">{image.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Link href="/admin/images" target="_blank">
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Manage Media Library
                  </Button>
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="py-4">
              <div 
                className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 hover:bg-gray-50"
                onClick={() => document.getElementById('image-upload-dialog')?.click()}
              >
                <Upload className="h-10 w-10 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                <input
                  id="image-upload-dialog"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMediaLibraryOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 