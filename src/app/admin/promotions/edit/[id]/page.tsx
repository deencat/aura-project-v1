"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function EditPromotionPage() {
  const router = useRouter()
  const params = useParams()
  const promotionId = params.id as string

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    type: 'percentage',
    value: 0,
    minimumSpend: 0,
    usageLimit: 1,
    startDate: '',
    endDate: '',
    isActive: true,
    applyToServices: [],
    customerType: 'all',
    usedCount: 0
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading promotion data
    // In a real app, this would fetch from an API
    const mockPromotion = {
      id: promotionId,
      title: 'New Client Special',
      description: 'Get 20% off your first treatment',
      code: 'WELCOME20',
      type: 'percentage',
      value: 20,
      minimumSpend: 100,
      usageLimit: 100,
      startDate: '2024-01-01T00:00',
      endDate: '2024-12-31T23:59',
      isActive: true,
      applyToServices: [],
      customerType: 'new',
      usedCount: 15
    }

    setFormData(mockPromotion)
    setLoading(false)
  }, [promotionId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const updatedPromotion = {
      ...formData,
      updatedAt: new Date().toISOString()
    }

    // In a real app, this would be sent to an API
    console.log('Updating promotion:', updatedPromotion)
    
    // Show success message and redirect
    alert('Promotion updated successfully!')
    router.push('/admin/promotions')
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDelete = () => {
    // In a real app, this would call a delete API
    console.log('Deleting promotion:', promotionId)
    alert('Promotion deleted successfully!')
    router.push('/admin/promotions')
  }

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    setFormData(prev => ({ ...prev, code }))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-6">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/admin/promotions">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Promotions
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Edit Promotion</h1>
            <p className="text-gray-600 mt-2">Modify promotional offer settings</p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Promotion</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this promotion? This action cannot be undone.
                  {formData.usedCount > 0 && (
                    <span className="text-orange-600 font-medium">
                      <br />Warning: This promotion has been used {formData.usedCount} times.
                    </span>
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                  Delete Promotion
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Promotion Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="New Client Special 20% Off"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the promotion details and terms..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="code">Coupon Code *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => handleInputChange('code', e.target.value)}
                      placeholder="SAVE20"
                      required
                    />
                    <Button type="button" variant="outline" onClick={generateCode}>
                      Generate
                    </Button>
                  </div>
                  {formData.usedCount > 0 && (
                    <p className="text-sm text-orange-600 mt-1">
                      ⚠️ This code has been used {formData.usedCount} times. Changing it may affect existing customers.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Discount Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Discount Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Discount Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage (%)</SelectItem>
                        <SelectItem value="fixed_amount">Fixed Amount ($)</SelectItem>
                        <SelectItem value="free_service">Free Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="value">
                      {formData.type === 'percentage' ? 'Percentage (%)' : 
                       formData.type === 'fixed_amount' ? 'Amount ($)' : 'Value'}
                    </Label>
                    <Input
                      id="value"
                      type="number"
                      value={formData.value}
                      onChange={(e) => handleInputChange('value', Number(e.target.value))}
                      placeholder={formData.type === 'percentage' ? '20' : '50'}
                      min="0"
                      max={formData.type === 'percentage' ? '100' : undefined}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minimumSpend">Minimum Spend ($)</Label>
                    <Input
                      id="minimumSpend"
                      type="number"
                      value={formData.minimumSpend}
                      onChange={(e) => handleInputChange('minimumSpend', Number(e.target.value))}
                      placeholder="100"
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="usageLimit">Usage Limit</Label>
                    <Input
                      id="usageLimit"
                      type="number"
                      value={formData.usageLimit}
                      onChange={(e) => handleInputChange('usageLimit', Number(e.target.value))}
                      placeholder="100"
                      min="1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Validity & Conditions */}
            <Card>
              <CardHeader>
                <CardTitle>Validity & Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="customerType">Customer Type</Label>
                  <Select value={formData.customerType} onValueChange={(value) => handleInputChange('customerType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="new">New Customers Only</SelectItem>
                      <SelectItem value="existing">Existing Customers Only</SelectItem>
                      <SelectItem value="vip">VIP Members Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Status & Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                  />
                  <Label htmlFor="isActive">
                    {formData.isActive ? 'Active' : 'Inactive'}
                  </Label>
                </div>
                <p className="text-sm text-gray-500">
                  {formData.isActive 
                    ? 'This promotion is available to customers'
                    : 'This promotion is hidden from customers'
                  }
                </p>

                <div className="pt-4 border-t">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Times Used:</span>
                      <Badge variant="secondary">{formData.usedCount}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Usage Limit:</span>
                      <span>{formData.usageLimit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Remaining:</span>
                      <span className={formData.usageLimit - formData.usedCount <= 0 ? 'text-red-600' : 'text-green-600'}>
                        {Math.max(0, formData.usageLimit - formData.usedCount)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border">
                  <div className="font-bold text-lg mb-2">
                    {formData.title || 'Promotion Title'}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    {formData.description || 'Promotion description will appear here...'}
                  </div>
                  <div className="bg-white px-3 py-2 rounded font-mono text-center border-2 border-dashed border-primary/30">
                    {formData.code || 'COUPON_CODE'}
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-center">
                    {formData.type === 'percentage' && formData.value > 0 && `${formData.value}% OFF`}
                    {formData.type === 'fixed_amount' && formData.value > 0 && `$${formData.value} OFF`}
                    {formData.minimumSpend > 0 && ` • Min. spend $${formData.minimumSpend}`}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button type="submit" className="w-full" size="lg">
                    <Save className="h-4 w-4 mr-2" />
                    Update Promotion
                  </Button>
                  <Link href="/admin/promotions">
                    <Button variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
} 