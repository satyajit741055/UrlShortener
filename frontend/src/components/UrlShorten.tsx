import { urlSchema } from "@/features/urlShortener/schemas/urlSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "./ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL_SAFE } from "@/config/api";

const UrlShorten = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [shortUrl, setShortUrl] = useState('');
    const navigate = useNavigate()
    const [baseUrl, setBaseUrl] = useState("");

    const { isAuthenticated, token, isAuthChecked } = useSelector((state: RootState) => state.auth);
    console.log({ token: token, username: '' })



    const form = useForm<z.infer<typeof urlSchema>>({
        resolver: zodResolver(urlSchema),
        defaultValues: {
            url: ''
        }
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            setBaseUrl(window.location.origin);
        }
    })

    const onSubmit = async (data: z.infer<typeof urlSchema>) => {
        setIsSubmit(true);
        if (!isAuthChecked) return;
        if (!isAuthenticated || !token) {
            navigate("/login");
            return;
        }
        try {
            const response = await axios.post(`${API_BASE_URL_SAFE}/api/short/`, data,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(response.data.message);
            const generatedUrl = `${baseUrl}` + response.data.shortId;

            setShortUrl(generatedUrl);

        } catch (error: any) {
            console.error('Error during URL shortening', error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setIsSubmit(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                Quick URL Shortener
            </h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        name="url"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300">Enter Long URL</FormLabel>
                                <Input
                                    {...field}
                                    placeholder="https://example.com/very/long/url"
                                    className="dark:bg-gray-700 dark:text-white"
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSubmit} className="w-full">
                        {isSubmit ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            "Create Short URL"
                        )}
                    </Button>
                </form>
            </Form>

            {shortUrl && (
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your Short URL:</p>
                    <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 underline break-all"
                    >
                        {shortUrl}
                    </a>
                </div>
            )}
        </div>
    );
};

export default UrlShorten;
