import React from 'react';
import Sidebar from './Sidebar';
import Products from './Products';


class Shop extends React.Component {
    render(){

        return(
            <div>
            <div className="header"> </div>
            <div className="shop">

                <Sidebar/>
                <Products/>
            </div>
            </div>
        );
    }
}

export default Shop;

