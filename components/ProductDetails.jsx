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
    // 1. Wrap everything in a React Fragment
    <>
      <div className="flex max-lg:flex-col gap-12">
        <div className="flex max-sm:flex-col-reverse gap-3">
          <div className="flex sm:flex-col gap-3">
            {product.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setMainImage(product.images[index])}
                className="bg-slate-100 flex items-center justify-center size-26 rounded-lg group cursor-pointer"
              >
                <Image
                  src={image}
                  className="group-hover:scale-103 group-active:scale-95 transition"
                  alt=""
                  width={45}
                  height={45}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center h-100 sm:size-113 bg-slate-100 rounded-lg p-4">
            <Image
              src={mainImage}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-slate-800">
            {product.name}
          </h1>
          <div className="flex items-center mt-2">
            {Array(5)
              .fill("")
              .map((_, index) => (
                <StarIcon
                  key={index}
                  size={14}
                  className="text-transparent mt-0.5"
                  fill={averageRating >= index + 1 ? "#00C950" : "#D1D5DB"}
                />
              ))}
            <p className="text-sm ml-3 text-slate-500">
              {product.rating.length} Reviews
            </p>
          </div>
          <div className="flex items-start my-6 gap-3 text-2xl font-semibold text-slate-800">
            <p>
              {" "}
              {currency}
              {product.price}/kg{" "}
            </p>
            <p className="text-xl text-slate-500 line-through">
              {currency}
              {product.mrp}/kg
            </p>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <TagIcon size={14} />
            <p>
              Save // AFTER (Fixed)
              {(((product.mrp - product.price) / product.mrp) * 100).toFixed(0)}
              % right now
            </p>
          </div>
          <div className="flex items-end gap-5 mt-10">
            {cart[productId] && (
              <div className="flex flex-col gap-3">
                <p className="text-lg text-slate-800 font-semibold">
                  Quantity (kg)
                </p>
                <Counter productId={productId} />
              </div>
            )}
            <button
              onClick={() =>
                !cart[productId] ? addToCartHandler() : router.push("/cart")
              }
              className="bg-blue-600 text-white px-10 py-3 text-sm font-medium rounded hover:bg-blue-700 active:scale-95 transition"
            >
              {!cart[productId] ? "Add to Cart" : "View Cart"}
            </button>
          </div>

          {/* THIS SECTION WAS MOVED FROM HERE...
           */}
        </div>
      </div>

      {/* 2. ...AND PLACED HERE, after the main flex container, so it displays at the bottom. */}
      {/* === "OUR COMMITMENT" SECTION (Smaller, Compact UI) === */}
      <section className="pt-10 mt-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          {/* Main heading reduced from text-3xl to text-2xl, margin-bottom reduced */}
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-10">
            Our Commitment to Quality
          </h2>
          {/* Gap reduced from gap-8 to gap-6 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ourSpecsData.map((spec, index) => {
              const Icon = spec.icon;

              const colors = [
                { bg: "bg-blue-100", text: "text-blue-600" },
                { bg: "bg-green-100", text: "text-green-600" },
                { bg: "bg-cyan-100", text: "text-cyan-600" },
              ];
              const color = colors[index % colors.length];

              return (
                <div
                  key={spec.title}
                  // Padding reduced from p-8 to p-6
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Icon container reduced from w-20 h-20 to w-16 h-16 (64px) */}
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-full ${color.bg} mx-auto mb-4`}
                  >
                    {/* Icon reduced from w-8 h-8 to w-7 h-7 (28px) */}
                    <Icon className={`w-7 h-7 ${color.text}`} />
                  </div>
                  {/* Card title reduced from text-xl to text-lg, margin reduced */}
                  <h3 className="text-lg text-center font-semibold text-slate-900 mb-2">
                    {spec.title}
                  </h3>
                  {/* Card description reduced to text-sm */}
                  <p className="text-sm text-slate-600 text-center">
                    {spec.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* === END OF SECTION === */}
    </>
  );
};

export default ProductDetails;
