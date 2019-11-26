import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import {cleanCart } from "./actions/cartActions";


class Checkout extends React.Component {

    componentDidMount() {
        this.props.cleanCart();
    }
    render() {
        return (
            <div className="checkout">
                <div className="header"> </div>
                <h2>Thank you for your order!</h2>
                <Link to="/shop">
                    <button type="button"> Return to shop</button>
                </Link>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        cleanCart: () => dispatch(cleanCart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

