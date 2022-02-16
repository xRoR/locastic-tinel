
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel } from "../user/user";

export const WorkshopModel = types.model("Workshop").props({
  id:types.identifierNumber,
  title: types.maybe(types.string),
  desc: types.maybe(types.string),
  price: types.maybe(types.number),
  date: types.maybe(types.string),
  category: types.maybe(types.string),
  imageUrl: types.maybe(types.string),
  qty: types.maybe(types.number),
  userId: types.safeReference(UserModel)
})
.actions((self) => (
  {
    setQty: (qty: number) => {
      self.qty = qty;
    }
  }
))
.views(self => ({
  get cost() {
    return (self.qty || 1) * (self.price || 0);
  }
}))

type WorkshopType = Instance<typeof WorkshopModel>
export interface Workshop extends WorkshopType {}
type WorkshopSnapshotType = SnapshotOut<typeof WorkshopModel>
export interface WorkshopSnapshot extends WorkshopSnapshotType {}
export const createWorkshopDefaultModel = () => types.optional(WorkshopModel, {} as any)
