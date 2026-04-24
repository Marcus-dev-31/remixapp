import type { Creator } from "@/types";
import styles from "./CreatorCard.module.css";

interface CreatorCardProps {
  creator: Creator;
  onClick: (creator: Creator) => void;
}

export default function CreatorCard({ creator, onClick }: CreatorCardProps) {
  return (
    <div className={styles.card} onClick={() => onClick(creator)}>
      <div className={styles.accent} style={{ background: creator.accent }} />
      <div
        className={styles.avatar}
        style={{ background: `${creator.accent}18` }}
      >
        {creator.avatar}
      </div>
      <div className={styles.name}>{creator.name}</div>
      <div className={styles.stats}>
        <span>{creator.tracks} tracks</span>
        <span>{creator.followers.toLocaleString()} seguidores</span>
      </div>
    </div>
  );
}
