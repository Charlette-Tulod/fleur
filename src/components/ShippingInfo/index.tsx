import { Box, Grid, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

interface ShippingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ShippingItem({ icon, title, description }: ShippingItemProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      color="customColors.brown"
    >
      {icon}
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="subtitle2">{description}</Typography>
    </Box>
  );
}

function ShippingInfo() {
  return (
    <Box sx={{ p: 9, backgroundColor: '#ffffff', textAlign: 'center' }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={6} sm={3}>
          <ShippingItem
            icon={<LocalShippingIcon sx={{ fontSize: 40, mb: 1 }} />}
            title="FREE SHIPPING"
            description="Free shipping on all orders"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <ShippingItem
            icon={<EmojiPeopleIcon sx={{ fontSize: 40, mb: 1 }} />}
            title="SUPPORT 24/7"
            description="Support available 24 hours a day"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <ShippingItem
            icon={<MonetizationOnIcon sx={{ fontSize: 40, mb: 1 }} />}
            title="MONEY RETURN"
            description="Money return if damaged item"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <ShippingItem
            icon={<LocalOfferIcon sx={{ fontSize: 40, mb: 1 }} />}
            title="ORDER DISCOUNTS"
            description="On every order over P1500"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ShippingInfo;
