import React from 'react';
import SimpleSlider from './SimpleSlider';
import SimpleSlider2 from './SimpleSlider2';
import { Link } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { sendSubscription } from './actions/cartActions';
import { connect } from 'react-redux';

class Home extends React.Component {

    handleClick = () => {
        if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(document.getElementById('email').value))
            {if (!this.props.isPost)
                {this.props.alert.success(`Sent`);
                this.props.sendSubscription(document.getElementById('email').value);
                document.getElementById('email').value = '';}
            else{
                this.props.alert.error(`You've already signed`);
            }}
        else{
            this.props.alert.error(`Your e-mail is incorrect`);
        }

    }

    render(){

        return(
                <div className="home">

                    <SimpleSlider/>

                    <div className="collections">
                        <div className="col col_1"><div><h3>Go Green</h3><h3>Home gardeners</h3><br/><Link to="/shop">See whole collection</Link></div></div>
                        <div className="col col_2"><div><h3>Mother's day</h3> <h3>Green bouquet</h3><br/><Link to="/shop">See whole collection</Link></div></div>
                        <div className="col col_3"><div><h3>Cacti love</h3><h3> Urban desert</h3><br/><Link to="/shop">See whole collection</Link></div></div>
                    </div>
                    <SimpleSlider2/>

                    <h2> Join Our Newsletter</h2>
                    <div className="join">
                       <br/>
                        <input id="email" type="text" placeholder="YOUR EMAIL" />
                        <button onClick={this.handleClick} id="subscription">Send</button>

                    </div>

                </div>
                )
    }
}


const mapStateToProps = (state) => {
    return {
        isPost: state.logic.isPost
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendSubscription: (url) => dispatch(sendSubscription(url))
    };
};

export default withAlert() (connect(mapStateToProps, mapDispatchToProps)(Home))


