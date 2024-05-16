import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from "@material-ui/core";
import './userDetail.css';
import axios from 'axios';

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.fetchUserData();
    }
  }

  fetchUserData = () => {
    let userId = this.props.match.params.userId;
    axios.get(`/user/${userId}`)
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  };

  render() {
    const { user } = this.state;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography color="textSecondary">Name:</Typography>
          <Typography variant="h6" gutterBottom>
            {`${user.first_name} ${user.last_name}`}
          </Typography>
          <Typography color="textSecondary">Description:</Typography>
          <Typography variant="h6" gutterBottom>
            {`${user.description}`}
          </Typography>
          <Typography color="textSecondary">Location:</Typography>
          <Typography variant="h6" gutterBottom>
            {`${user.location}`}
          </Typography>
          <Typography color="textSecondary">Occupation:</Typography>
          <Typography variant="h6" gutterBottom>
            {`${user.occupation}`}
          </Typography>
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Button
            to={user && `/photos/${user._id}`}
            component={Link}
            variant="contained"
            color="primary"
          >
            See Photos
          </Button>
        </Grid>
        <Grid item xs={4} />
      </Grid>
    );
  }
}

export default UserDetail;
