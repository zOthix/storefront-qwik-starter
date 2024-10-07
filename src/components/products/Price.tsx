import { component$ } from '@builder.io/qwik';
import { CurrencyCode } from '~/types';
import { formatPrice } from '~/utils';

export default component$<{
	priceWithTax: number | undefined;
	currencyCode: CurrencyCode | string | undefined;
	forcedClass?: string;
}>(({ priceWithTax, currencyCode, forcedClass }: any) => {
	const { min = 0, max = 0, value = 0 } = priceWithTax;
	let showPrice = min !== 0 || max !== 0 || value !== 0;

	if (typeof priceWithTax === 'number') {
		showPrice = true;
	}

	return (
		<div>
			{!currencyCode || !showPrice ? (
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
