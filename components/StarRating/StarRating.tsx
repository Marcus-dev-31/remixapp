"use client";

import { useState } from "react";
import styles from "./StarRating.module.css";
import { div, span } from "framer-motion/client";

interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onRate?: (score: number) => void;
  size?: number;
}

export default function StarRating({
  rating,
  interactive = false,
  onRate,
  size = 16,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const activeRating = hovered || Math.round(rating);

  return (
    <div
      className={styles.container}
      role={interactive ? "radiogroup" : undefined}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={[
            styles.star,
            star <= activeRating ? styles.filled : "",
            interactive ? styles.interactive : "",
            hovered >= star ? styles.hovered : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ fontSize: size }}
          onClick={() => interactive && onRate?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          role={interactive ? "radio" : undefined}
          aria-checked={interactive ? star === Math.round(rating) : undefined}
          aria-label={
            interactive ? `${star} estrella${star !== 1 ? "s" : ""}` : undefined
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}
