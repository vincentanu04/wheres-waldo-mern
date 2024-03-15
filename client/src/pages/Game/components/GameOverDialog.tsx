import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

const GameOverDialog = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Dialog defaultOpen onOpenChange={() => navigate('/')}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-2 text-2xl'>Congratulations!</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-white'>Username</FormLabel>
                      <FormControl>
                        <Input placeholder='vincentanu04...' {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your username to be added to the leaderboard.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant='secondary' type='submit'>
                  Submit
                </Button>
              </form>
            </Form>
          </DialogDescription>
          <Dialog></Dialog>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverDialog;
