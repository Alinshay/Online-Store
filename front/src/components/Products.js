import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { addToCart, itemsFetchData } from './actions/cartActions';

class Products extends React.Component {
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
    <div className="card" key={item.id}>
      <Link to={`/products/${item.id}`}>
        <img src={item.img} alt={item.title} />
        <h3 className="card-title">{item.title}</h3>
      </Link>
      <p className="card-price">${item.price}</p>
      <button type="button" onClick={() => {this.props.alert.success(`${item.title} was added to your cart`); this.handleClick(item.id);}}> Add to Cart </button>
    </div>
    ));

    return(
      <div className="products">
        {itemList}
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

export default withAlert()(connect(mapStateToProps, mapDispatchToProps)(Products));
