import React from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from './actions/cartActions';


class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.category = this.category(this);
        this.sort = this.sort.bind(this);

    }

    componentDidMount(){
        this.props.fetchData('https://evening-brushlands-10117.herokuapp.com/products/id-asc');
    }

    sort = () =>{

        let url = 'https://evening-brushlands-10117.herokuapp.com/products/';
        switch(document.getElementById('categories').value)
        {
            case 'Flowers': url+='flowers/'; break;
            case 'Home decor': url+='decor/'; break;
            default: url+='';
        }

        switch(document.getElementById('select').value)
        {
            case 'Price: Low to High': url+='price-asc'; break;
            case 'Price: High to Low': url+='price-desc'; break;
            case 'Sort by Latest': url+='id-asc'; break;
            case 'Sort by Oldest': url+='id-desc';break;
            default: url+='';
        }

        this.props.fetchData(url);

    }

    category=(v)=>{

    }

        render(){return (
            <div className="sidebar">
                <h3>Sort by</h3>
                <select id="select" onChange={this.sort}>
                    <option>Sort by Latest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Sort by Oldest</option>
                </select>

                <h3>Categories</h3>

                <select id="categories" onChange={this.sort}>
                    <option>All products </option>
                    <option>Flowers </option>
                    <option>Home decor </option>
                </select>

            </div>

        )}

}

const mapStateToProps = (state) => {
    return {
        items: state.logic.items,
        hasErrored: state.logic.hasErrored,
        isLoading: state.logic.isLoading,
        total: state.logic.total,
        url: state.logic.url
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
