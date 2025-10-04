import { config } from 'dotenv';
import { generateDirectusTypes } from 'directus-sdk-typegen';

config();

await generateDirectusTypes({
  outputPath: './src/lib/directus/schema.ts',
  directusUrl: process.env.PUBLIC_DIRECTUS_URL,
  directusToken: process.env.PRIVATE_DIRECTUS_ADMIN_TOKEN
});
