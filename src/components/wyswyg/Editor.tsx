import { component$, useVisibleTask$ } from '@builder.io/qwik';
import Quill from 'quill';
import 'quill/dist/quill.core.css';

export default component$(() => {
	useVisibleTask$(() => {
		new Quill('#editor', {
			theme: 'snow',
		});
	});

	return (
		<div class="w-full max-w-[700px] h-[200px]">
			<div id="editor"></div>
		</div>
	);
});
