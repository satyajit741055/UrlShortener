import { API_BASE_URL_SAFE } from "@/config/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const RedirectPage = () => {
  const { shortId } = useParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const redirect = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL_SAFE}/api/${shortId}`)
        console.log("response from RedirectPage: ",response)
        const redirectURL = response.data.url;
        

        if (redirectURL) {
          window.location.href = redirectURL;
        } else {
          throw new Error("No URL found for this ID");
        }
      } catch (err: any) {
        console.error("Redirection error:", err);
        setError("Failed to redirect. Please check the URL.");
        toast.error("Redirection failed", {
          description: err?.response?.data?.message || "Unknown error occurred",
        });
      }
    };

    redirect();
  }, [shortId]);

  return (
    <div className="text-center mt-20 text-lg text-red-600">
      {error ? error : "Redirecting..."}
    </div>
  );
};

export default RedirectPage;
