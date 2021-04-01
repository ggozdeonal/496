import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Icon from "@material-ui/core/Icon";
import Home from "@material-ui/icons/House";
import Events from "@material-ui/icons/Event";
import Pets from "@material-ui/icons/Pets";
// core components
import Tabs from "components/CustomTabs/CustomTabs.js";
import Tasks from "components/Tasks/Tasks.js";


import { evilanlari, etkinlikilanlari, kayippetilanlari } from "variables/general.js";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Profil_sayfasi() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Profilini Duzenle</h4>
              <p className={classes.cardCategoryWhite}>Profil bilgilerini düzenle.</p>
            </CardHeader>
            <CardBody>
          
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="İsim"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Soyisim"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email Adresi"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Telefon Numarası"
                    id="tel-no"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Şifre"
                    id="sifre"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                
              </GridContainer>

       
            </CardBody>
            <CardFooter>
              <Button color="warning">Profili Güncelle</Button>
              <Button color="danger"><Icon>dangerous</Icon>Üyeliğimi Sil</Button>
            </CardFooter>
          </Card>
        </GridItem>
     
      </GridContainer>
      
      <Tabs
      title="İlanlarım:"
      headerColor="success"
      tabs={[
        {
          tabName: "Ev İlanlarım",
          tabIcon: Home,
          tabContent: (
            <Tasks
              checkedIndexes={[0, 1]}
              tasksIndexes={[0, 1]}
              tasks={evilanlari}
            />
          )
        },
        {
          tabName: "Etkinlik İlanlarım",
          tabIcon: Events,
          tabContent: (
            <Tasks
              checkedIndexes={[0]}
              tasksIndexes={[0, 1]}
              tasks={etkinlikilanlari}
            />
          )
        },
        {
          tabName: "Kayıp Pet İlanlarım",
          tabIcon: Pets,
          tabContent: (
            <Tasks
              checkedIndexes={[1]}
              tasksIndexes={[0, 1, 2]}
              tasks={kayippetilanlari}
            />
          )
        }
      ]}
    />



     
    </div>
  );
}
