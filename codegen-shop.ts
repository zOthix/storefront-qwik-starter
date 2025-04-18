import type { CodegenConfig } from '@graphql-codegen/cli';

let GRAPHQL_API = 'http://localhost:4090';

GRAPHQL_API = `${GRAPHQL_API}/shop-api`;

const config: CodegenConfig = {
	schema: [
		GRAPHQL_API,
		'type Mutation { createStripePaymentIntent: String }',
		'type Query { generateBraintreeClientToken(orderId: ID, includeCustomerId: Boolean): String }',
	],
	documents: ['"src/providers/shop/**/*.{ts,tsx}"', '!src/generated/*'],
	generates: {
		'src/generated/graphql-shop.ts': {
			config: {
				enumsAsConst: true,
			},
			plugins: ['typescript', 'typescript-operations', 'typescript-generic-sdk'],
		},
		'src/generated/schema-shop.graphql': {
			plugins: ['schema-ast'],
		},
	},
};

export default config;
