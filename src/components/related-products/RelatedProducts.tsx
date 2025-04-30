import { component$, useVisibleTask$ } from '@builder.io/qwik';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { ProductVariant, SearchResponse } from '~/generated/graphql';
import RelatedProductCard from './RelatedProductCard';

export default component$<{
	relatedProducts?: SearchResponse;
	relatedProductVariants?: ProductVariant[];
}>(({ relatedProductVariants }) => {
	useVisibleTask$(() => {
		new Swiper('.related-products-swiper', {
			navigation: {
				nextEl: '.swiper-button-next-related',
				prevEl: '.swiper-button-prev-related',
			},
			loop: true,
			slidesPerView: 1,
			modules: [Navigation],
			spaceBetween: 10,
			direction: 'horizontal',
			breakpoints: {
				640: {
					slidesPerView: 2,
				},
			},
		});
	});

	return (
		<div>
			<p class="text-2xl text-black">{$localize`People also bought`}</p>
			<div class="swiper related-products-swiper mt-4">
				<div class="swiper-wrapper">
					{relatedProductVariants &&
						relatedProductVariants.map((item) => {
							return (
								<div class="swiper-slide">
									<RelatedProductCard
										key={item.productId}
										id={item.id}
										productAsset={item.product.featuredAsset}
										productName={item.name}
										slug={item.product.slug}
										priceWithTax={item.priceWithTax}
										currencyCode={item.currencyCode}
									/>
								</div>
							);
						})}
				</div>
				<div class="swiper-button-prev swiper-button-next-related"></div>
				<div class="swiper-button-next swiper-button-next-related"></div>
			</div>
		</div>
	);
});
