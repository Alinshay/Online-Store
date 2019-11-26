import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { submit } from './actions/cartActions';
import Payment from "./Payment";


const required = value => (value || typeof value === 'number' ? undefined : 'Required');
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength2 = minLength(2)

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

export const phoneNumber = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
        ? 'Invalid phone number, must be 10 digits'
        : undefined

const renderField = ({input,
                         label,
                         type,
                         meta: {  error }
                     }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {(error && <span>{error}</span>)}
        </div>
    </div>
)



let OrderForm = props => {
    const { deliveryValue, paymentValue, handleSubmit } = props;
        return(
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>1. About you</h2>
                    <label>Your name *</label>
                    <Field name="name" component={renderField} type="text" validate={[required, maxLength15, minLength2]}/>
                    <label>Phone number *</label>
                    <Field name="phoneNumber" component={renderField} type="text" validate={[required, phoneNumber]}/>
                    <label>E-mail</label>
                    <Field name="email" component={renderField} type="text" validate={email}/>
                </div>

                <div>
                    <h2>2. Shipping</h2>

                    <Field name="shipping" component="select">
                        <option />
                        <option>Local pickup</option>
                        <option>Flat rate</option>
                    </Field>

                    {deliveryValue === 'Local pickup' && <Field name="city" component="select">
                        <option/>
                        <option>Moscow</option>
                        <option>St. Petersburg</option>
                    </Field>}


                    {deliveryValue === 'Flat rate' && <div>
                        <h2>2.1 Address</h2>
                        <Field name="city" component="select">
                            <option/>
                            <option>Moscow</option>
                            <option>St. Petersburg</option>
                        </Field>


                        <label>Street address </label>
                        <Field name="streetAddress" component="textarea"
                               validate={[required, maxLength15, minLength2]}/>
                    </div>
                    }

                </div>

                <div>
                    <h2>3. Payment</h2>
                    <Field name="payment" component="select">
                        <option/>
                        <option>Cash on delivery</option>
                        <option>Online with card</option>
                    </Field>


                    {paymentValue === 'Cash on delivery' &&
                    <Link to={`/checkout`}><button type="submit" >Submit</button></Link>
                    }

                    {paymentValue === 'Online with card' &&
                    <button type="submit">Buy</button>
                    }

                </div>

            </form>
        )
}


OrderForm = reduxForm({
    form: 'order'
})(OrderForm);


const selector = formValueSelector('order'); // <-- same as form name
OrderForm = connect(
    state => {
        const deliveryValue = selector(state, 'shipping');
        const paymentValue = selector(state, 'payment');
        return {
            deliveryValue,
            paymentValue
        }
    }
)(OrderForm)



class Order extends React.Component {
    submit = (values) => {
        const addedList = this.props.addedItems.map((item) => (item.title + '(' + item.quantity)+')');
        let date = new Date();
        date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} `;

       let data = '&id=' + encodeURIComponent(this.props.id)+
           '&name=' + encodeURIComponent(values.name) +
           '&date=' + encodeURIComponent(date)+
            '&phone=' + encodeURIComponent(values.phoneNumber)+
            '&email=' + encodeURIComponent(values.email)+
           '&shipping='+encodeURIComponent(values.shipping)+
            '&city='+encodeURIComponent(values.city)+
           '&address='+encodeURIComponent(values.streetAddress)+
           '&payment='+encodeURIComponent(values.payment)+
           '&total='+encodeURIComponent(this.props.total)+
           '&products='+encodeURIComponent(addedList)+
            '&paid='+encodeURIComponent('0');

        this.props.submit(data);

    }

    render() {
        if(!this.props.isSubmitted)
        return <div className="order"> <div className="header"> </div>  <OrderForm onSubmit={this.submit} /></div>;


        if(this.props.isSubmitted)
            return <Payment/>;
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.logic.id,
        isSubmitted: state.logic.isSubmitted,
        total: state.logic.total,
        addedItems: state.logic.addedItems,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        submit: (data) => dispatch(submit(data))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));


