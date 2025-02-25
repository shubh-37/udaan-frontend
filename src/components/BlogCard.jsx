import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tag } from "lucide-react"
import { useNavigate } from "react-router-dom";

export default function BlogCard({ blog }) {

    const navigate = useNavigate();

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div>
          <p className="text-gray-500 mb-4 line-clamp-3">{blog.introduction}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag, index) => (
              <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                <Tag size={12} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-4">{new Date(blog.datePublished).toLocaleDateString()}</p>
          <Button onClick={() => navigate(`/blogs/${blog.id}`)} className="w-full bg-blue-600">
            Read More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

