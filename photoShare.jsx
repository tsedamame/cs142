import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch, Redirect
} from 'react-router-dom';
import {
  Grid, Paper
} from '@material-ui/core';
import './styles/main.css';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/UserDetail';
import UserList from './components/userList/UserList';
import UserPhotos from './components/userPhotos/UserPhotos';
import LoginRegister from './components/loginRegister/LoginRegister';
import AddCommentDialog from './components/userPhotos/AddCommentDialog';
import AddPhotoDialog from './components/topBar/AddPhotoDialog';
import Register from './components/loginRegister/Register';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (sessionStorage.getItem('isLoggedIn')) {
      var isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }
    return (
      <HashRouter>
      <div>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <TopBar/>
        </Grid>
        <div className="cs142-main-topbar-buffer"/>
        <Grid item sm={3}>
          <Paper  className="cs142-main-grid-item">
            <UserList />
          </Paper>
        </Grid>
        <Grid item sm={9} className="cs142-main-view">
          <Paper className="cs142-main-grid-item">
            <Switch>
              {
                (isLoggedIn) ?
                  <Route path="/users/:userId"
                    render={ props => <UserDetail {...props} /> }
                  />
                :
                  <Redirect path="/users/:userId" to="/login-register" />
              }

              {
                (isLoggedIn) ?
                  <Route path="/photos/:userId"
                    render={ props => <UserPhotos {...props} /> }
                  />
                :
                  <Redirect path="/photos/:userId" to="/login-register" />
              }
              {
                (isLoggedIn) ?
                  <Route path="/users" component={UserList} />
                :
                  <Redirect path="/users" to="/login-register" />
              }
              {
                (isLoggedIn) ?
                  <Route path="/addComments/:photoId"
                    render={ props => <AddCommentDialog {...props} /> }
                  />
                :
                  <Redirect path="/addComments/:photoId" to="/login-register" />
              }
              {
                (isLoggedIn) ?
                  <Route path="/addPhotos" component={AddPhotoDialog} />
                :
                  <Redirect path="/addPhotos" to="/login-register" />
              }
              <Route path="/login-register" component={LoginRegister} />
              <Route path="/register" component={Register} />
            </Switch>
          </Paper>
        </Grid>
      </Grid>
      </div>
    </HashRouter>
    );
  }
}


ReactDOM.render(
  <PhotoShare />,
  document.getElementById('photoshareapp'),
);