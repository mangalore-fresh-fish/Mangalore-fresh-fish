"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { assets } from "@/assets/assets";

/**
 * /app/(public)/about/page.jsx
 * Original code with mobile-responsive tweaks (padding, font-size).
 */

const videoId = "44sp_8bRP2A";
const videoEmbed = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

const WaveDivider = ({ flip = false, className = "" }) => {
  // Two layered waves animated horizontally via framer-motion
  return (
    <div
      className={`w-full overflow-hidden leading-none ${className}`}
      aria-hidden
    >
      <motion.svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={`w-full h-28 ${flip ? "rotate-180" : ""}`}
      >
        <defs>
          <linearGradient id="gA" x1="0" x2="1">
            <stop offset="0%" stopColor="#E6F8FF" />
            <stop offset="70%" stopColor="#DFF8F4" />
            <stop offset="100%" stopColor="#FFF7EA" />
          </linearGradient>
          <linearGradient id="gB" x1="0" x2="1">
            <stop offset="0%" stopColor="#DFF8F4" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0,32 C150,96 350,0 600,32 C850,64 1050,16 1200,48 L1200,120 L0,120 Z"
          fill="url(#gA)"
          opacity="0.95"
          animate={{ x: [-10, 10, -10] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,48 C200,16 400,96 600,48 C800,0 1000,56 1200,32 L1200,120 L0,120 Z"
          fill="url(#gB)"
          opacity="0.85"
          animate={{ x: [8, -8, 8] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
};

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.7, delay }}
  >
    {children}
  </motion.div>
);

export default function AboutPage() {
  // images from assets.js (fallback to public placeholder if needed)
  const heroFish = assets?.hero_fish ?? "/placeholder.jpg";
  const profile = assets?.profile_pic1 ?? "/placeholder.jpg";
  const videoRef = useRef(null);

  // Parallax for story image
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <main className="bg-white text-slate-800">
      {/* HERO */}
      {/* UPDATED: Reduced mobile padding/margin */}
      <section className="max-w-7xl mx-auto px-6 py-12 sm:py-16 lg:py-15">
        {/* UPDATED: Reduced mobile padding */}
        <div className="relative z-10 rounded-3xl p-6 sm:p-8 lg:p-12 bg-gradient-to-r from-blue-50 via-teal-50 to-sand-50 ring-1 ring-slate-100 shadow-sm overflow-hidden">
          {/* soft decorative */}
          <div className="absolute -left-20 -top-6 w-60 h-60 bg-gradient-to-br from-sky-100 to-emerald-50 rounded-full opacity-30 blur-2xl -z-10" />
          <div className="absolute -right-24 -bottom-10 w-80 h-80 bg-gradient-to-br from-emerald-50 to-sky-50 rounded-full opacity-25 blur-2xl -z-10" />

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700 font-medium">
                Fresh • Local • Transparent
              </span>

              {/* This font size scales well */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                We don’t just sell fish — we deliver{" "}
                <span className="text-teal-600">trust, love</span> and the taste
                of the coast.
              </h1>

              {/* UPDATED: text-base on mobile, text-lg on desktop */}
              <p className="text-slate-700 text-base md:text-lg max-w-xl">
                Every Sunday morning at the port, we sort the freshest catch —
                mackerel, kingfish, tiger prawns and deliver it to you before
                11 AM. Honest hands. Honest food. Always fresh, never frozen.
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-full font-medium shadow-sm hover:bg-emerald-700 transition"
                >
                  Pre-order Now <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-slate-200 px-4 py-3 rounded-full text-slate-700 hover:bg-slate-50 transition"
                >
                  <Play className="w-4 h-4" /> Watch Short
                </a>
              </div>

              <div className="mt-4 text-sm text-slate-600 space-y-1">
                <p>
                  🗓️ <strong>Pre-orders only (Mon–Fri)</strong>
                </p>
                <p>🌊 Freshly caught Saturday night from the Arabian Sea</p>
                <p>
                  🚚 Delivered Sunday morning in Bangalore — inspect before
                  paying.
                </p>
              </div>
            </div>

            {/* hero visual card */}
            <div className="relative">
              <div className="rounded-2xl bg-white ring-1 ring-slate-100 shadow-lg overflow-hidden">
                {/* This height scale is fine */}
                <div className="relative w-full h-64 sm:h-72 md:h-80">
                  <Image
                    src={heroFish}
                    alt="Fresh catch"
                    fill
                    sizes="(max-width: 1024px) 400px, 800px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Delivered</p>
                    <p className="font-semibold">Sunday Morning</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Guarantee</p>
                    <p className="font-semibold text-teal-600">
                      Not fresh? Get it free
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 left-6 bg-white/90 px-3 py-1 rounded-full ring-1 ring-slate-100 text-xs font-medium text-slate-700 shadow-sm">
                Family-run • Coastal roots
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* decorative wave */}
      <WaveDivider />

      {/* STORY section */}
      {/* UPDATED: Reduced mobile padding */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-14 lg:py-20">
        {/* UPDATED: Reduced mobile gap */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-15 items-center">
          <motion.div
            style={{ y: parallaxY }}
            className="relative w-full h-96 md:h-full rounded-3xl overflow-hidden shadow-lg ring-1 ring-slate-100"
          >
            <Image
              src={profile}
              alt="Founder / Fishermen"
              fill
              sizes="(max-width: 1024px) 600px, 800px"
              style={{ objectFit: "cover" }}
            />
            {/* subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/6 to-transparent" />
          </motion.div>

          <div className="space-y-4">
            <FadeUp>
              {/* UPDATED: text-2xl on mobile */}
              <h2 className="text-2xl md:text-3xl font-semibold">
                Our Own Little World by the Sea
              </h2>
            </FadeUp>

            {/* animated lines — each fades in with emoji */}
            <div className="space-y-4 mt-2">
              <FadeUp>
                {/* UPDATED: text-base on mobile */}
                <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                  ❤️{" "}
                  <strong className="underline decoration-emerald-100 decoration-2">
                    Catching fish is our life.
                  </strong>
                  For generations, the morning net and the evening family meal
                  have been the heart of what we do.
                </p>
              </FadeUp>

              <FadeUp delay={0.08}>
                {/* UPDATED: text-base on mobile */}
                <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                  🌊{" "}
                  <span className="font-medium">
                    Every wave carries a promise:
                  </span>{" "}
                  to bring honest, fresh seafood from the Arabian Sea to your
                  table.
                </p>
              </FadeUp>

              <FadeUp delay={0.14}>
                {/* UPDATED: text-base on mobile */}
                <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                  🛶{" "}
                  <span className="text-slate-800">
                    Mackerel, prawns, kingfish
                  </span>{" "}
                  and more — as soon as the port arrives on Saturday night, we
                  prepare and pack for Sunday delivery.
                </p>
              </FadeUp>

              <FadeUp delay={0.22}>
                {/* UPDATED: text-base on mobile */}
                <p className="text-slate-700 text-base md:text-lg leading-relaxed italic border-l-4 pl-4 border-teal-100">
                  “No one can deliver fresher fish than us. If you’re not happy
                  with the freshness, we’ll make it right.” — Mangalore Fresh
                  Fish
                </p>
              </FadeUp>

              <div className="mt-4 flex gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-full text-slate-700 hover:bg-slate-50 transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* wave divider flipped */}
      <WaveDivider flip />

      {/* Why Trust & How It Works */}
      {/* UPDATED: Reduced mobile padding */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-14 lg:py-20 bg-slate-50 rounded-3xl ring-1 ring-slate-100">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <FadeUp>
              {/* UPDATED: text-2xl on mobile */}
              <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                Why you should trust us🫂
              </h3>
              <p className="text-slate-700 mb-6">
                Trust is earned at your doorstep. We let you inspect your order
                before you pay — cash on delivery after inspection. Honest,
                simple, and fair.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-1 gap-6">
              {" "}
              {/* Reduced gap from 7 to 6 */}
              {[
                {
                  title: "Inspect First, Pay Later",
                  text: "We deliver on cash-on-delivery terms — pay only after checking the fish.",
                  icon: "🪙",
                },
                {
                  title: "Direct From Mangalore Port",
                  text: "We source directly from local fishermen, minimizing handling and time-to-plate.",
                  icon: "⚓",
                },
                {
                  title: "Freshness Promise",
                  text: "If it's not fresh, we'll replace it or refund — no questions.",
                  icon: "💯",
                },
                {
                  title: "Small-Batch Care",
                  text: "Every order is hand-sorted and packed with care for weekend freshness.",
                  icon: "🧺",
                },
              ].map((c, i) => (
                <FadeUp key={i} delay={0.06 * i}>
                  <div className="p-4 bg-white rounded-xl ring-1 ring-slate-100 shadow-sm flex gap-3 items-start">
                    <div className="text-2xl">{c.icon}</div>
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {c.title}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">{c.text}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Vertical Timeline Steps */}
          <div>
            <FadeUp>
              {/* UPDATED: text-2xl on mobile */}
              <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                How it works — our weekend ritual 🚣
              </h3>
            </FadeUp>

            <div className="mt-6 space-y-5">
              {[
                {
                  step: 1,
                  title: "Pre-order (Mon–Fri)",
                  text: "Reserve your catch anytime during the week. This helps us pack only what’s needed — zero freezing.",
                  icon: "🗓️",
                },
                {
                  step: 2,
                  title: "We Set Sail (Sat night)",
                  text: "Our boats head out under the night sky and return with the freshest catch from the Arabian Sea.",
                  icon: "🌊",
                },
                {
                  step: 3,
                  title: "Clean & Pack (Early Sun)",
                  text: "Before dawn, our team cleans and packs each order with care and chilled transit to preserve peak freshness.",
                  icon: "🔪",
                },
                {
                  step: 4,
                  title: "Delivery & Inspect (Sun morning)",
                  text: "Delivered to your door before mid-morning — inspect, approve, and pay. If not fresh, we replace or refund.",
                  icon: "🚚",
                },
              ].map((s, idx) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: idx * 0.06 }}
                  className="p-4 bg-white rounded-xl ring-1 ring-slate-100 shadow-sm flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-xl">{s.icon}</div>
                      <h4 className="font-semibold text-slate-800">
                        {s.title}
                      </h4>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{s.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wave */}
      <WaveDivider />

      {/* VIDEO REVEAL */}
      {/* UPDATED: Reduced mobile padding */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.85 }}
          className="rounded-3xl overflow-hidden ring-1 ring-slate-100 shadow-2xl bg-white"
          ref={videoRef}
        >
          <div className="p-6 text-center">
            {/* UPDATED: text-2xl on mobile */}
            <h3 className="text-2xl md:text-3xl font-semibold mb-2">
              Before the sunrise — where our story begins
            </h3>
            <p className="text-sm text-slate-600 mb-4 max-w-2xl mx-auto">
              Watch the short that shows our early mornings, the hands that sort
              the catch, and the care behind every order. This is the heart of
              Imangalore Fresh Fish.
            </p>
          </div>

          <div className="aspect-video bg-slate-900/5 relative">
            {/* glass frame */}
            <div className="absolute inset-4 rounded-xl overflow-hidden bg-white/20 backdrop-blur-sm shadow-inner">
              <iframe
                className="w-full h-full"
                src={videoEmbed}
                title="Mangalore Fresh Fish - Journey"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* pulsing play hint */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ scale: [0.96, 1.04, 0.96], opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-white/40 rounded-full p-4"
              >
                <Play className="w-8 h-8 text-slate-800" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      {/* UPDATED: Reduced mobile padding */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16 lg:py-20">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-50 via-emerald-50 to-sand-50 opacity-90 -z-10" />
          {/* UPDATED: Reduced mobile padding */}
          <div className="relative z-10 p-6 md:p-10 lg:p-16 text-center ring-1 ring-slate-100 rounded-3xl shadow-lg">
            {/* UPDATED: text-2xl on mobile */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
              Wake up to the coast — order your Sunday freshness today
            </h2>
            <p className="text-slate-700 max-w-2xl mx-auto mb-8">
              We catch it. We clean it. We deliver it. You inspect and enjoy.
              Simple, honest, and deeply local — pre-order during the week and
              taste the ocean every Sunday morning.
            </p>

            {/* UPDATED: Made buttons stack on mobile */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/shop"
                className="relative inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold overflow-hidden"
                aria-label="Pre-order now"
              >
                {/* shimmer */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></span>
                Pre-order Now <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-slate-200 px-5 py-3 rounded-full text-slate-700 hover:bg-slate-50 transition"
              >
                Contact Us
              </Link>
            </div>

            <ul className="flex flex-col sm:flex-row gap-4 justify-center mt-8 text-sm text-slate-600">
              <li>🐟 Fresh from Arabian Sea</li>
              <li>🌅 Delivered Sunday morning</li>
              <li>💯 Not fresh? Free replacement</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 pb-12 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Mangalore Fresh Fish — All Rights Reserved.
      </footer>

      {/* small inline styles for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2.2s linear infinite;
        }
      `}</style>
    </main>
  );
}
