import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import BrandLink from '~/components/brand-link/BrandLink';
import Carousal from '~/components/carousal/Carousal';
import CollectionCard from '~/components/collection-card/CollectionCard';
import LinkCard from '~/components/link-card/LinkCard';
import { APP_STATE } from '~/constants';

export default component$(() => {
	const collections = useContext(APP_STATE).collections;

	const links = ['Link1', 'Link2', 'Link3', 'Link4'];

	useVisibleTask$(() => {
		new Swiper('.brand-swiper', {
			direction: 'horizontal',
			loop: true,
			pagination: {
				el: '.swiper-pagination',
			},
			navigation: {
				nextEl: '.swiper-button-next-brand',
				prevEl: '.swiper-button-prev-brand',
			},
			scrollbar: {
				el: '.swiper-scrollbar-brand',
			},
			modules: [Navigation, Pagination],
			slidesPerView: 6,
			spaceBetween: 10,
		});
	});

	return (
		<div>
			<Carousal />
			<div class="pt-12 xl:max-w-7xl xl:mx-auto px-2 md:px-6 flex flex-col">
				<section>
					<div class="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{links.map((link) => {
							return (
								<LinkCard
									href="/"
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyW7l-lLoY4nBYEnqA9ydYbUU56CgDtaq-rQ&s"
									name={link}
								/>
							);
						})}
					</div>
				</section>
				<section>
					<div class="mt-8">
						<h2 class="text-2xl font-light tracking-tight text-gray-900">{$localize`Brands`}</h2>
						<div class="overflow-hidden mt-4">
							<div class="brand-swiper swiper">
								<div class="swiper-wrapper">
									{['Brand1', 'Brand2', 'Brand3', 'Brand4', 'Brand5', 'Brand6', 'Brand7'].map(
										(brand) => {
											return (
												<div class="swiper-slide flex justify-center">
													<BrandLink
														name={brand}
														href="/account/"
														src="https://images.seeklogo.com/logo-png/31/2/honda-logo-png_seeklogo-310689.png"
													/>
												</div>
											);
										}
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<section class="pt-12 xl:max-w-7xl xl:mx-auto xl:px-8">
				<div class="mt-4 flow-root">
					<div class="-my-2">
						<div class="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
							<div class="sm:px-6 lg:px-8 xl:px-0 pb-4">
								<h2 class="text-2xl font-light tracking-tight text-gray-900">{$localize`Shop by Category`}</h2>
							</div>
							<div class="grid justify-items-center grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8">
								{collections.map((collection) =>
									collection.featuredAsset ? (
										<CollectionCard key={collection.id} collection={collection} />
									) : null
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
});
