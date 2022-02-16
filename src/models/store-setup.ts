import { onSnapshot } from 'mobx-state-tree';
import * as storage from '../utils/storage';
import { Environment } from './environment';
import { RootStore, RootStoreModel } from './root-store';

const ROOT_STATE_STORAGE_KEY = 'root';

export async function createEnvironment() {
  const env = new Environment();
  await env.setup();
  return env;
}

export async function setupRootStore() {
  let rootStore: RootStore;
  let data: any;

  const env = await createEnvironment();
  try {
    data = storage.load(ROOT_STATE_STORAGE_KEY) || {};
    rootStore = RootStoreModel.create(data, env);
  } catch (e: any) {
    rootStore = RootStoreModel.create({}, env);
    console.error(e.message, null);
  }

  // fetch authors
  try {
    await rootStore.authrosStore.getUsers()
  } catch (error) {
    // !TODO handle users error
  }

  onSnapshot(rootStore, (_snapshot) => {
    const snap = { ..._snapshot, catalogStore: { ..._snapshot.catalogStore, pagination: undefined } };
    storage.save(ROOT_STATE_STORAGE_KEY, snap);
  });

  return rootStore;
}
