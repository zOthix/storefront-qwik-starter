import { $, component$, QRL, useContext, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { APP_STATE } from '~/constants';
import { getEligiblePaymentMethodsQuery } from '~/providers/shop/checkout/checkout';
import { EligiblePaymentMethods } from '~/types';
import CreditCardIcon from '../icons/CreditCardIcon';
import TranzillaPayment from './TranzillaPayment';

export default component$<{ onForward$: QRL<() => void> }>(({ onForward$ }) => {
	const appState = useContext(APP_STATE);
	const paymentMethods = useSignal<EligiblePaymentMethods[]>();

	useVisibleTask$(async () => {
		paymentMethods.value = await getEligiblePaymentMethodsQuery();
	});

	return (
		<div class="flex flex-col space-y-24 items-center">
			{appState.payWithoutCreditCard ? (
				<button
					class="flex px-6 bg-primary-600 hover:bg-primary-700 items-center justify-center space-x-2 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
					onClick$={$(async () => {
						onForward$();
					})}
				>
					<CreditCardIcon />
					<span>{$localize`Complete Order`}</span>
				</button>
			) : (
				<TranzillaPayment />
			)}
			{/**
			 * Below lines have been commented in case we want to revert to the
			 * older payment system that was being followed.
			 */}
			{/* {paymentMethods.value?.map((method) => (
				<div key={method.code} class="flex flex-col items-center">
					{method.code === 'standard-payment' && (
						<>
							<p class="text-gray-600 text-sm p-6">
								{$localize`This is a dummy payment for demonstration purposes only`}
							</p>
							<button
								class="flex px-6 bg-primary-600 hover:bg-primary-700 items-center justify-center space-x-2 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
								onClick$={$(async () => {
									onForward$();
								})}
							>
								<CreditCardIcon />
								<span>{$localize`Complete Order`}</span>
							</button>
						</>
					)}
					<TranzillaPayment />
					{method.code.includes('stripe') && <StripePayment />}
					{method.code.includes('braintree') && <BraintreePayment />}
				</div>
			))} */}
		</div>
	);
});
