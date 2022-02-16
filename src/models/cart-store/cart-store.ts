import { destroy, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Workshop, WorkshopModel, WorkshopSnapshot } from "../workshop/workshop"
import { withStoreEnv } from "../extentions/with-stote-env"
import { OrderApi } from "../../services/api/order-api"

/**
 * Example store containing Rick and Morty Carts
 */
export const CartStoreModel = types
  .model("CartStore")
  .props({
    items: types.optional(types.array(WorkshopModel), []),
    isOpened: types.optional(types.boolean, false),
    inCheckout: types.optional(types.boolean, false)
  })
  .extend(withStoreEnv)
  .actions((self) => ({
    setCart: (workshopSnapshot: Workshop[]) => {
      self.items.replace(workshopSnapshot)
    },
    addToCart: (workshop: Workshop | WorkshopSnapshot, qty = 1) => {
      self.isOpened = true;
      self.items.push({...workshop, qty});
    },
    removeFromCart: (workshop: Workshop | WorkshopSnapshot) => {
      destroy(workshop);
    },
    openCart: () => {
      self.isOpened = true;
    },
    closeCart: () => {
      self.isOpened = false;
    },
    startCheckout: () => {
      self.isOpened = false;
      self.inCheckout = true;
    },
    cancelCheckout: () => {
      self.inCheckout = false;
    },
    resetCart: () => {
      self.items.replace([]);
    }
  }))
  .actions((self) => ({
    sendOrder: async (form: any) => {
      const api = new OrderApi(self.environment.api);
      const result = await api.sendOrder(form, self.items);

      if (result.kind === 'ok') {
        self.resetCart();
      } else {
        console.log(result.kind);
      }

      return result;
    },
  }))
  .views(self => ({
    get itemsCount() {
      return self.items.length;
    },
    get cartTotal() {
      return self.items.reduce((sum, workshop) => sum + ( workshop.cost || 0), 0);
    }
  }))

type CartStoreType = Instance<typeof CartStoreModel>
export interface CartStore extends CartStoreType {}
type CartStoreSnapshotType = SnapshotOut<typeof CartStoreModel>
export interface CartStoreSnapshot extends CartStoreSnapshotType {}
export const createCartStoreDefaultModel = () => types.optional(CartStoreModel, {})
