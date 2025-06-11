import ArtistDataInterface from "../interfaces/ArtistDataInterface";
import { supabase } from "../lib/supabase";

export const fetchSpotifyAccessToken = async () => {
  const tokenBuffer = btoa(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' + process.env.REACT_APP_SPOTIFY_SECRET_KEY);
  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      'Authorization': `Basic ${tokenBuffer}`,
    },
    body: urlencoded
  })
  return await response.json();
}

// Legacy JSON fetch - keeping for fallback
export const fetchArtistDataFromJSON = async (): Promise<Record<string, ArtistDataInterface>> => {
  const res = await fetch(`${process.env.PUBLIC_URL}/getArtistData.json`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  const pageList = await res.json();
  return pageList
}

// New Supabase-based data fetching
export const fetchArtistData = async (): Promise<Record<string, ArtistDataInterface>> => {
  try {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
    
    if (error) {
      console.warn('Supabase fetch failed, falling back to JSON:', error)
      return await fetchArtistDataFromJSON()
    }
    
    // Transform array to object with slug as key
    const artistsMap: Record<string, ArtistDataInterface> = {}
    data?.forEach(artist => {
      artistsMap[artist.slug] = {
        title: artist.title,
        bio: artist.bio,
        assets_folder_name: artist.assets_folder_name,
        main_group_image: artist.main_group_image,
        total_youtube_subscribers: artist.total_youtube_subscribers,
        most_watched_videos: artist.most_watched_videos,
        total_spotify_followers: artist.total_spotify_followers,
        most_streamed_songs: artist.most_streamed_songs,
        instagram: artist.instagram,
        social_media_info: artist.social_media_info,
        total_album_sales: artist.total_album_sales,
        album_list: artist.album_list
      }
    })
    
    return artistsMap
  } catch (error) {
    console.warn('Supabase connection failed, falling back to JSON:', error)
    return await fetchArtistDataFromJSON()
  }
}

export const searchArtists = async (query: string): Promise<ArtistDataInterface[]> => {
  try {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .or(`title.ilike.%${query}%,bio.ilike.%${query}%`)
      .limit(20)
    
    if (error) throw error
    
    return data?.map(artist => ({
      title: artist.title,
      bio: artist.bio,
      assets_folder_name: artist.assets_folder_name,
      main_group_image: artist.main_group_image,
      total_youtube_subscribers: artist.total_youtube_subscribers,
      most_watched_videos: artist.most_watched_videos,
      total_spotify_followers: artist.total_spotify_followers,
      most_streamed_songs: artist.most_streamed_songs,
      instagram: artist.instagram,
      social_media_info: artist.social_media_info,
      total_album_sales: artist.total_album_sales,
      album_list: artist.album_list
    })) || []
  } catch (error) {
    console.warn('Search failed, falling back to JSON data')
    const allData = await fetchArtistDataFromJSON()
    return Object.values(allData).filter(artist => 
      artist.title.toLowerCase().includes(query.toLowerCase()) ||
      artist.bio.toLowerCase().includes(query.toLowerCase())
    )
  }
}