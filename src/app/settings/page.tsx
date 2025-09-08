import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <Settings className="w-16 h-16 mb-4 text-muted-foreground" />
      <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
      <p className="text-muted-foreground mt-2">Manage your account, preferences, and subscriptions.</p>
      <p className="text-sm text-muted-foreground mt-1">This page is under construction.</p>
    </div>
  );
}
