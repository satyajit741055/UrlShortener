import { useSelector } from "react-redux";
import UrlShorten from "@/components/UrlShorten";
import type { RootState } from "@/app/store";

const HomePage = () => {
  const { isAuthenticated, username } = useSelector((state: RootState) => state.auth);

  const recentUrls = [
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 transition-colors duration-500">
      <header className="flex justify-between items-center max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <nav>
          {isAuthenticated ? (
            <span className="font-semibold text-lg">
              Hello, {username || "User"}
            </span>
          ) : (
            <a
              href="/login"
              className="inline-block px-5 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              Login
            </a>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow max-w-3xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
            Shorten Your URLs Instantly
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-xl mx-auto">
            Generate short, manageable URLs and track every click with ease.
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-xl mx-auto">
            <UrlShorten />
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
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
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 flex flex-col items-center transition-transform hover:scale-[1.03]"
              role="region"
              aria-label={title}
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{desc}</p>
            </div>
          ))}
        </section>

        {/* Recent URLs Section */}
        {isAuthenticated ? (
          <section className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Your Recent Shortened URLs</h3>
            {recentUrls.length > 0 ? (
              <div className="space-y-4 overflow-x-auto">
                {recentUrls.map(({ id, originalUrl, shortUrl, clicks }) => (
                  <div
                    key={id}
                    className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-gray-900 rounded-lg shadow-md p-5 transition-shadow hover:shadow-lg"
                  >
                    <a
                      href={originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-blue-600 hover:underline max-w-xs sm:max-w-md"
                      title={originalUrl}
                      aria-label={`Original URL: ${originalUrl}`}
                    >
                      {originalUrl}
                    </a>
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 sm:ml-6 font-medium transition-colors"
                      aria-label={`Shortened URL: ${shortUrl}`}
                    >
                      {shortUrl}
                    </a>
                    <span className="mt-2 sm:mt-0 text-gray-500 dark:text-gray-400 text-sm select-none">
                      {clicks} clicks
                    </span>
                  </div>
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
            <p className="text-gray-700 dark:text-gray-300">
              Please{" "}
              <a href="/login" className="text-blue-600 underline hover:text-blue-700">
                login
              </a>{" "}
              to see your recent URLs.
            </p>
          </section>
        )}
      </main>
    </div>
  );
};

export default HomePage;
