
import React, { Component } from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Basket from "./components/Basket";
import "./App.css";
import Copyright from "./components/Copyright";
import { dom } from '@fortawesome/fontawesome-svg-core'
dom.watch() 
class App extends Component {
  constructor() {
    super();
    this.state = {
      size: "",
      sort: "",
      price:150,
      cartItems: [],
      products: [],
      filteredProducts: []
    };
  }
  componentWillMount() {
    if (localStorage.getItem("cartItems")) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems"))
      });
    }

    fetch("http://localhost:8000/products")
      .then(res => res.json())
      .catch(err =>
        fetch("db.json")
          .then(res => res.json())
          .then(data => data.products)
      )
      .then(data => {
        this.setState({ products: data });
        this.listProducts();
      });
  }

  handleRemoveFromCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter(a => a.id !== product.id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };

  handleAddToCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(cp => {
        if (cp.id === product.id) {
          cp.count += 1;
          productAlreadyInCart = true;
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };

  listProducts = () => {
    this.setState(state => {
      if (state.sort !== "") {
        state.products.sort((a, b) =>
          state.sort === "lowestprice"
            ? a.price > b.price
              ? 1
              : -1
            : a.price < b.price
            ? 1
            : -1
        );
      } else {
        state.products.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      if (state.size !== "") {
        return {
          filteredProducts: state.products.filter(
            a => a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
          ).filter(a => a.price <= state.price)
        };
      }

      if (state.price !== 150) {
        return {
          filteredProducts: state.products.filter(
            a => a.price <= state.price)
        }
      }

      return { filteredProducts: state.products };
    });
  };
  handleSortChange = e => {
    this.setState({ sort: e.target.value });
    this.listProducts();
  };
  handleSizeChange = e => {
    this.setState({ size: e.target.value });
    this.listProducts();
  };
  handleChangePrice = e => {
    this.setState({price: e.target.value});
    this.listProducts();
  }
  render() {
    return (
      <div className="container">
        <h1>E-commerce Shopping Cart Application</h1>
        <hr />
        <div className="row">
          <div className="col-md-9">
            <Filter
              count={this.state.filteredProducts.length}
              price={this.state.price}
              handleSortChange={this.handleSortChange}
              handleSizeChange={this.handleSizeChange}
              handleChangePrice={this.handleChangePrice}
            />
            <hr />
            <Products
              products={this.state.filteredProducts}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
          <div className="col-md-3">

              <div  className="alert alert-info cartButton" >
              <i className="fas fa-shopping-cart fa-pulse " style={{ fill:'#fff', marginRight: '5px' }}> </i> Cart 
              </div> 
            <Basket
              cartItems={this.state.cartItems}
              handleRemoveFromCart={this.handleRemoveFromCart}
            />
             <hr/>
            <Copyright />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
