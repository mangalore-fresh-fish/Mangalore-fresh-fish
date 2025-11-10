"use client";

import { addToCart } from "@/lib/features/cart/cartSlice";
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

  // ✅ Hooks go here (inside component)
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [added, setAdded] = useState(false); // 👈 now valid

  const addToCartHandler = () => {
    dispatch(addToCart({ productId }));
    setAdded(true); // 👈 mark as added
  };

  const goToCartHandler = () => {
    router.push("/cart"); // 👈 navigate to cart
  };

  const averageRating =
    product.rating.length > 0
      ? product.rating.reduce((acc, item) => acc + item.rating, 0) /
        product.rating.length
      : 0;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-lg flex items-center justify-center border border-gray-300 h-80 sm:h-96 md:h-[500px] overflow-hidden">
            <Image
              width={500}
              height={500}
              className="w-auto h-full object-contain"
              src={mainImage}
              alt={product.name}
            />
          </div>

          <div className="flex gap-4 mt-6 overflow-x-auto flex-nowrap no-scrollbar">
            {product.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setMainImage(image)}
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

          <p className="text-3xl sm:text-4xl font-semibold text-slate-800">
            {currency}
            {product.price}
          </p>

          <hr className="my-6" />

<div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
  {/* Quantity Counter */}
  <div className="flex items-center justify-between w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-300">
    <Counter productId={productId} />
  </div>

  {/* Add / Go to Cart Button */}
  <button
    onClick={added ? goToCartHandler : addToCartHandler}
    className={`group relative w-full sm:w-80 px-6 py-3.5 rounded-lg font-semibold text-white transition-all duration-300 
      ${
        added
          ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          : "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
      } shadow-md hover:shadow-lg`}
  >
    <span className="flex items-center justify-center gap-2 text-lg tracking-wide">
      {added ? (
        <>
          Go to Cart <span className="transition-transform group-hover:translate-x-1">🛒</span>
        </>
      ) : (
        <>
          Add to Cart <span className="transition-transform group-hover:scale-110"></span>
        </>
      )}
    </span>

    {/* Animated Glow */}
    <span
      className={`absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500`}
    ></span>
  </button>
</div>

        </div>
      </div>

      <div className="my-16 md:my-24">
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 text-center mb-8 sm:mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ourSpecsData.map((spec, index) => {
            const Icon =
              {
                Anchor: AnchorIcon,
                Leaf: LeafIcon,
                Truck: TruckIcon,
              }[spec.icon] || AnchorIcon;

            const colors = [
              { bg: "bg-blue-100", text: "text-blue-600" },
              { bg: "bg-green-100", text: "text-green-600" },
              { bg: "bg-cyan-100", text: "text-cyan-600" },
              { bg: "bg-yellow-100", text: "text-yellow-600" },
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
