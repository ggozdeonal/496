import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { userActions } from '../../_actions';
import { history } from '../../_helpers';
import {useDispatch} from 'react-redux';


const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const [openG, setOpenG] = React.useState(false);
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);

    } else {
      setOpenNotification(event.currentTarget);
    
    }
    setOpenG(false);
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
    setOpenG(false);
  }; 
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const dispatch = useDispatch();
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const handleCloseProfileAndLogout = () => {
    setOpenProfile(null);
    dispatch(userActions.logout());
    history.push("/");
  };
  

  const handleClickOpenG = () => {
    setOpenG(true);
  };

  return (
    <div>
        <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleClickOpenG}
                      className={classes.dropdownItem}
                    ><div>
                   
                    <Dialog open={openG} onClose={handleCloseNotification} aria-labelledby="form-dialog-title">
                    
                    <DialogTitle id="form-dialog-title">Gönderilen Mesajlarım</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Mesaj1 3 kişiyiz, 1 hafta konaklamak istiyoruz. İletişim: +90504789654
                        </DialogContentText>
                        <DialogActions>
                        <Button onClick={handleCloseNotification} color="danger">
                          Sil
                        </Button>
                      
                      </DialogActions>
                        </DialogContent>
                      <DialogTitle id="form-dialog-title2">Gelen Mesajlarım</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Mesaj1 3 kişiyiz, 1 hafta konaklamak istiyoruz. İletişim: +90504789654
                        </DialogContentText>
                        <DialogActions>
                        <Button onClick={handleCloseNotification} color="danger">
                          Reddet
                        </Button>
                        <Button onClick={handleCloseNotification} color="success">
                          Kabul Et
                        </Button>
                       
                      </DialogActions>
                      <DialogContentText>
                          Mesaj2 2 kişiyiz, 1 hafta konaklamak istiyoruz. İletişim: +90504789654
                        </DialogContentText>
                        <DialogActions>
                        <Button onClick={handleCloseNotification} color="danger">
                          Reddet
                        </Button>
                        <Button onClick={handleCloseNotification} color="success">
                          Kabul Et
                        </Button>
                       
                      </DialogActions>
                      </DialogContent>
                      
                    </Dialog>
                  </div>
                      Mesajlarımı görüntüle
                    </MenuItem>
                   
                   
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
          
                    <MenuItem
                      onClick={handleCloseProfileAndLogout}
                      className={classes.dropdownItem}
                    >
                      Çıkış Yap
                    </MenuItem>
                    
                  </MenuList>
                </ClickAwayListener>
                
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
