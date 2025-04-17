import { component$, useVisibleTask$ } from '@builder.io/qwik';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

export default component$<{ content: string }>(({ content }) => {
	useVisibleTask$(() => {
		new Quill('#editor', {
			theme: 'snow',
		});
	});

	return (
		<div class="w-full max-w-[700px] h-[200px]">
			<div id="editor">
				<div dangerouslySetInnerHTML={content}></div>
			</div>
		</div>
	);
});
