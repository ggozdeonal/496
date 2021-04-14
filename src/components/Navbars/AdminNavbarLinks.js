import React from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
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
import {userActions} from '../../_actions';
import {history} from '../../_helpers';
import {useDispatch} from 'react-redux';
import axios from "axios";


const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
    const classes = useStyles();
    const [openNotification, setOpenNotification] = React.useState(null);
    const [openProfile, setOpenProfile] = React.useState(null);
    const [openG, setOpenG] = React.useState(false);
    const [listOffersSent, setListOffersSent] = React.useState([]);
    const [listOffersReceived, setListOffersReceived] = React.useState([]);
    const [buttonColor, setButtonColor] = React.useState("success");


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

    function handleDeleteOfferButtonClick(offerIndex)
    {
        console.log(listOffersSent[offerIndex]);

        let home_id = listOffersSent[offerIndex].home
        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];

        axios.delete(`https://bauphi-api.herokuapp.com/api/users/${user_id}/interactions/delete-request/${home_id}`,
            {headers: {'Content-Type': 'application/json', 'session_key': 'admin'}})
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    let filteredArray = listOffersSent.filter(item => item !== listOffersSent[offerIndex])
                    setListOffersSent(filteredArray);
                }
                console.log(response);
            })
    }

    function handleAcceptOffer(offerIndex)
    {
        console.log("handleAcceptOffer", listOffersReceived[offerIndex]);

        let home_id = listOffersReceived[offerIndex].home
        let victim_id = listOffersReceived[offerIndex].victim
        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];

        axios.patch(`https://bauphi-api.herokuapp.com/api/users/${user_id}/interactions/accept-request`,
            {headers: {'Content-Type': 'application/json', 'session_key': 'admin'},
            body: {"home": home_id, "victim": victim_id}})

            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    setButtonColor("primary");
                    // let filteredArray = listOffersSent.filter(item => item !== listOffersSent[offerIndex])
                    // setListOffersSent(filteredArray);
                }
                console.log(response);
            })
    }

    function handleRejectOffer(offerIndex)
    {
        console.log("handleRejectOffer", offerIndex);
        // console.log(listOffersSent[offerIndex]);
        //
        // let home_id = listOffersSent[offerIndex].home
        // let user_id = JSON.parse(localStorage.getItem('user'));
        // user_id = user_id['user']['user_id'];
        //
        // axios.delete(`https://bauphi-api.herokuapp.com/api/users/${user_id}/interactions/delete-request/${home_id}`,
        //     {headers: {'Content-Type': 'application/json', 'session_key': 'admin'}})
        //     .then((response) => {
        //         if (response.data.status === "SUCCESS") {
        //             let filteredArray = listOffersSent.filter(item => item !== listOffersSent[offerIndex])
        //             setListOffersSent(filteredArray);
        //         }
        //     })
    }

    React.useEffect(() => {
        console.log("handleListOffersSent");

        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];

        axios.get(`https://bauphi-api.herokuapp.com/api/users/${user_id}/interactions/sent-request-list`,
            {headers: {'Content-Type': 'application/json', 'session_key': 'admin'}})
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    setListOffersSent(response.data.requests);
                }
            })
    }, []);

    React.useEffect(() => {
        console.log("handleListOffersReceived");

        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];

        axios.get(`https://bauphi-api.herokuapp.com/api/users/${user_id}/interactions/received-request-list`,
            {headers: {'Content-Type': 'application/json', 'session_key': 'admin'}})
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    setListOffersReceived(response.data.requests);
                }
            })
    }, []);

    React.useEffect(()=>{console.log("offers rcv", listOffersReceived)},[listOffersReceived])

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
                    <Notifications className={classes.icons}/>

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
                        classNames({[classes.popperClose]: !openNotification}) +
                        " " +
                        classes.popperNav
                    }
                >
                    {({TransitionProps, placement}) => (
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
                                        >
                                            <div>

                                                <Dialog open={openG} onClose={handleCloseNotification}
                                                        aria-labelledby="form-dialog-title">

                                                    <DialogTitle id="form-dialog-title">Gönderilen
                                                        Mesajlarım</DialogTitle>

                                                    <DialogContent>

                                                    {
                                                        listOffersSent.map((el, i) =>
                                                            <div>
                                                                <DialogContentText key={i}>
                                                                    {el.description}
                                                                </DialogContentText>
                                                                <DialogActions>
                                                                    <Button onClick={(el) => handleDeleteOfferButtonClick(i)}
                                                                            color="danger">
                                                                        Sil
                                                                    </Button>
                                                                </DialogActions>
                                                            </div>
                                                        )
                                                    }
                                                    </DialogContent>


                                                    <DialogTitle id="form-dialog-title2">Gelen Mesajlarım</DialogTitle>
                                                    <DialogContent>

                                                        {
                                                            listOffersReceived.map((el, i) =>
                                                                <div>
                                                                    <DialogContentText key={i}>
                                                                        {el.description}
                                                                    </DialogContentText>
                                                                    <DialogActions>
                                                                        <Button onClick={(el) => handleRejectOffer(i)} color="danger">
                                                                            Reddet
                                                                        </Button>
                                                                        <Button onClick={(el) => handleAcceptOffer(i)} color={buttonColor}>
                                                                            Kabul Et
                                                                        </Button>
                                                                    </DialogActions>
                                                                </div>
                                                            )
                                                        }
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
                    <Person className={classes.icons}/>
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
                        classNames({[classes.popperClose]: !openProfile}) +
                        " " +
                        classes.popperNav
                    }
                >
                    {({TransitionProps, placement}) => (
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
