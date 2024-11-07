'use client';
import Link from 'next/link';
import { useState } from 'react';

interface SignInForm {
  email: string;
  password: string;
}

export default function SignIn() {
  const [formState, setFormState] = useState<SignInForm>({
    email: '',
    password: '',
  });

  return (
    <div className='h-96 w-80 p-5 px-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-50 rounded-2xl'>
      <h1 className='block w-full text-3xl text-center text-slate-950'>
        Sign in
      </h1>
      <form className='flex flex-col mt-7'>
        <div className='flex flex-col'>
          <label className='mb-2' htmlFor='email'>
            Email:
          </label>
          <input
            id='email'
            type='text'
            value={formState.email}
            placeholder='Email....'
            className='p-2 border focus:border-amber-700 rounded-lg'
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
            className='p-2 border focus:border-amber-700 rounded-lg'
            placeholder='Password....'
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <button
          className='w-32 h-9 mt-7 mx-auto px-6 py-2 bg-red-800 text-stone-100 uppercase font-semibold rounded-lg	'
          aria-label='sign in'
        >
          Sign In
        </button>
      </form>
      <p className='mt-4 text-slate-700	text-sm text-center'>
        If you want do not have account, please{' '}
        <Link href={'/signUp'} className='text-red-600 font-semibold'>
          Sign Up
        </Link>
      </p>
    </div>
  );
}
