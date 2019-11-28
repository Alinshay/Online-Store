import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Recipe extends React.Component {
//<input id="code" type="text" placeholder="Input coupon code"/><button onClick={this.handleClick} className="ar-button">→</button>
  render() {
    return (
      <div className="cart-totals">
        <h3>Cart Totals </h3>
        <div className="totals">
          <h4>
            Total: ${this.props.total}
          </h4>
          <div className="checkout">
            <Link to="/order">
              <button>Continue</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addedItems: state.logic.addedItems,
    total: state.logic.total,
  };
};


export default connect(mapStateToProps)(Recipe);
