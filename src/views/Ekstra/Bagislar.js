import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TableEarthquake from "components/Table/TableEarthquakes.js";
import Table from "components/Table/Table.js";
import Muted from "components/Typography/Muted.js";
import stylesd from "assets/jss/material-dashboard-react/dropdownStyle.js";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import Poppers from "@material-ui/core/Popper";
import Icon from "@material-ui/core/Icon";
import Button from "components/CustomButtons/Button.js";
import classNames from "classnames";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);
const useStylesd = makeStyles(stylesd);

export default function Deprem_listesi() {
  const classes = useStyles();
  const classesd = useStylesd();
  
  const [open, setOpen] = React.useState(null);
  const handleToggle = event => {
    if (open && open.contains(event.target)) {
      setOpen(null);
    } else {
      setOpen(event.currentTarget);
    }
  };

  const handleClose = () => {
    setOpen(null);
  };

  


  const [events, setEvents] = React.useState([]);

  React.useEffect(() => { 
      navigator.geolocation.getCurrentPosition(function(position) {
         
         
         const params = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          };

        fetch(`https://bauphi-api.herokuapp.com/api/generic/get-all-money-donations`, params)
        .then((response) => response.json()) 
        .then((data) => {
          var tmp = [];

          if (data.status !== "FAILURE")
          {
            data.donations.forEach(don => {
              tmp = [...tmp, [don.title, don.description, don.amount, don.currency, don.end_time]]
            });
          }

          setEvents(tmp);
         });
        }, function(error){
          const params = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          };
          fetch(`https://bauphi-api.herokuapp.com/api/generic/get-all-money-donations`, params)
          .then((response) => response.json()) 
          .then((data) => {
            var tmp = [];
            data.donations.forEach(don => {
                tmp = [...tmp, [don.title, don.description, don.amount, don.currency, don.end_time]]
              });
            setEvents(tmp);
          });
          });

        }, []);
  return (
    <div>
    <GridContainer>
    <GridItem xs={12} sm={12} md={12}>
    <Card>
      <CardHeader color="rose">
        <h4 className={classes.cardTitleWhite}>Süren Bağışlar<Icon>filter_alt</Icon></h4>
        <p className={classes.cardCategoryWhite}>
          Bağış kampanyaları hakkında bilgi edinebilirsiniz.
        </p>
      </CardHeader>
      <CardBody>
      
      

        <TableEarthquake
          tableHeaderColor="primary"
          tableHead={["Başlık", "Açıklama", "Minimum Katılım", "Para Birimi", "Bitiş"]}

          tableData={events}

        />

      </CardBody>
    </Card>
  </GridItem>
  </GridContainer>
  </div>
  );
}
