import { component$, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Image } from 'qwik-image';
import { APP_STATE } from '~/constants';
import { Order } from '~/generated/graphql';
import { addItemToOrderMutation, getActiveOrderQuery } from '~/providers/shop/orders/order';
import CheckIcon from '../icons/CheckIcon';
import Price from '../products/Price';

export default component$(
	({ productAsset, productName, priceWithTax, currencyCode, id, slug }: any) => {
		const appState = useContext(APP_STATE);
		const quantity = useSignal<number>(0);

		useTask$(async () => {
			appState.activeOrder = await getActiveOrderQuery();
		});

		useTask$(async ({ track }) => {
			track(() => appState.activeOrder);
			if (appState.activeOrder) {
				const line = appState.activeOrder.lines.find((i) => i.productVariant.id === id);
				quantity.value = line?.quantity ?? 0;
			}
		});

		return (
			<div>
				<Link class="grid mx-auto place-items-center" href={`/products/${slug}/`}>
					<Image
						layout="fixed"
						class="rounded-xl flex-grow object-cover aspect-[7/8]"
						width="200"
						height="200"
						src={productAsset?.preview + '?w=300&h=400&format=webp'}
						alt={productName}
					/>
					<div class="h-2" />
					<div class="text-sm text-gray-700">{productName}</div>
					<Price
						priceWithTax={priceWithTax}
						currencyCode={currencyCode}
						forcedClass="text-sm font-medium text-gray-900"
					/>
				</Link>
				{appState.priceVariant && (
					<div class="flex sm:flex-col1 align-baseline mt-3">
						<button
							class={{
								'max-w-xs flex-1 transition-colors border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500 sm:w-full':
									true,
								'bg-primary-600 hover:bg-primary-700': quantity.value === 0,
								'bg-green-600 active:bg-green-700 hover:bg-green-700':
									quantity.value >= 1 && quantity.value <= 7,
								'bg-gray-600 cursor-not-allowed': quantity.value > 7,
							}}
							onClick$={async () => {
								if (quantity.value <= 7) {
									const addItemToOrder = await addItemToOrderMutation(id, 1);
									if (addItemToOrder.__typename === 'Order') {
										appState.activeOrder = addItemToOrder as Order;
									}
								}
							}}
						>
							{quantity.value ? (
								<span class="flex items-center">
									<CheckIcon />
									{$localize`${quantity.value} in cart`}
								</span>
							) : (
								$localize`Add to cart`
							)}
						</button>
					</div>
				)}
			</div>
		);
	}
);
