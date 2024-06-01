// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
// } from '@mui/material';
// import { Product } from '../../datas/flowers';
// import { useCart } from '../../hooks/cartHooks/useCart';

// interface CartItemProps {
//   product: Product;
// }

// function CartItem({ product }: CartItemProps) {
//   const { removeFromCart } = useCart();

//   return (
//     <Card>
//       <CardMedia
//         component="img"
//         height="140"
//         image={product.image}
//         alt={product.name}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {product.name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {product.description}
//         </Typography>
//         <Typography variant="h6" color="text.primary">
//           ${product.price}
//         </Typography>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={() => removeFromCart(product.id)}
//         >
//           Remove from Cart
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

// export default CartItem;