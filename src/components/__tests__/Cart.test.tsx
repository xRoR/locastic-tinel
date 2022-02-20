import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Cart from "../cart/Cart";
import { useStores as storeFn } from "../../models/store-context";
import { CartStoreModel } from "../../models/cart-store/cart-store";
import { WorkshopModel } from "../../models/workshop/workshop";

const useStores = storeFn as ReturnType<typeof jest["fn"]>;
jest.mock("../../models/store-context");

const mockCart = () => {
    const store = CartStoreModel.create({}, {api: jest.fn});
    return store;
};

describe("Cart panel component", () => {
    beforeEach(() => {
        useStores.mockReturnValue({cartStore: mockCart()});
    });

    afterAll(() => {
        cleanup();
    });

    it("should renders without error", () => {
      expect(render(<Cart />)).toBeTruthy();
    });

    it("renders cart items poperly", async () => {
        const store = mockCart();
        store.setCart([WorkshopModel.create({id: 1, title: 'product', price: 1})]);
        useStores.mockReturnValue({cartStore:store});
    
        render(<Cart />);
        expect(await screen.findAllByRole('listitem')).toHaveLength(1);
    });

    it("should remove cart item without error", async () => {
        const store = mockCart();
        store.setCart([WorkshopModel.create({id: 1, title: 'product', price: 1})]);
        useStores.mockReturnValue({cartStore:store});
    
        render(<Cart />);
        expect(await screen.findAllByRole('listitem')).toHaveLength(1);

        const deleteBtn = screen.getByTitle("Remove item fron cart");
        userEvent.click(deleteBtn)

        expect(screen.getByText('Cart is empty')).toBeInTheDocument();

        expect(screen.queryByRole('listitem')).toBeNull();
    });
})