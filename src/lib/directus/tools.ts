import { config } from 'dotenv';
import * as p from '@clack/prompts';
import { generateDirectusTypes } from 'directus-sdk-typegen';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  schemaApply,
  schemaDiff,
  schemaSnapshot,
  type SchemaDiffOutput,
  type SchemaSnapshotOutput,
} from '@directus/sdk';
import { readFile, writeFile } from 'node:fs/promises';
import { getDirectusInternal } from './base';

const args = process.argv.slice(2);

config({ quiet: true });

const url = process.env.PUBLIC_DIRECTUS_URL as string;
const token = process.env.PRIVATE_DIRECTUS_ADMIN_TOKEN as string;
const root = dirname(fileURLToPath(import.meta.url));
const SNAPSHOT_JSON = join(root, 'snapshot.json');
const DIFF_JSON = join(root, 'diff.json');
const SCHEMA_TS = join(root, 'schema.ts');
const loadJson = async (name: string) => JSON.parse(await readFile(name, 'utf-8'));
const writeJson = async (name: string, json: Record<string, unknown>) => writeFile(name, JSON.stringify(json, null, 2));
const loadSnapshot = async () => (await loadJson(SNAPSHOT_JSON)) as SchemaSnapshotOutput;
const loadDiff = async () => (await loadJson(DIFF_JSON)) as SchemaDiffOutput;
const directus = getDirectusInternal(fetch, url, token);

let tool = args[0];

if (!tool) {
  p.intro(`Directus`);
  p.log.info(url);
  const selected = await p.select({
    message: 'tools',
    options: [
      { label: 'Generate types', value: 'generate' },
      { label: 'Snapshot schema', value: 'snapshot' },
      { label: 'Diff schema', value: 'diff' },
      { label: 'Apply schema', value: 'apply' },
    ],
  });
  if (typeof selected === 'string') {
    tool = selected;
  }
}

if (tool === 'generate') {
  await generateDirectusTypes({
    outputPath: SCHEMA_TS,
    directusUrl: process.env.PUBLIC_DIRECTUS_URL,
    directusToken: process.env.PRIVATE_DIRECTUS_ADMIN_TOKEN,
  });
} else if (tool === 'snapshot') {
  const snapshot = await directus.request(schemaSnapshot());
  await writeJson(SNAPSHOT_JSON, snapshot);
} else if (tool === 'diff') {
  const snapshot = await loadSnapshot();
  const diff = await directus.request(schemaDiff(snapshot));
  await writeJson(DIFF_JSON, diff);
} else if (tool === 'apply') {
  const diff = await loadDiff();
  if (diff) {
    await directus.request(schemaApply(diff));
  }
}
