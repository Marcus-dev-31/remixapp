"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/NavBar";
import MobileMenu from "../MobileMenu/MobileMenu";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />
    </>
  );
}
