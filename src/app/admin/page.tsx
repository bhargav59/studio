'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';

// In a real application, this would be a secure authentication flow.
// For this demo, we use a simple hardcoded password check.
const ADMIN_PASSWORD = 'password';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      // In a real app, you'd set a secure, http-only cookie or session token.
      // For this demo, we'll use localStorage.
      try {
        localStorage.setItem('isAdmin', 'true');
        router.push('/dashboard');
      } catch (e) {
        setError('Could not set session. Please enable cookies/localStorage.');
      }
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
            <Logo className="w-12 h-12 mb-2" />
          <CardTitle className="font-headline text-2xl">Admin Access</CardTitle>
          <CardDescription>Enter the password to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
            <p className="text-xs text-center text-muted-foreground">
                (Hint: the password is "password")
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
