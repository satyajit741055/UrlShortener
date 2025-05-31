const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto py-6 px-6 flex flex-col md:flex-row items-center justify-between text-gray-700 dark:text-gray-300 text-sm gap-4 md:gap-0">
        <p className="mb-2 md:mb-0 select-none">
          &copy; {new Date().getFullYear()} UrlShortener. All rights reserved.
        </p>
        <div className="flex gap-6 flex-wrap justify-center md:justify-start">
          <p className="mb-2 md:mb-0 select-none">
            Built with ❤️ by{" "}
            <a
              href="https://github.com/satyajit741055"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              Satyajit Khot
            </a>
          </p>
          <a
            href="/privacy"
            className="hover:underline focus:outline-none focus:ring-1 focus:ring-blue-600 rounded transition"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="hover:underline focus:outline-none focus:ring-1 focus:ring-blue-600 rounded transition"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
