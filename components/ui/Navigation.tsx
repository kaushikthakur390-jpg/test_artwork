"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Don't show full navigation on the invitation landing page
  if (pathname === "/") {
    return null;
  }

  const links = [
    { href: "/viewing-room", label: "VIEWING ROOM" },
    { href: "/artwork/sculpture", label: "WORKS" },
    { href: "#", label: "ENQUIRE", onClick: () => window.dispatchEvent(new Event("open-enquiry")) },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-offwhite pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/viewing-room" className="text-xs tracking-[0.2em] font-medium hover:opacity-70 transition-opacity">
            PRIVATE VIEWING
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 pointer-events-auto">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                  link.onClick();
                }
              }}
              className={cn(
                "text-xs tracking-[0.2em] font-medium transition-opacity",
                pathname === link.href ? "opacity-100" : "opacity-60 hover:opacity-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden pointer-events-auto opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Open Menu"
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 bg-charcoal text-offwhite flex flex-col justify-center items-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Close Menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
            <div className="flex flex-col space-y-8 text-center">
              {links.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.onClick) {
                        e.preventDefault();
                        link.onClick();
                      }
                      setIsOpen(false);
                    }}
                    className="text-lg tracking-[0.2em] font-medium opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
