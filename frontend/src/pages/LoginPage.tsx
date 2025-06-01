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
import { loginType } from "@/features/auth/schemas/loginSchema";
import { useDispatch } from 'react-redux';
import { login } from "@/features/reduxLogic/authReduxLogic/authSlice";
import { API_BASE_URL_SAFE } from "@/config/api";

const LoginPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  console.log(API_BASE_URL_SAFE)
  const form = useForm<z.infer<typeof loginType>>({
    resolver: zodResolver(loginType),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit = async (data: z.infer<typeof loginType>) => {
    setIsSubmit(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL_SAFE}/api/login`, data);
      toast.success(response.data.message);

      dispatch(login({
        token: response.data.token,
        username: response.data.username
      }));
      navigate('/');
    } catch (error: any) {
      const errorMessage = error.response?.data.message || "Login failed. Try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-900 px-4 transition-colors duration-500">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 p-8 transition-all">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 text-transparent bg-clip-text">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Enter your details to continue
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 text-sm">Email Address</FormLabel>
                  <Input
                    {...field}
                    placeholder="example@domain.com"
                    className="dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 transition"
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
                  <FormLabel className="text-gray-700 dark:text-gray-300 text-sm">Password</FormLabel>
                  <Input
                    type="password"
                    {...field}
                    placeholder="••••••••"
                    className="dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 transition"
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
                  Logging in...
                </>
              ) : (
                'Log In'
              )}
            </Button>
          </form>
        </Form>

        {error && (
          <div className="text-center mt-4">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        <div className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
