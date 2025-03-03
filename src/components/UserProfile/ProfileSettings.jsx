import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertCircle, CreditCard, Moon, Sun } from 'lucide-react';
import { ModeToggle } from '../ModeToggle';

export function ProfileSettings() {
  const [subscriptionStatus, setSubscriptionStatus] = useState('active'); // Options: active, trial, cancelled
  const [notifications, setNotifications] = useState({
    insights: true,
    subscription: true,
    announcements: true,
    promotional: false
  });

  const handleNotificationToggle = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const getSubscriptionBadge = () => {
    switch (subscriptionStatus) {
      case 'active':
        return (
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="font-medium">Active</span>
            <span className="text-sm text-muted-foreground">(Next billing: 04/15/2024)</span>
          </div>
        );
      case 'trial':
        return (
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-500"></span>
            <span className="font-medium">Trial Mode</span>
            <span className="text-sm text-muted-foreground">(14 days left)</span>
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="font-medium">Cancelled</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background text-foreground  max-w-7xl">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how the application looks and feels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="theme-toggle">Theme</Label>
                <div className="text-sm text-muted-foreground">Switch between light and dark mode</div>
              </div>
              <div className="relative">
                <ModeToggle />
                {/* <div className="theme-toggle-track flex h-[38px] w-[74px] cursor-pointer items-center rounded-full bg-muted p-1 transition-colors">
                  <ModeToggle />
                </div> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage your email notification settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <TooltipProvider>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="insights"
                  checked={notifications.insights}
                  onCheckedChange={() => handleNotificationToggle('insights')}
                  className="mt-1 accent-blue-500"
                />
                <div className="grid gap-1.5 leading-none">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="insights"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Interview Insights & AI Reports
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          Receive detailed analysis of your interview performance and AI-generated improvement
                          suggestions.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new interview insights are available.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="subscription"
                  checked={notifications.subscription}
                  onCheckedChange={() => handleNotificationToggle('subscription')}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="subscription"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Subscription Updates
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          Receive notifications about your subscription status, billing, and plan changes.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-muted-foreground">Get notified about billing and subscription changes.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="announcements"
                  checked={notifications.announcements}
                  onCheckedChange={() => handleNotificationToggle('announcements')}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="announcements"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Important Announcements
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          Receive important updates about the platform, new features, and maintenance.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-muted-foreground">Get notified about platform updates and new features.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="promotional"
                  checked={notifications.promotional}
                  onCheckedChange={() => handleNotificationToggle('promotional')}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="promotional"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Promotional Emails
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">Receive special offers, discounts, and promotional content.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-muted-foreground">Get notified about special offers and promotions.</p>
                </div>
              </div>
            </TooltipProvider>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Save Notification Preferences
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Status & Billing</CardTitle>
          <CardDescription>Manage your subscription and billing information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="text-sm font-medium">Current Plan</div>
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">Professional Plan</div>
              {getSubscriptionBadge()}
            </div>
            {subscriptionStatus === 'trial' && (
              <div className="text-sm text-muted-foreground">
                Your trial ends on April 15, 2024. Upgrade to continue accessing premium features.
              </div>
            )}
            {subscriptionStatus === 'cancelled' && (
              <div className="text-sm text-muted-foreground">
                Your subscription has been cancelled. You can reactivate at any time.
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="text-sm font-medium">Payment Method</div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <span>•••• •••• •••• 4242</span>
              <span className="text-sm text-muted-foreground">Expires 12/25</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <Button className="w-full sm:w-auto" variant="outline">
            Update Payment Method
          </Button>
          <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500">
            {subscriptionStatus === 'cancelled' ? 'Reactivate Subscription' : 'Manage Subscription'}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-destructive">Delete Account</h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove all your data
                    from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Yes, delete my account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Final confirmation</AlertDialogTitle>
                        <AlertDialogDescription>
                          Please type "DELETE" to confirm that you want to permanently delete your account.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="py-4">
                        <input className="w-full px-3 py-2 border rounded-md" placeholder="Type DELETE to confirm" />
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-destructive-foreground">
                          Permanently Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
