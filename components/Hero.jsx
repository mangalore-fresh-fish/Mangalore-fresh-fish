"use client";
import { assets } from "@/assets/assets";
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import CategoriesMarquee from "./CategoriesMarquee";
import Link from "next/link";

const Hero = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₹";

  return (
    <div className="mx-6">
      <div className="flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10">
        {/* Main Hero Block - Light/Premium Theme */}
        <div className="relative flex-1 flex flex-col bg-gray-50 rounded-3xl xl:min-h-100 group overflow-hidden ring-1 ring-gray-200">
          <div className="p-5 sm:p-16">
           <div className="inline-flex items-center gap-3 bg-green-50 text-green-600 font-medium pr-4 pl-1 py-1 rounded-full text-xs sm:text-sm ring-1 ring-green-200 shadow-sm">
  <span className="bg-green-500/90 px-3 py-1 rounded-full text-white text-xs sm:text-sm">
    Fresh Catch
  </span>
  Fresh Fish Delivered Every Weekend
  <ChevronRightIcon
    className="transition-all group-hover:translate-x-1"
    size={16}
  />
</div>

            <h2 className="text-3xl sm:text-5xl leading-[1.2] my-6 mb-15 font-semibold bg-gradient-to-r from-blue-800 to-sky-500 bg-clip-text text-transparent">
              From Ocean to Home — Fresh Fish, Every Weekend
            </h2>

            <div className="text-gray-700 text-lg sm:text-xl font-light mt-6 sm:mt-10">
              <p className="text-gray-500">Order now for Weekend Delivery.</p>
            </div>

            <Link
              href="/shop"
              className="group border border-slate-800 text-slate-800 text-base sm:text-lg font-medium py-3 px-8 sm:py-4 sm:px-10 mt-5 sm:mt-8 rounded-full hover:bg-blue-900 hover:text-white active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Shop This Week’s Catch
              <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <Image
            className="sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm"
            src={assets.hero_fish}
            alt="Fresh Fish"
            priority
          />
        </div>

        {/* Side Cards - Clean White Theme */}
        <div className="flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-600">
          <div className="flex-1 flex items-center justify-between w-full bg-white border border-gray-200 rounded-3xl p-6 px-8 group shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div>
              <p className="text-3xl font-medium bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent max-w-40">
                Premium Quality
              </p>
              <p className="flex items-center gap-1 mt-4 text-amber-700">
                See All Fish{" "}
                <ArrowRightIcon
                  className="group-hover:ml-2 transition-all"
                  size={18}
                />{" "}
              </p>
            </div>
            <Image className="w-35" src={assets.pomfret} alt="Pomfret" />
          </div>
          <div className="flex-1 flex items-center justify-between w-full bg-white border border-gray-200 rounded-3xl p-6 px-8 group shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div>
              <p className="text-3xl font-medium bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent max-w-40">
                Freshly Sourced
              </p>
              <p className="flex items-center gap-1 mt-4 text-teal-700">
                Learn More{" "}
                <ArrowRightIcon
                  className="group-hover:ml-2 transition-all"
                  size={18}
                />{" "}
              </p>
            </div>
            <Image className="w-35" src={assets.fresh} alt="Fresh" />
          </div>
        </div>
      </div>
      <CategoriesMarquee />
    </div>
  );
};

export default Hero;
