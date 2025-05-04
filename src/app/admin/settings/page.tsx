"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings</p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="w-full max-w-md grid grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your basic site configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="Aura Beauty" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-url">Site URL</Label>
                <Input id="site-url" defaultValue="https://aurabeauty.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" defaultValue="info@aurabeauty.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <Input id="contact-phone" defaultValue="+1 (555) 123-4567" />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="maintenance-mode" />
                  <Label htmlFor="maintenance-mode" className="text-sm">Enable maintenance mode</Label>
                </div>
              </div>
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure email and push notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for bookings
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive SMS alerts for urgent notifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive promotional emails for new services
                  </p>
                </div>
                <Switch />
              </div>
              
              <Button className="mt-4">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure technical settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API Status</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                    Connected
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" defaultValue="sk_live_12345678901234567890" type="password" />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="debug-mode">Debug Mode</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="debug-mode" />
                  <Label htmlFor="debug-mode" className="text-sm">Enable debug logging</Label>
                </div>
              </div>
              
              <Button className="mt-4">Save Advanced Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 