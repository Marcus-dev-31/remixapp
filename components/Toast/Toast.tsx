'use client';

import { motion } from 'framer-motion';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  return (
    <motion.div
      className={styles.toast}
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 20, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
    >
      {message}
    </motion.div>
  );
}