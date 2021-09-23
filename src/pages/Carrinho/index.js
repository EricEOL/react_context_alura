import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useCartContext } from 'common/context/Cart';
import { PaymentContext } from 'common/context/Payment';
import Produto from 'components/Produto';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Voltar, TotalContainer, PagamentoContainer } from './styles';

function Carrinho() {
  const history = useHistory();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { cart } = useCartContext();
  const { paymentTypes, paymentType, setPaymentType } = useContext(PaymentContext)
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
          onChange={(event) => setPaymentType(event.target.value)}
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
          <span>R$ </span>
        </div>
        <div>
          <h2> Saldo: </h2>
          <span> R$ </span>
        </div>
        <div>
          <h2> Saldo Total: </h2>
          <span> R$ </span>
        </div>
      </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
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