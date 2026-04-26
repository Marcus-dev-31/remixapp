import { notFound } from 'next/navigation';
import { CREATORS, TRACKS } from '@/lib/mock-data';
import CreatorProfile from '@/components/CreatorProfile/CreatorProfile';
import styles from './page.module.css';

interface CreatorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CREATORS.map((creator) => ({ slug: creator.slug }));
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const { slug } = await params;

  const creator = CREATORS.find((c) => c.slug === slug);
  if (!creator) notFound();

  const creatorTracks = TRACKS.filter((t) => t.artistSlug === slug);
  const creatorGenres = [...new Set(creatorTracks.map((t) => t.genre))];

  const mostPlayed = creatorTracks.reduce<typeof creatorTracks[0] | null>(
    (acc, t) => (!acc || t.plays > acc.plays ? t : acc),
    null
  );

  const avgRating = creatorTracks.length
    ? (creatorTracks.reduce((acc, t) => acc + t.rating, 0) / creatorTracks.length).toFixed(1)
    : '—';

  const totalDownloads = creatorTracks.reduce((acc, t) => acc + t.downloads, 0);
  const totalRatingVotes = creatorTracks.reduce((acc, t) => acc + t.ratingCount, 0);

  const contacts = [
    creator.email && { key: 'email', icon: '✉', label: creator.email, href: `mailto:${creator.email}` },
    creator.instagram && { key: 'instagram', icon: '📸', label: `@${creator.instagram}`, href: `https://instagram.com/${creator.instagram}` },
    creator.youtube && { key: 'youtube', icon: '▶', label: creator.youtube, href: `https://youtube.com/@${creator.youtube}` },
    creator.website && { key: 'website', icon: '🔗', label: creator.website.replace('https://', ''), href: creator.website },
  ].filter(Boolean) as { key: string; icon: string; label: string; href: string }[];

  return (
    <main className={styles.main}>
      <CreatorProfile
        creator={creator}
        creatorTracks={creatorTracks}
        creatorGenres={creatorGenres}
        contacts={contacts}
        mostPlayed={mostPlayed}
        avgRating={avgRating}
        totalDownloads={totalDownloads}
        totalRatingVotes={totalRatingVotes}
      />
    </main>
  );
}