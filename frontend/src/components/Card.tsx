import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ChartNoAxesCombined } from "lucide-react";

type CardType = {
  shortId?: string,
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  createdAt?: Date;
};

const Card = ({ shortUrl, originalUrl, clicks, createdAt, shortId }: CardType) => {
  const navigate = useNavigate();

  const redirectAnalytics = (shortId: any) => {
    navigate('/analytics/' + shortId);
  }

  return (
    <div className="max-w-md md:max-w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 my-4 transition-transform transform hover:scale-[1.02] duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-6">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <span className="font-bold">Short URL:</span>{" "}
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline truncate block"
              title={shortUrl}
            >
              {shortUrl}
            </a>
          </p>
          <p
            className="text-sm text-gray-600 dark:text-gray-400 break-words"
            title={originalUrl}
          >
            <span className="font-bold">Original URL:</span> {originalUrl}
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end space-y-2 text-gray-600 dark:text-gray-400 min-w-[120px]">
          <p className="text-sm">
            <span className="font-bold text-gray-700 dark:text-gray-300">Clicks:</span> {clicks}
          </p>
          {createdAt && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-bold">Created:</span> {new Date(createdAt).toLocaleDateString()}
            </p>
          )}
          {shortId && (
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-700 transition"
              onClick={() => redirectAnalytics(shortId)}
              aria-label="View Analytics"
              title="View Analytics"
            >
              <ChartNoAxesCombined className="h-5 w-5" />
              Analytics
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
