'use client';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { handleLogIn } from '../lib/authentication';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

interface SignInForm {
  email: string;
  password: string;
  isPending: boolean;
  error: string;
}

export default function SignIn() {
  const router = useRouter();
  const [formState, setFormState] = useState<SignInForm>({
    email: '',
    password: '',
    isPending: false,
    error: '',
  });

  const signFormSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  });

  const handleLogger = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parseRes = signFormSchema.safeParse({
      email: formState.email,
      password: formState.password,
    });

    if (!parseRes.success) {
      setFormState({
        ...formState,
        error: parseRes.error.errors.map((err) => err.message).join(', '),
      });
      return;
    }

    setFormState((prev) => ({ ...prev, isPending: true }));
    const res = await handleLogIn(formState.email, formState.password);

    if (res) {
      router.push('/');
      setFormState({ email: '', password: '', isPending: false, error: '' });
    } else {
      setFormState((prev) => ({
        ...prev,
        error: 'Your email or password are invalid',
      }));
    }
  };

  return (
    <div className='h-96 w-80 p-5 px-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50	shadow-signModal  rounded-2xl'>
      <h1 className='block w-full text-3xl text-center text-slate-950'>
        Sign in
      </h1>
      <form className='flex flex-col mt-7' onSubmit={handleLogger}>
        <div className='flex flex-col'>
          <label className='mb-2' htmlFor='email'>
            Email:
          </label>
          <input
            id='email'
            type='text'
            value={formState.email}
            placeholder='Email....'
            className='p-2 border border-gray-300 focus:border-amber-700 rounded-lg focus:outline-none'
            disabled={formState.isPending}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className='flex flex-col mt-4'>
          <label className='mb-2' htmlFor='password'>
            Password:
          </label>
          <input
            id='password'
            type='password'
            value={formState.password}
            className='p-2 border border-gray-300 focus:border-amber-700 rounded-lg focus:outline-none'
            placeholder='Password....'
            disabled={formState.isPending}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        {formState.error && <p className='text-red-600	'>{formState.error}</p>}
        <button
          className='w-32 h-9 mt-7 mx-auto px-6 py-2 bg-red-800 text-stone-100 uppercase font-semibold rounded-lg'
          disabled={formState.isPending}
          aria-label='sign in'
        >
          {formState.isPending ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p className='mt-4 text-slate-700	text-sm text-center'>
        If you want do not have account, please
        <Link href={'/signUp'} className='text-red-600 font-semibold ml-1'>
          Sign Up
        </Link>
      </p>
    </div>
  );
}
