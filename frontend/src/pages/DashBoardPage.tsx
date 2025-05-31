import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { useEffect, useState } from "react";
import Card from "@/components/Card";

const DashboardPage = () => {
  const { isAuthenticated, username, token } = useSelector((state: RootState) => state.auth);
  const urls = useSelector((state: RootState) => state.url.urls);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (!isAuthenticated || !token) return;
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, [isAuthenticated, token]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-900 text-gray-800 dark:text-gray-100 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 text-transparent bg-clip-text mb-4">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {isAuthenticated
              ? `Welcome back, ${username || "User"}! Here's your URL performance overview.`
              : "Please login to manage and track your shortened URLs."}
          </p>
        </header>

        {isAuthenticated ? (
          <section>
            {urls.length > 0 ? (
              <>
                <h2 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-300 mb-6">
                  Your Recent Shortened URLs
                </h2>
                <div className="space-y-6">
                  {urls.map(({ _id, originalUrl, shortId, clicks, createdAt }) => (
                    <Card
                      key={_id}
                      originalUrl={originalUrl}
                      shortUrl={`${baseUrl}/${shortId}`}
                      shortId={shortId}
                      clicks={clicks}
                      createdAt={createdAt}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
                You haven’t shortened any URLs yet. Start by adding one from the homepage.
              </p>
            )}
          </section>
        ) : (
          <div className="text-center mt-24">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              You are not logged in.{" "}
              <a href="/login" className="text-blue-600 underline hover:text-blue-700">
                Log in here
              </a>{" "}
              to view your dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
