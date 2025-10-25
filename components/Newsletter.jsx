"use client";
import React from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 bg-gradient-to-br from-sky-50 via-white to-green-50 overflow-hidden">
      {/* Floating bubbles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-sky-200 blur-3xl"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <Title
          title="Stay in the Loop 🐟"
          description="Get exclusive updates, special offers, and the freshest seafood news every week — straight to your inbox."
          visibleButton={false}
        />

        {/* Email form */}
        <motion.form
          whileHover={{ scale: 1.01 }}
          className="mt-10 flex flex-col sm:flex-row items-stretch bg-white/80 backdrop-blur-md border border-gray-100 shadow-lg rounded-2xl sm:rounded-full overflow-hidden max-w-xl mx-auto"
        >
          <div className="flex items-center justify-center sm:justify-start px-4 py-3 sm:py-0">
            <Mail className="w-5 h-5 text-green-500" />
          </div>

          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 bg-transparent px-3 py-3 sm:py-4 outline-none text-slate-700 placeholder:text-slate-400 text-base sm:text-lg"
            required
          />

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-green-500 to-sky-500 text-white font-medium px-8 py-3 sm:py-4 rounded-none sm:rounded-r-full hover:opacity-90 transition w-full sm:w-auto"
          >
            Subscribe
          </motion.button>
        </motion.form>

        <p className="mt-6 text-sm text-gray-500">
          No spam, only fresh updates from the coast 🌊
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
