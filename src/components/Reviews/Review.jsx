import { Box, Grid } from '@mui/material'
import React from 'react'
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Checkbox,
    IconButton,
    Typography,
  } from "@mui/material";
  import { StarBorder, Star, MoreVert, Share } from "@mui/icons-material";
  import Rating from '@mui/material/Rating';

const Review = () => {
    const [value, setValue] = React.useState(2);
  return (
    <Grid container  >
        <Grid item xs={12} md={8}>
        
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
      
         title="John Doe"
        subheader="September 14, 2022"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <Box sx={{paddingRight:'12px'}}  paddingLeft={5}>
      <Rating name="read-only" value={value} readOnly  />
      </Box>
      
        </Grid>
    </Grid>
  )
}

export default Review