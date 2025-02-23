'use client';

import { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';
import { profileContext } from '@/context/ProfileContextProvider';

export function ProfileOverview() {
  const [isEditing, setIsEditing] = useState(false);
  const { profile, updateAboutUser, profileCompletion } = useContext(profileContext);
  const [aboutMe, setAboutMe] = useState(profile.aboutMe ?? 'Enter about yourself.');

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  const handleSave = async () => {
    setIsEditing(false);
    try {
      await updateAboutUser(aboutMe);
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };

  function getInitials(name) {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }

  const initials = getInitials(profile.name);

  return (
    <div className="p-6 space-y-6 bg-background text-foreground  max-w-7xl">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 inline-flex">
                <Upload className="h-4 w-4 mr-2" />
                Upload Resume
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{profile.email}</p>
                <p className="text-gray-500 dark:text-gray-400">
                  {profile.country_code}-{profile.mobile_number}
                </p>
                <div className="mt-2 inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {profile.years_of_experience} years of experience
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">About Me</h3>
                  <Button variant="ghost" size="sm" onClick={handleEditToggle} className="text-primary">
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
                {isEditing ? (
                  <div className="space-y-2">
                    <Textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} className="min-h-[100px]" />
                    <Button onClick={handleSave} size="sm">
                      Save
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">{aboutMe}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <span className="text-sm font-medium">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
