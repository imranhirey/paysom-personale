
import Sidebar from '../Sidebar'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import WifiIcon from '@mui/icons-material/Wifi';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import { Box } from '@mui/material';
import Blockedlist from './Blockedlist';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import SpatialTrackingIcon from '@mui/icons-material/SpatialTracking';
import { NotificationsNoneIcon } from '@mui/icons-material/NotificationsNone';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

export default function Security() {
    const [checked, setChecked] = React.useState(['wifi']);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
    
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
    
      setChecked(newChecked);
    };
  return (
    <Sidebar>
      


  <Box sx={{
      width:'100%',
      height:'90%',
      background:'white',
      marginTop:'70px',
      borderRadius:'14px',
      display:'flex',
      padding:'12px'
  }}>

      <Box sx={{marginRight:'24px'}} className='switchoffs'>
      <List
    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    subheader={<ListSubheader>Quick Actions</ListSubheader>}
  >
    <ListItem>
      <ListItemIcon>
        <MultipleStopIcon />
      </ListItemIcon>
      <ListItemText id="switch-list-label-wifi" primary="Stop Recieving requests" />
      <Switch
        edge="end"
        checked={false}
        inputProps={{
          'aria-labelledby': 'switch-list-label-wifi',
        }}
      />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <SpatialTrackingIcon />
      </ListItemIcon>
      <ListItemText id="switch-list-label-bluetooth" primary="Don't Track me" />
      <Switch
        edge="end"
        
        checked={true}
        inputProps={{
          'aria-labelledby': 'switch-list-label-bluetooth',
        }}
      />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <NotificationsOffIcon />
      </ListItemIcon>
      <ListItemText id="switch-list-label-bluetooth" primary="Stop Recieving Notifications" />
      <Switch
        edge="end"
        checked={false}
        inputProps={{
          'aria-labelledby': 'switch-list-label-bluetooth',
        }}
      />
    </ListItem>
  </List>

      </Box>
      <Box>
         <Blockedlist/>
      </Box>

  </Box>

    </Sidebar>
  )
}


