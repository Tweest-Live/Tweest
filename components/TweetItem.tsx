import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function OutlinedCard(props:any) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
              Post by: {props.user}
            </Typography>
            <Typography variant="body2">
              {props.content}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
            <Button size="small">Share</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
