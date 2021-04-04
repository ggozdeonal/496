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

export default function Ilan_ekle_sayfasi() {
  const classes = useStyles();
  const classesc = useStylesc();
  const [visibilityChecked, setVisibilityChecked] =  React.useState(false);
  const [magdurChecked, setMagdurChecked] = React.useState([]);
  const [evcilChecked, setEvcilChecked] = React.useState([]);
  const [acilChecked, setAcilChecked] = React.useState([]);
  const [eventSelectedValue, setEventSelectedValue] = React.useState(null);
  const [annSelectedValue, setAnnSelectedValue] = React.useState(null);

    // const [homeName, sethomeName] = React.useState({})
    // const handleHomeNameChange = (event) => {
    //     sethomeName(event.target.value)
    // }
    //
    // const saveUserInfoOnServer = () => {
    //     console.log(homeName);
    // }

    const [state, setState] = React.useState({
        homeName: "",
        country: "",
        city: "",
        state: "",
        neighbourhood: "",
        latitude: "",
        longitude: ""
    })

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    const handleSubmit = () => {
        console.log(state);
    }

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
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Ev Adı"
                    id="homeName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                        name: "homeName",
                        defaultValue: state.homeName,
                        onChange: handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Ülke"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                        name: "country",
                        defaultValue: state.country,
                        onChange: handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Şehir"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                        name: "city",
                        defaultValue: state.city,
                        onChange: handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Semt"
                    id="state"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                        name: "state",
                        defaultValue: state.state,
                        onChange: handleChange,
                    }}
                  />
                </GridItem>

              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="Adres"
                    id="neighbourhood"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                        name: "neighbourhood",
                        defaultValue: state.neighbourhood,
                        onChange: handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                labelText="Enlem"
                id="latitude"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  disabled: true,
                    name: "latitude",
                    defaultValue: state.latitude,
                    onChange: handleChange,
                }}
              /></GridItem>
               <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                labelText="Boylam"
                id="longitude"
                formControlProps={{
                  fullWidth: true
                }}inputProps={{
                  disabled: true,
                    name: "longitude",
                    defaultValue: state.longitude,
                    onChange: handleChange,
                }}
              /></GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                labelText="Evim mağdurlar için musaittir."
                id="magdur"
                formControlProps={{
                  fullWidth: true
                }}inputProps={{
                  disabled: true
                }}
              /> 
              <Checkbox
                  tabIndex={-1}
                  onClick={() => setMagdurChecked(!magdurChecked)}
                  checkedIcon={<Check className={classesc.checkedIcon} />}
                  icon={<Check className={classesc.uncheckedIcon} />}
                  classes={{
                    magdurChecked: classesc.checked
                  }}
                /></GridItem>
                <GridItem xs={12} sm={12} md={4}>
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
                  onClick={() => setEvcilChecked(!evcilChecked)}
                  checkedIcon={<Check className={classesc.checkedIcon} />}
                  icon={<Check className={classesc.uncheckedIcon} />}
                  classes={{
                    evcilChecked: classesc.checked
                  }}
                />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                labelText="Evim görünür olabilir."
                id="visibility"
                formControlProps={{
                  fullWidth: true
                }}inputProps={{
                  disabled: true
                }}
              /><Checkbox
                  tabIndex={-1}
                  onClick={() => setVisibilityChecked(!visibilityChecked)}
                  checkedIcon={<Check className={classesc.checkedIcon} />}
                  icon={<Check className={classesc.uncheckedIcon} />}
                  classes={{
                    visibilityChecked: classesc.checked
                  }}
                /></GridItem>
                
              
      
              </GridContainer>

       
            </CardBody>
            <CardFooter>
              <Button color="warning" onClick={handleSubmit}>Ev İlanı Ekle</Button>
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
                    labelText="Bağış / Erzak / Buluşma"
                    id="type"
                    formControlProps={{
                      fullWidth: true
                    }}inputProps={{
                      disabled: true
                    }}
                    
                  /><Radio
                  checked={eventSelectedValue === "bagis"}
                  onChange={() => setEventSelectedValue("bagis")}
                  value="bagis"
                  name="radiobutton1"
                  aria-label="Bagis"
                  icon={<FiberManualRecord className={classesc.radioUnchecked} />}
                  checkedIcon={<FiberManualRecord className={classesc.radioChecked} />}
                  classes={{
                    checked: classesc.radio
                  }}
                /><Radio
                checked={eventSelectedValue === "erzak"}
                onChange={() => setEventSelectedValue("erzak")}
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
                  checked={eventSelectedValue === "bulusma"}
                  onChange={() => setEventSelectedValue("bulusma")}
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
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput 
                    id="event_start"
                    labelText="Başlangıç Tarihi"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "date"
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
                    inputProps={{
                      type: "date"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Etkinlik Başlığı"
                    id="title"
                    formControlProps={{
                      fullWidth: true 
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
                </GridContainer>
                <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Ülke"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: (eventSelectedValue === "bagis")
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
                    inputProps={{
                      disabled: (eventSelectedValue === "bagis")
                     }}
                  />
                </GridItem>
          
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Semt"
                    id="state"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: (eventSelectedValue === "bagis")
                     }}
                  />
                </GridItem>
                </GridContainer>
                <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="Adres"
                    id="neighbourh"
                  
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: (eventSelectedValue === "bagis")
                     }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                labelText="Enlem"
                id="enlem"
                formControlProps={{
                  fullWidth: true
                }}inputProps={{
                  disabled: true
                }}
              /></GridItem>
               <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                labelText="Boylam"
                id="boylam"
                formControlProps={{
                  fullWidth: true
                }}inputProps={{
                  disabled: true
                }}
              /></GridItem>
              </GridContainer>     
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Para Birimi"
                    id="currency"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: (eventSelectedValue !== "bagis")
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
                    inputProps={{
                      disabled: (eventSelectedValue !== "bagis")
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
                      onClick={() => setAcilChecked(!acilChecked)}
                      checkedIcon={<Check className={classesc.checkedIcon} />}
                      icon={<Check className={classesc.uncheckedIcon} />}
                      classes={{
                        acilChecked: classesc.checked
                      }}
                      inputProps={{
                        disabled: (eventSelectedValue !== "bulusma")
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
            <h4 className={classes.cardTitleWhite}>Kayıp İlanları Ekle</h4>
            <p className={classes.cardCategoryWhite}>
              Kayıp evcil hayvan ilanı için gerekli bilgileri giriniz.
            </p>
          </CardHeader>
          <CardBody>
          <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="İlan Başlığı"
                    id="owner"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="İletişim"
                    id="tel-no"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="İnsan / Evcil Hayvan"
                    id="type"
                    formControlProps={{
                      fullWidth: true
                    }}inputProps={{
                      disabled: true
                    }}
                    
                  /><Radio
                  checked={annSelectedValue === "insan"}
                  onChange={() => setAnnSelectedValue("insan")}
                  value="insan"
                  name="radiobutton4"
                  aria-label="insan"
                  icon={<FiberManualRecord className={classesc.radioUnchecked} />}
                  checkedIcon={<FiberManualRecord className={classesc.radioChecked} />}
                  classes={{
                    checked: classesc.radio
                  }}
                /><Radio
                checked={annSelectedValue === "evcilhayvan"}
                onChange={() => setAnnSelectedValue("evcilhayvan")}
                value="evcilhayvan"
                name="radiobutton5"
                aria-label="evcilhayvan"
                icon={<FiberManualRecord className={classesc.radioUnchecked} />}
                checkedIcon={<FiberManualRecord className={classesc.radioChecked} />}
                classes={{
                  checked: classesc.radio
                }}
              />
            
                </GridItem>
                
              </GridContainer>
              <GridContainer>
                
                
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Açıklama"
                    id="desc"
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
