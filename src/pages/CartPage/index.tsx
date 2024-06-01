import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';

function CartPage() {
  const { cart, clearCart, removeFromCart, updateCartItemQuantity } =
    useCartStore();
  const navigate = useNavigate();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotal(totalAmount);
    };

    calculateTotal();
  }, [cart]);

  const handleCheckout = () => {
    clearCart();
    navigate('/ordersuccess');
  };

  const handleDelete = (id: string) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartItemQuantity(id, quantity);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: '#fff1f2',
        boxShadow: '0px 4px 8px rgba(0, 0.1, 0.1, 0.1)',
        borderRadius: 2,
        mt: 5,
        mb: 5,
      }}
    >
      <Box
        sx={{
          p: 5,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="customColors.brown">
          Your Cart
        </Typography>

        {cart.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 5,
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 120, color: '#754328', mb: 5 }} />
            <Typography variant="h4" color="customColors.brown">
              Your cart is empty.
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              display="flex"
              justifyContent="flex-end"
              sx={{
                mt: 3,
                mb: 5,
              }}
            >
              <Button
                variant="contained"
                onClick={clearCart}
                sx={{
                  backgroundColor: '#ffffff',
                }}
              >
                Clear Cart
              </Button>
            </Box>
            <Grid container spacing={2}>
              {cart.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Card
                    sx={{
                      display: 'flex',
                      width: '100%',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 120, height: 150 }}
                      image={item.image}
                      alt={item.title}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 2,
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          color="customColors.brown"
                        >
                          {item.title}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <IconButton
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            <RemoveIcon sx={{ fontSize: '12px' }} />
                          </IconButton>
                          <TextField
                            type="number"
                            size="small"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                Math.max(1, parseInt(e.target.value, 10))
                              )
                            }
                            inputProps={{ min: 1 }}
                            sx={{
                              width: '40px',
                              mx: 1,
                              '& .MuiInputBase-input': {
                                textAlign: 'center',
                                padding: '5px 0',
                                fontSize: '10px',
                              },
                            }}
                          />
                          <IconButton
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                          >
                            <AddIcon sx={{ fontSize: '15px' }} />
                          </IconButton>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ mt: 1 }}
                        >
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Price: ₱{item.price}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <CardContent>
                        <IconButton
                          onClick={() => handleDelete(item.id)}
                          sx={{ mb: 6 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <Typography variant="body2">
                          Subtotal: ₱{(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box
              mt={6}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#754328"
                sx={{
                  textAlign: 'right',
                  ml: 2,
                }}
              >
                Total: ₱{total.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                onClick={handleCheckout}
                sx={{
                  backgroundColor: '#ffffff',
                  ml: 2,
                }}
              >
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

export default CartPage;
