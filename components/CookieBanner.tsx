"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const refuse = () => {
    localStorage.setItem("cookie_consent", "refused");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-navy/95 backdrop-blur-md border-t border-white/10 px-6 py-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-white/80">
          <p>
            Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic du site.{" "}
            <Link href="/cookies" className="text-orange hover:underline">
              En savoir plus
            </Link>
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={refuse}
            className="px-4 py-2 text-sm text-white/70 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm text-white bg-orange rounded-lg hover:bg-orange-hot transition-colors font-medium"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
