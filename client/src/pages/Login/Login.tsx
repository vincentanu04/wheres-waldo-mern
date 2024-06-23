import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { useAuthContext } from '@/hooks/useAuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(1, {
    message: 'Please enter a username.',
  }),
  password: z.string().min(1, {
    message: 'Please enter a password.',
  }),
});

const Login = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const { dispatch } = useAuthContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: (user: { username: string; password: string }) => {
      return axios.post<{ token: string; username: string }>(
        '/api/account/login',
        user
      );
    },
    onError: (error: AxiosError | Error) => {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setErrorMsg(error.response.data.error);
        } else {
          setErrorMsg('An unexpected error occurred');
          console.log(error);
        }
      }
    },
    onSuccess: (data) => {
      const user = data.data;
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({ type: 'LOGIN', payload: user });
    },
  });

  const onSubmit = async ({
    username,
    password,
  }: z.infer<typeof formSchema>) => {
    loginMutate({ username, password });
  };

  return (
    <div className='py-4 px-4 md:px-20 md:py-8'>
      <h1 className='text-primary-foreground font-bold text-4xl mb-6'>Login</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-3 w-full h-full'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Password</FormLabel>
                <FormControl>
                  <Input {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className='text-sm font-medium text-destructive'>{errorMsg}</p>
          <Button
            variant='secondary'
            type='submit'
            className='w-full'
            disabled={isPending}
          >
            Submit
          </Button>
        </form>
      </Form>
      <p className='text-primary-foreground text-center mt-4 md:text-left text-sm'>
        Don't have an account? Click{' '}
        <Link to='/signup' className='text-blue-300 hover:underline'>
          here
        </Link>{' '}
        to sign up!
      </p>
    </div>
  );
};

export default Login;
