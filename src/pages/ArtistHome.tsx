import { useMatch } from '@tanstack/react-location';
import useSessionStorage from '../hooks/useSessionStorage';
import ArtistSubMenu from '../components/ArtistSubMenu';
import { Profile, YoutubeStats, StreamStats, SocialMedia, Album } from './';
import { AnimatePresence, motion } from 'framer-motion';
import { LocationGenerics } from '../routes';

export default function ArtistHome() {
  const [artistId, _] = useSessionStorage("artist", "");
  const { data: { artist } } = useMatch<LocationGenerics>();

  if (!artist) return <span>Loading...</span>

  return (
    <div id="artistPage">
      <ArtistSubMenu artistId={artistId} />
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key="content-section"
          className="container mx-auto px-8 lg:px-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Profile {...{ artist }} />
          <YoutubeStats {...{ artist }} />
          <StreamStats {...{ artist }} />
          <SocialMedia {...{ artist }} />
          <Album {...{ artist }} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
