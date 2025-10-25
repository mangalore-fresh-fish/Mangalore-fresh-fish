"use client";
import React from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import { ourSpecsData } from "@/assets/assets";

const OurSpecs = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" },
    }),
  };

  return (
    // UPDATED: Reduced vertical padding on mobile
    <section className="relative bg-gradient-to-b from-white via-sky-50 to-green-50 py-16 sm:py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.3),transparent_60%)]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Title
          visibleButton={false}
          title="Our Commitment to Quality"
          description="Experience the authentic taste of Mangalorean seafood — fresh, honest, and caught straight from the Arabian Sea."
        />

        {/* UPDATED: Reduced gap and margin-top on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16">
          {ourSpecsData.map((spec, index) => {
            const Icon = spec.icon;
            const colors = [
              { bg: "bg-blue-100", text: "text-blue-600" },
              { bg: "bg-green-100", text: "text-green-600" },
              { bg: "bg-sky-100", text: "text-sky-600" },
            ];
            const color = colors[index % colors.length];

            return (
              <motion.div
                key={spec.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                // UPDATED: Reduced padding on mobile
                className="bg-white/80 backdrop-blur-md border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              >
                <div
                  // UPDATED: Reduced icon container size on mobile
                  className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full ${color.bg} mx-auto mb-6 group-hover:scale-110 transition`}
                >
                  {/* UPDATED: Reduced icon size on mobile */}
                  <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${color.text}`} />
                </div>

                {/* UPDATED: Reduced text size on mobile */}
                <h3 className="text-lg sm:text-xl text-center font-semibold text-slate-900 mb-3">
                  {spec.title}
                </h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  {spec.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurSpecs;