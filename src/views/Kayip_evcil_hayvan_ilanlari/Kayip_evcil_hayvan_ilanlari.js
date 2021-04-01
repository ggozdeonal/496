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
import Poppers from "@material-ui/core/Popper";
import Button from "components/CustomButtons/Button.js";
import classNames from "classnames";
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
const useStylesd = makeStyles(stylesd);

export default function Kayip_evcil_hayvan_ilanlari_sayfasi() {
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

  
  const [open1, setOpen1] = React.useState(null);
  const handleToggle1 = event => {
    if (open1 && open1.contains(event.target)) {
      setOpen1(null);
    } else {
      setOpen1(event.currentTarget);
    }
  };

  const handleClose1 = () => {
    setOpen1(null);
  };


  const [open2, setOpen2] = React.useState(null);
  const handleToggle2 = event => {
    if (open2 && open2.contains(event.target)) {
      setOpen2(null);
    } else {
      setOpen2(event.currentTarget);
    }
  };

  const handleClose2 = () => {
    setOpen2(null);
  };

  return (
    
   
      
    <GridContainer>
    
    <GridItem xs={12} sm={12} md={12}>
    <Card>
      <CardHeader color="warning">
        <h4 className={classes.cardTitleWhite}>Kayıp İlanlarını Listele<Icon>filter_alt</Icon></h4>
        <p className={classes.cardCategoryWhite}>
          Filtrelenmek istenen şehri ve semti seçiniz. 
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
        
          <span className={classes.typo}><Muted>Şehir</Muted></span>
        
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
                      onClick={handleClose}
                      className={classesd.dropdownItem}
                    >
                      İstanbul
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classesd.dropdownItem}
                    >
                      Ankara
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classesd.dropdownItem}
                    >
                      Antalya
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classesd.dropdownItem}
                    >
                      İzmir
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classesd.dropdownItem}
                    >
                      Konya
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    
          
          
          
        </GridItem>



        <GridItem xs={12} sm={12} md={4}>
          
          
      <div className={classesd.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={open2 ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleToggle2}
          className={classesd.buttonLink}
        >
        
          <span className={classesd.typo}><Muted>Semt</Muted></span>
        
        </Button>
        <Poppers
          open={Boolean(open2)}
          anchorEl={open2}
          transition
          disablePortal
          className={
            classNames({ [classesd.popperClose]: !open2 }) +
            " " +
            classesd.pooperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow1"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose2}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleClose2}
                      className={classesd.dropdownItem}
                    >
                      Yenimahalle
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose2}
                      className={classesd.dropdownItem}
                    >
                      Çankaya
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose2}
                      className={classesd.dropdownItem}
                    >
                      Çayyolu
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose2}
                      className={classesd.dropdownItem}
                    >
                      Polatlı
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose2}
                      className={classesd.dropdownItem}
                    >
                      Gölbaşı
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose2}
                      className={classesd.dropdownItem}
                    >
                      Keçiören
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose2}
                      className={classesd.dropdownItem}
                    >
                      Kızılcahamam
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

        <div style={{ backgroundImage: `url(${background})`,  backgroundRepeat: 'no-repeat', }}>
        <Table
          tableHeaderColor="primary"
          tableHead={["İletişim", "Şehir", "Semt"]}
          tableData={[
            ["bılıkbılık", "Ankara", "Yenimahalle"],
            ["gdgd", "Csfa", "df"],
            ["gdgd", "Csfa", "df"],
            ["gdgd", "Csfa", "df"],
            ["gdgd", "Csfa", "df"],
            ["gdgd", "Csfa", "df"],
            ["gdgd", "Csfa", "df"],
    
 

          ]}
        /></div>
      </CardBody>
    </Card>
  </GridItem>
  </GridContainer>
  
  );
}
