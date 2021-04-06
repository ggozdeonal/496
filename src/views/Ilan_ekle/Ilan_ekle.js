import React, {useState} from "react";
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
import {userActions} from "../../_actions";
import { history } from '../../_helpers';
import { alertActions } from '../../_actions';

import {useDispatch, useSelector} from "react-redux";


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
    const [visibilityChecked, setVisibilityChecked] = React.useState(false);
    const [availableForVictims, setAvailableForVictims] = React.useState([]);
    const [availableForAnimals, setAvailableForAnimals] = React.useState([]);
    const [acilChecked, setAcilChecked] = React.useState([]);
    const [eventSelectedValue, setEventSelectedValue] = React.useState(null);
    const [annSelectedValue, setAnnSelectedValue] = React.useState(null);
  const [coordinates, setCoordinates] = React.useState({lat: '', lon: ''});
  const { lat, lon } = coordinates;

    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);
  
  React.useEffect(() => { 
    navigator.geolocation.getCurrentPosition(function(position) {
      setCoordinates({lat: position.coords.latitude, lon: position.coords.longitude})
    });
  }, []);

    const [addHome_state, addHome_setState] = React.useState({
        addHome_homeName: "",
        addHome_country: "",
        addHome_city: "",
        addHome_state: "",
        addHome_neighbourhood: "",
        addHome_latitude: "",
        addHome_longitude: "",
        addHome_availableForVictims: false,
        addHome_availableForAnimals: false,
        addHome_visible: false
    })

    const [addEvent_state, addEvent_setState] = React.useState({
        addEvent_type: "",
        addEvent_startTime: "",
        addEvent_endTime: "",
        addEvent_title: "",
        addEvent_description: "",
        addEvent_is_emergency: "",
        addEvent_country: "",
        addEvent_city: "",
        addEvent_state: "",
        addEvent_neighbourhood: "",
        addEvent_latitude: "",
        addEvent_longitude: "",
        addEvent_currency: "",
        addEvent_amount: "",
    })

    function addHomeHandleChange(evt) {
        const value = evt.target.value;
        console.log(value);

        addHome_setState({
            ...addHome_state,
            [evt.target.name]: value
        });
    }

    function addEventHandleChange(evt) {
        const value = evt.target.value;
        console.log(value);

        addEvent_setState({
            ...addEvent_state,
            [evt.target.name]: value
        });
    }

    const handleAddHome = (e) => {
        console.log(addHome_state);
        e.preventDefault();

        setSubmitted(true);
        // TODO: check other fields
        if (addHome_state.addHome_homeName) {
            dispatch(userActions.addHome(addHome_state));
        }
    }

    const handleAddEvent = () => {
        console.log(addHome_state);
    }

    const handleAddMissing = () => {
        console.log(addHome_state);
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
                    id="addHome_homeName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                        name: "addHome_homeName",
                        defaultValue: addHome_state.addHome_homeName,
                        onChange: addHomeHandleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Ülke"
                    id="addHome_country"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                        name: "addHome_country",
                        defaultValue: addHome_state.addHome_country,
                        onChange: addHomeHandleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Şehir"
                    id="addHome_city"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                        name: "addHome_city",
                        defaultValue: addHome_state.addHome_city,
                        onChange: addHomeHandleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Semt"
                    id="addHome_state"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                        name: "addHome_state",
                        defaultValue: addHome_state.addHome_state,
                        onChange: addHomeHandleChange,
                    }}
                  />
                </GridItem>

              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="Adres"
                    id="addHome_neighbourhood"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                        name: "addHome_neighbourhood",
                        defaultValue: addHome_state.addHome_neighbourhood,
                        onChange: addHomeHandleChange,
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
                  value : lat
                }}
              /></GridItem>
               <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                labelText="Boylam"
                id="boylam"
                formControlProps={{
                  fullWidth: true
                }}inputProps={{
                  value :lon
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
                  id="addHome_availableForVictims"
                  onClick={() => setAvailableForVictims(addHome_state.addHome_availableForVictims = !addHome_state.addHome_availableForVictims)}
                  checkedIcon={<Check className={classesc.checkedIcon}/>}
                  icon={<Check className={classesc.uncheckedIcon}/>}
                  classes={{
                      availableForVictims: classesc.checked,
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
                  id="addHome_availableForAnimals"
                  onClick={() => setAvailableForAnimals(addHome_state.addHome_availableForAnimals = !addHome_state.addHome_availableForAnimals)}
                  checkedIcon={<Check className={classesc.checkedIcon}/>}
                  icon={<Check className={classesc.uncheckedIcon}/>}
                  classes={{
                      availableForAnimals: classesc.checked
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
                  id="addHome_visible"
                  onClick={() => setVisibilityChecked(addHome_state.addHome_visible = !addHome_state.addHome_visible)}
                  checkedIcon={<Check className={classesc.checkedIcon}/>}
                  icon={<Check className={classesc.uncheckedIcon}/>}
                  classes={{
                      visibilityChecked: classesc.checked
                  }}
                /></GridItem>
              </GridContainer>

            </CardBody>
            <CardFooter>
                <Button color="warning" onClick={handleAddHome}>Ev İlanı Ekle</Button>
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
                  value: lat
                }}
              /></GridItem>
               <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                labelText="Boylam"
                id="boylam"
                formControlProps={{
                  fullWidth: true
                }}inputProps={{
                  value: lon
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
