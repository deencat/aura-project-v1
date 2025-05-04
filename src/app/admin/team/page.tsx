"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Search, Mail, Phone } from 'lucide-react'
import { Input } from '@/components/ui/input'

// Mock team data
const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Beauty Therapist',
    email: 'sarah.j@aurabeauty.com',
    phone: '+1 (555) 123-4567',
    avatar: '/images/placeholders/site/avatar.jpg',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Skin Specialist',
    email: 'michael.c@aurabeauty.com',
    phone: '+1 (555) 234-5678',
    avatar: '/images/placeholders/site/avatar.jpg',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Body Care Expert',
    email: 'emma.r@aurabeauty.com',
    phone: '+1 (555) 345-6789',
    avatar: '/images/placeholders/site/avatar.jpg',
  },
  {
    id: 4,
    name: 'Olivia Williams',
    role: 'New Doublo Specialist',
    email: 'olivia.w@aurabeauty.com',
    phone: '+1 (555) 456-7890',
    avatar: '/images/placeholders/site/avatar.jpg',
  },
]

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">Manage team members</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Team Member
        </Button>
      </div>
      
      {/* Search and filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Find Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search by name, role, or email..."
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Team Members Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teamMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <div className="aspect-square w-full bg-gray-100">
              <img
                src={member.avatar}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{member.phone}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 