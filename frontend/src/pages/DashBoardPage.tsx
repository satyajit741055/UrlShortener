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
}

const DashBoardPage = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const token = useSelector((state: RootState) => state.auth.token)
    const [isSubmit, setIsSubmit] = useState(false)
    const [allUrl, setAllUrl] = useState<UrlType[]>([])
    const [userName, setUserName] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

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
        <div className="max-w-3xl mx-auto p-4">
            {isSubmit ? (
                <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
                    <Loader2 className="animate-spin h-6 w-6" />
                    <span>Loading...</span>
                </div>
            ) : (
                <>
                    <h1 className="text-xl text-center font-semibold mb-4 text-gray-800 dark:text-gray-100">Hi, {userName}</h1>
                    {allUrl.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-400">No URLs found.</p>
                    ) : (
                        allUrl.map((url: UrlType) => (
                            <Card
                                key={url._id}
                                shortUrl={`http://localhost:5173/${url.shortId}`}
                                originalUrl={url.originalUrl}
                                clicks={url.clicks}
                            />
                        ))
                    )}
                </>
            )}
        </div>
    )
}

export default DashBoardPage;
