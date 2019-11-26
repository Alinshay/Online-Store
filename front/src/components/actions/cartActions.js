import {
    SEND_SUBSCRIPTION,
    ADD_TO_CART,
    REMOVE_ITEM,
    ITEMS_HAS_ERRORED,
    ITEMS_IS_LOADING,
    ITEMS_FETCH_DATA_SUCCESS, SUBMIT,
} from './action-types/cart-actions';


export function sendSubscriptionSuccess(email) {
    return {
        type: SEND_SUBSCRIPTION,
        email
    };
}

export function submitSuccess(data) {
    return{
        type: SUBMIT,
        data
    };
}

export function paySuccess(id) {
    return {
        type: 'PAY',
        id
    };
}

export function removeItem(id){
    return{
        type: REMOVE_ITEM,
        id
    };
}


export function itemsHasErrored(bool) {
    return {
        type: ITEMS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: ITEMS_IS_LOADING,
        isLoading: bool
    };
}

export function addToCart(id) {
    return {
        type: ADD_TO_CART,
        id
    };
}


export function cleanCart() {
    return {
        type: 'CLEAN_CART'
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: ITEMS_FETCH_DATA_SUCCESS,
        items
    };
}

export function sendSubscription(email){
    return (dispatch) => {const data = 'email=' + encodeURIComponent(email);
    const post_request = new XMLHttpRequest();
    post_request.open('POST','https://evening-brushlands-10117.herokuapp.com/subscriptions',true);
    post_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    post_request.send(data);
    dispatch(sendSubscriptionSuccess(data));
    };
}

export function pay(id){
    return (dispatch) => {const data = '&id='+encodeURIComponent((id).toString());
    const post_request = new XMLHttpRequest();
    post_request.open('POST','https://evening-brushlands-10117.herokuapp.com/update',true);
    post_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    post_request.send(data);
    dispatch(paySuccess(data));
    };
}

export function submit(data){
    //const data = action.data;
    return (dispatch) => {const post_request = new XMLHttpRequest();
    post_request.open('POST','https://evening-brushlands-10117.herokuapp.com/submit',true);
    post_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    post_request.send(data);
    dispatch(submitSuccess(data));
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

