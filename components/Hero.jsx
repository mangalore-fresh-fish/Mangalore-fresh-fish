"use client";
import { assets } from "@/assets/assets";
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import CategoriesMarquee from "./CategoriesMarquee";
import Link from "next/link";
import { motion } from "framer-motion"; // 1. IMPORT MOTION

const Hero = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₹";

  return (
    <div className="mx-6">
      <div className="flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-6 sm:my-10">
        {/* Main Hero Block */}
        <div className="relative flex-1 flex flex-col bg-gray-50 rounded-3xl xl:min-h-100 group overflow-hidden ring-1 ring-gray-200">
          <div className="p-6 sm:p-16 z-10">
<motion.div
  initial={{ opacity: 0, y: 5 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
  whileHover={{ scale: 1.03 }}
  className="inline-flex items-center justify-center sm:justify-start gap-2 sm:gap-3 bg-green-50 text-green-600 font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm ring-1 ring-green-200 shadow-sm w-full sm:w-fit group relative overflow-hidden whitespace-nowrap"
>
  {/* Shimmer effect */}
  <motion.span
    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
    animate={{ x: ["-100%", "100%"] }}
    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
  />

  {/* Badge */}
  <span className="bg-green-500/90 px-2.5 sm:px-3 py-[3px] sm:py-1 rounded-full text-white text-[9px] sm:text-xs relative z-10 whitespace-nowrap">
    Fresh Catch
  </span>

  {/* Text */}
  <span className="relative z-10 truncate text-[10px] sm:text-sm">
    Fresh Fish Delivered Every Weekend
  </span>

  {/* Icon */}
  <ChevronRightIcon
    className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0"
  />
</motion.div>


            <h2 className="text-3xl sm:text-5xl leading-[1.2] my-6 font-semibold bg-gradient-to-r from-blue-800 to-sky-500 bg-clip-text text-transparent">
              From Ocean to Home — Fresh Fish, Every Weekend
            </h2>

            {/* Subtle responsive order notice */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-4 sm:mt-6"
            >
              <p className="text-gray-500 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                Order now for{" "}
                <span className="text-gray-700 font-medium">
                  Weekend Delivery 🚚
                </span>
                .
              </p>
            </motion.div>

            {/* --- 2. UPDATED BUTTON --- */}
            <motion.div
              // Fades in and slides up
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="inline-block" // Ensures motion div doesn't take full width
            >
              <Link
                href="/shop"
                className="relative overflow-hidden bg-green-600 text-white text-base sm:text-lg font-medium py-2.5 px-6 sm:py-4 sm:px-10 mt-6 sm:mt-8 rounded-full shadow-lg active:scale-95 transition-transform duration-300 inline-flex items-center justify-center gap-2"
              >
                {/* Shimmer Animation */}
                <motion.span
                  className="absolute inset-0 block -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 2.5, // Waits 2.5s between shimmers
                    duration: 1,
                    ease: "linear",
                  }}
                />
                <span className="relative z-10">Shop This Week’s Catch</span>
                <ArrowRightIcon className="w-5 h-5 transition-transform relative z-10" />
              </Link>
            </motion.div>
          </div>

          {/* --- 3. UPDATED IMAGE ---
             - Increased mobile top margin from mt-4 to mt-8
          */}
          <div className="relative sm:pt-0 lg:pt-10 xl:pt-16">
            <Image
              className="relative w-3/5 max-w-60 mx-auto mb-6 sm:absolute sm:bottom-0 sm:right-0 sm:md:right-10 sm:w-full sm:max-w-sm sm:mx-0 sm:mb-0"
              src={assets.hero_fish}
              alt="Fresh Fish"
              priority
              width={600}
              height={400}
            />
          </div>
        </div>

        {/* Side Cards */}
        <div className="grid grid-cols-2 xl:flex xl:flex-col gap-4 sm:gap-5 w-full xl:max-w-sm text-sm text-slate-600">
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-between w-full bg-white border border-gray-200 rounded-3xl p-4 sm:p-6 sm:px-8 group shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div>
              <p className="text-xl sm:text-3xl font-medium bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent max-w-40">
                Premium Quality
              </p>
              <p className="flex items-center gap-1 mt-3 sm:mt-4 text-amber-700 text-sm sm:text-base">
                See All Fish{" "}
                <ArrowRightIcon
                  className="group-hover:ml-2 transition-all"
                  size={18}
                />{" "}
              </p>
            </div>
            <Image
              className="w-20 sm:w-35"
              src={assets.pomfret}
              alt="Pomfret"
              width={140}
              height={140}
            />
          </div>

          <div className="flex-1 flex flex-col sm:flex-row items-center justify-between w-full bg-white border border-gray-200 rounded-3xl p-4 sm:p-6 sm:px-8 group shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div>
              <p className="text-xl sm:text-3xl font-medium bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent max-w-40">
                Freshly Sourced
              </p>
              <p className="flex items-center gap-1 mt-3 sm:mt-4 text-teal-700 text-sm sm:text-base">
                Learn More{" "}
                <ArrowRightIcon
                  className="group-hover:ml-2 transition-all"
                  size={18}
                />{" "}
              </p>
            </div>
            <Image
              className="w-20 sm:w-35"
              src={assets.fresh}
              alt="Fresh"
              width={140}
              height={140}
            />
          </div>
        </div>
      </div>
      <CategoriesMarquee />
    </div>
  );
};

export default Hero;
