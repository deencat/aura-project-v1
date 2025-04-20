"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, Save, Image, X, Calendar, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock blog posts data - in a real app this would come from your database
const mockPosts = [
  {
    id: 1,
    title: "The Benefits of Regular Facials",
    slug: "benefits-of-regular-facials",
    category: "Facial Treatments",
    content: "Regular facials can significantly improve your skin's health and appearance. They help to deeply cleanse pores, exfoliate dead skin cells, and hydrate the skin.\n\nBeyond the physical benefits, facials also provide a relaxing experience that can reduce stress and promote mental wellbeing. The massage techniques used during a facial can improve blood circulation and lymphatic drainage.\n\nFor optimal results, it's recommended to get a facial every 4-6 weeks, as this aligns with your skin's natural cell turnover cycle.",
    metaDescription: "Discover how regular facial treatments can improve skin health, reduce signs of aging, and provide relaxation benefits for overall wellbeing.",
    author: "Sarah Johnson",
    publishDate: "2023-08-15",
    status: "Published",
    featuredImage: "/images/placeholder.jpg"
  },
  {
    id: 2,
    title: "5 Things to Know Before Getting a Chemical Peel",
    slug: "things-to-know-before-chemical-peel",
    category: "Specialized Services",
    content: "Chemical peels are powerful treatments that can transform your skin, but there are important things to know before you book your appointment.\n\n1. There are different strengths of peels - light, medium, and deep - each with different recovery times and results.\n\n2. You'll need to avoid sun exposure before and after your treatment to prevent hyperpigmentation.\n\n3. Some medications and skincare products need to be paused before getting a peel.\n\n4. Expect some downtime after your treatment, especially with medium and deep peels.\n\n5. Results aren't instant - your best skin will reveal itself days or weeks after the treatment as the old skin sheds and new skin emerges.",
    metaDescription: "Learn the essential facts about chemical peels before your treatment, including preparation, aftercare, and what results to expect.",
    author: "Dr. Emily Chen",
    publishDate: "2023-09-02",
    status: "Published",
    featuredImage: "/images/placeholder.jpg"
  }
]

// Categories for the blog post
const categories = [
  'Facial Treatments',
  'Specialized Services',
  'Skincare Tips',
  'Anti-Aging',
  'Body Care',
  'Beauty News'
]

export default function EditBlogPostPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const postId = params.id
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<{
    title: string
    slug: string
    category: string
    featuredImage: File | null
    featuredImagePreview: string
    content: string
    metaDescription: string
    publishDate: string
    status: string
  }>({
    title: '',
    slug: '',
    category: 'Treatments',
    featuredImage: null,
    featuredImagePreview: '',
    content: '',
    metaDescription: '',
    publishDate: new Date().toISOString().split('T')[0],
    status: 'Draft'
  })

  // Fetch blog post data
  useEffect(() => {
    // Simulate API fetch with mock data
    const fetchPost = () => {
      setIsLoading(true)
      // Find post by id
      const post = mockPosts.find(post => post.id === postId)
      
      if (post) {
        setFormData({
          title: post.title,
          slug: post.slug,
          category: post.category,
          featuredImage: null,
          featuredImagePreview: post.featuredImage,
          content: post.content,
          metaDescription: post.metaDescription || '',
          publishDate: post.publishDate,
          status: post.status,
        })
      } else {
        alert('Post not found')
        router.push('/admin/blog')
      }
      
      setIsLoading(false)
    }
    
    fetchPost()
  }, [postId, router])

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        featuredImage: file,
        featuredImagePreview: URL.createObjectURL(file)
      }))
    }
  }

  // Remove image
  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      featuredImage: null,
      featuredImagePreview: ''
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real application, you would send this data to your API
    console.log('Form submitted with data:', formData)
    alert('Blog post updated successfully!')
    router.push('/admin/blog')
  }
  
  // Handle post deletion
  const handleDelete = () => {
    // In a real application, you would call your API to delete the post
    console.log('Deleting post with id:', postId)
    alert('Blog post deleted successfully!')
    router.push('/admin/blog')
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-[60vh]">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
          
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Blog Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter blog post title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    placeholder="url-slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This will be the URL of your blog post: /blog/{formData.slug}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="write" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                
                <TabsContent value="write" className="space-y-4">
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Write your blog post content here..."
                    className="min-h-[300px]"
                    value={formData.content}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    You can use Markdown syntax for formatting.
                  </p>
                </TabsContent>
                
                <TabsContent value="preview">
                  <div className="min-h-[300px] rounded-md border border-input bg-background p-4">
                    {formData.content ? (
                      <div className="prose max-w-none">
                        {formData.content.split('\n').map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400">No content to preview</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    name="metaDescription"
                    placeholder="Enter meta description for SEO"
                    rows={3}
                    value={formData.metaDescription}
                    onChange={handleChange}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.metaDescription.length}/160 characters recommended
                  </p>
                </div>
              </div>
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
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
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
                  <Label htmlFor="publishDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Publication Date
                  </Label>
                  <Input
                    id="publishDate"
                    name="publishDate"
                    type="date"
                    value={formData.publishDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              {formData.featuredImagePreview ? (
                <div className="relative mb-4">
                  <img
                    src={formData.featuredImagePreview}
                    alt="Featured image preview"
                    className="h-auto w-full rounded-md object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="mb-4 flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 hover:border-gray-400">
                  <label
                    htmlFor="featuredImage"
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
                  >
                    <Image className="mb-2 h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-500">Upload image</span>
                    <input
                      id="featuredImage"
                      name="featuredImage"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
              <p className="text-xs text-gray-500">
                Recommended size: 1200 × 630 pixels (16:9)
              </p>
            </CardContent>
          </Card>
        </div>
      </form>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this blog post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post and remove it from the website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 