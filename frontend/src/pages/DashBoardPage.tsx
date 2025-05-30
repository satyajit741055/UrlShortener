import type { RootState } from '@/app/store'
import Card from '@/components/Card';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface UrlType {
  _id: string;
  shortId: string;
  originalUrl: string;
  clicks: number;
  createdAt: Date;
}

const DashBoardPage = () => {
  const { isAuthenticated, token, isAuthChecked } = useSelector((state: RootState) => state.auth);
  const [isSubmit, setIsSubmit] = useState(false);
  const [allUrl, setAllUrl] = useState<UrlType[]>([]);
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthChecked) {
      navigate('/login');
      return;
    };
    if (!isAuthenticated || !token) return;

    const fetchData = async () => {
      try {
        setIsSubmit(true);
        const response = await axios.get('http://localhost:5000/api/me', {
          headers: {
            authorization: `Bearer ${token}`,
          }
        });

        if (!response.data) {
          throw new Error("Error while fetching data");
        }

        setUserName(response.data.data.username);
        setAllUrl(response.data.data.urls);
      }
      catch (error: any) {
        console.error('Error during URL fetching', error);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setIsSubmit(false);
      }
    }

    fetchData();

  }, [isAuthenticated, token, navigate]);

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 flex flex-col min-h-[70vh]">
      {isSubmit ? (
        <div className="flex flex-col items-center justify-center space-y-2 text-gray-600 dark:text-gray-300 mt-20">
          <Loader2 className="animate-spin h-8 w-8" />
          <span className="text-lg font-medium">Loading...</span>
        </div>
      ) : (
        <>
          <h1 className="text-3xl md:text-4xl text-center font-extrabold mb-8 text-gray-800 dark:text-gray-100">
            Hi, {userName || 'User'}
          </h1>
          {allUrl.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400 text-lg mt-8">
              No URLs found.
            </p>
          ) : (
            <div className="space-y-6">
              {allUrl.map((url: UrlType) => (
                <Card
                  key={url._id}
                  shortUrl={`http://localhost:5173/${url.shortId}`}
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
