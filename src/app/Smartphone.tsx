import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LuMinus, LuPlus } from "react-icons/lu";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsChatLeftText } from "react-icons/bs";

import type { VariantProduct } from "@/common/interfaces";
import { formatPrice } from "@/common/helpers";

import { Loader, Separator, Tag } from "@/components";

import {
  GridImages,
  ProductDescription,
  useProduct,
} from "@/features/products";
import { useCartStore, useCounterStore } from "@/features/cart";
import toast from "react-hot-toast";


interface Acc {
  [key: string]: {
    name: string;
    storages: string[];
  };
}

export function Smartphone() {
  const { slug } = useParams<{ slug: string }>();
  const [currentSlug, setCurrentSlug] = useState(slug)
  const { product, isLoading, isError } = useProduct(currentSlug || "");

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<VariantProduct | null>(
    null
  );
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);

  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  const addItem = useCartStore(state => state.addItem)

  const navigate = useNavigate()

  // Agrupamos las variantes por color
  const colors = useMemo(() => {
    return (
      product?.variants.reduce((acc: Acc, variant: VariantProduct) => {
        const { color, color_name, storage } = variant;
        if (!acc[color]) {
          acc[color] = {
            name: color_name,
            storages: [],
          };
        }

        if (!acc[color].storages.includes(storage)) {
          acc[color].storages.push(storage);
        }

        return acc;
      }, {} as Acc) || {}
    );
  }, [product?.variants]);

  // Obtener el primer color disponible, si no se ha seleccionado ninguno
  const availableColors = Object.keys(colors);
  useEffect(() => {
    if (!selectedColor && availableColors.length > 0) {
      setSelectedColor(availableColors[0]);
    }
  }, [availableColors, selectedColor]);

  // Actualizar almacenamiento seleccionado cuando el color cambia
  useEffect(() => {
    if (selectedColor && colors[selectedColor] && !selectedStorage) {
      setSelectedStorage(colors[selectedColor].storages[0]);
    }
  }, [selectedColor, colors, selectedStorage]);

  // Obtener la variante seleccionada
  useEffect(() => {
    if (selectedColor && selectedStorage) {
      const variant = product?.variants.find(
        (variant) =>
          variant.color === selectedColor && variant.storage === selectedStorage
      );

      setSelectedVariant(variant as VariantProduct);
    }
  }, [selectedColor, selectedStorage, product?.variants]);

  // Funcion para añadir al carrito
  const addToCart = () => {
    if (selectedVariant) {
      addItem({
        variantId: selectedVariant.id,
        productId: product?.id || '',
        name: product?.name || '',
        image: product?.images[0] || '',
        color: selectedVariant.color_name,
        storage: selectedVariant.storage,
        price: selectedVariant.price,
        quantity: count
      })

      toast.success('Producto Añadido al Carrito', {
        position: 'bottom-right'
      })
    }
  }
  // Funcion para comprar ahora
  const buyNow = () => {
    if (selectedVariant) {
      addItem({
        variantId: selectedVariant.id,
        productId: product?.id || '',
        name: product?.name || '',
        image: product?.images[0] || '',
        color: selectedVariant.color_name,
        storage: selectedVariant.storage,
        price: selectedVariant.price,
        quantity: count
      })
      navigate('/checkout')
    }
  }

  // Reset del slug actual cuando cambia en la url
  useEffect(() =>{
    setCurrentSlug(slug)

    // Reset de color, variant, storage
    setSelectedVariant(null)
    setSelectedColor(null)
    setSelectedStorage(null)
  }, [slug])
  // Obtener el Stock
  const isOutOfStock = selectedVariant?.stock === 0;

  if (!product || isLoading) return <Loader />;

  if (!product || isError)
    return (
      <div className="h-96 flex items-center justify-center">
        <span className="text-sm text-gray-500">Producto no encontrado</span>
      </div>
    );

  return (
    <>
      <div className="h-fit flex flex-col md:flex-row gap-16 mt-8">
        {/* Grid Images */}
        <GridImages images={product.images} />

        <div className="flex-1 space-y-5">
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <div className="flex gap-5 items-center">
            <span className="tracking-wide text-lg font-semibold">
              {formatPrice(selectedVariant?.price || product.variants[0].price)}
            </span>
            <div className="relative">
              {/* Tag -> Agotado */}
              {isOutOfStock && <Tag contentTag="Agotado" />}
            </div>
          </div>
          <Separator />
          {/* Caracteristicas */}
          <ul className="space-y-2 ml-7 my-16">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="text-sm flex items-center gap-2 font-medium tracking-tight"
              >
                <span className="bg-black w-[5px] h-[5px] rounded-full" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3">
            <p>Color: {selectedColor && colors[selectedColor].name}</p>
            <div className="flex gap-3">
              {availableColors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                    selectedColor === color ? "border border-slate-800" : ""
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  <span
                    className="w-[26px] h-[26px] rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Opciones de Almacenamiento */}
          <div className="flex flex-col gap-3">
            <p className="text-xs">Almacenamiento Disponible</p>
            {selectedColor && (
              <div className="flex gap-3">
                <select
                  className="border border-gray-300 rounded-lg px-3 py-1"
                  value={selectedStorage || ""}
                  onChange={(e) => setSelectedStorage(e.target.value)}
                >
                  {colors[selectedColor].storages.map((storage) => (
                    <option key={storage} value={storage}>
                      {storage}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {/* Comprar */}
          {isOutOfStock ? (
            <button
              className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2] w-full"
              disabled
            >
              Agotado
            </button>
          ) : (
            <>
              {/* Contador */}
              <div className="space-y-3">
                <p className="text-sm font-medium">Cantidad:</p>
                <div className="flex gap-8 px-5 py-3 border border-slate-200 w-fit rounded-full">
                  <button
                    onClick={decrement}
                    disabled={count === 1}
                  >
                    <LuMinus size={15} />
                  </button>
                  <span className="text-slate-500 text-sm">{count}</span>
                  <button onClick={increment}>
                    <LuPlus size={15} />
                  </button>
                </div>
              </div>
              {/* Botones Accion */}
              <div className="flex flex-col gap-3">
                <button onClick={addToCart} className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2] w-full">
                  Agregar a Carrito
                </button>
                <button onClick={buyNow} className="bg-indigo-600 text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full">
                  Comprar Ahora
                </button>
              </div>
            </>
          )}

          <div className="flex pt-2">
            <div className="flex flex-col gap-1 flex-1 items-center">
              <CiDeliveryTruck size={35} />
              <p className="text-xs font-semibold">Envío gratis</p>
            </div>
            <Link
              to="#"
              className="flex flex-col gap-1 flex-1 items-center justify-center"
            >
              <BsChatLeftText size={30} />
              <p className="flex flex-col items-center text-xs">
                <span className="font-semibold">¿Necesitas ayuda?</span>
                Contáctanos aquí
              </p>
            </Link>
          </div>
        </div>
      </div>
      <ProductDescription content={product.description} />
    </>
  );
}
