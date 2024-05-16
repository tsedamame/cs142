import React from "react";
import { Typography, Link } from "@mui/material";
import "./UserPhotos.css";
import axios from "axios";

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

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.fetchUserPhotos();
    }
  }

  fetchUserPhotos = () => {
    let userId = this.props.match.params.userId;
    axios
      .get(`/photosOfUser/${userId}`)
      .then((response) => {
        this.setState({ photos: response.data });
      })
      .catch((error) => {
        console.log("Error fetching user photos:", error);
      });
  };

  render() {
    const { photos } = this.state;

    return (
      <div className="user-photos-container">
        {photos.map((photo) => (
          <div key={photo._id} className="photo-container">
            <img src={`images/${photo.file_name}`} />
            <div className="comments-section">
              {photo.comments && photo.comments.length > 0 ? (
                photo.comments.map((comment) => (
                  <div key={comment._id} className="comment">
                    {console.log(comment.user)}
                    {comment.user?._id ? (
                      <Link href={`#/users/${comment.user._id}`}>
                        {comment.user.first_name}
                      </Link>
                    ) : (
                      <span>User ID not available</span>
                    )}
                    : {comment.comment}
                  </div>
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
