"use client"

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function EditServicePage() {
  const params = useParams()
  const id = params.id
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/services">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Edit Service ID: {id}</h1>
        </div>
      </div>
      
      <div className="p-8 border rounded-md">
        <p>This is a test page for editing a service with ID: {id}</p>
        <p className="mt-4">We will implement the full edit form in a future update.</p>
      </div>
    </div>
  )
} 