import { useDispatch, useSelector } from "react-redux";
import UrlShorten from "@/components/UrlShorten";
import type { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import UrlCard from "@/components/UrlCard";

const HomePage = () => {
  const { isAuthenticated, username, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const urls = useSelector((state: RootState) => state.url.urls);
  const [baseUrl, setBaseUrl] = useState("");

  const DummyData = [
    {
      id: "abc123",
      originalUrl: "https://www.example.com/very/long/url",
      shortUrl: "https://sho.rt/abc123",
      clicks: 15,
    },
    {
      id: "xyz789",
      originalUrl: "https://openai.com/blog/chatgpt",
      shortUrl: "https://sho.rt/xyz789",
      clicks: 42,
    },
  ];

  useEffect(() => {
    if (!isAuthenticated || !token) return;
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, [isAuthenticated, token, dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-indigo-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-900 text-gray-800 dark:text-gray-100 transition-colors duration-500">
      <header className="flex justify-between items-center max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <nav>
          {isAuthenticated && (
            <span className="font-semibold text-lg">Hello, {username || "User"}</span>
          )}
        </nav>
      </header>

      <main className="flex-grow max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 text-transparent bg-clip-text">
            Shorten Your URLs Instantly
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-xl mx-auto">
            Generate short, manageable URLs and track every click with ease.
          </p>

          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl p-8 max-w-xl mx-auto">
            <UrlShorten />
          </div>
        </section>

        <section className="mb-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Easy Shortening",
              desc: "Paste your long URL and get a short link in seconds.",
              icon: "🔗",
            },
            {
              title: "Real-time Analytics",
              desc: "Track clicks, countries, and browsers in a beautiful dashboard.",
              icon: "📊",
            },
            {
              title: "Secure & Private",
              desc: "Your data is safe with end-to-end encryption and no tracking ads.",
              icon: "🔒",
            },
          ].map(({ title, desc, icon }) => (
            <div
              key={title}
              className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900 rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform hover:scale-105 border border-indigo-100 dark:border-indigo-700/30"
              role="region"
              aria-label={title}
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{desc}</p>
            </div>
          ))}
        </section>

        {isAuthenticated ? (
          <section className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-300">Your Recent Shortened URLs</h3>
            {urls.length > 0 ? (
              <div className="space-y-4 overflow-x-auto">
                {urls.map(({ _id, originalUrl, shortId, clicks }) => (
                  <UrlCard
                    key={_id}
                    originalUrl={originalUrl}
                    shortUrl={`${baseUrl}/${shortId}`}
                    clicks={clicks}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center">
                You have not shortened any URLs yet.
              </p>
            )}
          </section>
        ) : (
          <section className="text-center mt-16 max-w-lg mx-auto">
            <p>You are Seeing Dummy Data</p>
            {DummyData.length > 0 ? (
              <div className="space-y-4 overflow-x-auto">
                {DummyData.map(({ id, originalUrl, shortUrl, clicks }) => (
                  <UrlCard
                    key={id}
                    originalUrl={originalUrl}
                    shortUrl={shortUrl}
                    clicks={clicks}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center">
                You have not shortened any URLs yet.
              </p>
            )}
            <p className="text-gray-700 dark:text-gray-300 mt-6">
              Please <a href="/login" className="text-blue-600 underline hover:text-blue-700">login</a> to see your recent URLs.
            </p>
          </section>
        )}
      </main>
    </div>
  );
};

export default HomePage;