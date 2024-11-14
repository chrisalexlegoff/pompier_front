'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosConfig from '../api/axiosConfig';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axiosConfig.post('/register', data);
      alert('Inscription réussie ! Veuillez vous connecter.');
      router.push('/login');
    } catch (error) {
      console.error(error);
      alert("Échec de l'inscription");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Inscription</h2>
        <div className="mb-4">
          <input {...register('email')} placeholder="Email" type="email" className="input-field" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <input {...register('password')} placeholder="Mot de passe" type="password" className="input-field" />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <div className="mb-6">
          <input {...register('confirmPassword')} placeholder="Confirmer le mot de passe" type="password" className="input-field" />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="btn-primary">
          valider
        </button>
      </form>
    </div>
  );
}
