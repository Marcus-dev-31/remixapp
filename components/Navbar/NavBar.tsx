"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
