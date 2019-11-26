import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider } from 'react-alert';
import Home from './components/Home';
import Cart from './components/Cart';
import './Styles.css';
import ProductPage from './components/ProductPage';
import Order from './components/Order';
import Shop from './components/Shop';
import Navbar from './components/Navbar';
import Checkout from "./components/Checkout";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Provider template={AlertTemplate} {...options}>
              <Route exact path="/" component={Home} />
              <Route exact path="/shop" component={Shop} />
              <Route exact path="/products/:id" component={ProductPage} />
              <Route path="/cart" component={Cart} />
              <Route path="/order" component={Order} />
              <Route path="/checkout" component={Checkout} />
            </Provider>
          </Switch>
          <div className="footer" />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
