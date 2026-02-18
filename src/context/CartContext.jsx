import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(undefined);

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.items.findIndex(
                (item) => item.cartId === action.payload.cartId
            );

            let newItems;
            if (existingItemIndex > -1) {
                newItems = [...state.items];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    qty: newItems[existingItemIndex].qty + action.payload.qty,
                };
            } else {
                newItems = [...state.items, action.payload];
            }

            return {
                ...state,
                items: newItems,
                totalItems: state.totalItems + action.payload.qty,
                totalPrice: state.totalPrice + action.payload.price * action.payload.qty,
            };
        }
        case 'REMOVE_ITEM': {
            const itemToRemove = state.items.find((item) => item.cartId === action.payload.cartId);
            if (!itemToRemove) return state;

            return {
                ...state,
                items: state.items.filter((item) => item.cartId !== action.payload.cartId),
                totalItems: state.totalItems - itemToRemove.qty,
                totalPrice: state.totalPrice - itemToRemove.price * itemToRemove.qty,
            };
        }
        case 'UPDATE_QTY': {
            const { cartId, qty } = action.payload;
            if (qty === 0) {
                // Redirect to remove logic if qty 0
                return cartReducer(state, { type: 'REMOVE_ITEM', payload: { cartId } });
            }

            const itemIndex = state.items.findIndex((item) => item.cartId === cartId);
            if (itemIndex === -1) return state;

            const item = state.items[itemIndex];
            const qtyDiff = qty - item.qty;

            const newItems = [...state.items];
            newItems[itemIndex] = { ...item, qty };

            return {
                ...state,
                items: newItems,
                totalItems: state.totalItems + qtyDiff,
                totalPrice: state.totalPrice + item.price * qtyDiff,
            };
        }
        case 'CLEAR_CART':
            return {
                items: [],
                totalItems: 0,
                totalPrice: 0,
            };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        totalItems: 0,
        totalPrice: 0,
    });

    const addItem = (item, quantity, options, specialRequest) => {
        // Create a unique ID based on item ID and selected options
        const optionsKey = options ? JSON.stringify(options) : '';
        const cartId = `${item.id}-${optionsKey}-${specialRequest || ''}`;

        const cartItem = {
            ...item,
            cartId,
            qty: quantity,
            selectedOptions: options,
            specialRequest,
        };

        dispatch({ type: 'ADD_ITEM', payload: cartItem });
    };

    const removeItem = (cartId) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { cartId } });
    };

    const updateQty = (cartId, qty) => {
        dispatch({ type: 'UPDATE_QTY', payload: { cartId, qty } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{ ...state, addItem, removeItem, updateQty, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
