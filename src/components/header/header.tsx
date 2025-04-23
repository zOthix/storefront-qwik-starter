import { $, component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { APP_STATE, CUSTOMER_NOT_DEFINED_ID } from '~/constants';
import { logoutMutation } from '~/providers/shop/account/account';
import { getActiveCustomerQuery } from '~/providers/shop/customer/customer';
import DropdownMenu from '../dropdown-menu/DropdownMenu';
import LogoutIcon from '../icons/LogoutIcon';
import MenuIcon from '../icons/MenuIcon';
import ShoppingBagIcon from '../icons/ShoppingBagIcon';
import UserIcon from '../icons/UserIcon';
import SearchBar from '../search-bar/SearchBar';

export default component$(() => {
	const appState = useContext(APP_STATE);
	const collections = useContext(APP_STATE).collections.filter(
		(item) => item.parent?.name === '__root_collection__' && !!item.featuredAsset
	);

	const totalQuantity =
		appState.activeOrder?.state !== 'PaymentAuthorized'
			? appState.activeOrder?.totalQuantity || 0
			: 0;

	useVisibleTask$(async () => {
		if (appState.customer.id === CUSTOMER_NOT_DEFINED_ID) {
			const activeCustomer = await getActiveCustomerQuery();
			if (activeCustomer) {
				appState.customer = {
					title: activeCustomer.title ?? '',
					firstName: activeCustomer.firstName,
					id: activeCustomer.id,
					lastName: activeCustomer.lastName,
					emailAddress: activeCustomer.emailAddress,
					phoneNumber: activeCustomer.phoneNumber ?? '',
				};
				appState.payWithoutCreditCard = activeCustomer.payWithoutCreditCard ?? false;
				appState.priceVariant = activeCustomer.priceVariant !== null ? true : false;
			}
		}
	});

	const links = [
		{
			text: 'Link1',
			href: '#',
			submenu: [
				{
					text: 'Submenu1',
					href: '#',
					submenu: [
						{
							text: 'Sebsubmenu1',
							href: '#',
						},
					],
				},
			],
		},
		{
			text: 'Link2',
			href: '#',
			submenu: [],
		},
		{
			text: 'Link3',
			href: '#',
			submenu: [
				{
					text: 'Submenu1',
					href: '#',
					submenu: [],
				},
				{
					text: 'Submenu2',
					href: '#',
					submenu: [],
				},
				{
					text: 'Submenu3',
					href: '#',
					submenu: [],
				},
			],
		},
	];

	const logout = $(async () => {
		await logoutMutation();
		// force hard refresh
		window.location.href = '/';
	});

	return (
		<div
			class={`bg-gradient-to-r from-blue-700 to-indigo-900 transform shadow-xl sticky top-0 z-10 animate-dropIn`}
		>
			<header>
				<div class="max-w-6xl mx-auto p-4 flex items-center space-x-4">
					<button
						class="block sm:hidden text-white"
						onClick$={() => (appState.showMenu = !appState.showMenu)}
					>
						<MenuIcon />
					</button>
					<h1 class="text-white w-10">
						<Link href="/">
							<img src={`/cube-logo-small.webp`} width={40} height={31} alt="Vendure logo" />
						</Link>
					</h1>
					<div class="hidden md:flex items-center space-x-4 sm:block">
						<DropdownMenu collections={collections} />
					</div>
					<div class="flex-1 block md:pr-8">
						<SearchBar />
					</div>
					<div class="flex gap-x-4 items-center">
						<button
							name="Cart"
							aria-label={`${totalQuantity} items in cart`}
							class="relative w-9 h-9 bg-white bg-opacity-20 rounded text-white p-1"
							onClick$={() => (appState.showCart = !appState.showCart)}
						>
							<ShoppingBagIcon />
							{totalQuantity ? (
								<div class="absolute rounded-full -top-2 ltr:-right-2 rtl:-left-2 bg-primary-600 w-6 h-6">
									{totalQuantity}
								</div>
							) : (
								''
							)}
						</button>
						<div class="flex 2xl:mr-0">
							<Link
								href={appState.customer.id !== CUSTOMER_NOT_DEFINED_ID ? '/account' : '/sign-in'}
								class="flex items-center space-x-1 pb-1 pr-2"
							>
								<UserIcon />
								<span class="mt-1 text-gray-200 hidden md:inline-block">
									{appState.customer.id !== CUSTOMER_NOT_DEFINED_ID
										? $localize`My Account`
										: $localize`Sign In`}
								</span>
							</Link>
							{appState.customer.id !== CUSTOMER_NOT_DEFINED_ID && (
								<button onClick$={logout} class="text-gray-200">
									<div class="flex items-center cursor-pointer">
										<span class="ltr:mr-2 rtl:ml-2 hidden md:inline-block">{$localize`Logout`}</span>
										<span class="rtl:rotate-180">
											<LogoutIcon />
										</span>
									</div>
								</button>
							)}
						</div>
					</div>
				</div>
			</header>
		</div>
	);
});
