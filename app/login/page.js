'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosConfig from '../api/axiosConfig';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosConfig.post('/login_check', data); // Remplacez par votre URL d'API
      login(response.data.token);
      alert('Connexion réussie !');
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Échec de la connexion');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Connexion</h2>
        <div className="mb-4">
          <input {...register('username')} placeholder="Nom d'utilisateur" className="input-field" />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>
        <div className="mb-6">
          <input {...register('password')} placeholder="Mot de passe" type="password" className="input-field" />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <button type="submit" className="btn-primary">
          Se connecter
        </button>
      </form>
    </div>
  );
}
