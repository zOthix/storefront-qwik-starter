import { component$, useContext } from '@builder.io/qwik';
import { APP_STATE } from '~/constants';

export default component$(() => {
	const appState = useContext(APP_STATE);

	// const collections = useContext(APP_STATE).collections.filter(
	// 	(item) => item.parent?.name === '__root_collection__' && !!item.featuredAsset
	// );

	// const navigation = {
	// 	support: [
	// 		{ name: $localize`Help`, href: '#' },
	// 		{ name: $localize`Track order`, href: '#' },
	// 		{ name: $localize`Shipping`, href: '#' },
	// 		{ name: $localize`Returns`, href: '#' },
	// 	],
	// 	company: [
	// 		{ name: $localize`About`, href: '#' },
	// 		{ name: $localize`Blog`, href: '#' },
	// 		{ name: $localize`Corporate responsibility`, href: '#' },
	// 		{ name: $localize`Press`, href: '#' },
	// 	],
	// };

	// const footerMarkup = `
	// 		<footer class="pt-6 border-t bg-gray-50">
	// 		<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 ">
	// 			<div class="xl:grid xl:grid-cols-3 xl:gap-8">
	// 				<div class="grid grid-cols-2 gap-8 xl:col-span-2">
	// 					<div class="md:grid md:grid-cols-2 md:gap-8">
	// 						<div>
	// 							<h3 class="text-sm font-semibold text-gray-500 tracking-wider uppercase">Shop</h3>
	// 						</div>
	// 						<div class="mt-12 md:mt-0">
	// 							<h3 class="text-sm font-semibold text-gray-500 tracking-wider uppercase">
	// 								Support
	// 							</h3>
	// 						</div>
	// 					</div>
	// 					<div class="md:grid md:grid-cols-2 md:gap-8">
	// 						<div>
	// 							<h3 class="text-sm font-semibold text-gray-500 tracking-wider uppercase">
	// 								Company
	// 							</h3>
	// 						</div>
	// 					</div>
	// 				</div>
	// 				<div class="mt-8 xl:mt-0">
	// 					<h3 class="text-sm font-semibold text-gray-500 tracking-wider uppercase">
	// 						Subscribe to our newsletter
	// 					</h3>
	// 					<p class="mt-4 text-base text-gray-500">
	// 						Be the first to know about exclusive offers & deals
	// 					</p>
	// 					<div class="mt-4 sm:flex sm:max-w-md">
	// 						<label id="email-subscription" class="sr-only">
	// 							Email address
	// 						</label>
	// 						<div class="mt-3 rounded-md sm:mt-0 ltr:sm:ml-3 rtl:sm:mr-3 sm:flex-shrink-0">
	// 							<button class="btn-primary">
	// 								Subscribe
	// 							</button>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</footer>
	// `;

	return (
		<div dangerouslySetInnerHTML={appState.website ? appState.website.footerContent : ''}></div>
	);
});
