import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles(styles);



export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  const [open, setOpen] = React.useState(false);

  const handleCloseMessage = () => {
    setOpen(false);

  };
  const handleClickOpen = () => {
    setOpen(true);
  };


  return (
    <div className={classes.tableResponsive}>
      
      <Dialog  open={open} onClose={handleCloseMessage} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title3">Mesaj Gönder</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Kaç kişi olduğunuzdan, ne kadar süre kalmak istediğinizden ve iletişim bilgilerinizden bahsediniz.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="desc"
              label="Mesaj:"
              
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMessage} color="primary">
              İptal
            </Button>
            <Button onClick={handleCloseMessage} color="primary">
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
              {tableHead.map((prop, key) => {console.log(key+1);
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key+1}
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
        classes={{tooltip:classes.tooltip}}>
     <IconButton aria-label="MailOutlineIcon" onClick={handleClickOpen} className={classes.tableActionButton}>
                  <MailOutlineIcon className={classes.tableActionButtonIcon + " " + classes.edit}/>
                  
                </IconButton>
      </Tooltip>
              </TableCell>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key+1}>
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