"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const handleNavClick = () => {
    onClose();
  };

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
        onClick={handleNavClick}
      >
        Explorar
      </Link>

      <Link
        href="/creators"
        className={`${styles.link} ${pathname.startsWith("/creators") ? styles.linkActive : ""}`}
        onClick={handleNavClick}
      >
        Creadores
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
