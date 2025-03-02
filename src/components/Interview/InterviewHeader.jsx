import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Video } from 'lucide-react';
import { useState } from 'react';

export function Header({ onEndInterview }) {
  const [imageLink, setImageLink] = useState(null);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b justify-between">
      {!imageLink ? (
        <Link className="flex items-center justify-center" to="/">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-br from-blue-600 via-green-600 to-purple-600 text-transparent bg-clip-text">
            PrepSOM
          </span>
        </Link>
      ) : (
        <img src={imageLink} alt="" height={40} width={80} className="bg-background" />
      )}
      <div className="flex items-center gap-4">
        <Button variant="destructive" size="sm" onClick={onEndInterview}>
          End Session
        </Button>
      </div>
    </header>
  );
}
