import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import InfoIcon from '@material-ui/icons/Info';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from "@material-ui/core/Tooltip";
import Button from "components/CustomButtons/Button.js";
const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  const [open, setOpen] = React.useState(false);

  const handleCloseInfo = () => {
    setOpen(false);

  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.tableResponsive}>
     <Dialog  open={open} onClose={handleCloseInfo} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title3">Etkinlik Bilgileri</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Katılımcı Sayısı: 3
              
            </DialogContentText>
            <DialogContentText>
              Katılımcılar: sfhaf sfakjhf asfhaf
              
            </DialogContentText>
            
  
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseInfo} color="danger">
              Kapat
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
                    Aksiyon
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
        id="tooltip-katil"
        title="Etkinliğe Katıl"
        placement="top"
        classes={{tooltip:classes.tooltip}}>
     <IconButton aria-label="ThumbUpIcon" className={classes.tableActionButton}>
                  <ThumbUpIcon className={classes.tableActionButtonIcon + " " + classes.edit}/>
                </IconButton>
      </Tooltip>
      <Tooltip
        id="tooltip-ayril"
        title="Etkinlikten Ayrıl"
        placement="top"
        classes={{tooltip:classes.tooltip}}>
    <IconButton aria-label="ThumbDownIcon" className={classes.tableActionButton}>
                  <ThumbDownIcon className={classes.tableActionButtonIcon + " " + classes.edit}/>
                </IconButton>
      </Tooltip>
      <Tooltip
        id="tooltip-bilgi"
        title="Etkinlik Bilgileri"
        placement="top"
        classes={{tooltip:classes.tooltip}}>
  <IconButton aria-label="InfoIcon" onClick={handleClickOpen} className={classes.tableActionButton}>
                  <InfoIcon className={classes.tableActionButtonIcon + " " + classes.edit}/>
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
