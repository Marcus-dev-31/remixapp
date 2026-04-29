"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useNovedades } from "@/context/NovedadesContext";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  onSearch,
  searchQuery,
}: MobileMenuProps) {
  const pathname = usePathname();
  const { hasNewTracks } = useNovedades();

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
    >
      <button
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Cerrar menú"
      >
        ✕
      </button>
      <Link
        href="/"
        className={`${styles.link} ${pathname === "/" ? styles.linkActive : ""}`}
        onClick={onClose}
      >
        Explorar
      </Link>

      <Link
        href="/creators"
        className={`${styles.link} ${pathname.startsWith("/creators") ? styles.linkActive : ""}`}
        onClick={onClose}
      >
        Creadores
      </Link>

      <Link
        href="/novedades"
        className={`${styles.link} ${pathname === "/novedades" ? styles.linkActive : ""}`}
        onClick={onClose}
      >
        Novedades
        {hasNewTracks && (
          <motion.span
            className={styles.glowDot}
            animate={{
              boxShadow: [
                '0 0 4px 2px #06B6D4',
                '0 0 10px 4px #06B6D4',
                '0 0 4px 2px #06B6D4',
              ],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </Link>

      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>⌕</span>
        <input
          type="search"
          placeholder="Buscar tracks, artistas..."
          value={searchQuery}
          onChange={(e) => {
            onSearch(e.target.value);
            onClose();
          }}
          className={styles.searchInput}
          aria-label="Buscar tracks y artistas"
        />
      </div>
    </div>
  );
}