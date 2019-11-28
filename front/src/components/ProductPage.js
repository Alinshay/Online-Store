import React from 'react';
import { connect } from 'react-redux';
import { itemsFetchData, addToCart } from './actions/cartActions';
import {withAlert} from "react-alert";


class ProductPage extends React.Component {
  componentDidMount() {
    this.props.fetchData(`https://evening-brushlands-10117.herokuapp.com/products/${this.props.match.params.id}`);
  }
  handleClick(id) {
    this.props.addToCart(id);
  }

  render() {
    if (this.props.hasErrored) {
      return <div className="home"><p>Sorry! There was an error loading the items</p></div>;
    }
    if (this.props.isLoading) {
      return <div className="home"><p>Loading…</p></div>;
    }
    let itemList = this.props.items.map((item) => (
      <div className="productPage" key={item.id}>
        <img src={item.img} alt={item.title}/>
        <div className="productInfo">
          <h3 className="card-title">{item.title}</h3>
          <p className="card-price">${item.price}</p>
          <p className="card-desc">{item.desc}</p>
          <button type="button" className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => {this.props.alert.success(`${item.title} was added to your cart`); this.handleClick(item.id);}}><i className="material-icons"> Add to Cart </i> </button>
        </div>
      </div>));
    return (
      <div>
        <div className="header"> </div>
        <div className="product">
          {itemList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.logic.items,
    hasErrored: state.logic.hasErrored,
    isLoading: state.logic.isLoading,
    total: state.logic.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url)),
    addToCart: (id) => dispatch(addToCart(id)),
  };
};

export default withAlert()(connect(mapStateToProps, mapDispatchToProps)(ProductPage));
