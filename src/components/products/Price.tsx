import { component$, useContext } from '@builder.io/qwik';
import { APP_STATE } from '~/constants';
import { CurrencyCode } from '~/types';
import { formatPrice } from '~/utils';

export default component$<{
	priceWithTax: number | undefined;
	currencyCode: CurrencyCode | string | undefined;
	forcedClass?: string;
}>(({ priceWithTax, currencyCode, forcedClass }: any) => {
	const appState = useContext(APP_STATE);

	if (!appState.priceVariant) {
		return <div></div>;
	}

	return (
		<div>
			{!currencyCode ? (
				<div></div>
			) : typeof priceWithTax === 'number' ? (
				<div class={forcedClass}>{formatPrice(priceWithTax, currencyCode)}</div>
			) : 'value' in priceWithTax ? (
				<div class={forcedClass}>{formatPrice(priceWithTax.value, currencyCode)}</div>
			) : priceWithTax.min === priceWithTax.max ? (
				<div class={forcedClass}>{formatPrice(priceWithTax.min, currencyCode)}</div>
			) : (
				<div class={forcedClass}>
					{formatPrice(priceWithTax.min, currencyCode)} -{' '}
					{formatPrice(priceWithTax.max, currencyCode)}
				</div>
			)}
		</div>
	);
});
