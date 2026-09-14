"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function EnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsSubmitted(false);
    };
    window.addEventListener("open-enquiry", handleOpen);
    return () => window.removeEventListener("open-enquiry", handleOpen);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, send the data to an API
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal / Sheet */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:w-[500px] z-50 bg-offwhite text-charcoal shadow-2xl md:rounded-lg overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex justify-between items-center p-6 border-b border-charcoal/10">
              <h2 className="font-serif text-2xl tracking-tight">Enquire</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="opacity-60 hover:opacity-100 transition-opacity p-2 -mr-2"
                aria-label="Close"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center"
                >
                  <p className="font-serif text-2xl mb-4">Thank you.</p>
                  <p className="text-sm opacity-70 mb-2">Your enquiry has been received.</p>
                  <p className="text-sm opacity-70">The gallery will be in touch shortly.</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-8 text-xs tracking-widest uppercase border-b border-charcoal pb-1 hover:opacity-60 transition-opacity"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-widest opacity-60 mb-2">Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full bg-transparent border-b border-charcoal/20 py-2 text-sm focus:border-charcoal focus:outline-none transition-colors rounded-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-widest opacity-60 mb-2">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full bg-transparent border-b border-charcoal/20 py-2 text-sm focus:border-charcoal focus:outline-none transition-colors rounded-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-widest opacity-60 mb-2">Message</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      className="w-full bg-transparent border-b border-charcoal/20 py-2 text-sm focus:border-charcoal focus:outline-none transition-colors resize-none rounded-none"
                    ></textarea>
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-charcoal text-offwhite py-4 text-xs tracking-[0.2em] uppercase hover:bg-charcoal/90 transition-colors"
                    >
                      Send Enquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
