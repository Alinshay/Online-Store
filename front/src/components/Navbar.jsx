import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { itemsFetchData } from './actions/cartActions';

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className="navbar">
          <Link to="/" className="brandName">My Online Store</Link>
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/cart">
                My cart (${JSON.parse(localStorage.getItem('total'))})
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    total: state.logic.total,
    addedItems: state.logic.addedItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
