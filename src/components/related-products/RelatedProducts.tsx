import { component$ } from '@builder.io/qwik';
import { ProductVariant, SearchResponse } from '~/generated/graphql';
import RelatedProductCard from './RelatedProductCard';

export default component$<{
	relatedProducts?: SearchResponse;
	relatedProductVariants?: ProductVariant[];
}>(({ relatedProductVariants }) => {
	return (
		<div>
			<p class="text-2xl text-black">{$localize`People also bought`}</p>
			<div class="mt-4 grid-container overflow-auto gap-x-8 px-4 py-2">
				{relatedProductVariants &&
					relatedProductVariants.map((item) => {
						return (
							<RelatedProductCard
								key={item.productId}
								id={item.id}
								productAsset={item.product.featuredAsset}
								productName={item.name}
								slug={item.product.slug}
								priceWithTax={item.priceWithTax}
								currencyCode={item.currencyCode}
							/>
						);
					})}
			</div>
		</div>
	);
});
