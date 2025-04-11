import { component$ } from '@builder.io/qwik';
import { Image } from 'qwik-image';

type Props = {
	name: string;
	src: string;
	href: string;
};

export default component$<Props>(({ name, src, href }) => {
	return (
		<a href={href}>
			<div class="flex justify-center relative border rounded-full overflow-hidden hover:scale-100 scale-90 transition">
				<Image class="h-[100px] w-[100px] " layout="fixed" src={src} />
				<span class="absolute w-full bottom-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50" />
				<span class="absolute w-full bottom-2 mt-auto text-center font-bold text-white">
					{name}
				</span>
			</div>
		</a>
	);
});
