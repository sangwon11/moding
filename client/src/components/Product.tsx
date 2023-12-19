import React from "react";

interface ProductProps {
  id: number;
  url: string;
  alt: string;
  description: string; // 상품 설명
  manufacturer: string; // 제조사
}

function Product({ id, url, alt, description, manufacturer }: ProductProps) {
  return (
    <div key={id} className="w-1/3 px-2 mb-4 ">
      <div className="w-160 h-64 overflow-hidden rounded-lg bg-gray-200">
        <img
          src={url}
          alt={alt}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="text-sm mt-3">
        <p className="text-white text-lg font-semibold mb-3">{description}</p>{" "}
        <p className="text-gray-500 text-sm">{manufacturer}</p>{" "}
      </div>
    </div>
  );
}

export default Product;
