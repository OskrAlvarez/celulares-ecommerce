import { Link } from "react-router-dom";

export function Banner() {
  const currentYear = new Date().getFullYear()
  return (
    <div className="relative bg-gray-900 text-white">
      {/* IMAGEN de FONDO */}
      <div
        className="bg-hero absolute inset-0 opacity-70 h-full"
      />
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black opacity-50" />
      {/* CONTENIDO */}
      <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4 text-center lg:py-40 lg:px-8">
        <h1 className="text-4xl font-bold mb-4 lg:text-6xl">
          Los mejores celulares del {currentYear}
        </h1>

        <p className="text-lg mb-8 lg:text-2xl">
          Descubre las ofertas exclusivas y las últimas novedades en celulares
        </p>

        <Link
          to="/celulares"
          className="bg-gray-900 hover:bg-gray-950 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
        >
          Ver celulares
        </Link>
      </div>
    </div>
  );
}
