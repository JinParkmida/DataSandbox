export type MostWatchedVideosType = {
    video_total_views: number;
    video_title: string;
    video_date_published: string;
    video_url: string;
    video_thumbnail: string;
}
export type MostStreamedSongsType = {
    song_total_views: number;
    song_title: string;
    song_date_published: string;
    song_url: string;
    song_thumbnail: string;
}
export type InstagramMembersType = {
    hashtag: string;
    total_followers: number;
    account_thumbnail: string;
    url: string;
}
export type SocialMediaInfoType = {
    social_media: string;
    account: string;
    total_followers: number;
    new_followers_today: number;
}
export type AlbumInfoType = {
    album_title: string;
    album_info: string;
    album_released_date: string;
    album_total_sales: number;
    album_thumbnail: string;
}

export type InstagramInfoType = {
    hashtag: string;
    members_instagram: InstagramMembersType[];
}

export default interface ArtistDataInterface {
    title: string;
    bio: string;
    assets_folder_name: string;
    main_group_image: string;
    total_youtube_subscribers: number;
    most_watched_videos: MostWatchedVideosType[];
    total_spotify_followers: number;
    most_streamed_songs: MostStreamedSongsType[];
    instagram: InstagramInfoType;
    social_media_info: SocialMediaInfoType[];
    total_album_sales: number;
    album_list: AlbumInfoType[];
}