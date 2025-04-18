import type { CodegenConfig } from '@graphql-codegen/cli';

let GRAPHQL_API = 'http://localhost:4090';
GRAPHQL_API = `${GRAPHQL_API}/admin-api`;

const config: CodegenConfig = {
	schema: [GRAPHQL_API, 'type Mutation { createStripePaymentIntent: String }'],
	documents: ['"src/providers/admin/**/*.{ts,tsx}"', '!src/generated/*'],
	generates: {
		'src/generated/graphql-admin.ts': {
			config: {
				enumsAsConst: true,
			},
			plugins: ['typescript', 'typescript-operations', 'typescript-generic-sdk'],
		},
		'src/generated/schema-admin.graphql': {
			plugins: ['schema-ast'],
		},
	},
};

export default config;
