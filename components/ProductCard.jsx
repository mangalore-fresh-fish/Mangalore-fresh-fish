"use client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  // calculate the average rating of the product
  const rating = Math.round(
    product.rating.reduce((acc, curr) => acc + curr.rating, 0) /
      product.rating.length
  );

  return (
    <Link href={`/product/${product.id}`} className="group max-xl:mx-auto">
      <div className="bg-white w-full h-48 sm:w-60 sm:h-64 rounded-lg border border-gray-300 p-3 flex items-center justify-center overflow-hidden">
        <Image
          width={500}
          height={500}
          className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
          src={product.images[0]}
          alt=""
        />
      </div>

      <div className="flex justify-between gap-3 text-sm text-slate-800 pt-2">
        <div>
          <p>{product.name}</p>
          <div className="flex">
            {Array(5)
              .fill("")
              .map((_, index) => (
                <StarIcon
                  key={index}
                  size={14}
                  className="text-transparent mt-0.5"
                  fill={rating >= index + 1 ? "#FBBF24" : "#D1D5DB"}
                />
              ))}
          </div>
        </div>
        <p className="font-medium">
          {currency}
          {product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
