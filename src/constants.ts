import { createContextId } from '@builder.io/qwik';
import { ENV_VARIABLES } from '~/env';
import { AppState } from './types';

export const APP_STATE = createContextId<AppState>('app_state');
export const AUTH_TOKEN = 'authToken';
export const CUSTOMER_NOT_DEFINED_ID = 'CUSTOMER_NOT_DEFINED_ID';
export const HEADER_AUTH_TOKEN_KEY = 'vendure-auth-token';
export const IMAGE_RESOLUTIONS = [1000, 800, 600, 400];
export const HOMEPAGE_IMAGE = '/homepage.webp';
export const DEFAULT_METADATA_URL = 'https://qwik-storefront.vendure.io/';
export const DEFAULT_METADATA_TITLE = 'Vendure Qwik Storefront';
export const DEFAULT_METADATA_DESCRIPTION =
	'A headless commerce storefront starter kit built with Vendure & Qwik';
export const DEFAULT_METADATA_IMAGE = 'https://qwik-storefront.vendure.io/social-image.png';
export const TERMINAL_NAME_TRANZILA = ENV_VARIABLES['VITE_TERMINAL_NAME_TRANZILA'];
export const DEFAULT_LOCALE = ENV_VARIABLES['VITE_DEFAULT_LOCALE'] ?? 'he';
export const WEBHOOK_URL = ENV_VARIABLES['VITE_WEBHOOK_URL'];
export const API_URL = ENV_VARIABLES['VITE_API_URL'];
