type CardType = {
  shortUrl: string;
  originalUrl: string;
  clicks: number;
};

const Card = ({ shortUrl, originalUrl, clicks }: CardType) => {
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 my-4 transition-colors duration-300">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        <span className="font-bold">Short URL:</span> 
        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline ml-1 truncate block">
          {shortUrl}
        </a>
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 break-words">
        <span className="font-bold">Original URL:</span> {originalUrl}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
        <span className="font-bold">Clicks:</span> {clicks}
      </p>
    </div>
  );
};

export default Card;