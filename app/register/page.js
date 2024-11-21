'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosConfig from '../api/axiosConfig';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().min(6, 'Mot de passe trop court').required('Mot de passe requis'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Les mots de passe doivent correspondre')
    .required('Confirmation du mot de passe requise'),
  firstName: yup.string().required('Prénom requis'),
  lastName: yup.string().required('Nom requis'),
  identifiant: yup.string().required('Identifiant requis'),
  matricule: yup.string().required('Matricule requis'),
});

export default function Register() {
  const router = useRouter();
  const [matricules, setMatricules] = useState([]);
  const [matriculeError, setMatriculeError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Charger les matricules existants depuis l'API
  useEffect(() => {
    const fetchMatricules = async () => {
      try {
        const response = await axiosConfig.get('/matricules'); // Remplacez par votre endpoint d'API pour les matricules
        setMatricules(response.data.member);
      } catch (error) {
        console.error('Erreur lors de la récupération des matricules :', error);
      }
    };

    fetchMatricules();
  }, []);

  const onSubmit = async (data) => {
    // Vérification du matricule
    const matriculeExists = matricules.some((matricule) => matricule.matricule === data.matricule);
    if (!matriculeExists) {
      setMatriculeError('Matricule invalide. Veuillez vérifier et réessayer.');
      return;
    }

    setMatriculeError(''); // Réinitialiser l'erreur si le matricule est valide

    try {
      await axiosConfig.post('/register', data);
      alert('Inscription réussie ! Veuillez vérifier votre email.');
      router.push('/login');
      console.log(data);
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Échec de l'inscription. Vérifiez vos informations.";
      alert(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>
        <div className="mb-4">
          <input {...register('firstName')} placeholder="Prénom" className="input-field" />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
        </div>
        <div className="mb-4">
          <input {...register('lastName')} placeholder="Nom" className="input-field" />
          {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
        </div>
        <div className="mb-4">
          <input {...register('email')} placeholder="Email" type="email" className="input-field" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <input {...register('identifiant')} placeholder="Identifiant" className="input-field" autoComplete="username" />
          {errors.identifiant && <p className="text-red-500 text-xs">{errors.identifiant.message}</p>}
        </div>
        <div className="mb-4">
          <input {...register('matricule')} placeholder="Matricule" className="input-field" />
          {matriculeError && <p className="text-red-500 text-xs">{matriculeError}</p>}
        </div>
        <div className="mb-4">
          <input {...register('password')} placeholder="Mot de passe" type="password" className="input-field" autoComplete="new-password" />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>
        <div className="mb-6">
          <input {...register('confirmPassword')} placeholder="Confirmez le mot de passe" type="password" className="input-field" autoComplete="new-password" />
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="btn-primary">
          Valider
        </button>
      </form>
    </div>
  );
}
