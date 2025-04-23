import gql from 'graphql-tag';
import {
	Product,
	ProductListOptions,
	ProductQuery,
	SearchInput,
	SearchResponse,
} from '~/generated/graphql';
import { ProductsQuery } from '~/generated/graphql-shop';
import { shopSdk } from '~/graphql-wrapper';

export const search = async (searchInput: SearchInput) => {
	return await shopSdk
		.search({ input: { groupByProduct: true, ...searchInput } })
		.then((res) => res.search as SearchResponse);
};

export const searchQueryWithCollectionSlug = async (collectionSlug: string) =>
	search({ collectionSlug });

export const searchQueryWithTerm = async (
	collectionSlug: string,
	term: string,
	facetValueIds: string[]
) => search({ collectionSlug, term, facetValueFilters: [{ or: facetValueIds }] });

export const getProductBySlug = async (slug: string) => {
	return shopSdk.product({ slug }).then((res: ProductQuery) => res.product as Product);
};

export const getProducts = async (options: ProductListOptions) => {
	return shopSdk
		.products({ options })
		.then((res: ProductsQuery) => res.products.items as Product[]);
};

export const detailedProductFragment = gql`
	fragment DetailedProduct on Product {
		id
		name
		description
		slug
		collections {
			id
			slug
			name
			breadcrumbs {
				id
				name
				slug
			}
		}
		facetValues {
			facet {
				id
				code
				name
			}
			id
			code
			name
		}
		featuredAsset {
			id
			preview
		}
		assets {
			id
			preview
		}
		variants {
			id
			name
			priceWithTax
			currencyCode
			sku
			stockLevel
			featuredAsset {
				id
				preview
			}
		}
	}
`;

gql`
	query product($slug: String, $id: ID) {
		product(slug: $slug, id: $id) {
			...DetailedProduct
		}
	}
`;

gql`
	query products($options: ProductListOptions) {
		products(options: $options) {
			items {
				...DetailedProduct
			}
		}
	}
`;

export const listedProductFragment = gql`
	fragment ListedProduct on SearchResult {
		productId
		productName
		slug
		productAsset {
			id
			preview
		}
		currencyCode
		priceWithTax {
			... on PriceRange {
				min
				max
			}
			... on SinglePrice {
				value
			}
		}
	}
`;

gql`
	query search($input: SearchInput!) {
		search(input: $input) {
			totalItems
			items {
				...ListedProduct
			}
			facetValues {
				count
				facetValue {
					id
					name
					facet {
						id
						name
					}
				}
			}
		}
	}
	${listedProductFragment}
`;
