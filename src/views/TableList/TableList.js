import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Checkbox from "@material-ui/core/Checkbox";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Radio from "@material-ui/core/Radio";
// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

//core components
import stylesc from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";
import Icon from "@material-ui/core/Icon";


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
const useStylesc = makeStyles(stylesc);

export default function TableList() {
  const classes = useStyles();
  const classesc = useStylesc();
  const [checked, setChecked] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  return (
    
    <GridContainer>
    
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Ev İlanı Ekle</h4>
            <p className={classes.cardCategoryWhite}>
              Ev ilanı için gerekli bilgileri giriniz.
            </p>
          </CardHeader>
          <CardBody>
          <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Ev Sahibi"
                    id="home_owner"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Ülke"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Şehir"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>

              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Adres"
                    id="neighbourh"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>

              <GridContainer>
              </GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                labelText="Evim mağdurlar için musaittir."
                id="magdur"
                formControlProps={{
                  fullWidth: true
                }}inputProps={{
                  disabled: true
                }}
              /><Checkbox
                  tabIndex={-1}
                  onClick={() => handleToggle(1)}
                  checkedIcon={<Check className={classesc.checkedIcon} />}
                  icon={<Check className={classesc.uncheckedIcon} />}
                  classes={{
                    checked: classesc.checked
                  }}
                /></GridItem>
                <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                labelText="Evim evcil hayvanlar için musaittir."
                id="pets"
                formControlProps={{
                  fullWidth: true
                }}inputProps={{
                  disabled: true
                }}
              />
                <Checkbox
                  tabIndex={-1}
                  onClick={() => handleToggle(1)}
                  checkedIcon={<Check className={classesc.checkedIcon} />}
                  icon={<Check className={classesc.uncheckedIcon} />}
                  classes={{
                    checked: classesc.checked
                  }}
                />
                </GridItem>
                
              
      
              </GridContainer>

       
            </CardBody>
            <CardFooter>
              <Button color="warning">Ev İlanı Ekle</Button>
            </CardFooter>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Etkinlik İlanı Ekle</h4>
            <p className={classes.cardCategoryWhite}>
              Etkinlik türünü seçtikten sonra alt satırlardaki aktif alanları doldurunuz.
            </p>
          </CardHeader>
          <CardBody>
          <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Etkinlik Sahibi"
                    id="event_starter"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Başlangıç Tarihi"
                    id="event_start"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Bitiş Tarihi"
                    id="event_end"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Etkinlik Başlığı"
                    id="title"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Bağış / Erzak / Buluşma"
                    id="type"
                    formControlProps={{
                      fullWidth: true
                    }}inputProps={{
                      disabled: true
                    }}
                    
                  /><Radio
                  checked={selectedValue === "bagis"}
                  onChange={() => setSelectedValue("bagis")}
                  value="bagis"
                  name="radiobutton1"
                  aria-label="Bagis"
                  icon={<FiberManualRecord className={classesc.radioUnchecked} />}
                  checkedIcon={<FiberManualRecord className={classesc.radioChecked} />}
                  classes={{
                    checked: classesc.radio
                  }}
                /><Radio
                checked={selectedValue === "erzak"}
                onChange={() => setSelectedValue("erzak")}
                value="erzak"
                name="radiobutton2"
                aria-label="Erzak"
                icon={<FiberManualRecord className={classesc.radioUnchecked} />}
                checkedIcon={<FiberManualRecord className={classesc.radioChecked} />}
                classes={{
                  checked: classesc.radio
                }}
              />
                <Radio
                  checked={selectedValue === "bulusma"}
                  onChange={() => setSelectedValue("bulusma")}
                  value="bulusma"
                  name="radiobutton3"
                  aria-label="Bulusma"
                  icon={<FiberManualRecord className={classesc.radioUnchecked} />}
                  checkedIcon={<FiberManualRecord className={classesc.radioChecked} />}
                  classes={{
                    checked: classesc.radio
                  }}
                />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Açıklama"
                    id="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Ülke"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Şehir"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
          
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Para Birimi"
                    id="currency"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Bağış Miktarı"
                    id="amount"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>      <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Semt"
                    id="state"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Acil"
                    id="emergency"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />
              
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle(1)}
                      checkedIcon={<Check className={classesc.checkedIcon} />}
                      icon={<Check className={classesc.uncheckedIcon} />}
                      classes={{
                        checked: classesc.checked
                      }}
                      
                      

                    />
                </GridItem>

              
      
              </GridContainer>

       
            </CardBody>
            <CardFooter>
              <Button color="success">Etkinlik İlanı Ekle</Button>
            </CardFooter>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Kayıp Evcil Hayvan İlanı Ekle</h4>
            <p className={classes.cardCategoryWhite}>
              Kayıp EVcil Hayvan İlanı için gerekli bilgileri giriniz.
            </p>
          </CardHeader>
          <CardBody>
          <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="İlan Sahibi"
                    id="owner"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Ülke"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Şehir"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="İletişim"
                    id="tel-no"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
               
             
              </GridContainer>
              
              <Button color="rose" round><Icon>add_photo_alternate</Icon> Fotoğraf Ekle</Button>
            </CardBody>
            <CardFooter>
              <Button color="primary">Kayıp Evcil Hayvan İlanı Ekle</Button>
            </CardFooter>
        </Card>
      </GridItem>
  
      
    </GridContainer>
  );
}
