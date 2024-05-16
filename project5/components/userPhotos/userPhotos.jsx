import React from "react";
import { Typography, Link } from "@mui/material";
import "./UserPhotos.css";
import fetchModel from "../../lib/fetchModelData";

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    };
  }

  componentDidMount() {
    this.fetchUserPhotos();
  }

  fetchUserPhotos() {
    let userId = this.props.match.params.userId;
    fetchModel(`/photosOfUser/${userId}`)
      .then((response) => {
        this.setState({ photos: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { photos } = this.state;

    return (
      <div className="user-photos-container">
        {photos.map((photo) => (
          <div key={photo._id} className="photo-container">
            <img src={`images/${photo.file_name}`} alt={`Photo ${photo._id}`} />
            <div className="comments-section">
              {photo.comments && photo.comments.length > 0 ? (
                photo.comments.map((comment) => (
                  <Typography key={comment._id} className="comment">
                    <Link href={`#/users/${comment.user._id}`}>
                      {comment.user.first_name}
                    </Link>
                    {`: ${comment.comment}`}
                  </Typography>
                ))
              ) : (
                <Typography>No comments</Typography>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default UserPhotos;
