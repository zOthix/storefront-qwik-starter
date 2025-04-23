import {
	$,
	Slot,
	component$,
	useContextProvider,
	useOn,
	useStore,
	useVisibleTask$,
} from '@builder.io/qwik';
import { RequestHandler, routeLoader$ } from '@builder.io/qwik-city';
import { ImageTransformerProps, useImageProvider } from 'qwik-image';
import Menu from '~/components/menu/Menu';
import { APP_STATE, CUSTOMER_NOT_DEFINED_ID, DEFAULT_LOCALE, IMAGE_RESOLUTIONS } from '~/constants';
import { Order } from '~/generated/graphql';
import { getWebsiteQuery } from '~/providers/admin/website';
import { getAvailableCountriesQuery } from '~/providers/shop/checkout/checkout';
import { getCollections } from '~/providers/shop/collections/collections';
import { getActiveOrderQuery } from '~/providers/shop/orders/order';
import { ActiveCustomer, AppState } from '~/types';
import Cart from '../components/cart/Cart';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';

export const onGet: RequestHandler = async ({ cacheControl }) => {
	cacheControl({ staleWhileRevalidate: 60 * 60 * 24 * 7, maxAge: 5 });
};

export const useCollectionsLoader = routeLoader$(async () => {
	return await getCollections();
});

export const useAvailableCountriesLoader = routeLoader$(async () => {
	return await getAvailableCountriesQuery();
});

export const useWebsiteLoader = routeLoader$(async () => {
	return await getWebsiteQuery();
});

export const onRequest: RequestHandler = ({ locale }) => {
	// locale(extractLang(request.headers.get('accept-language'), request.url));

	/**
	 * Keeping default locale to HE
	 */

	locale(DEFAULT_LOCALE);
};

export default component$(() => {
	const imageTransformer$ = $(({ src, width, height }: ImageTransformerProps): string => {
		return `${src}?w=${width}&h=${height}&format=webp`;
	});

	// Provide your default options
	useImageProvider({
		imageTransformer$,
		resolutions: IMAGE_RESOLUTIONS,
	});

	const collectionsSignal = useCollectionsLoader();
	const availableCountriesSignal = useAvailableCountriesLoader();
	const websiteSignal = useWebsiteLoader();

	const state = useStore<AppState>({
		showCart: false,
		showMenu: false,
		customer: { id: CUSTOMER_NOT_DEFINED_ID, firstName: '', lastName: '' } as ActiveCustomer,
		activeOrder: {} as Order,
		collections: collectionsSignal.value || [],
		availableCountries: availableCountriesSignal.value || [],
		shippingAddress: {
			id: '',
			city: '',
			company: '',
			countryCode:
				availableCountriesSignal.value && availableCountriesSignal.value.length > 0
					? availableCountriesSignal.value[0].code
					: '',
			fullName: '',
			phoneNumber: '',
			postalCode: '',
			province: '',
			streetLine1: '',
			streetLine2: '',
		},
		addressBook: [],
		payWithoutCreditCard: false,
		priceVariant: false,
		website: websiteSignal.value,
	});

	useContextProvider(APP_STATE, state);

	useVisibleTask$(async () => {
		state.activeOrder = await getActiveOrderQuery();
	});

	useVisibleTask$(({ track }) => {
		track(() => state.showCart);
		track(() => state.showMenu);

		state.showCart || state.showMenu
			? document.body.classList.add('overflow-hidden')
			: document.body.classList.remove('overflow-hidden');
	});

	useOn(
		'keydown',
		$((event: unknown) => {
			if ((event as KeyboardEvent).key === 'Escape') {
				state.showCart = false;
				state.showMenu = false;
			}
		})
	);

	return (
		<div>
			<AnnouncementBar announcementText={websiteSignal.value.announcementBarText} />
			<Header />
			<Cart />
			<Menu />
			<main class="pb-12 bg-gray-50">
				<Slot />
			</main>
			<Footer />
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
