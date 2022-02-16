import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthorsStoreModel } from "../authors-store/authors-store"
import { CartStoreModel } from "../cart-store/cart-store"
import { CatalogStoreModel } from "../catalog-store/catalog-store"


/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  cartStore: types.optional(CartStoreModel, {} as any),
  catalogStore: types.optional(CatalogStoreModel, {} as any),
  authrosStore: types.optional(AuthorsStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
