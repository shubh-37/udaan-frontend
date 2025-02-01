import { useParams, Link, useNavigate } from "react-router-dom"
import { blogs } from "../blogs"
import { Video, Clock, Calendar, User, ArrowLeft, CheckCircle, XCircle, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const BlogPost = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const blogData = blogs.find((blog) => blog.id === id)

  if (!blogData) {
    return <div>Blog post not found</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b justify-between">
        <Link className="flex items-center justify-center" to="/">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-br from-blue-600 via-green-600 to-purple-600 text-transparent bg-clip-text">
            PrepSOM
          </span>
        </Link>
        <Link to="/blogs" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to Blogs
        </Link>
      </header>

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {new Date(blogData.datePublished).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} />5 min read
            </span>
            <span className="flex items-center gap-1">
              <User size={16} />
              {blogData.author}
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">{blogData.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{blogData.introduction}</p>
          <div className="flex gap-2">
            {blogData.tags.map((tag, index) => (
              <span key={index} className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        {blogData.sections.map((section, index) => (
          <section key={index} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{section.title}</h2>
            {section.content && <p className="text-gray-600 mb-6">{section.content}</p>}

            {section.bulletPoints && (
              <ul className="space-y-3 mb-6">
                {section.bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.steps && (
              <div className="space-y-8">
                {section.steps.map((step, i) => (
                  <Card key={i} className="border-l-4 border-l-blue-600">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                      <ul className="space-y-3 mb-4">
                        {step.details.map((detail, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      {step.example && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-blue-800 italic">"{step.example}"</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {section.examples && (
              <div className="grid gap-6">
                {section.examples.map((example, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-3">{example.role}</h3>
                      <p className="text-gray-700">{example.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {section.mistakes && (
              <ul className="space-y-3">
                {section.mistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{mistake}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.tips && (
              <div className="space-y-3">
                {section.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
                {section.proTip && (
                  <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                    <p className="text-yellow-800 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Pro Tip: {section.proTip}
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>
        ))}

        {/* Conclusion */}
        <div className="border-t pt-8 mt-12">
          <p className="text-lg text-gray-700 mb-6">{blogData.conclusion}</p>
          <div className="bg-blue-600 text-white p-6 rounded-lg">
            <p className="text-lg font-semibold mb-4">{blogData.callToAction}</p>
            <Button onClick={() => navigate("/interview")} variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Try Mock Interview
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BlogPost

