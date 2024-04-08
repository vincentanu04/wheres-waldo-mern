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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className='py-4 px-4 md:px-20 md:py-8'>
      <h1 className='text-primary-foreground font-bold text-4xl mb-6'>Login</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6 w-full h-full'
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
          <Button variant='secondary' type='submit' className='w-full'>
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
