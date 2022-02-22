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
import { isHostComponent } from '@mui/base'

const EventCard = ({ event, joinHandler, ...attributes }) => {
  const date = new Date(event.date)
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return (
    <>
      <div>
        <div>
          <p>{event.title}</p>
          <p>{event.host}</p>
        </div>
        <div>
          <div>
            <p>{event.description}</p>
          </div>
          <div>
            <p>{date.toLocaleDateString('en-US', options)}</p>
            <p>{date.toLocaleTimeString('en-US')}</p>
          </div>
        </div>
        <div>
          <button onClick={joinHandler}>Join</button>
          <p>{event.members.join(' ')}</p>
        </div>
      </div>
    </>
  )
}

export default EventCard
//TODO: make this adapt to users timezone
//TODO: link host to profile
//TODO: talk to backend about date format
