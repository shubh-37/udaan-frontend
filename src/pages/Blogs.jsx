import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BlogCard from '@/components/BlogCard';
import { Video } from 'lucide-react';
import { blogs } from '../blogs';

export default function Blogs() {
  const [displayedBlogs, setDisplayedBlogs] = useState(blogs.slice(0, 6));

  const loadMore = () => {
    setDisplayedBlogs(blogs.slice(0, displayedBlogs.length + 3));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b justify-between">
        <Link className="flex items-center justify-center" to="/">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-br from-blue-600 via-green-600 to-purple-600 text-transparent bg-clip-text">
            PrepSOM
          </span>
        </Link>
        <Link to="/" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          ← Back to Home
        </Link>
      </header>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container px-4 md:px-6 max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Interview Preparation Insights
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Expert tips and guides to help you ace your next interview
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
          {displayedBlogs.length < blogs.length && (
            <div className="mt-12 text-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                onClick={loadMore}
              >
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
