import { component$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';

export default component$(() => {
	const loc = useLocation();

	return (
		<div class="w-full min-h-screen flex flex-col items-center">
			<p class="text-2xl mt-52">
				<span class="font-semibold text-red-600">{loc.url.searchParams.get('message')}</span>
			</p>
			<Link class="mt-2 text-sm text-blue-800 hover:underline" href="/">
				Back to home page?
			</Link>
		</div>
	);
});
