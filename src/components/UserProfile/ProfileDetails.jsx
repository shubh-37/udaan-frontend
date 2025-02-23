"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Briefcase, GraduationCap, Award, Globe, Plus, Trash2 } from "lucide-react"

export default function ProfileDetails() {
  const [workExperiences, setWorkExperiences] = useState([
    {
      id: 1,
      company: "Tech Innovations Inc.",
      role: "Senior Software Engineer",
      duration: "2020 - Present",
      skills: "React, Node.js, AWS, TypeScript",
    },
    {
      id: 2,
      company: "Digital Solutions Ltd.",
      role: "Software Developer",
      duration: "2018 - 2020",
      skills: "JavaScript, React, MongoDB",
    },
  ])

  const [educations, setEducations] = useState([
    {
      id: 1,
      degree: "Master of Computer Science",
      institution: "Tech University",
      year: "2018",
    },
    {
      id: 2,
      degree: "Bachelor of Computer Science",
      institution: "State University",
      year: "2016",
    },
  ])

  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2021",
    },
    {
      id: 2,
      name: "Certified Scrum Master",
      issuer: "Scrum Alliance",
      year: "2020",
    },
  ])

  const [socialLinks, setSocialLinks] = useState({
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    portfolio: "https://johndoe.dev",
  })

  const addWorkExperience = () => {
    const newId = workExperiences.length > 0 ? Math.max(...workExperiences.map((exp) => exp.id)) + 1 : 1

    setWorkExperiences([
      ...workExperiences,
      {
        id: newId,
        company: "",
        role: "",
        duration: "",
        skills: "",
      },
    ])
  }

  const addEducation = () => {
    const newId = educations.length > 0 ? Math.max(...educations.map((edu) => edu.id)) + 1 : 1

    setEducations([
      ...educations,
      {
        id: newId,
        degree: "",
        institution: "",
        year: "",
      },
    ])
  }

  const addCertification = () => {
    const newId = certifications.length > 0 ? Math.max(...certifications.map((cert) => cert.id)) + 1 : 1

    setCertifications([
      ...certifications,
      {
        id: newId,
        name: "",
        issuer: "",
        year: "",
      },
    ])
  }

  const removeWorkExperience = (id) => {
    setWorkExperiences(workExperiences.filter((exp) => exp.id !== id))
  }

  const removeEducation = (id) => {
    setEducations(educations.filter((edu) => edu.id !== id))
  }

  const removeCertification = (id) => {
    setCertifications(certifications.filter((cert) => cert.id !== id))
  }

  const updateWorkExperience = (id, field, value) => {
    setWorkExperiences(workExperiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const updateEducation = (id, field, value) => {
    setEducations(educations.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const updateCertification = (id, field, value) => {
    setCertifications(certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)))
  }

  const updateSocialLink = (field, value) => {
    setSocialLinks({
      ...socialLinks,
      [field]: value,
    })
  }

  return (
    <div className="p-6 space-y-6 bg-background text-foreground  max-w-7xl">
      <Accordion type="single" collapsible className="w-full" defaultValue="work">
        <AccordionItem value="work">
          <AccordionTrigger className="text-lg font-medium">
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Work Experience
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                {workExperiences.map((experience, index) => (
                  <div key={experience.id} className="space-y-4">
                    {index > 0 && <Separator className="my-6" />}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${experience.id}`}>Company</Label>
                        <Input
                          id={`company-${experience.id}`}
                          value={experience.company}
                          onChange={(e) => updateWorkExperience(experience.id, "company", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`role-${experience.id}`}>Role</Label>
                        <Input
                          id={`role-${experience.id}`}
                          value={experience.role}
                          onChange={(e) => updateWorkExperience(experience.id, "role", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`duration-${experience.id}`}>Duration</Label>
                        <Input
                          id={`duration-${experience.id}`}
                          value={experience.duration}
                          onChange={(e) => updateWorkExperience(experience.id, "duration", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`skills-${experience.id}`}>Skills Used</Label>
                        <Input
                          id={`skills-${experience.id}`}
                          value={experience.skills}
                          onChange={(e) => updateWorkExperience(experience.id, "skills", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="destructive" size="sm" onClick={() => removeWorkExperience(experience.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="mt-6">
                  <Button variant="outline" onClick={addWorkExperience}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Work Experience
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger className="text-lg font-medium">
            <div className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Education
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                {educations.map((education, index) => (
                  <div key={education.id} className="space-y-4">
                    {index > 0 && <Separator className="my-6" />}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                        <Input
                          id={`degree-${education.id}`}
                          value={education.degree}
                          onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${education.id}`}>Institution</Label>
                        <Input
                          id={`institution-${education.id}`}
                          value={education.institution}
                          onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`year-${education.id}`}>Year</Label>
                        <Input
                          id={`year-${education.id}`}
                          value={education.year}
                          onChange={(e) => updateEducation(education.id, "year", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="destructive" size="sm" onClick={() => removeEducation(education.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="mt-6">
                  <Button variant="outline" onClick={addEducation}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="certifications">
          <AccordionTrigger className="text-lg font-medium">
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Certifications & Achievements
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                {certifications.map((certification, index) => (
                  <div key={certification.id} className="space-y-4">
                    {index > 0 && <Separator className="my-6" />}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${certification.id}`}>Name</Label>
                        <Input
                          id={`name-${certification.id}`}
                          value={certification.name}
                          onChange={(e) => updateCertification(certification.id, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`issuer-${certification.id}`}>Issuer</Label>
                        <Input
                          id={`issuer-${certification.id}`}
                          value={certification.issuer}
                          onChange={(e) => updateCertification(certification.id, "issuer", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`cert-year-${certification.id}`}>Year</Label>
                        <Input
                          id={`cert-year-${certification.id}`}
                          value={certification.year}
                          onChange={(e) => updateCertification(certification.id, "year", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="destructive" size="sm" onClick={() => removeCertification(certification.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="mt-6">
                  <Button variant="outline" onClick={addCertification}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Certification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="social">
          <AccordionTrigger className="text-lg font-medium">
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Social Links
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="flex items-center">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        value={socialLinks.linkedin}
                        onChange={(e) => updateSocialLink("linkedin", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github" className="flex items-center">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </Label>
                      <Input
                        id="github"
                        value={socialLinks.github}
                        onChange={(e) => updateSocialLink("github", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio" className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Portfolio
                      </Label>
                      <Input
                        id="portfolio"
                        value={socialLinks.portfolio}
                        onChange={(e) => updateSocialLink("portfolio", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-500">Save All Changes</Button>
      </div>
    </div>
  )
}