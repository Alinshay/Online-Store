import  {addToCart}  from '../components/actions/cartActions';

describe('>>> ACTIONS >>>', ()=>{
  it('addToCart', () => {
    const add = addToCart(1);
    expect(add).toEqual({ type:"ADD_TO_CART", id:1 });
  });

});