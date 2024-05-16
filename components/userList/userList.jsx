import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
}
from '@material-ui/core';
import './userList.css';
import axios from 'axios';

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    axios.get('/user/list')
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }

  displayUsernames() {
    if (this.state.isLoggedIn) {
      var userNamesList = [];
      var userNamesArr = [];
      for (var i = 0; i < this.state.users.length; i++) {
        userNamesArr.push(this.state.users[i].first_name + ' ' + this.state.usersArr[i].last_name);
      }
      for (i = 0; i < userNamesArr.length; i++) {
        var link = "http://localhost:3000/photo-share.html#/users/" + this.state.usersArr[i]._id;
        userNamesList.push(<ListItem key={2*i} component="a" href={link}>
          <ListItemText primary={userNamesArr[i]} />
        </ListItem>);
        userNamesList.push(<Divider key={2*i+1}/>);
      }
      var retVal = (
        <div>
          <List component="nav">
            {userNamesList}
          </List>
        </div>
      );
    } else {
      retVal = (
        <Typography variant="body1">
          Please log in to see the full user list.
        </Typography>
      );
    }
    return retVal;
  }

  render() {
    return (
      <div>
        {this.displayUsernames()}
      </div>
    );
  }
}
export default UserList;
