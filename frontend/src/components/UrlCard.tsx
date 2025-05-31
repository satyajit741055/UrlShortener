import React, { useState } from "react";
import { BarChart3, ClipboardCopy, Check } from "lucide-react";

type Props = {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
};

const UrlCard: React.FC<Props> = ({ originalUrl, shortUrl, clicks }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="rounded-2xl border border-indigo-100 dark:border-indigo-800 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-900 shadow-md p-6 transition-all hover:shadow-lg space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div className="flex flex-col space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">Original URL:</p>
          <a
            href={originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-300 hover:underline break-words"
          >
            {originalUrl}
          </a>
        </div>

        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-2 sm:mt-0">
          <BarChart3 className="w-4 h-4 mr-1 text-indigo-500 dark:text-indigo-300" />
          {clicks} clicks
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <p className="text-sm text-gray-500 dark:text-gray-400">Short URL:</p>
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline break-all"
        >
          {shortUrl}
        </a>
        <button
          onClick={handleCopy}
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          title="Copy short URL"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <ClipboardCopy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default UrlCard;
