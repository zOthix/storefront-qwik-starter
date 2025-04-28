import { $, component$, useContext, useStore, useTask$ } from '@builder.io/qwik';
import { Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import Filters from '~/components/facet-filter-controls/Filters';
import FiltersButton from '~/components/filters-button/FiltersButton';
import HomeIcon from '~/components/icons/HomeIcon';
import SlashIcon from '~/components/icons/SlashIcon';
import ProductCard from '~/components/products/ProductCard';
import { APP_STATE } from '~/constants';
import { SearchResponse } from '~/generated/graphql';
import {
	getBrandBySlug,
	searchQueryWithBrandSlug,
	searchQueryWithTermBrand,
} from '~/providers/shop/products/products';
import { FacetWithValues } from '~/types';
import {
	changeUrlParamsWithoutRefresh,
	cleanUpParams,
	enableDisableFacetValues,
	groupFacetValues,
} from '~/utils';

export const useBrandLoader = routeLoader$(async ({ params }) => {
	return await getBrandBySlug(params.slug);
});

export const useSearchLoader = routeLoader$(async ({ params: p, url }) => {
	const params = cleanUpParams(p);
	const activeFacetValueIds: string[] = url.searchParams.get('f')?.split('-') || [];
	return activeFacetValueIds.length
		? await searchQueryWithTermBrand(params.slug, '', activeFacetValueIds)
		: await searchQueryWithBrandSlug(params.slug);
});

export default component$(() => {
	const { params: p, url } = useLocation();
	const params = cleanUpParams(p);
	const activeFacetValueIds: string[] = url.searchParams.get('f')?.split('-') || [];

	const brandSignal = useBrandLoader();
	const searchSignal = useSearchLoader();
	const appState = useContext(APP_STATE);

	const state = useStore<{
		showMenu: boolean;
		search: SearchResponse;
		facedValues: FacetWithValues[];
		facetValueIds: string[];
	}>({
		showMenu: false,
		search: searchSignal.value as SearchResponse,
		facedValues: groupFacetValues(searchSignal.value as SearchResponse, activeFacetValueIds),
		facetValueIds: activeFacetValueIds,
	});

	useTask$(async ({ track }) => {
		track(() => brandSignal.value.slug);
		track(() => appState.customer);
		params.slug = cleanUpParams(p).slug;
		state.facetValueIds = url.searchParams.get('f')?.split('-') || [];
		state.search = state.facetValueIds.length
			? await searchQueryWithTermBrand(params.slug, '', activeFacetValueIds)
			: await searchQueryWithBrandSlug(params.slug);
		state.facedValues = groupFacetValues(state.search as SearchResponse, state.facetValueIds);
	});

	const onFilterChange = $(async (id: string) => {
		const { facedValues, facetValueIds } = enableDisableFacetValues(
			state.facedValues,
			state.facetValueIds.includes(id)
				? state.facetValueIds.filter((f) => f !== id)
				: [...state.facetValueIds, id]
		);
		state.facedValues = facedValues;
		state.facetValueIds = facetValueIds;
		changeUrlParamsWithoutRefresh('', facetValueIds);

		state.search = facetValueIds.length
			? await searchQueryWithTermBrand(params.slug, '', facetValueIds)
			: await searchQueryWithBrandSlug(params.slug);
	});

	const onOpenCloseFilter = $((id: string) => {
		state.facedValues = state.facedValues.map((f) => {
			if (f.id === id) {
				f.open = !f.open;
			}
			return f;
		});
	});

	return (
		<div class="max-w-6xl mx-auto px-4 py-10 min-h-screen">
			<div class="flex justify-between items-center">
				<h2 class="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
					{brandSignal.value.name}
				</h2>
				<div>
					{!!state.facedValues.length && (
						<FiltersButton
							onToggleMenu$={async () => {
								state.showMenu = !state.showMenu;
							}}
						/>
					)}
				</div>
			</div>
			<div>
				<Breadcrumbs
					items={[{ id: '1', slug: brandSignal.value.slug, name: brandSignal.value.name }]}
				></Breadcrumbs>
			</div>
			{state.search.items.length > 0 && (
				<div class="mt-6 grid sm:grid-cols-5 gap-x-4">
					{!!state.facedValues.length && (
						<Filters
							showMenu={state.showMenu}
							facetsWithValues={state.facedValues}
							onToggleMenu$={async () => {
								state.showMenu = !state.showMenu;
							}}
							onFilterChange$={onFilterChange}
							onOpenCloseFilter$={onOpenCloseFilter}
						/>
					)}
					<div class="sm:col-span-5 lg:col-span-4">
						<div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
							{state.search.items.map((item) => (
								<ProductCard
									key={item.productId}
									productAsset={item.productAsset}
									productName={item.productName}
									slug={item.slug}
									priceWithTax={item.priceWithTax}
									currencyCode={item.currencyCode}
								></ProductCard>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
});

const Breadcrumbs = component$<{ items: { name: string; slug: string; id: string }[] }>(
	({ items }) => {
		return (
			<nav class="flex">
				<ol class="flex items-center space-x-1 md:space-x-4">
					<li>
						<div>
							<Link href="/" class="text-gray-400 hover:text-gray-500">
								<HomeIcon />
								<span class="sr-only">Home</span>
							</Link>
						</div>
					</li>
					{items
						.filter((item) => item.name !== '__root_collection__')
						.map((item) => (
							<li key={item.name}>
								<div class="flex items-center">
									<SlashIcon />
									<Link
										href={`/brands/${item.slug}`}
										class="ml-2 md:ml-4 text-xs md:text-sm font-medium text-gray-500 hover:text-gray-700"
									>
										{item.name}
									</Link>
								</div>
							</li>
						))}
				</ol>
			</nav>
		);
	}
);
