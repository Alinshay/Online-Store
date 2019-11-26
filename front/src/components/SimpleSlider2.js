import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { addToCart, itemsFetchData } from './actions/cartActions';


class SimpleSlider2 extends React.Component {
  componentDidMount() {
    this.props.fetchData('https://evening-brushlands-10117.herokuapp.com/products/id-asc');
  }

  render() {
    const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
    };

    if (this.props.hasErrored) {
      return <div className="samples"><p>Sorry! There was an error loading the items</p></div>;
    }

    if (this.props.isLoading) {
      return <div className="samples"><p>Loading…</p></div>;
    }
    const itemList = this.props.items.map((item) => (
      <div className="card" key={item.id}>
        <div className="card-image">
          <Link to={`/products/${item.id}`}><img src={item.img} alt={item.title} /></Link>
        </div>
      </div>
    ))

    return (
      <div className="home">
        <Slider {...settings}>
          {itemList}
        </Slider>
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.logic.items,
    hasErrored: state.logic.hasErrored,
    isLoading: state.logic.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url)),
    addToCart: (id) => dispatch(addToCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleSlider2)
