import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useCartContext } from 'common/context/Cart';
import { usePaymentContext } from 'common/context/Payment';
import { UserContext } from 'common/context/User';
import Produto from 'components/Produto';
import { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Voltar, TotalContainer, PagamentoContainer } from './styles';

function Carrinho() {
  const history = useHistory();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { cart, cartTotalValue, purchase } = useCartContext();
  const { balance = 0 } = useContext(UserContext);
  const { paymentTypes, paymentType, changePaymentType } = usePaymentContext()

  const totalBalance = useMemo(() => balance - cartTotalValue, [balance, cartTotalValue]);

  return (
    <Container>
      <Voltar
        onClick={() => history.goBack()}
      />
      <h2>
        Carrinho
      </h2>
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
          value={paymentType.id}
          onChange={(event) => changePaymentType(event.target.value)}
        >
          {paymentTypes.map(payment => (
            <MenuItem value={payment.id} key={payment.id}>
              {payment.name}
            </MenuItem>
          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
        <div>
          <h2>Total no Carrinho: </h2>
          <span>R$ {cartTotalValue.toFixed(2)}</span>
        </div>
        <div>
          <h2> Saldo: </h2>
          <span> R$ {balance}</span>
        </div>
        <div>
          <h2> Saldo Total: </h2>
          <span> R$ {totalBalance}</span>
        </div>
      </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
          purchase()
        }}
        color="primary"
        variant="contained"
        disabled={totalBalance < 0 || cart.length <= 0}
      >
        Comprar
      </Button>
      <Snackbar
        anchorOrigin={
          {
            vertical: 'top',
            horizontal: 'right'
          }
        }
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
        >
          Compra feita com sucesso!
        </MuiAlert>
      </Snackbar>

      {cart.map(product => (
        <Produto
          {...product}
          key={product.id}
        />
      ))}
    </Container>
  )
}

export default Carrinho;