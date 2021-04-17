import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import stylesd from "assets/jss/material-dashboard-react/dropdownStyle.js";
import Icon from "@material-ui/core/Icon";
import background from "assets/img/dog.jpg";

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

export default function Kayip_evcil_hayvan_ilanlari_sayfasi() {
  const classes = useStyles();
  const [annsRelative, setAnnsRelative] = React.useState([]);
  const [annsPet, setAnnsPet] = React.useState([]);

  const params = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    
  };

    React.useEffect(() => { 
        fetch(`https://bauphi-api.herokuapp.com/api/generic/all-announcements`, params)
        .then((response) => response.json()) 
        .then((data) => {
          var tmp1 = annsRelative;
          var tmp2 = annsPet;
          if(data.hasOwnProperty('announcements')){
            data.announcements.forEach(ann => {
              if(ann.isHuman){
                tmp1 = [...tmp1, [ann.phone, ann.title, ann.description]]
                setAnnsRelative(tmp1);
              }
              else{
                tmp2 = [...tmp2, [ann.phone, ann.title, ann.description]]
                setAnnsPet(tmp2);
              }
            });
            }
          else{
            setAnnsRelative([])
            setAnnsPet([])
          }
          });
  }, []);
  return (
    
    <GridContainer>
    
    <GridItem xs={12} sm={12} md={12}>
    <Card>
      <CardHeader color="danger">
        <h4 className={classes.cardTitleWhite}>Kayıp Yakınlar<Icon>filter_alt</Icon></h4>
        <p className={classes.cardCategoryWhite}>
        Yayınlanan kayıp yakın ilanlarını görüntüleyebilirsiniz.
        </p>
      </CardHeader>
      <CardBody>
      
        <div>
        <Table
          tableHeaderColor="primary"
          tableHead={["Telefon", "Başlık", "Açıklama"]}
          tableData={annsRelative}
        /></div>
      </CardBody>
    </Card>
  </GridItem>








  <GridItem xs={12} sm={12} md={12}>
    <Card>
      <CardHeader color="warning">
        <h4 className={classes.cardTitleWhite}>Kayıp Evcil Hayvanlar<Icon>filter_alt</Icon></h4>
        <p className={classes.cardCategoryWhite}>
        Yayınlanan kayıp evcil hayvan ilanlarını görüntüleyebilirsiniz.

        </p>
      </CardHeader>
      <CardBody>
      
        <div style={{ backgroundImage: `url(${background})`,  backgroundRepeat: 'no-repeat', }}>
        <Table
          tableHeaderColor="primary"
          tableHead={["Telefon", "Başlık", "Açıklama"]}
          tableData={annsPet}
        /></div>
      </CardBody>
    </Card>
  </GridItem>
  </GridContainer>
  
  );
}
