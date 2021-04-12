import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Muted from "components/Typography/Muted.js";
import stylesd from "assets/jss/material-dashboard-react/dropdownStyle.js";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import background from "assets/img/home.png";
import Poppers from "@material-ui/core/Popper";
import Icon from "@material-ui/core/Icon";
import backgrounddog from "assets/img/dog.jpg";
import Button from "components/CustomButtons/Button.js";
import classNames from "classnames";
import {Link} from "react-router-dom";

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

export default function ListingPage() {
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
  const [homes, setHomes] = React.useState([[]]);

  React.useEffect(() => { 
      navigator.geolocation.getCurrentPosition(function(position) {
         const latitude = position.coords.latitude;
         const longitude = position.coords.longitude;
         const params = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude })
          };
      
        fetch(`https://bauphi-api.herokuapp.com/api/generic/get-close-homes`, params)
        .then((response) => response.json()) 
        .then((data) => {
          var tmp = homes;
          data.homes.forEach(home => {
           tmp = [...tmp, [home.key, home.value.state, home.value.city, home.value.neighbourhood]]
          });
          setHomes(tmp);
         });
        });

        }, []);
        const filterErzakEvents = () => {
          navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const params = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ latitude, longitude })
             };
         
           fetch(`https://bauphi-api.herokuapp.com/api/generic/get-close-events?type=supply`, params)
           .then((response) => response.json()) 
           .then((data) => {
             var tmp = events;
             if(data.hasOwnProperty('events')){
             data.events.forEach(event => {
              tmp = [...tmp, [event.key, event.value.title, event.value.type, event.value.description, event.value.start_time, event.value.end_time, event.value.state, event.value.city, event.value.neighbourhood]]
             });
             setEvents(tmp);
           }
          else{setEvents([[]])}});
           });
          setOpen(null);
        };
            
  const filterBulusmaEvents = () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const params = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ latitude, longitude })
       };
   
     fetch(`https://bauphi-api.herokuapp.com/api/generic/get-close-events?type=meeting`, params)
     .then((response) => response.json()) 
     .then((data) => {
       var tmp = events;
       if(data.hasOwnProperty('events')){
       data.events.forEach(event => {
        tmp = [...tmp, [event.key, event.value.title, event.value.type, event.value.description, event.value.start_time, event.value.end_time, event.value.state, event.value.city, event.value.neighbourhood]]
       });
       setEvents(tmp);
     }
    else{setEvents([[]])}});
     });
    setOpen(null);
  };


  const [events, setEvents] = React.useState([[]]);

  React.useEffect(() => { 
      navigator.geolocation.getCurrentPosition(function(position) {
         const latitude = position.coords.latitude;
         const longitude = position.coords.longitude;
         const params = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude })
          };
      
        fetch(`https://bauphi-api.herokuapp.com/api/generic/get-close-events`, params)
        .then((response) => response.json()) 
        .then((data) => {
          var tmp = events;
          data.events.forEach(event => {
           tmp = [...tmp, [event.key, event.value.title, event.value.type, event.value.description, event.value.start_time, event.value.end_time, event.value.state, event.value.city, event.value.neighbourhood]]
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
      <CardHeader color="success">
        <h4 className={classes.cardTitleWhite}>Etkinlik İlanlarını Listele<Icon>filter_alt</Icon></h4>
        <p className={classes.cardCategoryWhite}>
          Konum erişiminize izin verdiğiniz takdirde size yakın etkinlikler listelenir. 
        </p>
      </CardHeader>
      <CardBody>
      
      <GridContainer>
      
        
    
        <GridItem xs={12} sm={12} md={4}>
          
          
          <div className={classesd.manager}>
            <Button
              color={window.innerWidth > 959 ? "transparent" : "white"}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-owns={open ? "menu-list-grow" : null}
              aria-haspopup="true"
              onClick={handleToggle}
              className={classesd.buttonLink}
            >
            
              <span className={classesd.typo}><Muted>İlan</Muted></span>
            
            </Button>
            <Poppers
              open={Boolean(open)}
              anchorEl={open}
              transition
              disablePortal
              className={
                classNames({ [classesd.popperClose]: !open }) +
                " " +
                classesd.pooperNav
              }
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList role="menu">
                    
                        <MenuItem
                          onClick={filterBulusmaEvents}
                          className={classesd.dropdownItem}
                        >
                          Etkinlik-Buluşma
                        </MenuItem>
                        <MenuItem
                          onClick={filterErzakEvents}
                          className={classesd.dropdownItem}
                        >
                          Etkinlik-Erzak Yardımı
                        </MenuItem>
                      
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Poppers>
          </div>
        
            </GridItem>
           
        </GridContainer>

       
        <Table
          tableHeaderColor="primary"
          tableHead={["Mesafe", "Başlık", "Tür", "Açıklama", "Başlangıç", "Bitiş", "Şehir", "Semt", "Adres"]}
          tableData={events}
        />
      </CardBody>
    </Card>
  </GridItem>
  </GridContainer>
  



<GridContainer>
    <GridItem xs={12} sm={12} md={12}>
    <Card>
      <CardHeader color="warning">
        <h4 className={classes.cardTitleWhite}>Ev İlanlarını Listele<Icon>filter_alt</Icon></h4>
        <p className={classes.cardCategoryWhite}>
        Konum erişiminize izin verdiğiniz takdirde size yakın ev ilanları listelenir.  
        </p>
      </CardHeader>
      <CardBody>
      <div style={{ backgroundImage: `url(${background})`,  backgroundRepeat: 'no-repeat', }}>
      <Table
          tableHeaderColor="primary"
          tableHead={["Mesafe", "Şehir", "Semt", "Adres"]}
          tableData={homes}
        /></div>
      </CardBody>
    </Card>
  </GridItem>
  </GridContainer>
  

<GridContainer>
    
    <GridItem xs={12} sm={12} md={12}>
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Kayıp İlanlarını Listele<Icon>filter_alt</Icon></h4>
        <p className={classes.cardCategoryWhite}>
        Kayıp insan/evcil hayvan ilanları listelenir.
        </p>
      </CardHeader>
      <CardBody>
      
        <div style={{ backgroundImage: `url(${backgrounddog})`,  backgroundRepeat: 'no-repeat', }}>
        <Table
          tableHeaderColor="primary"
          tableHead={["Fotoğraf", "Telefon", "Başlık", "Açıklama", "İnsan/Evcil Hayvan"]}
          tableData={[
            ["-", "df", "df", "df", "df"],
            ["-", "df", "df", "df", "df"],
            ["-", "df", "df", "df", "df"],
            ["-", "df", "df", "df", "df"],
            ["-", "df", "df", "df", "df"],
            ["-", "df", "df", "df", "df"],
            ["-", "df", "df", "df", "df"]
    
 

          ]}
        /></div>
      </CardBody>
    </Card>
  </GridItem>
  </GridContainer>

      <p className="text-center">Giris sayfasina geri don<Link to="/login" className="btn btn-link">Geri</Link></p>
<br/><br/><br/><br/><br/><br/>
  </div>
  );
}


export { ListingPage };