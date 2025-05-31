import React, { useState } from "react";
import { MousePointerClick, ClipboardCopy, Check } from "lucide-react";

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
    <div className="bg-gray-800 text-white rounded-xl p-4 shadow-sm space-y-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-400">Original URL:</p>
          <a
            href={originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline break-all"
          >
            {originalUrl}
          </a>
        </div>
        <div className="flex items-center text-sm text-gray-400 mt-2 sm:mt-0">
          <MousePointerClick className="w-4 h-4 mr-1" />
          {clicks} clicks
        </div>
      </div>


      <div className="flex items-center space-x-2">
        <p className="text-sm text-gray-400">Short URL:</p>
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 hover:underline break-all"
        >
          {shortUrl}
        </a>
        <button
          onClick={handleCopy}
          className="text-gray-300 hover:text-white"
          title="Copy short URL"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <ClipboardCopy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default UrlCard;
