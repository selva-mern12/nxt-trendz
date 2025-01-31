import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [
      {
        id: 48,
        title: 'Monsters Charm Toy',
        brand: 'Trendytap',
        description:
          "Monsters Charm Toy is a random pack of 5 Mini Generic silicon rubber charm Figures with a pocket-size of 3 cm wide. It has threads to hang as a charm pendant. Perfect for decorating your succulent plants, flower pot, mini garden, etc. Also great as a decoration in your children's room.",
        price: 8600,
        quantity: 1,
        availability: 'In Stock',
        rating: 4.2,
        totalReviews: 1243,
        imageUrl:
          'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-minnos.png',
      },
    ],
  }

  removeCartItem = id =>
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(cart => id !== cart.id),
    }))

  addCartItem = product => {
    console.log({product})
    this.setState(prevState => {
      const {cartList} = prevState

      if (cartList.find(item => item.id === product.id)) {
        return {
          cartList: cartList.map(item =>
            item.id === product.id
              ? {...item, quantity: item.quantity + product.quantity}
              : item,
          ),
        }
      }
      return {cartList: [...cartList, product]}
    })
  }

  removeAllCartItems = () => this.setState({cartList: []})

  incrementCartItemQuantity = id =>
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))

  decrementCartItemQuantity = id =>
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    }))

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
