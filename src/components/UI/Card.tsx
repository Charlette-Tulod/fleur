// CustomCard.jsx
import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Card } from '@mui/material';

interface CustomCardProps {
  children: ReactNode;
}
function CustomCard({ children }: CustomCardProps) {
  return (
    <Card
      sx={{
        border: '1px solid #fff1f2',
        boxShadow: 'none',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {children}
    </Card>
  );
}

CustomCard.propTypes = {
  children: PropTypes.node.isRequired,
};

CustomCard.defaultProps = {};

export default CustomCard;
