import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

export default function Blockedlist() {
  return (
    <>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Typography sx={{
            marginLeft:'17px'
        }}>Blocked Accounts</Typography>
      
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="1767263536"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ubeid Nur Hirey
              </Typography>
              {" — blocked on 12-08-2020"}
            </React.Fragment>
          }
        />
        <Button sx={{
            borderRadius:'8px',
            fontSize:'12px'
        }} variant='contained'>unblock</Button>
      </ListItem>
      <Divider variant="inset" component="li" /><ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="1767263536"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ubeid Nur Hirey
              </Typography>
              {" — blocked on 12-08-2020"}
            </React.Fragment>
          }
        />
        <Button sx={{
            borderRadius:'8px',
            fontSize:'12px'
        }} variant='contained'>unblock</Button>
      </ListItem>
      <Divider variant="inset" component="li" /><ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="1767263536"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ubeid Nur Hirey
              </Typography>
              {" — blocked on 12-08-2020"}
            </React.Fragment>
          }
        />
        <Button sx={{
            borderRadius:'8px',
            fontSize:'12px'
        }} variant='contained'>unblock</Button>
      </ListItem>
      <Divider variant="inset" component="li" /><ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="1767263536"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ubeid Nur Hirey
              </Typography>
              {" — blocked on 12-08-2020"}
            </React.Fragment>
          }
        />
        <Button sx={{
            borderRadius:'8px',
            fontSize:'12px'
        }} variant='contained'>unblock</Button>
      </ListItem>
      <Divider variant="inset" component="li" /><ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="1767263536"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ubeid Nur Hirey
              </Typography>
              {" — blocked on 12-08-2020"}
            </React.Fragment>
          }
        />
        <Button sx={{
            borderRadius:'8px',
            fontSize:'12px'
        }} variant='contained'>unblock</Button>
      </ListItem>
      <Divider variant="inset" component="li" /><ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="1767263536"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ubeid Nur Hirey
              </Typography>
              {" — blocked on 12-08-2020"}
            </React.Fragment>
          }
        />
        <Button sx={{
            borderRadius:'8px',
            fontSize:'12px'
        }} variant='contained'>unblock</Button>
      </ListItem>
      <Divider variant="inset" component="li" />
      
       
    </List>
    <Button sx={{
            borderRadius:'8px',
            fontSize:'12px'
        }} variant='contained' color='secondary'>See More</Button>
  </>
  );
}
