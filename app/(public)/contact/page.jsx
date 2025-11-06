"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    const formData = new FormData();
    formData.append("access_key", "5eaf90c7-fe79-4c1c-853b-dcfcfbc59c8b");
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);
    formData.append("from_name", "Manglore Refresh Fish Website");
    formData.append("subject", `New Contact from ${form.name}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult("✅ Message sent successfully!");
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => {
          setResult("");
          setSent(false);
        }, 4000);
      } else {
        setResult("❌ Something went wrong. Please try again.");
        console.error("Web3Forms error:", data);
      }
    } catch (error) {
      setResult("❌ Network error. Please try again later.");
      console.error("Network error:", error);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 p-6 md:p-10 md:pt-20 relative z-10">
        {/* LEFT SIDE */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center space-y-6"
        >
          <h4 className="text-sm font-semibold text-sky-600 uppercase tracking-widest">
            We’re Here to Help
          </h4>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-800">
            Let’s <span className="text-sky-600">Connect & Keep it Fresh</span>{" "}
            🌊
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Have a question or want to pre-order your favorite seafood? Reach
            out and we’ll respond faster than the tide! Whether it’s about
            orders, freshness, or delivery — we’re just a message away.
          </p>

          {/* Contact Info */}
          <div className="space-y-4">
            {/* Email */}
            <motion.a
              href="mailto:info.manglorefreshfish@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="p-3 bg-sky-100 rounded-xl group-hover:bg-sky-200 transition"
              >
                <Mail className="text-sky-600 w-5 h-5" />
              </motion.div>
              <p className="text-gray-700 font-medium group-hover:text-sky-600 transition">
                info.manglorefreshfish@gmail.com
              </p>
            </motion.a>

            {/* WhatsApp / Phone */}
            <motion.a
              href="https://wa.me/919110683618"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
                className="p-3 bg-sky-100 rounded-xl group-hover:bg-sky-200 transition"
              >
                <Phone className="text-sky-600 w-5 h-5" />
              </motion.div>
              <p className="text-gray-700 font-medium group-hover:text-sky-600 transition">
                +91 9110683618
              </p>
            </motion.a>

            {/* Location */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.8 }}
                className="p-3 bg-sky-100 rounded-xl"
              >
                <MapPin className="text-sky-600 w-5 h-5" />
              </motion.div>
              <p className="text-gray-700 font-medium">Bangalore, India</p>
            </motion.div>
          </div>

          {/* WhatsApp Icon */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 pt-4"
          >
            <a
              href="https://wa.me/919110683618"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <MessageCircle className="w-5 h-5" />
              </motion.div>
              Chat on WhatsApp
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE - FORM */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Send us a Message 🐟
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="👋 Your Name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-200 focus:border-sky-400 outline-none transition"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="📧 Your Email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-200 focus:border-sky-400 outline-none transition"
              />
            </div>
            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="💬 Write your message here..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-200 focus:border-sky-400 outline-none transition"
              />
            </div>

            {/* Inline Success Message */}
            {result && <p className="text-green-600 font-medium">{result}</p>}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition relative overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                {sent ? "✅ Message Sent!" : "Send Message"}
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* MAP SECTION */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 sm:mt-20 max-w-6xl mx-auto px-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Find Us in Bangalore 📍
        </h2>
        <div className="overflow-hidden rounded-3xl shadow-2xl border border-gray-100">
          <iframe
            title="Map - Varthur, Bangalore"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78380.42244046889!2d77.70100997191675!3d12.961518097681276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0d87e1091cd9%3A0xf99fbc637054981f!2sVarthur%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1761390010577!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full rounded-3xl shadow-2xl border border-gray-100"
          />
        </div>
      </motion.section>

      {/* CTA SECTION */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center py-16 sm:py-20 px-6"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Fresh fish. Honest service. Every Sunday. 🐠
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Pre-order your seafood today and experience the authentic taste of the
          Arabian Sea — delivered fresh from Mangalore to Bangalore every week.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/shop"
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-full font-medium transition"
          >
            Pre-order Now
          </Link>
          <a
            href="https://wa.me/919110683618"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition"
          >
            <MessageCircle className="w-5 h-5 text-green-500" /> Chat on
            WhatsApp
          </a>
        </div>
      </motion.section>

      {/* Toast Notification */}
      {/* Toast Notification */}
      {sent && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-5 right-5 bg-sky-600 text-white px-5 py-3 rounded-xl shadow-lg z-[9999]"
        >
          Thank you! We'll get back to you soon 🌊
        </motion.div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </main>
  );
}
