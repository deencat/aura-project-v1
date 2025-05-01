"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Tag, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  Globe,
  Ticket,
  Image
} from 'lucide-react'
import { initializeServiceStorage } from '@/utils/serviceStorage'

interface SidebarLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
}

const SidebarLink = ({ href, icon, label, isActive }: SidebarLinkProps) => (
  <Link 
    href={href}
    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all ${
      isActive 
        ? 'bg-primary text-white' 
        : 'text-gray-700 hover:bg-primary/10'
    }`}
  >
    <span className="flex h-5 w-5 items-center justify-center">
      {icon}
    </span>
    <span>{label}</span>
  </Link>
)

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Initialize service storage for admin area
  useEffect(() => {
    const services = initializeServiceStorage();
    console.log('Admin service storage initialized:', services.length, 'services found');
  }, []);

  const navItems = [
    { href: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { href: '/admin/services', icon: <Tag size={18} />, label: 'Services' },
    { href: '/admin/blog', icon: <BookOpen size={18} />, label: 'Blog' },
    { href: '/admin/team', icon: <Users size={18} />, label: 'Team' },
    { href: '/admin/testimonials', icon: <MessageSquare size={18} />, label: 'Testimonials' },
    { href: '/admin/pages', icon: <FileText size={18} />, label: 'Pages' },
    { href: '/admin/promotions', icon: <Ticket size={18} />, label: 'Promotions' },
    { href: '/admin/languages', icon: <Globe size={18} />, label: 'Languages' },
    { href: '/admin/settings', icon: <Settings size={18} />, label: 'Settings' },
    { href: '/admin/images', icon: <Image size={18} />, label: 'Images' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold">Aura</span>
              <span className="rounded-md bg-primary px-2 py-1 text-xs font-medium text-white">
                Admin
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-sm text-gray-700 hover:text-primary"
            >
              View Site
            </Link>
            <div className="h-8 w-8 rounded-full bg-gray-200">
              {/* User avatar placeholder */}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-white">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <SidebarLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  isActive={pathname === item.href}
                />
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 