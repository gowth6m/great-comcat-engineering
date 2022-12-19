import { createContext, useReducer } from "react";
import { ProductDataType } from "./data";

export const Store = createContext({} as any);

const initialState = {
  cart: { cartItems: [] },
};

interface ICart {
  cartItems: ProductDataType[];
}

interface IAction {
  type: string;
  payload: ProductDataType;
}

interface IState {
  cart: ICart;
}

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: ProductDataType) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: ProductDataType) =>
            item.slug === existItem.slug ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

export function StoreProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
