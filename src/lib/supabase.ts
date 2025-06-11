import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      artists: {
        Row: {
          id: string
          slug: string
          title: string
          bio: string
          assets_folder_name: string
          main_group_image: string
          total_youtube_subscribers: number
          most_watched_videos: any[]
          total_spotify_followers: number
          most_streamed_songs: any[]
          instagram: any
          social_media_info: any[]
          total_album_sales: number
          album_list: any[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          bio: string
          assets_folder_name: string
          main_group_image: string
          total_youtube_subscribers: number
          most_watched_videos: any[]
          total_spotify_followers: number
          most_streamed_songs: any[]
          instagram: any
          social_media_info: any[]
          total_album_sales: number
          album_list: any[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          bio?: string
          assets_folder_name?: string
          main_group_image?: string
          total_youtube_subscribers?: number
          most_watched_videos?: any[]
          total_spotify_followers?: number
          most_streamed_songs?: any[]
          instagram?: any
          social_media_info?: any[]
          total_album_sales?: number
          album_list?: any[]
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}