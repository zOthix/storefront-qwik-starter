import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Image } from 'qwik-image';

type Props = {
	name: string;
	src: string;
	href: string;
};

export default component$<Props>(({ name, src, href }) => {
	return (
		<Link href={href}>
			<div class="relative rounded-lg overflow-hidden">
				<Image layout="fixed" class="h-[150px] w-[150px]" src={src} alt={name} />
				<span class="absolute w-full bottom-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50" />
				<span class="absolute w-full bottom-2 mt-auto text-center text-xl font-bold text-white">
					{name}
				</span>
			</div>
		</Link>
	);
});
