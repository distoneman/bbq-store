const initialState = {
    cartItems: 0
}

const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS';
const RESET_STATE = 'RESET_STATE';


export default function reducer(state = initialState, action){
    // console.log(action)
    switch (action.type) {
        case UPDATE_CART_ITEMS:
            return Object.assign({}, state, { cartItems: action.payload });
        case RESET_STATE:
            return Object.assign({}, initialState)
        default: return state;
    }

}

export function updateCartItems(numItems) {
    // console.log('function update hit', numItems)
    return {
        type: UPDATE_CART_ITEMS,
        payload: numItems
    }
}

export function resetState() {
    return{
        type: RESET_STATE,
        payload: initialState
    }
}