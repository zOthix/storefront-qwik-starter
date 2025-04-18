import { $, component$, useSignal, useStore, useTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Collection } from '~/generated/graphql';
import { getCollectionBySlug } from '~/providers/shop/collections/collections';
import ChevronRightIcon from '../icons/ChevronRightIcon';

const ChildrenMenu = component$<{ collections: Collection[] }>(({ collections }) => {
	const showMenu = useSignal<boolean>(false);
	const hasChildren = useSignal<boolean>(false);
	const hoveredCollection = useStore<{ collection: Collection | null }>({ collection: null });

	const handleMouseEnter = $(async (slug: string) => {
		showMenu.value = true;
		hoveredCollection.collection = await getCollectionBySlug(slug);
	});

	useTask$(({ track }) => {
		const collection = track(() => hoveredCollection.collection);
		if (collection && collection.children && collection.children.length > 0) {
			hasChildren.value = true;
		} else {
			hasChildren.value = false;
		}
	});

	return (
		<div class="overflow-auto shadow-md h-[200px]">
			<div class="p-2 bg-white h-full ">
				{collections.map((collection) => {
					const length = collection.children ? collection.children.length : 0;
					return (
						<>
							<div class="flex justify-between px-2">
								<Link
									class="flex-1 text-sm md:text-base text-gray-800 hover:text-gray-500 block whitespace-nowrap py-2"
									href={`/collections/${collection.slug}`}
									key={collection.id}
								>
									{collection.name}
								</Link>
								{length > 0 && (
									<button
										class="px-2 py-1 hover:opacity-50"
										onClick$={() => handleMouseEnter(collection.slug)}
									>
										<ChevronRightIcon />
									</button>
								)}
							</div>
						</>
					);
				})}
			</div>
			{hasChildren.value && (
				<div class="absolute left-full top-0">
					<ChildrenMenu collections={hoveredCollection.collection?.children ?? []} />
				</div>
			)}
		</div>
	);
});

const DropdownMenu = component$<{ collections: Collection[] }>(({ collections }) => {
	const showMenu = useSignal<boolean>(false);
	const hoveredCollection = useStore<{ collection: Collection | null }>({ collection: null });

	const handleMouseEnter = $(async (slug: string) => {
		hoveredCollection.collection = await getCollectionBySlug(slug);
		showMenu.value = true;
	});

	const handleMouseLeave = $(async () => {
		hoveredCollection.collection = null;
		showMenu.value = false;
	});

	return (
		<div class="hidden md:flex items-center sm:block">
			{collections.map((collection) => {
				return (
					<div class="relative" onMouseLeave$={() => handleMouseLeave()}>
						<Link
							onMouseEnter$={() => handleMouseEnter(collection.slug)}
							class="text-sm md:text-base text-gray-200 hover:text-white px-2"
							href={`/collections/${collection.slug}`}
							key={collection.id}
						>
							{collection.name}
						</Link>
						{hoveredCollection.collection && hoveredCollection.collection.id === collection.id && (
							<div class="absolute left-2 z-10">
								<ChildrenMenu collections={hoveredCollection.collection.children ?? []} />
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
});

export default DropdownMenu;
