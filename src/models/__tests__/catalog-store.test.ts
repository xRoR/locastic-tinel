import { CatalogStoreModel } from '../catalog-store/catalog-store';
import { Environment } from '../environment';
import { WorkshopApi } from '../../services/api/workshop-api';
import { WorkshopModel } from '../workshop/workshop';

const categories = ['cat1', 'cat2'];
const workshops = [
  WorkshopModel.create({
    id: 1,
    title: 'prod1',
    price: 1,
  }),
  WorkshopModel.create({
    id: 2,
    title: 'prod2',
    price: 1,
  }),
];

afterEach(() => {
  jest.restoreAllMocks();
});

test('should fetch workshop list', async () => {
  const env = new Environment();
  await env.setup();
  const catalog = CatalogStoreModel.create({}, env);

  expect(catalog.totalWorkshops).toBe(0);

  jest
    .spyOn(WorkshopApi.prototype, 'getWorkshops')
    .mockResolvedValueOnce({ kind: 'ok', workshops, pagination: {} });

  await catalog.getWorkshops();

  expect(catalog.totalWorkshops).toBe(2);
});

test('should fetch categories list', async () => {
  const env = new Environment();
  await env.setup();
  const catalog = CatalogStoreModel.create({}, env);
  jest.spyOn(WorkshopApi.prototype, 'getCategories').mockResolvedValueOnce({ kind: 'ok', categories });

  await catalog.getCategories();

  expect(catalog.categories.length).toBe(2);
});

test('should set category and fetch new workshops', async () => {
  const env = new Environment();
  await env.setup();
  const catalog = CatalogStoreModel.create({}, env);
  
  const getWorkshops = jest.spyOn(WorkshopApi.prototype, 'getWorkshops');
  getWorkshops.mockResolvedValueOnce({
    kind: 'ok',
    workshops: [WorkshopModel.create({ id: 1, title: 'prod3', price: 1 })],
    pagination: {},
  });

  catalog.chooseCategory('cat2');

  expect(catalog.category).toBe('cat2');
  expect(getWorkshops).toHaveBeenCalled();
});
