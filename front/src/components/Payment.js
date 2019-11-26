import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { submit, pay } from './actions/cartActions';


class Payment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
        };
        this.submit = this.submit.bind(this);
    }


    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    submit() {
        this.props.pay(this.props.id);
    }

    render() {
        return (
            <div>
            <div className="header"> </div>
            <div className="paymentForm">
                <Cards
                    cvc={this.state.cvc}
                    expiry={this.state.expiry}
                    focused={this.state.focus}
                    name={this.state.name}
                    number={this.state.number}
                />
                <form className="paymentInputs">
                    <input
                        type="number"
                        name="number"
                        placeholder="Card Number"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />

                    <input
                        type="name"
                        name="name"
                        placeholder="Name"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />

        <div className="inline">
                    <input
                        type="number"
                        name="expiry"
                        placeholder="Valid thru"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />

                    <input
                        type="number"
                        name="cvc"
                        placeholder="CVC"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />

            </div>
                    <Link to={`/checkout`}> <button type="button" onClick={this.submit}>Submit</button></Link>
                </form>

            </div>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        id: state.logic.id,
        isPaid: state.logic.isPaid,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        submit: (data) => dispatch(submit(data)),
        pay: (id) => dispatch(pay(id)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Payment);
