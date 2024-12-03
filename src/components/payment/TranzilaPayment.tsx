import { $, component$, QRL, useContext, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { APP_STATE, DEFAULT_LOCALE, TERMINAL_NAME_TRANZILA, WEBHOOK_URL } from '~/constants';
import { ErrorMessage } from '../error-message/ErrorMessage';
import CreditCardIcon from '../icons/CreditCardIcon';

export default component$<{
	clientId: string;
	paymentError: string | null;
	clearError: QRL<() => void>;
}>(({ clientId, paymentError, clearError }) => {
	const appState = useContext(APP_STATE);
	const submitButtonRef = useSignal<HTMLButtonElement>();

	useVisibleTask$(() => {
		submitButtonRef.value?.click();
	});

	const clearPaymentError$ = $(async () => {
		const fn = await clearError.resolve();
		fn();
	});

	const isIframeVisible = !paymentError;
	const isSubmitButtonVisible = paymentError ? true : false;

	return (
		<div class="flex flex-col items-center">
			<form
				action={`https://direct.tranzila.com/${TERMINAL_NAME_TRANZILA}/iframenew.php`}
				target="tranzila"
				method="POST"
				// @ts-ignore
				novalidate="novalidate"
				autocomplete="off"
				class="flex flex-col items-center"
			>
				<input name="sum" value={appState.activeOrder.totalWithTax / 100} type="hidden" id="sum" />
				<input type="hidden" name="buttonLabel" value="Pay now" />
				<input type="hidden" name="nologo" value="1" />
				{DEFAULT_LOCALE === 'he' && <input type="hidden" name="lang" value="il" />}
				<input type="hidden" name="notify_url_address" value={`${WEBHOOK_URL}/payments/tranzila`} />
				<input type="hidden" name="currency" value={DEFAULT_LOCALE === 'he' ? '1' : '2'} />
				<input type="hidden" name="trButtonColor" value="2563eb" />
				<input type="hidden" name="trBgColor" value="f9fafb" />
				<input type="hidden" name="orderId" value={appState.activeOrder.id} />
				<input type="hidden" name="clientId" value={clientId} />
				<button
					ref={submitButtonRef}
					class={`${!isSubmitButtonVisible && 'hidden'} flex px-6 bg-primary-600 hover:bg-primary-700 items-center justify-center space-x-2 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
					type="submit"
					name="submit"
					value="pay"
					onClick$={clearPaymentError$}
				>
					<CreditCardIcon />
					<span>{$localize`Pay with Tranzilla`}</span>
				</button>
			</form>
			<div class={`${!isIframeVisible && 'hidden'}`} style="width: 150%; height: 600px;">
				<iframe
					id="tranzila-frame"
					// @ts-ignore
					allowpaymentrequest="true"
					name="tranzila"
					src=""
					style="width: 100%; height: 100%;"
				></iframe>
			</div>
			{paymentError && (
				<div class="mt-6">
					<ErrorMessage heading="Transaction failed" message={paymentError ?? ''} />
				</div>
			)}
		</div>
	);
});
