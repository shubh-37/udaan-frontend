import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Download, Upload, FileText } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { profileContext } from '@/context/ProfileContextProvider';

export default function ProfileSections() {
  const { getCompanies, profile, updateProfile, updateResume } = useContext(profileContext);

  // For loading the companies list
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const companiesRef = useRef(false);
  const [resumeUrl, setResumeUrl] = useState(profile?.resume_url || '');
  // 1) Initialize state with either context data or fallback
  const [profileData, setProfileData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    mobile_number: profile?.mobile_number || '',
    field: profile?.field || '',
    organization: profile?.organization || '',
    years_of_experience: profile?.years_of_experience || 0,
    job_role: profile?.job_role || ''
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      if (companiesRef.current) return;
      try {
        companiesRef.current = true;
        const response = await getCompanies();
        setCompanies([...response, 'Others']);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (profile) {
      setProfileData((prev) => ({
        ...prev,
        name: profile.name || '',
        email: profile.email || '',
        mobile_number: profile.mobile_number || '',
        field: profile.field || '',
        organization: profile.organization || '',
        years_of_experience: profile.years_of_experience?.toString() || '',
        job_role: profile.job_role || ''
      }));
    }
  }, [profile]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const fileInputRef = useRef(null);

  // Trigger the file input dialog
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    console.log({ file });
    // 1) Check file size (200 KB max)
    if (file.size > 200 * 1024) {
      alert('File size exceeds 200KB. Please choose a smaller file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await updateResume(formData);
      console.log(response);
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Error uploading resume. Please try again.');
    }
  };

  const handleDownload = () => {
    if (!resumeUrl) return;
    window.open(resumeUrl, '_blank');
  };

  // Save profile
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(profileData);
      console.log(response);
    } catch (err) {
      console.error(err);
      alert('An error occurred while updating profile.');
    }
  };

  return (
    <div className="p-6 pt-0 space-y-6 bg-background text-foreground max-w-7xl">
      <Card className="bg-background text-foreground">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSave}>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="name" className="text-sm text-gray-400">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="text-foreground"
                value={profileData.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="email" className="text-sm text-gray-400">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                className="text-foreground"
                value={profileData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="mobile_number" className="text-sm text-gray-400">
                Phone Number
              </Label>
              <Input
                id="mobile_number"
                name="mobile_number"
                type="text"
                placeholder="9484949200"
                className="text-foreground"
                value={profileData.mobile_number}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="field" className="text-sm text-gray-400">
                Field
              </Label>
              <Input
                id="field"
                name="field"
                type="text"
                placeholder="Finance"
                className="text-foreground"
                value={profileData.field}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="organization" className="text-sm text-gray-400">
                Organization
              </label>
              {loading ? (
                <p>Loading companies...</p>
              ) : (
                <select
                  id="organization"
                  name="organization"
                  className="w-full border rounded p-2 text-foreground"
                  value={profileData.organization}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an organization</option>
                  {companies.map((company, index) => (
                    <option key={index} value={company.name || company}>
                      {company.name || company}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="years_of_experience" className="text-sm text-gray-400">
                Years of Experience
              </Label>
              <Input
                id="years_of_experience"
                name="years_of_experience"
                type="number"
                placeholder="8"
                min={0}
                max={50}
                className="text-foreground"
                value={profileData.years_of_experience}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="job_role" className="text-sm text-gray-400">
                Job Role
              </Label>
              <Input
                id="job_role"
                name="job_role"
                type="text"
                placeholder="Senior Software Engineer"
                className="text-foreground"
                value={profileData.job_role}
                onChange={handleChange}
              />
            </div>

            {/* Save button */}
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-background text-foreground">
        <CardHeader>
          <CardTitle>Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
            <div className="flex items-start gap-4">
              <div className="text-gray-300">
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
              <div className="space-y-1">
                {resumeUrl ? (
                  <>
                    <p className="font-semibold">Uploaded Resume</p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold">No resume uploaded</p>
                    <p className="text-xs text-gray-500">Supported formats: PDF, DOCX. Max size 200KB.</p>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 self-end md:self-auto">
              {resumeUrl ? (
                <>
                  <Button variant="outline" className="flex items-center gap-1" onClick={handleDownload}>
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex items-center gap-1" onClick={handleUploadClick}>
                    <Upload className="w-4 h-4" />
                    Re-upload
                  </Button>
                </>
              ) : (
                <Button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700" onClick={handleUploadClick}>
                  <Upload className="w-4 h-4" />
                  Upload Resume
                </Button>
              )}
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
