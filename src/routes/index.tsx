import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import BrandLink from '~/components/brand-link/BrandLink';
import Carousal from '~/components/carousal/Carousal';
import LinkCard from '~/components/link-card/LinkCard';
import { APP_STATE } from '~/constants';
import { Product } from '~/generated/graphql';
import { getProducts } from '~/providers/shop/products/products';

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

export const useProductsLoader = routeLoader$(async () => {
	const products = await getProducts({
		sort: {
			createdAt: 'DESC',
		},
		take: 8,
	});
	return products;
});

export default component$(() => {
	const appState = useContext(APP_STATE);
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

	const productsSignal = useProductsLoader();

	return (
		<div class="pb-12 md:pb-24">
			<Carousal items={appState.website.carousalItems} />
			<div class="pt-12 md:pt-24 xl:max-w-7xl xl:mx-auto px-2 md:px-6 flex flex-col gap-y-12 md:gap-y-24">
				<section>
					<div class="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
						{appState.website.weblinks.map((link) => {
							return (
								<LinkCard
									key={link?.id}
									href={link?.link ?? ''}
									src={link?.featuredAsset?.preview ?? ''}
									name={link?.linkText ?? ''}
								/>
							);
						})}
					</div>
				</section>
				<section>
					<BrandsSlider brands={brands} />
				</section>
				<section>
					<NewProductsSlider products={productsSignal.value} />
				</section>
				<section>
					<HotProductsSlider products={products} />
				</section>
				<section>
					<div class="relative w-full max-w-[700px] h-[200px] border border-gray-500 bg-gray-200 mx-auto text-center py-4 px-2 rounded-lg">
						<div dangerouslySetInnerHTML={appState.website.content}></div>
						<div class="absolute md:right-4 md:bottom-4 right-2 bottom-2 text-xs text-gray-700">
							Last updated: {new Date(appState.website.contentUpdatedAt).toLocaleString()}
						</div>
					</div>
				</section>
			</div>
		</div>
	);
});

const BrandsSlider = component$<{ brands: string[] }>(({ brands }) => {
	return (
		<div class="w-full flex justify-center">
			<div class="flex flex-wrap mx-auto gap-x-14 gap-y-4">
				{brands.map((brand) => {
					return (
						<BrandLink
							name={brand}
							href="/account/"
							src="https://images.seeklogo.com/logo-png/31/2/honda-logo-png_seeklogo-310689.png"
						/>
					);
				})}
			</div>
		</div>
	);
});

const NewProductsSlider = component$<{ products: Product[] }>(({ products }) => {
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
							<div key={product.id} class="swiper-slide">
								<div class="flex justify-center">
									<BrandLink
										name={product.name}
										src={product.featuredAsset?.preview ?? '/'}
										href={product.slug ?? '/'}
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
