"use client";
import {
  PackageIcon,
  Search,
  ShoppingCart,
  Menu,
  X,
  Home,
  ShoppingBag,
  Info,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUser, useClerk, UserButton, Protect } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

// --- Custom Hook ---
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [scrollDirection]);
  return scrollDirection;
};

// --- Main Navbar Component ---

const Navbar = () => {
  // --- Hooks & State ---
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const cartCount = useSelector((state) => state.cart.total) || 0;

  // --- 1. ERROR FIX: Added search state back ---
  const [search, setSearch] = useState("");

  // --- 2. BUG FIX: Start state as null ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollDirection = useScrollDirection();

  // On mount, set state to false so AnimatePresence can work on the first click
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);
  // --- End Bug Fix ---

  // --- 1. ERROR FIX: Added handleSearch function back ---
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false); // Close menu on search
    }
  };

  const handleLinkClick = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  // --- Scroll Effect ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  // --- Re-usable Link Components ---

  // Desktop NavLink
  const DesktopNavLink = ({ href, children }) => (
    <Link
      href={href}
      className={`hover:text-green-600 transition-colors ${
        pathname === href ? "text-green-600 font-semibold" : "text-slate-600"
      }`}
    >
      {children}
    </Link>
  );

  // Mobile NavLink (Styled for marine-glass theme)
  const MobileNavLink = ({ href, icon: Icon, children }) => (
    <motion.button
      variants={mobileMenuItemVariants}
      onClick={() => handleLinkClick(href)}
      className={`relative flex w-full items-center gap-4 px-3 py-3 rounded-lg text-lg transition-colors ${
        pathname === href
          ? "text-cyan-800 font-semibold" // Active text
          : "text-gray-700 hover:text-cyan-600" // Inactive text
      }`}
    >
      <Icon size={22} strokeWidth={1.5} className="flex-shrink-0" />
      <span className="relative z-10">{children}</span>
      {pathname === href && (
        // "Glass" Active Pill
        <motion.div
          layoutId="mobile-active-pill"
          className="absolute inset-0 bg-white/60 shadow-sm"
          style={{ borderRadius: 8 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </motion.button>
  );

  // --- Animation Variants ---
  const headerVariants = {
    top: { y: 0, opacity: 1 },
    hidden: { y: "-100%", opacity: 0 },
  };

  const mobileMenuContainerVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const mobileMenuItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { y: 20, opacity: 0 },
  };

  return (
    <>
      {/* ============================================================
            === 1. DESKTOP HEADER (UNCHANGED)
            ============================================================
            */}
      <nav className="hidden sm:block bg-white z-40 relative border-b border-gray-300">
        <div className="mx-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img
                src={
                  require("@/assets/logo.jpg").default?.src ||
                  "/assets/logo.jpg"
                }
                alt="Mfresh Logo"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-semibold text-slate-800">
                  {/* Mfresh */}
                </span>
                <Protect plan="plus">
                  <span className="text-xs text-indigo-500 font-medium">
                    plus
                  </span>
                </Protect>
              </div>
            </Link>

            {/* Desktop Search */}
            <form
              onSubmit={handleSearch}
              className="flex items-center relative"
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="border border-gray-300 rounded-full py-2 px-4 w-72 text-sm focus:outline-none focus:border-green-600"
              />
              <button
                type="submit"
                className="absolute right-3 text-gray-400 hover:text-green-600"
              >
                <Search size={20} />
              </button>
            </form>

            {/* Desktop Links */}
            <div className="flex items-center gap-7 text-sl font-medium text-slate-600">
              <DesktopNavLink href={"/"}>Home</DesktopNavLink>
              <DesktopNavLink href={"/shop"}>Shop</DesktopNavLink>
              <DesktopNavLink href={"/about"}>About</DesktopNavLink>
              <DesktopNavLink href={"/contact"}>Contact</DesktopNavLink>
            </div>

            {/* Desktop User/Cart */}
            <div className="flex items-center gap-3">
              <Link
                href={"/cart"}
                className="relative p-2 rounded-full hover:bg-gray-100"
              >
                <ShoppingCart
                  size={22}
                  strokeWidth={1.5}
                  className="text-slate-600"
                />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 block w-4 h-4 bg-green-600 text-white text-xs font-medium rounded-full text-center leading-4">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      labelIcon={<PackageIcon size={16} />}
                      label="My Orders"
                      onClick={() => router.push("/orders")}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              ) : (
                <button
                  onClick={openSignIn}
                  className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ============================================================
            === 2. MOBILE HEADER (Marine Glass Theme)
            ============================================================
            */}
      <motion.header
        initial="top"
        animate={scrollDirection === "down" && isScrolled ? "hidden" : "top"}
        variants={headerVariants}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`sm:hidden fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? "marine-glass-header"
            : "bg-white border-b border-gray-300"
        }`}
      >
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-6">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src={
                require("@/assets/logo.jpg").default?.src || "/assets/logo.jpg"
              }
              alt="Mfresh Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-xl font-semibold text-slate-800">{/* Mfresh */}</span>
          </Link>

          {/* Mobile Action Icons */}
          <div className="flex items-center gap-2">
            <Link
              href={"/cart"}
              className="relative p-2 rounded-full hover:bg-gray-100"
            >
              <ShoppingCart
                size={22}
                strokeWidth={1.5}
                className="text-cyan-700"
              />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 block w-4 h-4 bg-green-600 text-white text-xs font-medium rounded-full text-center leading-4">
                  {cartCount}
                </span>
              )}
            </Link>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2"
            >
              <Menu size={24} className="text-cyan-700" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ============================================================
            === 3. MOBILE MENU DRAWER (75% Width, Bug Fix)
            ============================================================
            */}
      {/* Check for 'isMobileMenuOpen !== null' is part of the bug fix */}
      <AnimatePresence>
        {isMobileMenuOpen !== null && isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[90] sm:hidden"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              // ** 3. UI FIX: 'w-3/4' (75%) and 'marine-glass-menu' **
              className="fixed top-0 right-0 h-full w-3/4 max-w-sm marine-glass-menu z-[100] sm:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center p-5 border-b border-cyan-200/30">
                <h2 className="text-lg font-semibold text-cyan-900">Menu</h2>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-cyan-700 hover:text-cyan-900 p-1 rounded-full"
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={22} />
                </motion.button>
              </div>

              {/* Drawer Content */}
              <div className="flex-grow flex flex-col justify-between p-5">
                {/* Navigation Links & Mobile Search */}
                <motion.nav
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={mobileMenuContainerVariants}
                  className="flex flex-col space-y-2"
                >
                  {/* Mobile Search */}
                  <motion.form
                    onSubmit={handleSearch}
                    variants={mobileMenuItemVariants}
                    className="flex items-center relative mb-4"
                  >
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      type="text"
                      placeholder="Search products..."
                      className="border border-gray-300 rounded-full py-2.5 px-4 w-full text-sm focus:outline-none focus:border-green-600"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 text-gray-400 hover:text-green-600"
                    >
                      <Search size={20} />
                    </button>
                  </motion.form>

                  {/* Links */}
                  <MobileNavLink href="/" icon={Home}>
                    Home
                  </MobileNavLink>
                  <MobileNavLink href="/shop" icon={ShoppingBag}>
                    Shop
                  </MobileNavLink>
                  <MobileNavLink href="/about" icon={Info}>
                    About
                  </MobileNavLink>
                  <MobileNavLink href="/contact" icon={Mail}>
                    Contact
                  </MobileNavLink>

                  {user && (
                    <MobileNavLink href="/orders" icon={PackageIcon}>
                      My Orders
                    </MobileNavLink>
                  )}
                </motion.nav>

                {/* Bottom Auth Button */}
                <div>
                  {user ? (
                    <div className="flex items-center gap-3 p-3 bg-white/40 rounded-lg">
                      <UserButton />
                      <div className="text-sm">
                        <div className="font-medium text-cyan-900">
                          {user.fullName}
                        </div>
                        <div className="text-xs text-cyan-800">
                          {user.primaryEmailAddress.emailAddress}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <motion.button
                      variants={mobileMenuItemVariants}
                      onClick={openSignIn}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 shadow-lg shadow-cyan-500/30"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98, y: 0 }}
                    >
                      <User size={18} />
                      <span>Login / Signup</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for mobile header */}
      <div className="h-16 sm:hidden" />
    </>
  );
};

export default Navbar;
