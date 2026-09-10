"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal navbar only as the pre-landing intro transitions into the hero (~1.2x viewport height)
      const introThreshold = window.innerHeight * 1.2;
      setVisible(window.scrollY > introThreshold);
      setScrolled(window.scrollY > introThreshold + 150);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "How it works", href: "#process" },
    { label: "Constellation", href: "#interior" },
    { label: "Progress", href: "#mastery" },
  ];

  return (
    <motion.header
      initial={false}
      animate={{
        y: visible ? 0 : -25,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-12 py-5 ${
        visible ? "pointer-events-auto" : "pointer-events-none"
      } ${
        scrolled
          ? "bg-[#050706]/90 backdrop-blur-sm border-b border-[#39F5B5]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LEFT: Small Emerald Dot + GuruKul AI */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="GuruKul AI Home"
        >
          <span className="w-2 h-2 rounded-full bg-[#39F5B5] shadow-[0_0_10px_#39F5B5]" />
          <span className="font-sans text-base font-semibold tracking-tight text-[#F4F7F5] group-hover:text-[#39F5B5] transition-colors">
            GuruKul AI
          </span>
        </Link>

        {/* RIGHT: Nav Links + Get Started ↗ */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8 font-sans text-sm text-[#F4F7F5]/60">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#F4F7F5] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Link
            href="/app"
            className="px-4 py-2 rounded-full bg-[#39F5B5] text-[#050706] text-xs font-sans font-semibold tracking-wide hover:bg-[#1BBF8A] transition-all duration-300 shadow-[0_0_20px_rgba(57,245,181,0.3)] flex items-center gap-1 group"
          >
            <span>Get Started</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#F4F7F5] focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-3 pt-3 border-t border-[#39F5B5]/10 bg-[#050706]/95 rounded-2xl p-4 flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-[#F4F7F5]/80 hover:text-[#39F5B5] rounded-lg transition-colors font-sans"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10">
              <Link
                href="/app"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-xs font-sans font-semibold bg-[#39F5B5] text-[#050706] rounded-full flex items-center justify-center gap-1 shadow-[0_0_20px_rgba(57,245,181,0.3)]"
              >
                <span>Get Started</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
