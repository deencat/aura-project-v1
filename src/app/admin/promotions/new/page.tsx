"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save } from 'lucide-react'
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

export default function NewPromotionPage() {
  const router = useRouter()
  
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
    customerType: 'all'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generate a unique ID for the new promotion
    const newPromotion = {
      id: Date.now().toString(),
      ...formData,
      usedCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // In a real app, this would be sent to an API
    console.log('Creating new promotion:', newPromotion)
    
    // Show success message and redirect
    alert('Promotion created successfully!')
    router.push('/admin/promotions')
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    setFormData(prev => ({ ...prev, code }))
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
        <h1 className="text-3xl font-bold">Create New Promotion</h1>
        <p className="text-gray-600 mt-2">Set up a new promotional offer or coupon code</p>
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
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
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
                <p className="text-sm text-gray-500 mt-2">
                  {formData.isActive 
                    ? 'This promotion will be available to customers'
                    : 'This promotion will be hidden from customers'
                  }
                </p>
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
                    Create Promotion
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