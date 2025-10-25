"use client";

import { addToCart } from "@/lib/features/cart/cartSlice";
// 1. Import 'ourSpecsData' from assets
import { ourSpecsData } from "@/assets/assets";
import {
  StarIcon,
  TagIcon,
  AnchorIcon,
  LeafIcon,
  TruckIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ product }) => {
  const productId = product.id;
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₹";

  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const router = useRouter();

  const [mainImage, setMainImage] = useState(product.images[0]);

  const addToCartHandler = () => {
    dispatch(addToCart({ productId }));
  };

  const averageRating =
    product.rating.length > 0
      ? product.rating.reduce((acc, item) => acc + item.rating, 0) /
        product.rating.length
      : 0;

  return (
    <>
      {/* UPDATED: Changed 'max-lg:flex-col' to 'md:flex-row' and base 'flex-col' */}
      <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
        
        {/* Image Gallery */}
        {/* UPDATED: Changed 'lg:w-1/2' to 'md:w-1/2' and added 'w-full' */}
        <div className="w-full md:w-1/2">
          <div className="bg-[#F5F5F5] rounded-lg flex items-center justify-center h-80 sm:h-96 md:h-[500px] overflow-hidden">
            <Image
              width={500}
              height={500}
              className="w-auto h-full object-contain"
              src={mainImage}
              alt={product.name}
            />
          </div>
          {/* UPDATED: Thumbnail strip
            - Added 'overflow-x-auto' to make it scrollable on mobile
            - Added 'flex-nowrap' to prevent wrapping
            - Added 'no-scrollbar' utility class (make sure this is in your globals.css)
          */}
          <div className="flex gap-4 mt-6 overflow-x-auto flex-nowrap no-scrollbar">
            {product.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setMainImage(image)}
                // UPDATED: Added 'flex-shrink-0' to prevent images from shrinking
                className={`bg-[#F5F5F5] rounded-md flex items-center justify-center size-20 sm:size-24 flex-shrink-0 overflow-hidden cursor-pointer ${
                  mainImage === image ? "border-2 border-green-600" : ""
                }`}
              >
                <Image
                  width={100}
                  height={100}
                  className="w-auto h-full object-contain"
                  src={image}
                  alt={`thumbnail ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        {/* UPDATED: Changed 'lg:w-1/2' to 'md:w-1/2' and added 'w-full' */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-800">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 my-4">
            <div className="flex">
              {Array(5)
                .fill("")
                .map((_, index) => (
                  <StarIcon
                    key={index}
                    size={18}
                    className="text-transparent mt-0.5"
                    fill={averageRating >= index + 1 ? "#FBBF24" : "#D1D5DB"}
                  />
                ))}
            </div>
            <p className="text-sm text-slate-500">
              ({product.rating.length} Reviews)
            </p>
          </div>

          <p className="text-gray-600 text-sm max-w-lg">
            {product.description.substring(0, 150)}...
          </p>

          <div className="flex items-center gap-3 my-5">
            <TagIcon size={20} className="text-green-600" />
            <p className="font-medium text-green-600">
              Special price valid today!
            </p>
          </div>

          {/* UPDATED: Made price responsive */}
          <p className="text-3xl sm:text-4xl font-semibold text-slate-800">
            {currency}
            {product.price}
          </p>

          <hr className="my-6" />

          {/* UPDATED: Made controls wrap on small screens */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <Counter productId={productId} />
            <button
              onClick={addToCartHandler}
              // UPDATED: Made button full-width on mobile, 'sm:w-80' on desktop
              className="w-full sm:w-80 px-6 py-3.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* 3. "Our Specs" section - This is already responsive, no changes needed */}
      <div className="my-16 md:my-24">
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 text-center mb-8 sm:mb-12">
          Why Choose Us
        </h2>
        {/* This grid is already responsive: 1 col -> 2 cols -> 4 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ourSpecsData.map((spec, index) => {
            const Icon =
              {
                Anchor: AnchorIcon,
                Leaf: LeafIcon,
                Truck: TruckIcon,
              }[spec.icon] || AnchorIcon; // Default icon

            const colors = [
              { bg: "bg-blue-100", text: "text-blue-600" },
              { bg: "bg-green-100", text: "text-green-600" },
              { bg: "bg-cyan-100", text: "text-cyan-600" },
              { bg: "bg-yellow-100", text: "text-yellow-600" }, // Added a color
            ];
            const color = colors[index % colors.length];

            return (
              <div
                key={spec.title}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`flex items-center justify-center w-16 h-16 rounded-full ${color.bg} mx-auto mb-4`}
                >
                  <Icon className={`w-7 h-7 ${color.text}`} />
                </div>
                <h3 className="text-lg text-center font-semibold text-slate-900 mb-2">
                  {spec.title}
                </h3>
                <p className="text-sm text-slate-600 text-center">
                  {spec.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;