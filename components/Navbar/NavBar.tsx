"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useNovedades } from "@/context/NovedadesContext";
import styles from "./NavBar.module.css";

interface NavbarProps {
  onMenuToggle: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export default function Navbar({
  onMenuToggle,
  onSearch,
  searchQuery,
}: NavbarProps) {
  const pathname = usePathname();
  const { hasNewTracks } = useNovedades();

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        ◆ RemixHub
      </Link>

      <div className={styles.links}>
        <Link
          href="/"
          className={
            pathname === "/"
              ? `${styles.link} ${styles.linkActive}`
              : styles.link
          }
        >
          Explorar
        </Link>
        <Link
          href="/creators"
          className={
            pathname.startsWith("/creators")
              ? `${styles.link} ${styles.linkActive}`
              : styles.link
          }
        >
          Creadores
        </Link>
        <Link
          href="/novedades"
          className={
            pathname === "/novedades"
              ? `${styles.link} ${styles.linkActive}`
              : styles.link
          }
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
      </div>

      <div className={styles.search}>
        <span className={styles.searchIcon}>⌕</span>
        <input
          type="search"
          placeholder="Buscar tracks, artistas..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className={styles.searchInput}
          aria-label="Buscar tracks y artistas"
        />
      </div>

      <button
        className={styles.hamburger}
        onClick={onMenuToggle}
        aria-label="Abrir menú de navegación"
      >
        ☰
      </button>
    </nav>
  );
}