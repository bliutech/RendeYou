import Card from '@mui/material/Card'
import AddIcon from '@mui/icons-material/Add'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import {
  CardContent,
  CardActions,
  Button,
  CardHeader,
  Typography,
  IconButton,
} from '@mui/material'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'

const EventCard = ({ event, joinHandler, ...attributes }) => {
  return (
    <>
      <Card
        sx={{
          maxWidth: '600px',
        }}
        variant='outlined'
      >
        <CardHeader
          title={event.title}
          subheader={'10/23/2022'}
          style={{ backgroundColor: '#FC6A01' }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant='paragraph' component='paragraph'>
                {event.description}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography div>
                <Typography variant='h6' component='h6'>
                  {event.location}
                </Typography>
                <Typography h2>{event.time}</Typography>
              </Typography>
              <Typography div>
                <Typography h5>{event.members}</Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            onClick={joinHandler}
            startIcon={<AddIcon />}
            style={{ backgroundColor: '#FC6A01' }}
          >
            Join
          </Button>
          <Typography h5>{event.members.join(' ')}</Typography>
        </CardActions>
      </Card>
    </>
  )
}

export default EventCard
//TODO: make this adapt to users timezone
//TODO: link host to profile
//TODO: talk to backend about date format
