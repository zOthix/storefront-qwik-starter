import { QRL } from '@builder.io/qwik';
import { io, Socket } from 'socket.io-client';
import { PROD_API } from '~/constants';

let socket: Socket | null = null;

export function initializeSocket(
	clientId: string,
	onSuccess$: QRL<() => void>,
	onError$: QRL<(message: string) => void>
): void {
	if (!socket) {
		socket = io(PROD_API);

		socket.on('connect', () => {
			socket?.emit('joinRoom', clientId);
		});

		socket.on('paymentSuccess', async (data: { success: boolean; message: string }) => {
			if (data.success) {
				const fn = await onSuccess$.resolve();
				fn();
			}
		});

		socket.on('paymentError', async (data: { success: boolean; message: string }) => {
			if (!data.success) {
				const fn = await onError$.resolve();
				fn(data.message);
			}
		});
	}
}

export function disconnectSocket() {
	if (socket) {
		socket.disconnect();
		socket = null;
	}
}
