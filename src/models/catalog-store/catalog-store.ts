import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { WorkshopApi } from '../../services/api/workshop-api';
import { withStoreEnv } from '../extentions/with-stote-env';
import { Workshop, WorkshopModel } from '../workshop/workshop';

const PageParams = types.model({
  _page: types.maybe(types.number),
  _sort: types.maybe(types.string),
  _order: types.maybe(types.string)
});

const Pagination = types.model({
  first: types.maybe(PageParams),
  next: types.maybe(PageParams),
  last: types.maybe(PageParams),
  prev: types.maybe(PageParams),
})

export const CatalogStoreModel = types
  .model('CatalogStore')
  .props({
    workshops: types.optional(types.array(WorkshopModel), []),
    category: types.maybe(types.string),
    categories: types.optional(types.array(types.string), []),
    pagination: types.maybe(Pagination)
  })
  .extend(withStoreEnv)
  .actions((self) => ({
    setCategories: (categories: string[]) => {
      self.categories.replace(categories);
    },
    saveWorkshops: (workshopSnapshot: Workshop[]) => {
      self.workshops.replace(workshopSnapshot);
    },
    appendWorkshops: (workshops: Workshop[]) => {
      self.workshops.replace([...self.workshops, ...workshops]);
    },
    setPagination: (pagination?: Instance<typeof Pagination>) => {
      self.pagination = pagination;
    }
  }))
  .actions((self) => ({
    getWorkshops: async (page?: number, limit?: number) => {
      const api = new WorkshopApi(self.environment.api);
      const result = await api.getWorkshops({
        _page: page || 1,
        _limit: limit,
        category: self.category,
      });

      if (result.kind === 'ok') {
        self.saveWorkshops(result.workshops);
        self.setPagination(result.pagination);
      } else {
        console.log(result.kind);
        self.setPagination();
      }
    },
    fetchNextWorkshops: async () => {
      const api = new WorkshopApi(self.environment.api);
      
      if (!self.pagination?.next) return;
      const result = await api.getWorkshops({
        ...self.pagination?.next,
        category: self.category,
      });

      if (result.kind === 'ok') {
        self.appendWorkshops(result.workshops);
        self.setPagination(result.pagination);
      } else {
        console.log(result.kind);
        self.setPagination();
      }
    },
    getCategories: async () => {
      const api = new WorkshopApi(self.environment.api);
      const result = await api.getCategories();

      if (result.kind === 'ok') {
        self.setCategories(result.categories);
      } else {
        console.log(result.kind);
      }
    },
    getWorkshop: async (id: number) => {
      const api = new WorkshopApi(self.environment.api);
      const result = await api.getOne(id);

      if (result.kind === 'ok') {
        self.appendWorkshops([result.workshop]);
        return result.workshop;
      } else {
        console.log(result.kind);
      }
    },
    getWorkshopByCategory: async (category: string) => {
      const api = new WorkshopApi(self.environment.api);
      const result = await api.getWorkshops({
        _page: 1,
        _limit: 3,
        category: category,
      });

      if (result.kind === 'ok') {
        return result.workshops;
      } else {
        console.log(result.kind);
      }
    }
  }))
  .actions((self) => ({
    chooseCategory: async (category: string) => {
      self.category = category !== 'all' ? category : undefined;
      await self.getWorkshops();
    },
    resetCategory: async () => {
      self.category = undefined;
      await self.getWorkshops();
    },
  }))
  .views((self) => ({
    get totalWorkshops() {
      return self.workshops.length;
    },
    showWorkshop(id: number): Workshop | undefined {
      return self.workshops.find(workshop => workshop.id === id);
    }
  }));

type CatalogStoreType = Instance<typeof CatalogStoreModel>;
export interface CatalogStore extends CatalogStoreType {}
type CatalogStoreSnapshotType = SnapshotOut<typeof CatalogStoreModel>;
export interface CatalogStoreSnapshot extends CatalogStoreSnapshotType {}
export const createCatalogStoreDefaultModel = () => types.optional(CatalogStoreModel, {});
