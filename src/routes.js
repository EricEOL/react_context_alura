import Carrinho from 'pages/Carrinho';
import Feira from 'pages/Feira';
import Login from 'pages/Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { UserProvider } from 'common/context/User';
import { CartProvider } from 'common/context/Cart';
import { PaymentProvider } from 'common/context/Payment';

function Router() {

  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>

          <Route exact path="/">
            <Login />
          </Route>

          <CartProvider>
          <PaymentProvider>
            <Route path="/feira">
              <Feira />
            </Route>
              <Route path="/carrinho" component={Carrinho} />
            </PaymentProvider>
          </CartProvider>
        </UserProvider>
      </Switch>
    </BrowserRouter >
  )
}

export default Router;