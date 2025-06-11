import Counter from "../Counter"

type Props = {
    index: number,
    social_media: string,
    account: string,
    total_followers: number,
    new_followers_today: number
}

export default function SocialMediaCard({ index, social_media, account, total_followers, new_followers_today }: Props) {
    return (
        <li key={`social-media-card-${index}`} className='relative aspect-video w-full changing-border z-[1]'>
            <a href="http://" target="_blank" rel="noopener noreferrer" className='grid place-content-center h-full w-full space-y-3 px-5 py-8 bg-cream dark:bg-black'>
                <div className='font-bold'>
                    <p className='text-base'>{social_media}</p>
                    <h4 className='text-xl'>{account}</h4>
                </div>
                <div className='font-light grid '>
                    <span className='text-base'>Total follower: <Counter
                        className='text-base'
                        from={100000}
                        to={total_followers}
                        duration={2}
                    /></span>
                    <span className='text-base'>New today: <Counter
                        className='text-base'
                        from={1}
                        to={new_followers_today}
                    /></span>
                </div>
            </a>
            <span className='absolute -bottom-2 -right-2 bg-black dark:bg-cream w-full h-full -z-[1] dark:-z-[1]' />
        </li>
    )
}