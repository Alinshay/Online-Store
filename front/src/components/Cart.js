import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem } from './actions/cartActions';
import Recipe from './Recipe';

class Cart extends Component{
  handleRemove(id) {
    this.props.removeItem(id);
  }
  /*handleAddQuantity = (id)=>{
    this.props.addQuantity(id);
  }*/
  render() {
    const addedItems = JSON.parse(localStorage.getItem('addedItems')).map(item=>{
      return (
        <li className="collection-item avatar" key={item.id}>
          <div className="item-img">
            <Link to={`/products/${item.id}`}>
                <img src={item.img} alt={item.img} className="" /> </Link>
          </div>
          <div className="item-desc">
            <div className="info">
              <Link to={`/products/${item.id}`}><span className="title"><b>{item.title}</b></span></Link>
              <p>{item.price}$</p>
            </div>
            <div className="quantity">
              <input type="text" value={'  Quantity     ' + item.quantity } />
              <button type="button" className="remove" onClick={() => { this.handleRemove(item.id); }}>×</button>
            </div>
          </div>
        </li>
      );
    });

    if (JSON.parse(localStorage.getItem('addedItems')).length) {
      return (
        <div>
          <div className="header"> </div>
          <div className="cart">
            <div className="shopping-cart">
              <h3>Shopping Cart</h3>
              <ul className="collection">
                {addedItems}
              </ul>
            </div>
            <Recipe />
          </div>
        </div>
      );
    }
    else {
            return(
                <div>
                  <div className="header"> </div>
                  <div className="empty-cart">
                    <h2>Your Cart is Currently Empty</h2>
                    <Link to="/shop"><button type="button">Return to shop</button></Link>
                  </div>
                </div>);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.logic.addedItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => dispatch(removeItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
