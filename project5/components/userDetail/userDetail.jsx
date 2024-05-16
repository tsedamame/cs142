import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './userDetail.css';
import fetchModel from '../../lib/fetchModelData';

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    let userId = this.props.match.params.userId;
    fetchModel(`/user/${userId}`)
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      let userId = this.props.match.params.userId;
      fetchModel(`/user/${userId}`)
        .then((response) => {
          this.setState({ user: response.data });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  render() {
    const { user } = this.state;

    return (
      <div className="user-detail-container">
        <Typography><span>Name:</span> {user.first_name} {user.last_name}</Typography>
        <Typography><span>Location:</span> {user.location}</Typography>
        <Typography><span>Description:</span> {user.description}</Typography>
        <Typography><span>Occupation:</span> {user.occupation}</Typography>
        <Button component={Link} to={`/photos/${user._id}`} variant='contained' className='btn'>
          View Photos
        </Button>
      </div>
    );
  }
}

export default UserDetail;
