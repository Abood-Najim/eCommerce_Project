import React from 'react'
import useProducts from '../../hooks/useProducts';
import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Products = () => {

  const { data, isLoading, isError, error } = useProducts();

  if (isLoading) return <CircularProgress />
  if (isError) return <Typography color='red'>{error.message}</Typography>

  return (
    <Box className="products" components="section">
      <Typography component="h1" variant="h2">Product</Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ textAlign: 'center' }}>


        {data.response.data.map((product) => {
          return <Grid item size={{ xs: 12, sm: 6, md: 4 }} >
            <Link to={`/product/${product.id}`}>
              <Card>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                >
                </CardMedia>
                <CardContent>
                  <Typography component="h3" variant="h3" sx={{ fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.6rem', lg: '2rem' } }}>
                    {product.name}
                  </Typography>
                  <Typography component="span" variant="body1">{product.price}$</Typography>
                </CardContent>
              </Card>
            </Link>

          </Grid>
        })}
      </Grid>
    </Box>
  )
}

export default Products;