import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { Image } from 'qwik-image';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { HOMEPAGE_IMAGE } from '~/constants';

export default component$(() => {
	useVisibleTask$(() => {
		new Swiper('.swiper', {
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
		});
	});

	return (
		<div class="swiper w-full h-screen">
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<div class="absolute inset-0 overflow-hidden">
						<Image
							layout="fullWidth"
							class="h-full md:w-full"
							src={HOMEPAGE_IMAGE}
							alt="Background header photo of bicycle taken by Mikkel Bech"
						/>
						<div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700 mix-blend-overlay" />
					</div>
				</div>
				<div class="swiper-slide">
					<div class="absolute inset-0 overflow-hidden">
						<Image
							layout="fullWidth"
							class="h-full md:w-full"
							src={HOMEPAGE_IMAGE}
							alt="Background header photo of bicycle taken by Mikkel Bech"
						/>
						<div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700 mix-blend-overlay" />
					</div>
				</div>
				<div class="swiper-slide">
					<div class="absolute inset-0 overflow-hidden">
						<Image
							layout="fullWidth"
							class="h-full md:w-full"
							src={HOMEPAGE_IMAGE}
							alt="Background header photo of bicycle taken by Mikkel Bech"
						/>
						<div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700 mix-blend-overlay" />
					</div>
				</div>
			</div>
			<div class="swiper-pagination"></div>

			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>

			<div class="swiper-scrollbar"></div>
		</div>
	);
});
