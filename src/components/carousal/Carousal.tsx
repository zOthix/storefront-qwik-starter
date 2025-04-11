import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { HOMEPAGE_IMAGE } from '~/constants';

export default component$(() => {
	const loc = useLocation();
	const origin = loc.url.origin;
	const imageUrl = `${origin}/${HOMEPAGE_IMAGE}`;

	useVisibleTask$(() => {
		new Swiper('.carousal-swiper', {
			direction: 'horizontal',
			loop: true,
			pagination: {
				el: '.swiper-pagination',
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			scrollbar: {
				el: '.swiper-scrollbar',
			},
			modules: [Navigation, Pagination],
			slidesPerView: 1,
		});
	});

	return (
		<div class="carousal-swiper swiper">
			<div class="swiper-wrapper">
				{[...Array(3)].map((_, i) => (
					<div class="swiper-slide">
						<div
							style={{
								backgroundImage: `url(${imageUrl})`,
							}}
							class="relative h-screen w-full bg-center bg-cover"
						>
							<div class="inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-indigo-700 mix-blend-overlay" />
						</div>
					</div>
				))}
			</div>
			<div class="swiper-pagination"></div>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
			<div class="swiper-scrollbar"></div>
		</div>
	);
});
