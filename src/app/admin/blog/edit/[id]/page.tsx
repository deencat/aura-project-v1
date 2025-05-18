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
import { BlogMultilingualData } from '@/utils/blogUtils'

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
    featuredImage: "/images/placeholder.jpg",
    multilingual: {
      english: {
        title: "The Benefits of Regular Facials",
        content: "Regular facials can significantly improve your skin's health and appearance. They help to deeply cleanse pores, exfoliate dead skin cells, and hydrate the skin.\n\nBeyond the physical benefits, facials also provide a relaxing experience that can reduce stress and promote mental wellbeing. The massage techniques used during a facial can improve blood circulation and lymphatic drainage.\n\nFor optimal results, it's recommended to get a facial every 4-6 weeks, as this aligns with your skin's natural cell turnover cycle.",
        metaDescription: "Discover how regular facial treatments can improve skin health, reduce signs of aging, and provide relaxation benefits for overall wellbeing."
      },
      traditional_chinese: {
        title: "定期面部護理的好處",
        content: "定期進行面部護理可以顯著改善皮膚健康和外觀。它們有助於深層清潔毛孔，去除死皮細胞，並為皮膚補充水分。\n\n除了身體上的好處外，面部護理還提供了一種放鬆的體驗，可以減輕壓力並促進心理健康。面部護理中使用的按摩技術可以改善血液循環和淋巴引流。\n\n為了獲得最佳效果，建議每4-6週進行一次面部護理，因為這與皮膚的自然細胞更新週期一致。",
        metaDescription: "了解定期面部護理如何改善皮膚健康，減少衰老跡象，並為整體健康提供放鬆益處。"
      },
      simplified_chinese: {
        title: "定期面部护理的好处",
        content: "定期进行面部护理可以显著改善皮肤健康和外观。它们有助于深层清洁毛孔，去除死皮细胞，并为皮肤补充水分。\n\n除了身体上的好处外，面部护理还提供了一种放松的体验，可以减轻压力并促进心理健康。面部护理中使用的按摩技术可以改善血液循环和淋巴引流。\n\n为了获得最佳效果，建议每4-6周进行一次面部护理，因为这与皮肤的自然细胞更新周期一致。",
        metaDescription: "了解定期面部护理如何改善皮肤健康，减少衰老迹象，并为整体健康提供放松益处。"
      }
    }
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
  const { id } = useParams()
  const postId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id)
  
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('english')
  
  // Form data state
  const [formData, setFormData] = useState({
    id: 0,
    title: '',
    slug: '',
    category: '',
    content: '',
    metaDescription: '',
    author: '',
    publishDate: '',
    status: 'Draft',
    featuredImage: '',
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
  
  // Fetch post data
  useEffect(() => {
    // Simulate API call to fetch post data
    const fetchPost = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch from your API
        const post = mockPosts.find(post => post.id === postId)
        
        if (post) {
          // Initialize multilingual data if it doesn't exist
          const multilingual: BlogMultilingualData = post.multilingual || {
            english: {
              title: post.title || '',
              content: post.content || '',
              metaDescription: post.metaDescription || ''
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
          
          setFormData({
            ...post,
            multilingual
          })
        } else {
          // Handle post not found
          console.error('Post not found')
          router.push('/admin/blog')
        }
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPost()
  }, [postId, router])
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Handle multilingual content changes
  const handleMultilingualChange = (e, language) => {
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
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simulate API call to update post
    console.log('Updating post with data:', formData)
    
    // In a real app, you would send this data to your API
    alert('Blog post updated successfully (mock)')
  }
  
  // Handle post deletion
  const handleDelete = () => {
    // Simulate API call to delete post
    console.log('Deleting post with ID:', postId)
    
    // In a real app, you would send a delete request to your API
    setDeleteDialogOpen(false)
    router.push('/admin/blog')
  }
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg font-medium text-gray-600">Loading post data...</div>
      </div>
    )
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
          <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
            Delete
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
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
          
          {/* Multilingual Content Tabs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Blog Content</CardTitle>
            </CardHeader>
            <CardContent>
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
                      onChange={(e) => handleMultilingualChange(e, 'english')}
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
                
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    placeholder="Author name"
                    value={formData.author}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.featuredImage && (
                  <div className="relative rounded-md overflow-hidden">
                    <img
                      src={formData.featuredImage}
                      alt="Featured image"
                      className="w-full h-auto object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData({ ...formData, featuredImage: '' })}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                <div>
                  <Label htmlFor="featuredImage">Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="featuredImage"
                      name="featuredImage"
                      placeholder="https://example.com/image.jpg"
                      value={formData.featuredImage}
                      onChange={handleChange}
                    />
                    <Button variant="outline" className="flex-shrink-0">
                      <Image className="h-4 w-4 mr-2" />
                      Browse
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 