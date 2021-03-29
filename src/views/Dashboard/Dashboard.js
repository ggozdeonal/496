import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import pic from "assets/img/BP.jpg";
const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning" stats icon>
            <h3 className={classes.cardTitle}>
                Hakkımızda
              </h3>
              <p className={classes.cardCategory}>dgsnjklgldksgjl</p>
              
            </CardHeader>
         
          </Card>
        </GridItem>
 
  
    
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning" stats icon>
             
          
            </CardHeader>
            <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
            <img src={pic} />
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
            <h3 className={classes.cardTitle}>
            Neden BauPhi
              </h3>
            <p className={classes.cardCategory}>Baucis ve Philemon fjlajfşaegşaegşedg</p>
            </GridItem>
            </GridContainer>
          </Card>
        </GridItem>
 
  
    
      </GridContainer>
   
    </div>
  );
}
