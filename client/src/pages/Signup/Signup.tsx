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
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(1, {
    message: 'Please enter a username.',
  }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter a password.',
    })
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

const Signup = () => {
  const [errorMsg, setErrorMsg] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async ({
    username,
    password,
  }: z.infer<typeof formSchema>) => {
    try {
      const resp = await axios.post('/api/account/signup', {
        username,
        password,
      });
      console.log(resp);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg('An unexpected error occurred');
        console.log(err);
      }
    }
  };

  return (
    <div className='py-4 px-4 md:px-20 md:py-8'>
      <h1 className='text-primary-foreground font-bold text-4xl mb-6'>
        Signup
      </h1>
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
                  <Input className='w-full' {...field} />
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
          <Button variant='secondary' type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </Form>
      <p className='text-primary-foreground text-center mt-4 md:text-left text-sm'>
        Already have an account? Click{' '}
        <Link to='/login' className='text-blue-300 hover:underline'>
          here
        </Link>{' '}
        to log in!
      </p>
    </div>
  );
};

export default Signup;
