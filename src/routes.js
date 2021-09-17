import Carrinho from 'pages/Carrinho';
import Feira from 'pages/Feira';
import Login from 'pages/Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { UserProvider } from 'common/context/User';

function Router() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <UserProvider>
            <Login />
          </UserProvider>
        </Route>
        <Route path="/feira" component={Feira} />
        <Route path="/carrinho" component={Carrinho} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;