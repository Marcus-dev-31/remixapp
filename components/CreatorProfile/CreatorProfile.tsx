'use client';

import { motion, type Variants } from 'framer-motion';
import type { Track, Creator } from '@/types';
import TrackList from '@/components/TrackList/TrackList';
import styles from '@/app/creators/[slug]/page.module.css';

interface Contact {
  key: string;
  icon: string;
  label: string;
  href: string;
}

interface CreatorProfileProps {
  creator: Creator;
  creatorTracks: Track[];
  creatorGenres: string[];
  contacts: Contact[];
  mostPlayed: Track | null;
  avgRating: string;
  totalDownloads: number;
  totalRatingVotes: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

export default function CreatorProfile({
  creator,
  creatorTracks,
  creatorGenres,
  contacts,
  mostPlayed,
  avgRating,
  totalDownloads,
  totalRatingVotes,
}: CreatorProfileProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Banner */}
      <motion.div
        className={styles.banner}
        style={{
          background: `linear-gradient(135deg, ${creator.accent}30 0%, ${creator.accent}08 60%, transparent 100%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Hero */}
      <motion.section className={styles.hero} variants={itemVariants}>
        <motion.div
          className={styles.avatarWrapper}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.1 }}
        >
          <motion.div
            className={styles.avatar}
            style={{
              background: `${creator.accent}18`,
              boxShadow: `0 0 40px 8px ${creator.accent}30`,
            }}
            animate={{
              boxShadow: [
                `0 0 40px 8px ${creator.accent}30`,
                `0 0 60px 16px ${creator.accent}50`,
                `0 0 40px 8px ${creator.accent}30`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {creator.avatar}
          </motion.div>
        </motion.div>

        <div className={styles.heroInfo}>
          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          >
            {creator.name}
          </motion.h1>
          <motion.p
            className={styles.bio}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {creator.bio}
          </motion.p>
          <motion.div
            className={styles.heroStats}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease }}
          >
            <div className={styles.heroStat}>
              <strong>{creator.tracks}</strong>
              <span>Tracks</span>
            </div>
            <div className={styles.heroStat}>
              <strong>{creator.followers.toLocaleString('es-AR')}</strong>
              <span>Seguidores</span>
            </div>
            <div className={styles.heroStat}>
              <strong>{creator.totalPlays.toLocaleString('es-AR')}</strong>
              <span>Reproducciones</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contacto */}
      {contacts.length > 0 && (
        <motion.div className={styles.contactBar} variants={itemVariants}>
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.key}
              href={contact.href}
              className={styles.contactLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ borderColor: `${creator.accent}30` }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.4 + index * 0.07,
                ease,
              }}
              whileHover={{
                scale: 1.05,
                y: -3,
                borderColor: creator.accent,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.contactIcon}>{contact.icon}</span>
              {contact.label}
            </motion.a>
          ))}
        </motion.div>
      )}

      {/* Géneros */}
      {creatorGenres.length > 0 && (
        <motion.div className={styles.section} variants={itemVariants}>
          <div className={styles.sectionLabel}>Géneros</div>
          <div className={styles.genrePills}>
            {creatorGenres.map((g, index) => (
              <motion.span
                key={g}
                className={styles.genrePill}
                style={{
                  background: `${creator.accent}15`,
                  color: creator.accent,
                  border: `1px solid ${creator.accent}30`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + index * 0.07,
                  ease,
                }}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {g}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Estadísticas */}
      <motion.div className={styles.section} variants={itemVariants}>
        <div className={styles.sectionLabel}>Estadísticas destacadas</div>
        <div className={styles.statsGrid}>
          {[
            {
              label: 'Track más reproducido',
              value: mostPlayed?.title ?? '—',
              sub: mostPlayed
                ? `${mostPlayed.plays.toLocaleString('es-AR')} reproducciones · ${mostPlayed.duration}`
                : 'Sin datos',
              isSmall: true,
            },
            {
              label: 'Calificación promedio',
              value: `${avgRating} ★`,
              sub: `sobre ${totalRatingVotes.toLocaleString('es-AR')} votos`,
              isSmall: false,
              color: creator.accent,
            },
            {
              label: 'Total de descargas',
              value: totalDownloads.toLocaleString('es-AR'),
              sub: `en ${creatorTracks.length} track${creatorTracks.length !== 1 ? 's' : ''}`,
              isSmall: false,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className={styles.statCard}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.55 + index * 0.1,
                ease,
              }}
              whileHover={{
                y: -4,
                boxShadow: `0 8px 32px ${creator.accent}20`,
                transition: { duration: 0.2 },
              }}
            >
              <div className={styles.statCardBar} style={{ background: creator.accent }} />
              <div className={styles.statCardLabel}>{stat.label}</div>
              <div
                className={stat.isSmall ? styles.statCardValueSm : styles.statCardValue}
                style={stat.color ? { color: stat.color } : {}}
              >
                {stat.value}
              </div>
              <div className={styles.statCardSub}>{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tracks */}
      <motion.div className={styles.section} variants={itemVariants}>
        <div className={styles.sectionLabel}>Tracks</div>
        <TrackList
          tracks={creatorTracks}
          emptyMessage="Este creador aún no tiene tracks"
        />
      </motion.div>
    </motion.div>
  );
}