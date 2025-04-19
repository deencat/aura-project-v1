"use client"

import React from 'react'
import Link from 'next/link'
import { 
  Users, 
  Tag, 
  Calendar, 
  BookOpen, 
  Clock, 
  FileEdit,
  ArrowRight,
  Pencil
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'

// Mock data for dashboard statistics
const mockStats = [
  { 
    id: 1, 
    title: 'Total Services', 
    value: '24', 
    icon: <Tag className="h-6 w-6 text-primary" />,
    href: '/admin/services'
  },
  { 
    id: 2, 
    title: 'Team Members', 
    value: '8', 
    icon: <Users className="h-6 w-6 text-primary" />,
    href: '/admin/team'
  },
  { 
    id: 3, 
    title: 'Blog Posts', 
    value: '12', 
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    href: '/admin/blog'
  },
  { 
    id: 4, 
    title: 'Active Promotions', 
    value: '5', 
    icon: <Calendar className="h-6 w-6 text-primary" />,
    href: '/admin/promotions'
  },
]

// Mock data for recent activities
const mockActivities = [
  { 
    id: 1, 
    type: 'edit', 
    item: 'Royal Black Scan', 
    category: 'Service', 
    time: '2 hours ago',
    user: 'Admin'
  },
  { 
    id: 2, 
    type: 'edit', 
    item: 'Peeled Egg Skin', 
    category: 'Service', 
    time: '3 hours ago',
    user: 'Admin'
  },
  { 
    id: 3, 
    type: 'create', 
    item: 'Laser Treatment', 
    category: 'Service', 
    time: '1 day ago',
    user: 'Admin'
  },
  { 
    id: 4, 
    type: 'edit', 
    item: 'Collagen Regeneration', 
    category: 'Service', 
    time: '1 day ago',
    user: 'Admin'
  },
  { 
    id: 5, 
    type: 'create', 
    item: 'Summer Promotion', 
    category: 'Promotion', 
    time: '2 days ago',
    user: 'Admin'
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button className="flex items-center gap-2">
          <FileEdit className="h-4 w-4" />
          Create New Content
        </Button>
      </div>
      
      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat) => (
          <Card key={stat.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
            <CardFooter className="border-t px-4 py-3">
              <Link
                href={stat.href}
                className="flex w-full items-center justify-center text-sm text-primary hover:underline"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Recent Activity */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      {activity.type === 'edit' ? (
                        <Pencil className="h-4 w-4 text-primary" />
                      ) : (
                        <FileEdit className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{activity.item}</p>
                      <p className="text-sm text-gray-500">
                        {activity.category} • {activity.user}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      <Clock className="mr-1 inline h-3 w-3" />
                      {activity.time}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/services/new">
            <Card className="h-full cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Tag className="mb-4 h-8 w-8 text-primary" />
                <h3 className="text-lg font-medium">Add New Service</h3>
                <p className="mt-2 text-center text-sm text-gray-500">
                  Create a new treatment or service with detailed information
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/admin/blog/new">
            <Card className="h-full cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <BookOpen className="mb-4 h-8 w-8 text-primary" />
                <h3 className="text-lg font-medium">Write Blog Post</h3>
                <p className="mt-2 text-center text-sm text-gray-500">
                  Create a new blog post with rich content and images
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/admin/promotions/new">
            <Card className="h-full cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Calendar className="mb-4 h-8 w-8 text-primary" />
                <h3 className="text-lg font-medium">Create Promotion</h3>
                <p className="mt-2 text-center text-sm text-gray-500">
                  Set up a new promotion or special offer
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
} 