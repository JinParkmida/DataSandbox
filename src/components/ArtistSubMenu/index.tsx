import React, { useMemo } from 'react'
import NavItem from '../NavItem';

interface ArtistSubMenuProps {
  artistId: string
}
export default function ArtistSubMenu({ artistId }: ArtistSubMenuProps) {
  
  const navOptions = useMemo(() => ([
    {link: 'profile-section', label: 'Profile'},
    {link: 'youtube-counts-section', label: 'YouTube', caption: 'viewcount & subscribers'},
    {link: 'albums-section', label: 'Album', caption: 'sales'},
    {link: 'spotify-and-itunes-section', label: 'Spotify & iTunes', caption: 'plays & listeners'},
    {link: 'social-media-section', label: 'Social Media', caption: 'followers & interactions'},
  ]), [artistId]);

  return (
    <div className="hidden top-0 border-y-[0.5px] dark:border-cream border-black">
      <nav className="mx-10 overflow-x-auto border-x-[0.5px] dark:border-cream border-black">
        <ul className="grid grid-cols-5 divide-x-[0.5px] dark:divide-cream divide-black">
          {navOptions.map((navItem) => <NavItem key={`nav-${navItem.link}`} item={navItem} />)}
        </ul>
      </nav>
    </div>
  )
}
