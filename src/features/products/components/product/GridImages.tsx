import { useState } from "react";

interface Props {
  images: string[];
}
export function GridImages({ images }: Props) {
  const [currentImage, setCurrentImage] = useState(images[0]);

  const handleCunrrentImage = (image: string) => {
    setCurrentImage(image);
  };
  return (
    <div className="flex-1 flex flex-col gap-3 relative">
      <div className="bg-[#f2f2f2] h-[500px] p-4">
        <img
          src={currentImage}
          alt="Imagen del Producto"
          className="h-full w-full object-contain"
        />

        {/* Miniaturas */}
        <div className="flex mt-4 gap-2">
          {images.map((image, index) => (
            <button
              className={`w-16 h-16 p-1 border ${
                currentImage === image
                  ? "border-indigo-600"
                  : "border-transparent"
              } rounded-lg hover:border-indigo-600 focus:outline-none`}
              key={index}
              onClick={() => handleCunrrentImage(image)}
            >
              <img
                src={image}
                alt={`Thumb-${index + 1}00#`}
                className="w-full h-full object-cover rounded-lg"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
