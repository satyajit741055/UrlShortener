import { userType } from "@/features/auth/schemas/signupSchema";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import axios from 'axios';
import { toast } from "sonner";
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { API_BASE_URL_SAFE } from "@/config/api";

const Signup = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userType>>({
    resolver: zodResolver(userType),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    },
  });

  const onSubmit = async (data: z.infer<typeof userType>) => {
    setIsSubmit(true);
    try {
      const response = await axios.post(`${API_BASE_URL_SAFE}/api/signup`, data);
      toast.success(response.data.message);
      navigate('/homepage');
    } catch (error: any) {
      console.error('Error during Sign-up', error);
      let errorMessage = error.response?.data.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-900 px-4 transition-colors duration-500">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 p-8 transition-all">
        {/* Optional: Add a logo here */}
        {/* <img src="/logo.svg" alt="Logo" className="h-10 mx-auto mb-6" /> */}

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 text-transparent bg-clip-text">
            Sign Up
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Create an account to get started
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(e)}
                    className="dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 transition"
                    placeholder="Your username"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                  <Input
                    {...field}
                    className="dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 transition"
                    placeholder="your@email.com"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Password</FormLabel>
                  <Input
                    type="password"
                    {...field}
                    className="dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 transition"
                    placeholder="Enter a secure password"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
            >
              {isSubmit ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already a member?{' '}
            <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
