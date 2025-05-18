"use client"

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Upload, Calendar, ImageIcon, Plus, Save } from 'lucide-react'
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
import { useRouter } from 'next/navigation'
import { BlogMultilingualData } from '@/utils/blogUtils'

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
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('english')
  
  // Form data state with multilingual support
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Skincare Tips',
    content: '',
    metaDescription: '',
    author: 'Sarah Johnson',
    publishDate: new Date().toISOString().split('T')[0],
    status: 'Draft',
    featuredImage: null,
    multilingual: {
      english: {
        title: '',
        content: '',
        metaDescription: ''
      },
      traditional_chinese: {
        title: '',
        content: '',
        metaDescription: ''
      },
      simplified_chinese: {
        title: '',
        content: '',
        metaDescription: ''
      }
    }
  })
  
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("library")
  const [forFeaturedImage, setForFeaturedImage] = useState(false)

  const contentEditorRef = useRef<HTMLDivElement>(null)

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

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

  // Generate slug from title
  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    language: 'english' | 'traditional_chinese' | 'simplified_chinese'
  ) => {
    const title = e.target.value
    
    // Update the multilingual title
    handleMultilingualChange(e, language)
    
    // Only generate slug from English title
    if (language === 'english') {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')  // Remove special characters
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .replace(/--+/g, '-')      // Replace multiple hyphens with single hyphen
        .trim()
      
      setFormData(prev => ({
        ...prev,
        title,
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
          category: 'Skincare Tips',
          content: '',
          metaDescription: '',
          author: 'Sarah Johnson',
          publishDate: new Date().toISOString().split('T')[0],
          status: 'Draft',
          featuredImage: null,
          multilingual: {
            english: {
              title: '',
              content: '',
              metaDescription: ''
            },
            traditional_chinese: {
              title: '',
              content: '',
              metaDescription: ''
            },
            simplified_chinese: {
              title: '',
              content: '',
              metaDescription: ''
            }
          }
        })
        if (contentEditorRef.current) {
          contentEditorRef.current.innerHTML = ''
        }
        setSuccess(false)
      }, 2000)
      
      // Simulate API call to create new blog post
      setTimeout(() => {
        console.log('Creating new blog post with data:', formData)
        
        // In a real app, you would send this data to your API
        alert('Blog post created successfully (mock)')
        setLoading(false)
        router.push('/admin/blog')
      }, 1000)
    } catch (err) {
      setError('Failed to create blog post. Please try again.')
      console.error('Error submitting form:', err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">New Blog Post</h1>
        </div>
        <Button onClick={handleSubmit} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          {loading ? 'Saving...' : 'Save Post'}
        </Button>
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
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="english">English</TabsTrigger>
              <TabsTrigger value="traditional_chinese">Traditional Chinese</TabsTrigger>
              <TabsTrigger value="simplified_chinese">Simplified Chinese</TabsTrigger>
            </TabsList>
            
            {/* English Content */}
            <TabsContent value="english" className="space-y-4">
              <div>
                <Label htmlFor="english-title">Title (English)</Label>
                <Input
                  id="english-title"
                  name="title"
                  placeholder="Enter title in English"
                  value={formData.multilingual.english.title}
                  onChange={(e) => handleTitleChange(e, 'english')}
                />
              </div>
              
              <div>
                <Label htmlFor="english-content">Content (English)</Label>
                <Textarea
                  id="english-content"
                  name="content"
                  placeholder="Enter blog content in English"
                  rows={12}
                  value={formData.multilingual.english.content}
                  onChange={(e) => handleMultilingualChange(e, 'english')}
                />
              </div>
              
              <div>
                <Label htmlFor="english-metaDescription">Meta Description (English)</Label>
                <Textarea
                  id="english-metaDescription"
                  name="metaDescription"
                  placeholder="Enter meta description in English"
                  rows={3}
                  value={formData.multilingual.english.metaDescription}
                  onChange={(e) => handleMultilingualChange(e, 'english')}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Brief description for search engines. Keep it under 160 characters.
                </p>
              </div>
            </TabsContent>
            
            {/* Traditional Chinese Content */}
            <TabsContent value="traditional_chinese" className="space-y-4">
              <div>
                <Label htmlFor="tc-title">Title (Traditional Chinese)</Label>
                <Input
                  id="tc-title"
                  name="title"
                  placeholder="Enter title in Traditional Chinese"
                  value={formData.multilingual.traditional_chinese.title}
                  onChange={(e) => handleMultilingualChange(e, 'traditional_chinese')}
                />
              </div>
              
              <div>
                <Label htmlFor="tc-content">Content (Traditional Chinese)</Label>
                <Textarea
                  id="tc-content"
                  name="content"
                  placeholder="Enter blog content in Traditional Chinese"
                  rows={12}
                  value={formData.multilingual.traditional_chinese.content}
                  onChange={(e) => handleMultilingualChange(e, 'traditional_chinese')}
                />
              </div>
              
              <div>
                <Label htmlFor="tc-metaDescription">Meta Description (Traditional Chinese)</Label>
                <Textarea
                  id="tc-metaDescription"
                  name="metaDescription"
                  placeholder="Enter meta description in Traditional Chinese"
                  rows={3}
                  value={formData.multilingual.traditional_chinese.metaDescription}
                  onChange={(e) => handleMultilingualChange(e, 'traditional_chinese')}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Brief description for search engines. Keep it under 160 characters.
                </p>
              </div>
            </TabsContent>
            
            {/* Simplified Chinese Content */}
            <TabsContent value="simplified_chinese" className="space-y-4">
              <div>
                <Label htmlFor="sc-title">Title (Simplified Chinese)</Label>
                <Input
                  id="sc-title"
                  name="title"
                  placeholder="Enter title in Simplified Chinese"
                  value={formData.multilingual.simplified_chinese.title}
                  onChange={(e) => handleMultilingualChange(e, 'simplified_chinese')}
                />
              </div>
              
              <div>
                <Label htmlFor="sc-content">Content (Simplified Chinese)</Label>
                <Textarea
                  id="sc-content"
                  name="content"
                  placeholder="Enter blog content in Simplified Chinese"
                  rows={12}
                  value={formData.multilingual.simplified_chinese.content}
                  onChange={(e) => handleMultilingualChange(e, 'simplified_chinese')}
                />
              </div>
              
              <div>
                <Label htmlFor="sc-metaDescription">Meta Description (Simplified Chinese)</Label>
                <Textarea
                  id="sc-metaDescription"
                  name="metaDescription"
                  placeholder="Enter meta description in Simplified Chinese"
                  rows={3}
                  value={formData.multilingual.simplified_chinese.metaDescription}
                  onChange={(e) => handleMultilingualChange(e, 'simplified_chinese')}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Brief description for search engines. Keep it under 160 characters.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                placeholder="Author name"
                value={formData.author}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <Label htmlFor="publishDate">Publication Date</Label>
              <Input
                id="publishDate"
                name="publishDate"
                type="date"
                value={formData.publishDate}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
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
            
            <div>
              <Label htmlFor="featuredImage">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="featuredImage"
                  name="featuredImage"
                  placeholder="https://example.com/image.jpg"
                  value={formData.featuredImage}
                  onChange={handleInputChange}
                />
                <Button type="button" variant="outline" className="flex-shrink-0">
                  <Image className="h-4 w-4 mr-2" />
                  Browse
                </Button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Enter a URL or upload an image. Recommended size: 1200×630px.
              </p>
            </div>
          </div>
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