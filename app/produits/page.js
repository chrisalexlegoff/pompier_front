'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/loading';
import Image from 'next/image';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        setProducts(response.data.member);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Liste des produits</h1>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {products.map((product, index) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
            {/* Image du produit */}
            <div className="relative w-full h-48">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${product.imageName}`}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-t-lg object-cover"
                priority={index < 10} // Charger en priorité la première image visible
              />
            </div>

            {/* Contenu de la carte */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{product.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">Prix : {product.unitaryPrice} €</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Catégorie : {product.productCat?.replace('/api/product_cats/', '') || 'Non définie'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
