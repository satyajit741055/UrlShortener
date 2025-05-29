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

const LoginPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginType>>({
    resolver: zodResolver(loginType),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit = async (data: z.infer<typeof loginType>) => {
    setIsSubmit(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', data);
      toast('success', {
        description: response.data.message
      });
      console.log(response.data.token)
      localStorage.setItem("token", response.data.token);
      navigate('/homepage');
    } catch (error: any) {
      console.error('Error during Login', error);
      let errorMessage = error.response?.data.message;
      toast('Login failed', {
        description: errorMessage
      });
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Log In</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Log in to get started</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                  <Input {...field} className="dark:bg-gray-700 dark:text-white" />
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
                  <Input type="password" {...field} className="dark:bg-gray-700 dark:text-white" />
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
                'Log In'
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Not a member?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
