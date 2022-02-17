import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { WorkshopApi } from '../../services/api/workshop-api';
import { withStoreEnv } from '../extentions/with-stote-env';
import { UserModel } from '../user/user';

export const WorkshopModel = types
  .model('Workshop')
  .props({
    id: types.identifierNumber,
    title: types.maybe(types.string),
    desc: types.maybe(types.string),
    price: types.number,
    date: types.maybe(types.string),
    category: types.maybe(types.string),
    imageUrl: types.maybe(types.string),
    qty: types.maybe(types.number),
    userId: types.safeReference(UserModel),
  })
  .extend(withStoreEnv)
  .actions((self) => ({
    setQty: (qty: number) => {
      self.qty = qty;
    },
  }))
  .actions((self) => ({
    fetchWithSamecategory: async () => {
      const api = new WorkshopApi(self.environment.api);
      const result = await api.getWorkshops({
        _page: 1,
        _limit: 3,
        category: self.category,
      });

      if (result.kind === 'ok') {
        const similar: Workshop[] = result.workshops.filter(i => i.id !== self.id)
        return similar;
      } else {
        console.log(result.kind);
      }
    },
  }))
  .views((self) => ({
    get cost() {
      return (self.qty || 1) * (self.price || 0);
    },
  }));

type WorkshopType = Instance<typeof WorkshopModel>;
export interface Workshop extends WorkshopType {}
type WorkshopSnapshotType = SnapshotOut<typeof WorkshopModel>;
export interface WorkshopSnapshot extends WorkshopSnapshotType {}
export const createWorkshopDefaultModel = () => types.optional(WorkshopModel, {} as any);
