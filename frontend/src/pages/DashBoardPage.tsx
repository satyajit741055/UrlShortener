import type { RootState } from '@/app/store'
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

interface UrlType {
  _id: string;
  shortId: string;
  originalUrl: string;
  clicks: number;
  createdAt: Date;
}

const DashBoardPage = () => {
  const { isAuthenticated, token, username } = useSelector((state: RootState) => state.auth);
  const urls = useSelector((state: RootState) => state.url.urls)
  const [baseUrl, setBaseUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !token) return;
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, [isAuthenticated, token, navigate]);

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-8 md:p-10 min-h-[70vh] bg-white dark:bg-gray-900 rounded-lg shadow-lg flex flex-col transition-colors duration-300">
      
      {!isAuthenticated ? (
        <div className="flex flex-col items-center justify-center flex-grow gap-6 text-center px-4">
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            🔒 Please log in to view your dashboard
          </p>
          <Button
            onClick={() => navigate('/login')}
            className="px-8 py-3 text-lg font-medium transition-transform active:scale-95 hover:bg-indigo-700"
          >
            Login
          </Button>
        </div>
      ) : (
        <>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-900 dark:text-white tracking-tight relative after:absolute after:left-1/2 after:-bottom-2 after:block after:w-24 after:h-1 after:bg-indigo-500 after:rounded-full after:-translate-x-1/2">
            Welcome back, <span className="text-indigo-600 dark:text-indigo-400">{username || 'User'}</span>
          </h1>

          {urls.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-grow gap-4 text-center px-4">
              <p className="text-lg italic text-gray-500 dark:text-gray-400">
                No URLs found. Start by creating some shortened links!
              </p>
              {/* Optional: Add an empty state SVG illustration or icon here */}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {urls.map((url: UrlType) => (
                <Card
                  key={url._id}
                  shortUrl={`${baseUrl}/${url.shortId}`}
                  originalUrl={url.originalUrl}
                  clicks={url.clicks}
                  createdAt={url.createdAt}
                  shortId={url.shortId}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DashBoardPage;
