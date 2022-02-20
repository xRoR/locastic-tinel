import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useStores as storeFn } from '../../models/store-context';
import { WorkshopModel } from '../../models/workshop/workshop';
import CategoryPage from '../CategoryPage';

const useStores = storeFn as ReturnType<typeof jest['fn']>;
jest.mock('../../models/store-context');


const mockWorkshops = [
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

describe('Catalog page component', () => {
  beforeEach(async () => {
    useStores.mockReturnValue({
      catalogStore: {
        workshops: [...mockWorkshops as any],
        categories: ['cat1', 'cat2'],
        getCategories: jest.fn(),
        totalWorkshops: 2
      },
      cartStore: {isOpened: false}
    });
  });

  it('should renders without error', () => {
    expect(
      render(
        <BrowserRouter>
          <CategoryPage />
        </BrowserRouter>
      )
    ).toBeTruthy();
  });

  it('should render catalog correctly', () => {
    render(
      <BrowserRouter>
        <CategoryPage />
      </BrowserRouter>
    )

    expect(screen.getByText('prod1')).toBeInTheDocument();

    expect(screen.getByText('Displayed: 2')).toBeTruthy();
  })
});
