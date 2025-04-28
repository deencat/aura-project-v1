"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Button 
} from '@/components/ui/button'
import { 
  Card, 
  CardContent 
} from '@/components/ui/card'
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Upload, 
  Search, 
  Grid, 
  List, 
  Plus, 
  Folder, 
  Image as ImageIcon, 
  MoreVertical, 
  Trash, 
  Edit, 
  Copy, 
  Filter
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"

// Define types
interface ImageFile {
  id: number;
  name: string;
  url: string;
  size: string;
  dimensions: string;
  type: string;
  category: string;
  uploadedAt: string;
}

// Mock image data
const mockImages: ImageFile[] = [
  {
    id: 1,
    name: "hero-background.jpg",
    url: "/images/placeholders/new-doublo-hero-1.jpg",
    size: "234 KB",
    dimensions: "1920 × 1080",
    type: "image/jpeg",
    category: "Backgrounds",
    uploadedAt: "2023-10-15"
  },
  {
    id: 2,
    name: "facial-treatment.jpg",
    url: "/images/placeholders/treatment-1.jpg",
    size: "156 KB",
    dimensions: "800 × 600",
    type: "image/jpeg",
    category: "Treatments",
    uploadedAt: "2023-10-17"
  },
  {
    id: 3,
    name: "neck-rejuvenation.jpg",
    url: "/images/placeholders/new-doublo-neck-1.jpg",
    size: "189 KB",
    dimensions: "800 × 1067",
    type: "image/jpeg",
    category: "Treatments",
    uploadedAt: "2023-10-18"
  },
  {
    id: 4,
    name: "doublo-device.jpg",
    url: "/images/placeholders/new-doublo-device-1.jpg",
    size: "312 KB",
    dimensions: "1200 × 800",
    type: "image/jpeg",
    category: "Equipment",
    uploadedAt: "2023-10-20"
  },
  {
    id: 5,
    name: "skincare-product.jpg",
    url: "/images/placeholders/image.jpg",
    size: "178 KB",
    dimensions: "1000 × 1000",
    type: "image/jpeg",
    category: "Products",
    uploadedAt: "2023-10-21"
  },
  {
    id: 6,
    name: "tech-pattern.jpg",
    url: "/images/placeholders/tech-pattern-new.jpg",
    size: "267 KB",
    dimensions: "1500 × 1000",
    type: "image/jpeg",
    category: "Backgrounds",
    uploadedAt: "2023-10-22"
  }
];

// Categories
const categories = ["All", "Backgrounds", "Treatments", "Equipment", "Products", "People"];

export default function ImagesPage() {
  const [images, setImages] = useState<ImageFile[]>(mockImages);
  const [filteredImages, setFilteredImages] = useState<ImageFile[]>(mockImages);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newImageData, setNewImageData] = useState({
    name: '',
    category: 'Backgrounds'
  });

  // Filter images based on search term and category
  useEffect(() => {
    let results = images;
    
    if (searchTerm) {
      results = results.filter(image => 
        image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory && selectedCategory !== "All") {
      results = results.filter(image => image.category === selectedCategory);
    }
    
    setFilteredImages(results);
  }, [searchTerm, selectedCategory, images]);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newImages: ImageFile[] = Array.from(files).map((file, index) => ({
              id: images.length + index + 1,
              name: file.name,
              url: URL.createObjectURL(file),
              size: `${Math.round(file.size / 1024)} KB`,
              dimensions: "1200 × 800", // Placeholder
              type: file.type,
              category: newImageData.category,
              uploadedAt: new Date().toISOString().split('T')[0]
            }));
            
            setImages(prev => [...prev, ...newImages]);
            setUploading(false);
            setUploadProgress(0);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Handle image delete
  const handleDeleteImage = (id: number) => {
    setImages(images.filter(image => image.id !== id));
  };

  // Handle edit image
  const handleEditImage = (image: ImageFile) => {
    setSelectedImage(image);
    setNewImageData({
      name: image.name,
      category: image.category
    });
    setIsEditDialogOpen(true);
  };

  // Save edited image
  const saveEditedImage = () => {
    if (!selectedImage) return;
    
    setImages(images.map(img => 
      img.id === selectedImage.id 
        ? { ...img, name: newImageData.name, category: newImageData.category } 
        : img
    ));
    
    setIsEditDialogOpen(false);
    setSelectedImage(null);
  };

  // Copy image URL to clipboard
  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Image Library</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Images
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Images</DialogTitle>
              <DialogDescription>
                Upload new images to your library. You can upload multiple files at once.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={newImageData.category} 
                  onValueChange={(value) => setNewImageData({...newImageData, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== "All").map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="files">Images</Label>
                <div 
                  className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center hover:bg-gray-100"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="mx-auto h-10 w-10 text-gray-400" />
                  <div className="mt-2 flex text-sm text-gray-600">
                    <Label htmlFor="file-upload" className="relative cursor-pointer text-blue-600 hover:underline">
                      <span>Upload a file</span>
                    </Label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              {uploading && (
                <div className="w-full mb-4">
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div 
                      className="h-2 rounded-full bg-primary transition-all" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
              <Button type="submit" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Success Message */}
      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <AlertDescription>Images uploaded successfully!</AlertDescription>
        </Alert>
      )}
      
      {/* Filters and Search */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex rounded-md border">
            <Button 
              variant={viewMode === 'grid' ? "default" : "ghost"} 
              size="sm" 
              className="rounded-l-md rounded-r-none"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? "default" : "ghost"} 
              size="sm" 
              className="rounded-l-none rounded-r-md"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Image Gallery */}
      <div className="space-y-6">
        {filteredImages.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No images found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedCategory !== "All" 
                ? "Try adjusting your search or filter criteria"
                : "Get started by uploading your first image"}
            </p>
            <div className="mt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Upload Images
                  </Button>
                </DialogTrigger>
                <DialogContent>{/* Upload dialog content */}</DialogContent>
              </Dialog>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image 
                    src={image.url} 
                    alt={image.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors hover:bg-black/20">
                    <div className="absolute right-2 top-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>{image.name}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditImage(image)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => copyImageUrl(image.url)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteImage(image.id)}
                            className="text-red-600"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="truncate text-sm font-medium">{image.name}</div>
                  <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                    <span>{image.category}</span>
                    <span>{image.size}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // List View
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Image</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Size</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Dimensions</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Upload Date</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredImages.map((image) => (
                  <tr key={image.id} className="border-b">
                    <td className="px-4 py-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded">
                        <Image 
                          src={image.url} 
                          alt={image.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{image.name}</td>
                    <td className="px-4 py-3 text-sm">{image.category}</td>
                    <td className="px-4 py-3 text-sm">{image.size}</td>
                    <td className="px-4 py-3 text-sm">{image.dimensions}</td>
                    <td className="px-4 py-3 text-sm">{image.uploadedAt}</td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditImage(image)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => copyImageUrl(image.url)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteImage(image.id)}
                            className="text-red-600"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Image Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>
              Update the details of your image
            </DialogDescription>
          </DialogHeader>
          
          {selectedImage && (
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <div className="relative h-40 w-40 overflow-hidden rounded-md">
                  <Image 
                    src={selectedImage.url} 
                    alt={selectedImage.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image-name">Image Name</Label>
                <Input
                  id="image-name"
                  value={newImageData.name}
                  onChange={(e) => setNewImageData({...newImageData, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image-category">Category</Label>
                <Select 
                  value={newImageData.category} 
                  onValueChange={(value) => setNewImageData({...newImageData, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== "All").map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Size:</span>
                  <span>{selectedImage.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Dimensions:</span>
                  <span>{selectedImage.dimensions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Uploaded:</span>
                  <span>{selectedImage.uploadedAt}</span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveEditedImage}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 