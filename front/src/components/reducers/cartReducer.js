import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import {
  SEND_SUBSCRIPTION,
  ADD_TO_CART,
  REMOVE_ITEM,
  ITEMS_FETCH_DATA_SUCCESS,
  ITEMS_IS_LOADING,
  ITEMS_HAS_ERRORED, SUBMIT,
} from '../actions/action-types/cart-actions';


const initState = {
  hasErrored: false,
  isLoading: false,
  items: [],
  addedItems: JSON.parse(localStorage.getItem('addedItems')),
  total: JSON.parse(localStorage.getItem('total')),
  isPost: false,
  discount: 1,
  Order: {},
  isSubmitted: false,
  id: Date.now(),
  isPaid: false
}

if (!JSON.parse(localStorage.getItem('total'))) {
  localStorage.setItem('total', JSON.stringify(0));
}
if (!JSON.parse(localStorage.getItem('addedItems'))) {
  localStorage.setItem('addedItems', JSON.stringify([]));
}


const logicReducer = (state = initState, action) => {

    if(action.type ===ITEMS_HAS_ERRORED)
        return{...state, hasErrored: true}

    if(action.type ===ITEMS_IS_LOADING)
        return{...state, isLoading: true}

    if(action.type===ITEMS_FETCH_DATA_SUCCESS)
        return{...state, items: action.items, isLoading: false}

    if(action.type === ADD_TO_CART){
        let addedItem = state.items.find(item=> item.id === action.id);
        let existed_item= state.addedItems.find(item=> action.id === item.id);

        if(existed_item)
        {
            existed_item.quantity = existed_item.quantity+1;
            let new_items = state.addedItems.filter(item=> action.id !== item.id);
            let newTotal = state.total + addedItem.price;
            localStorage.setItem('total', JSON.stringify(newTotal));
            localStorage.setItem('addedItems', JSON.stringify([...new_items, existed_item]));
            return{
                ...state,
                addedItems: [...new_items, existed_item],
                total: newTotal
            };

        }
        else{
            addedItem.quantity = 1;
            let newTotal = state.total + addedItem.price;
            localStorage.setItem('total', JSON.stringify(newTotal));
            localStorage.setItem('addedItems', JSON.stringify([...state.addedItems, addedItem]));

            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            };

        }
    }

    if(action.type === REMOVE_ITEM){
        let itemToRemove = state.addedItems.find(item=> action.id === item.id);
        let new_items = state.addedItems.filter(item=> action.id !== item.id);
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity );
        localStorage.setItem('total', JSON.stringify(newTotal));
        localStorage.setItem('addedItems', JSON.stringify(new_items));

        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        };
    }


    if(action.type=== SEND_SUBSCRIPTION){

        return{
            ...state,
            isPost: true
        };
    }

    if(action.type === SUBMIT){
        return{
            ...state,
            isSubmitted: true
        };
    }

    if(action.type === 'PAY'){
        return{
            ...state,
            isPaid: true
        };
    }

    if(action.type=== 'CLEAN_CART'){

        localStorage.setItem('total', JSON.stringify(0));
        localStorage.setItem('addedItems', JSON.stringify([]));

        return{
            ...state,
            hasErrored: false,
            isLoading: false,
            items: [],
            addedItems:[],
            total: 0,
            isPost: false,
            discount: 1,
            Order: {},
            id: Date.now(),
            isSubmitted: false,
            isPaid: false
        };
    }


    return state;

}

const rootReducer = combineReducers({ logic: logicReducer, form: formReducer })

export default rootReducer;
