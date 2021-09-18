import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useCartContext } from 'common/context/Cart';
import { useHistory } from 'react-router';

export default function NavBar() {

  const { productsAmount } = useCartContext();
  const history = useHistory();

  return (
    <Nav>
      <Logo />
      <IconButton
        disabled={productsAmount === 0}
        onClick={() => history.push("/carrinho")}
      >
        <Badge
          color="primary"
          badgeContent={productsAmount}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}