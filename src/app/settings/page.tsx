
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const [name, setName] = useState('Admin User');
  const [email, setEmail] = useState('admin@cloudengineered.com');
  const [theme, setTheme] = useState('light');

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const handleThemeChange = (isDark: boolean) => {
    const newTheme = isDark ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', isDark);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Settings Saved',
      description: 'Your profile information has been updated.',
    });
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
        <p className="text-muted-foreground">Manage your account, preferences, and site settings.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This is how others will see you on the site.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveChanges} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of the application.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Theme</h3>
              <p className="text-sm text-muted-foreground">Select between light and dark mode.</p>
            </div>
            <div className="flex items-center gap-2">
                <span>Light</span>
                <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={handleThemeChange}
                    aria-label="Toggle theme"
                />
                <span>Dark</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your email notification preferences.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-medium">New Review Alerts</h3>
                    <p className="text-sm text-muted-foreground">Get notified when a new tool review is published.</p>
                </div>
                <Switch defaultChecked />
            </div>
             <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-medium">Weekly Digest</h3>
                    <p className="text-sm text-muted-foreground">Receive a summary of the most popular tools each week.</p>
                </div>
                <Switch />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
