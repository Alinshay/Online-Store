import React from 'react';
import Sidebar from './Sidebar';
import Products from './Products';


class Home extends React.Component {
    render(){

        return(
            <div>
            <div className="header"> </div>
            <div className="shop">

                <Sidebar/>
                <Products/>
            </div>
            </div>

        )
    }
}

export default Home;

