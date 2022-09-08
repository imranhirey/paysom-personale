import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Sidebar from '../Sidebar';
import { Usercontext } from '../../contexts/Usercontext';


export default function Mycontacts() {
  let [userka,setuserka]=React.useContext(Usercontext)
  let [mycontacts,setmycontacts]=React.useState(userka.contacts)
  console.log(mycontacts)
  return (

      <Sidebar>
    <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper',marginTop:'70px' }}>
   {mycontacts.map(x=>(
     <>
     <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={x.name} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={x.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                ACC {x.acc}
              </Typography>
              {" — Active user"}
            </React.Fragment>
          }
        />
      </ListItem>
     </>
   ))}
    </List>
    </Sidebar>
  );
}
