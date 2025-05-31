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

const LoginPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

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
      const response = await axios.post('http://localhost:5000/api/login', data);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 transition-all duration-300">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Welcome Back</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Enter your details to continue</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 dark:text-gray-300">Email Address</FormLabel>
                  <Input
                    {...field}
                    placeholder="example@domain.com"
                    className="dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
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
                  <FormLabel className="text-sm text-gray-700 dark:text-gray-300">Password</FormLabel>
                  <Input
                    type="password"
                    {...field}
                    placeholder="••••••••"
                    className="dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmit} className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
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
          <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
