import { useMemo } from 'react';
import styles from './Waveform.module.css';

interface WaveformProps {
  color: string;
  playing?: boolean;
  small?: boolean;
}

export default function Waveform({
  color,
  playing = false,
  small = false,
}: WaveformProps) {
  const bars = small ? 20 : 48;
  const height = small ? 28 : 44;

  const barHeights = useMemo(() => {
    return Array.from({ length: bars }, (_, i) => {
      const wave = Math.sin(i * 0.4) * 0.5;
      const detail = Math.abs(Math.sin(i * 1.7)) * 0.5;
      const maxH = small ? 24 : 36;
      return Math.round(Math.max(3, (wave + detail) * maxH) * 100) / 100;
    });
  }, [bars, small]);

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${bars * 4} ${height}`}
      className={styles.waveform}
      aria-hidden="true"
    >
      {barHeights.map((barHeight, i) => {
        const isPlayed = i / bars < 0.4;
        const fill = playing && isPlayed ? color : `${color}33`;

        return (
          <rect
            key={i}
            x={i * 4}
            y={Math.round((height / 2 - barHeight / 2) * 100) / 100}
            width={2.2}
            height={barHeight}
            rx={1.1}
            fill={fill}
            style={{ transition: 'fill 0.3s ease' }}
          />
        );
      })}
    </svg>
  );
}