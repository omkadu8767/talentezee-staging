"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Shield, Trash2, Download, Globe } from "lucide-react"
import { useToast } from "@/components/toast"

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    campaignUpdates: true,
    raffleNotifications: true,
    twoFactorAuth: false,
    profileVisibility: "public",
    dataSharing: false,
  })
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const storedUser = localStorage.getItem("talentezee_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    toast({
      title: "Setting updated",
      description: "Your preference has been saved.",
      variant: "success",
    })
  }

  const handleExportData = () => {
    // Mock data export
    const userData = {
      profile: user,
      settings: settings,
      exportDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(userData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "talentezee-data.json"
    link.click()

    toast({
      title: "Data exported",
      description: "Your data has been downloaded successfully.",
      variant: "success",
    })
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      localStorage.removeItem("talentezee_user")
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
        variant: "destructive",
      })
      window.location.href = "/"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign up first</h1>
        <Button asChild>
          <a href="/signup">Sign Up</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-4">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and privacy settings</p>
      </div>

      {/* Notifications */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Choose how you want to be notified about updates and activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Receive emails about new features and promotions</p>
            </div>
            <Switch
              checked={settings.marketingEmails}
              onCheckedChange={(checked) => handleSettingChange("marketingEmails", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Campaign Updates</Label>
              <p className="text-sm text-muted-foreground">Get notified about new campaigns and opportunities</p>
            </div>
            <Switch
              checked={settings.campaignUpdates}
              onCheckedChange={(checked) => handleSettingChange("campaignUpdates", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Raffle Notifications</Label>
              <p className="text-sm text-muted-foreground">Be notified about raffle draws and results</p>
            </div>
            <Switch
              checked={settings.raffleNotifications}
              onCheckedChange={(checked) => handleSettingChange("raffleNotifications", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Privacy
          </CardTitle>
          <CardDescription>Manage your account security and privacy preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Coming Soon</Badge>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                disabled
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">Control who can see your profile information</p>
            </div>
            <Badge variant="secondary">Public</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Data Sharing</Label>
              <p className="text-sm text-muted-foreground">Allow anonymous usage data to improve our services</p>
            </div>
            <Switch
              checked={settings.dataSharing}
              onCheckedChange={(checked) => handleSettingChange("dataSharing", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Management */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Account Management
          </CardTitle>
          <CardDescription>Manage your account data and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Export Your Data</Label>
              <p className="text-sm text-muted-foreground">Download a copy of all your account data</p>
            </div>
            <Button onClick={handleExportData} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-red-600">Delete Account</Label>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
            </div>
            <Button onClick={handleDeleteAccount} variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Connected Accounts
          </CardTitle>
          <CardDescription>Manage your connected social media accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">IG</span>
              </div>
              <div>
                <p className="font-medium">Instagram</p>
                <p className="text-sm text-muted-foreground">{user.socialHandles?.instagram || "Not connected"}</p>
              </div>
            </div>
            <Badge variant={user.socialHandles?.instagram ? "default" : "secondary"}>
              {user.socialHandles?.instagram ? "Connected" : "Not Connected"}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">TT</span>
              </div>
              <div>
                <p className="font-medium">TikTok</p>
                <p className="text-sm text-muted-foreground">{user.socialHandles?.tiktok || "Not connected"}</p>
              </div>
            </div>
            <Badge variant={user.socialHandles?.tiktok ? "default" : "secondary"}>
              {user.socialHandles?.tiktok ? "Connected" : "Not Connected"}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">YT</span>
              </div>
              <div>
                <p className="font-medium">YouTube</p>
                <p className="text-sm text-muted-foreground">{user.socialHandles?.youtube || "Not connected"}</p>
              </div>
            </div>
            <Badge variant={user.socialHandles?.youtube ? "default" : "secondary"}>
              {user.socialHandles?.youtube ? "Connected" : "Not Connected"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
