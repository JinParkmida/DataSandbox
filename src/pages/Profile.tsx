import React from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import useDebouncedResize from '../hooks/useDebouncedResize';
import ArtistDataInterface from '../interfaces/ArtistDataInterface';

interface ProfileProps {
	artist: ArtistDataInterface
}

const Profile = ({ artist }: ProfileProps) => {
	const { windowSize } = useDebouncedResize();
	const { width } = windowSize;
	const tl = gsap.timeline({ delay: 1, onStart: () => { document.documentElement.classList.add('overflow-hidden') } });

	React.useEffect(() => {

		const bioLines = new SplitType(".artist-bio__text-list", {
			types: "lines",
			lineClass: "artist-bio__text-line clip-text-reveal overflow-hidden"
		})

		const wrapper = document.querySelector(".artist-bio__text-list");

		gsap.to(".artist-bio__text-line", {
			backgroundPositionX: "0%",
			stagger: 0.5,
			ease: "Power3.InOut",
			scrollTrigger: {
				trigger: ".artist-bio__text-line",
				scrub: 1,
				start: "top 80% reverse",
				end: `+=${wrapper?.clientHeight}`,
			}
		})

	}, [width])

	React.useEffect(() => {
		const titleLines = new SplitType(".artist-info__title-line", {
			types: "lines",
			lineClass: "artist-info__title-subline overflow-hidden"
		})
		tl.fromTo('.artist-info__title-subline', {
			yPercent: 100,
			skewY: 10,
			opacity: 0,
		}, {
			yPercent: 0,
			skewY: 0,
			opacity: 1,
			ease: "power3.inOut",
			duration: 0.7,
			stagger: 0.2
		})
		tl.fromTo('.artist-image__wrapper', { clipPath: "inset(0% 0% 100% 0%)" }, {
			clipPath: "inset(0% 0% 0% 0%)",
			ease: "expo.inOut",
			duration: 1.2,
			onComplete: () => {
				setTimeout(() => {
					document.documentElement.classList.remove('overflow-hidden')
				}, 500)
				tl.kill();
				gsap.to('.artist-info__title', {
					y: 100,
					opacity: 0,
					ease: "linear",
					scrollTrigger: {
						trigger: '.artist-image__wrapper',
						scrub: true,
						start: "center 50%",
						end: "bottom 50%",
						toggleActions: "none none reverse pause"
					}
				})

				gsap.fromTo('.artist-image__wrapper', { clipPath: "inset(0% 0% 0% 0%)" }, {
					clipPath: "inset(0% 0% 100% 0%)",
					opacity: 0,
					ease: "linear",
					scrollTrigger: {
						trigger: '.artist-image__wrapper',
						scrub: true,
						start: "center 45%",
						end: "bottom top"
					}
				})
			}
		}, "-=.3")

		tl.play();

	}, [])

	return (
		<section className="artist-profile relative w-full flex min-h-screen section-padding">
			<div className='artist-container items-center px-4 w-full md:max-w-[70vw] mx-auto'>
				<div className='artist-info'>
					<div className='artist-title__container isolate h-screen-responsive grid'>
						<div className='flex justify-center items-center h-auto self-center relative -mb-[20vh]'>
							<h1 className='artist-info__title font-dm-serif absolute -top-[8vh] md:-top-[10vh] left-0 right-0 flex flex-col'>
								<span className='artist-info__title-line overflow-hidden text-[clamp(70px,11vw,150px)] will-change-transform skew-y-0 translate-y-0 bg-clip-text capitalize text-fill-transparent text-stroke-1 text-stroke-black dark:text-stroke-cream leading-none mb-2'>discover</span>
								<span className='artist-info__title-line overflow-hidden text-[clamp(50px,11vw,150px)] will-change-transform uppercase z-20'>{artist.title}</span>
							</h1>
							<div className='artist-image__container flex flex-1 shrink-0 justify-center items-center w-full h-[333px] sm:h-auto max-w-[250px] md:max-w-md mx-auto'>
								<div className='artist-image__wrapper overflow-hidden rounded-t-full -z-[1] clip-inset-top'>
									<img
										className='artist-info__group-image aspect-[3/4] object-cover'
										src={require(`../assets/${artist.assets_folder_name}/${artist.main_group_image}`)}
										alt={artist.title}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className='artist-bio__wrapper pt-[15vh]'>
						<p className='artist-bio__text-list whitespace-pre-line font-light tracking-wide text-[clamp(28px,4vw,8vw)]'>{artist.bio}</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Profile
