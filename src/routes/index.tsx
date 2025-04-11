import { component$, useVisibleTask$ } from '@builder.io/qwik';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import BrandLink from '~/components/brand-link/BrandLink';
import Carousal from '~/components/carousal/Carousal';
import LinkCard from '~/components/link-card/LinkCard';
import Editor from '~/components/wyswyg/Editor';

const commonSwiperOptions = {
	loop: true,
	modules: [Navigation],
	slidesPerView: 1,
	spaceBetween: 10,
	breakpoints: {
		320: {
			slidesPerView: 2,
		},
		640: {
			slidesPerView: 3,
		},
		768: {
			slidesPerView: 4,
		},
		1024: {
			slidesPerView: 5,
		},
	},
};

export default component$(() => {
	const links = ['Link1', 'Link2', 'Link3', 'Link4'];
	const brands = ['Brand1', 'Brand2', 'Brand3', 'Brand4', 'Brand5', 'Brand6', 'Brand7', 'Brand8'];
	const products = [
		'Product1',
		'Product2',
		'Product3',
		'Product4',
		'Product5',
		'Product6',
		'Product7',
		'Product8',
	];

	return (
		<div>
			<AnnouncementBar announcementText="Sale ends in 2 days!" />
			<Carousal />
			<div class="pt-12 md:pt-24 xl:max-w-7xl xl:mx-auto px-2 md:px-6 flex flex-col gap-y-12 md:gap-y-24">
				<section>
					<div class="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
						{links.map((link) => {
							return (
								<LinkCard
									key={link}
									href="/"
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyW7l-lLoY4nBYEnqA9ydYbUU56CgDtaq-rQ&s"
									name={link}
								/>
							);
						})}
					</div>
				</section>
				<section>
					<BrandsSlider brands={brands} />
				</section>
				<section>
					<NewProductsSlider products={products} />
				</section>
				<section>
					<HotProductsSlider products={products} />
				</section>
				<section>
					<div class="flex justify-center">
						<Editor />
					</div>
				</section>
			</div>
		</div>
	);
});

const AnnouncementBar = component$<{ announcementText: string }>(({ announcementText }) => {
	return (
		<div class="p-3">
			<p class="text-center font-semibold">{announcementText}</p>
		</div>
	);
});

const BrandsSlider = component$<{ brands: string[] }>(({ brands }) => {
	useVisibleTask$(() => {
		new Swiper('.brand-swiper', {
			navigation: {
				nextEl: '.swiper-button-next-brand',
				prevEl: '.swiper-button-prev-brand',
			},
			direction: 'horizontal',
			...commonSwiperOptions,
		});
	});

	return (
		<div class="brand-swiper swiper">
			<div class="swiper-wrapper">
				{brands.map((brand) => {
					return (
						<div key={brand} class="swiper-slide">
							<div class="flex justify-center">
								<BrandLink
									name={brand}
									href="/account/"
									src="https://images.seeklogo.com/logo-png/31/2/honda-logo-png_seeklogo-310689.png"
								/>
							</div>
						</div>
					);
				})}
			</div>
			<div class="swiper-button-prev swiper-button-next-brand"></div>
			<div class="swiper-button-next swiper-button-next-brand"></div>
		</div>
	);
});

const NewProductsSlider = component$<{ products: string[] }>(({ products }) => {
	useVisibleTask$(() => {
		new Swiper('.newest-products-swiper', {
			navigation: {
				nextEl: '.swiper-button-next-new',
				prevEl: '.swiper-button-prev-new',
			},
			direction: 'horizontal',
			...commonSwiperOptions,
		});
	});

	return (
		<div>
			<div class="sm:px-6 lg:px-8 xl:px-0 pb-4">
				<h2 class="text-2xl text-center font-semibold text-gray-900">{$localize`Newest Products`}</h2>
			</div>
			<div class="newest-products-swiper swiper">
				<div class="swiper-wrapper">
					{products.map((product) => {
						return (
							<div key={product} class="swiper-slide">
								<div class="flex justify-center">
									<BrandLink
										name={product}
										href="/account/"
										src="https://i.pinimg.com/736x/23/af/2f/23af2f41af8df4154630cd6aa45ae802.jpg"
									/>
								</div>
							</div>
						);
					})}
				</div>
				<div class="swiper-button-prev swiper-button-next-new"></div>
				<div class="swiper-button-next swiper-button-next-new"></div>
			</div>
		</div>
	);
});

const HotProductsSlider = component$<{ products: string[] }>(({ products }) => {
	useVisibleTask$(() => {
		new Swiper('.hot-products-swiper', {
			navigation: {
				nextEl: '.swiper-button-next-hot',
				prevEl: '.swiper-button-prev-hot',
			},
			direction: 'horizontal',
			...commonSwiperOptions,
		});
	});

	return (
		<div>
			<div class="sm:px-6 lg:px-8 xl:px-0 pb-4">
				<h2 class="text-2xl text-center font-semibold text-gray-900">{$localize`Hottest Products`}</h2>
			</div>
			<div class="hot-products-swiper swiper">
				<div class="swiper-wrapper">
					{products.map((product) => {
						return (
							<div key={product} class="swiper-slide">
								<div class="flex justify-center">
									<BrandLink
										name={product}
										href="/account/"
										src="https://cdn.logojoy.com/wp-content/uploads/20240202171627/2002-Ferrari-Logo-600x319.png"
									/>
								</div>
							</div>
						);
					})}
				</div>
				<div class="swiper-button-prev swiper-button-next-hot"></div>
				<div class="swiper-button-next swiper-button-next-hot"></div>
			</div>
		</div>
	);
});
