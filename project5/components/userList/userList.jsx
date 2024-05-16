import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from '@mui/material';
import fetchModel from '../../lib/fetchModelData';
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetchModel('user/list')
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        console.log(error);
      });
  }

  render() {
  const { users } = this.state;

  return (
    <List >
      {users.map((user) => (
        <ListItem
          button
          component={Link}
          to={`/users/${user._id}`}
        >
          {`${user.first_name} ${user.last_name}`}
        </ListItem>
      ))}
    </List>
  );
}

}

export default UserList;
