"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Creator } from "@/types";
import styles from "./CreatorCard.module.css";

interface CreatorCardProps {
  creator: Creator;
  index?: number;
  onClick?: (creator: Creator) => void;
}

export default function CreatorCard({
  creator,
  index = 0,
  onClick,
}: CreatorCardProps) {
  return (
    <Link href={`/creators/${creator.slug}`} className={styles.link}>
      <motion.div
        className={styles.card}
        onClick={() => onClick?.(creator)}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1, boxShadow: `0 0 0px 0px ${creator.accent}00` }}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          y: -8,
          scale: 1.03,
          boxShadow: `0 0 30px 6px ${creator.accent}40, 0 0 60px 12px ${creator.accent}20`,
          transition: { type: "spring", stiffness: 400, damping: 20 },
        }}
        whileTap={{ scale: 0.96 }}
      >
        <div className={styles.accent} style={{ background: creator.accent }} />
        <motion.div
          className={styles.avatar}
          style={{ background: `${creator.accent}18` }}
          whileHover={{
            scale: 1.15,
            rotate: [0, -8, 8, 0],
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {creator.avatar}
        </motion.div>
        <div className={styles.name}>{creator.name}</div>
        <div className={styles.stats}>
          <span>{creator.tracks} tracks</span>
          <span>{creator.followers.toLocaleString("es-AR")} seguidores</span>
        </div>
      </motion.div>
    </Link>
  );
}
