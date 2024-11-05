import { component$, useContext, useSignal } from '@builder.io/qwik';
import { APP_STATE, TERMINAL_NAME_TRANZILA, WEBHOOK_URL } from '~/constants';
import CreditCardIcon from '../icons/CreditCardIcon';

export default component$<{ clientId: string }>(({ clientId }) => {
	const appState = useContext(APP_STATE);
	const showIframe = useSignal(false);

	return (
		<div class="flex flex-col items-center mt-3">
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
				<input type="hidden" name="noLogo" value="1" />
				<input type="hidden" name="notify_url_address" value={`${WEBHOOK_URL}/payments/tranzila`} />
				<input type="hidden" name="currency" value="2" />
				<input type="hidden" name="trButtonColor" value="2563eb" />
				<input type="hidden" name="orderId" value={appState.activeOrder.id} />
				<input type="hidden" name="clientId" value={clientId} />

				<button
					class="flex px-6 bg-primary-600 hover:bg-primary-700 items-center justify-center space-x-2 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
					type="submit"
					name="submit"
					value="pay"
					onClick$={() => (showIframe.value = true)}
				>
					<CreditCardIcon />
					<span>{$localize`Pay with Tranzilla`}</span>
				</button>
			</form>
			<div
				class="mt-4"
				style={`width: 150%; height: 600px; display: ${showIframe.value ? 'block' : 'none'}`}
			>
				<iframe
					id="tranzila-frame"
					// @ts-ignore
					allowpaymentrequest="true"
					name="tranzila"
					src=""
					style="width: 100%; height: 100%;"
				></iframe>
			</div>
		</div>
	);
});
