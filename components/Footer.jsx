import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-sky-50 border-t border-gray-200 text-slate-600">
      {/* Subtle floating bubbles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-sky-200 blur-2xl"
            style={{
              width: `${Math.random() * 100 + 40}px`,
              height: `${Math.random() * 100 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-3">
              Mangalore Fresh Fish
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              From the Arabian Sea to your Sunday plate — we bring the freshest
              seafood straight from Mangalore to Bangalore. 100% fresh, never
              frozen. 🌊
            </p>

            <div className="flex gap-4 mt-6">
              {/* WhatsApp */}
              <Link
                href="https://wa.me/919110683618"
                target="_blank"
                className="p-3 bg-green-100 hover:bg-green-200 rounded-full transition transform hover:scale-105 shadow-sm"
              >
                <FaWhatsapp className="text-green-600 w-5 h-5" />
              </Link>
              {/* Instagram */}
              <Link
                href="https://instagram.com"
                target="_blank"
                className="p-3 bg-pink-100 hover:bg-pink-200 rounded-full transition transform hover:scale-105 shadow-sm"
              >
                <FaInstagram className="text-pink-600 w-5 h-5" />
              </Link>
              {/* YouTube */}
              <Link
                href="https://youtube.com"
                target="_blank"
                className="p-3 bg-red-100 hover:bg-red-200 rounded-full transition transform hover:scale-105 shadow-sm"
              >
                <FaYoutube className="text-red-600 w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-700 mb-4 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/shop" className="hover:text-green-600 transition">
                  🐟 Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-600 transition">
                  🌊 About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-600 transition">
                  💬 Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-green-600 transition"
                >
                  🚚 Delivery Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-semibold text-slate-700 mb-4 text-lg">
              Contact Support
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-green-600" />
                <Link
                  href="https://wa.me/919110683618"
                  target="_blank"
                  className="hover:text-green-600 transition"
                >
                  +91 9110683618
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-green-600" />
                <Link
                  href="mailto:info.manglorefreshfish@gmail.com"
                  className="hover:text-green-600 transition"
                >
                  info.manglorefreshfish@gmail.com
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-green-600" />
                <span>Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Mangalore Fresh Fish. All rights reserved.</p>
          <p className="text-slate-400 text-xs">
            100% Fresh | Never Frozen | Straight from the Coast 🌊
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-30px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
