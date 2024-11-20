export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="relative">
        {/* Casque de pompier */}
        <div className="absolute w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
        {/* Tuyau tournant */}
        <div className="w-24 h-24 border-t-4 border-yellow-500 border-l-4 border-red-500 rounded-full animate-spin"></div>
        {/* Texte de chargement */}
        <p className="mt-4 text-center text-gray-700 dark:text-gray-200 text-xl font-bold">Chargement...</p>
      </div>
    </div>
  );
}
