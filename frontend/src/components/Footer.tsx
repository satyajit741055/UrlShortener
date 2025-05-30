// src/components/ui/Footer.tsx

const Footer = () => {
  return (
    <footer className="w-full border-t mt-10 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col md:flex-row items-center justify-between text-gray-600 dark:text-gray-300 text-sm">
        <p className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} Shortify. All rights reserved.</p>
        <div className="flex gap-4">
          <a
            href="https://github.com/yourgithub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a
            href="/privacy"
            className="hover:underline"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="hover:underline"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
