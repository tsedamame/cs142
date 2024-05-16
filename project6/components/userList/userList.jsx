import * as React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import "./userList.css";
import axios from "axios";

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }
  
  componentDidMount() {
    axios
      .get("/user/list")
      .then((response) => {
        console.log("response", response);
        let users = response["data"];
        this.setState({ users: users });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    let userList;
    if (this.state.users) {
      userList = this.state.users.map((user) => (
        <ListItem
          to={`/users/${user._id}`}
          component={Link}
          key={user._id}
          button
        >
          <ListItemText
            style={{ paddingLeft: "8px" }}
            primary={<Typography>{`${user.first_name} ${user.last_name}`}</Typography>}
          />
        </ListItem>
      ));
    }

    return <List component="nav">{userList}</List>;
  }
}
