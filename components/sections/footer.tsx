"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer
      className="border-t border-[rgba(39,39,42,0.4)] py-8 px-6 md:px-12"
      dir={t.dir}
    >
      <div className="max-w-[860px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[#3F3F46] text-xs">{t.footerLeft}</span>
        <div className="flex items-center gap-5">
          <Link
            href="/privacy"
            className="text-[#3F3F46] text-xs hover:text-[#71717A] transition-colors"
          >
            {t.footerPrivacy}
          </Link>
          <span className="text-[#3F3F46] text-xs">{t.footerRight}</span>
        </div>
      </div>
    </footer>
  );
}
