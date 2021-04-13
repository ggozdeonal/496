import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import IconButton from "@material-ui/core/IconButton";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import Tooltip from "@material-ui/core/Tooltip";
import {userActions} from "../../_actions";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles(styles);


export default function CustomTable(props) {
    const classes = useStyles();
    const {tableHead, tableData, tableHeaderColor, homesDetailedCp} = props;
    const [open, setOpen] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [selectedHomeIndex, setselectedHomeIndex] = React.useState(-1);

    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);

    const handleCloseMessage = () => {
        setOpen(false);

    };

    function handleHomeSelection(homeIndex) {
        setselectedHomeIndex(homeIndex);
        setOpen(true);
        console.log("----", homesDetailedCp[homeIndex]);
    }

    function handleMessageText(evt) {
        setMessageText(evt.target.value);
    }

    function handleMessageSend() {
        console.log(homesDetailedCp[selectedHomeIndex].value.home_id, homesDetailedCp[selectedHomeIndex].value.home_owner, messageText);

        const reqBody = { "home": homesDetailedCp[selectedHomeIndex].value.home_id,
                    "home_owner": homesDetailedCp[selectedHomeIndex].value.home_owner,
                    "description": messageText };

        dispatch(userActions.sendOffer(reqBody));
        setOpen(false);
    }


    React.useEffect(() => {
        console.log(messageText)
    }, [messageText])

    return (
        <div className={classes.tableResponsive}>

            <Dialog open={open} onClose={handleCloseMessage} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title3">Mesaj Gönder</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Kaç kişi olduğunuzdan, ne kadar süre kalmak istediğinizden ve iletişim bilgilerinizden
                        bahsediniz.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="messageText"
                        name="messageText"
                        label="Mesaj:"
                        fullWidth
                        value={messageText}
                        onChange={handleMessageText}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseMessage} color="primary">
                        İptal
                    </Button>
                    <Button onClick={handleMessageSend} color="primary">
                        Gönder
                    </Button>

                </DialogActions>
            </Dialog>

            <Table className={classes.table}>
                {tableHead !== undefined ? (
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                        <TableRow className={classes.tableHeadRow}>
                            <TableCell
                                className={classes.tableCell + " " + classes.tableHeadCell}
                                key={0}
                            >
                                Mesaj
                            </TableCell>
                            {tableHead.map((prop, key) => {
                                console.log(key + 1);
                                return (
                                    <TableCell
                                        className={classes.tableCell + " " + classes.tableHeadCell}
                                        key={key + 1}
                                    >
                                        {prop}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                ) : null}
                <TableBody>
                    {tableData.map((prop, key) => {
                        return (
                            <TableRow key={key} className={classes.tableBodyRow}>
                                <TableCell className={classes.tableCell} key={0}>
                                    <Tooltip
                                        id="tooltip-me"
                                        title="Mesaj Gönder"
                                        placement="top"
                                        classes={{tooltip: classes.tooltip}}>
                                        <IconButton aria-label="MailOutlineIcon"
                                                    onClick={(tableData) => handleHomeSelection(key)}
                                                    className={classes.tableActionButton}>
                                            <MailOutlineIcon
                                                className={classes.tableActionButtonIcon + " " + classes.edit}/>

                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                {prop.map((prop, key) => {
                                    return (
                                        <TableCell className={classes.tableCell} key={key + 1}>
                                            {prop}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

CustomTable.defaultProps = {
    tableHeaderColor: "gray"
};

CustomTable.propTypes = {
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ]),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
