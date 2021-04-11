import React, {useState} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
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
    const [isEmergencyChecked, setEmergencyChecked] = React.useState([]);
    const [eventSelectedValue, setEventSelectedValue] = React.useState(null);
    const [annSelectedValue, setAnnSelectedValue] = React.useState(null);

    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            // set home location
            addHome_setState({
                addHome_latitude: position.coords.latitude,
                addHome_longitude: position.coords.longitude
            })

            // set event location
            addEvent_setState({
                addEvent_latitude: position.coords.latitude,
                addEvent_longitude: position.coords.longitude
            })
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
        addEvent_is_emergency: false,
        addEvent_country: "",
        addEvent_city: "",
        addEvent_state: "",
        addEvent_neighbourhood: "",
        addEvent_latitude: "",
        addEvent_longitude: "",
        addEvent_currency: "",
        addEvent_amount: "",
    })

    const [addAnnouncement_state, addAnnouncement_setState] = React.useState({
        addAnnouncement_image: "",
        addAnnouncement_phone: "",
        addAnnouncement_title: "",
        addAnnouncement_description: "",
        addAnnouncement_isHuman: false,
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

    function addAnnouncementHandleChange(evt) {
        const value = evt.target.value;
        console.log(value);

        addAnnouncement_setState({
            ...addAnnouncement_state,
            [evt.target.name]: value
        });
    }

    const handleAddHome = (e) => {
        e.preventDefault();

        console.log(addHome_state);
        setSubmitted(true);
        // TODO: check other fields
        if (addHome_state.addHome_homeName) {
            dispatch(userActions.addHome(addHome_state));
        }
    }

    const handleAddEvent = (e) => {
        e.preventDefault();

        addEvent_state.addEvent_type = eventSelectedValue;
        console.log(addEvent_state);
        setSubmitted(true);
        // TODO: check other fields
        if (addEvent_state.addEvent_title) {
            dispatch(userActions.addEvent(addEvent_state));
        }
    }

    const handleAddAnnouncement = (e) => {
        e.preventDefault();

        addAnnouncement_state.addAnnouncement_isHuman = (annSelectedValue === "insan");
        console.log(addAnnouncement_state);
        setSubmitted(true);
        // TODO: check other fields
        if (addAnnouncement_state.addAnnouncement_title) {
            dispatch(userActions.addAnnouncement(addAnnouncement_state));
        }
    }

    return (
        <div>
            {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
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
                                    }} inputProps={{
                                    value: addHome_state.addHome_latitude
                                }}
                                /></GridItem>
                            <GridItem xs={12} sm={12} md={2}>
                                <CustomInput
                                    labelText="Boylam"
                                    id="boylam"
                                    formControlProps={{
                                        fullWidth: true
                                    }} inputProps={{
                                    value: addHome_state.addHome_longitude
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
                                    }} inputProps={{
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
                                    }} inputProps={{
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
                                    }} inputProps={{
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
                                    }} inputProps={{
                                    disabled: true
                                }}

                                /><Radio
                                checked={eventSelectedValue === "Donation/Money"}
                                onChange={() => setEventSelectedValue("Donation/Money")}
                                value="Donation/Money"
                                name="radiobutton1"
                                aria-label="Bagis"
                                icon={<FiberManualRecord className={classesc.radioUnchecked}/>}
                                checkedIcon={<FiberManualRecord className={classesc.radioChecked}/>}
                                classes={{
                                    checked: classesc.radio
                                }}
                            /><Radio
                                checked={eventSelectedValue === "Donation/Supply"}
                                onChange={() => setEventSelectedValue("Donation/Supply")}
                                value="Donation/Supply"
                                name="radiobutton2"
                                aria-label="Erzak"
                                icon={<FiberManualRecord className={classesc.radioUnchecked}/>}
                                checkedIcon={<FiberManualRecord className={classesc.radioChecked}/>}
                                classes={{
                                    checked: classesc.radio
                                }}
                            />
                                <Radio
                                    checked={eventSelectedValue === "Meeting"}
                                    onChange={() => setEventSelectedValue("Meeting")}
                                    value="Meeting"
                                    name="radiobutton3"
                                    aria-label="Bulusma"
                                    icon={<FiberManualRecord className={classesc.radioUnchecked}/>}
                                    checkedIcon={<FiberManualRecord className={classesc.radioChecked}/>}
                                    classes={{
                                        checked: classesc.radio
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    id="addEvent_startTime"
                                    labelText="Başlangıç Tarihi"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "date",
                                        name: "addEvent_startTime",
                                        defaultValue: addEvent_state.addEvent_startTime,
                                        onChange: addEventHandleChange,
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Bitiş Tarihi"
                                    id="addEvent_endTime"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "date",
                                        name: "addEvent_endTime",
                                        defaultValue: addEvent_state.addEvent_endTime,
                                        onChange: addEventHandleChange,
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Etkinlik Başlığı"
                                    id="addEvent_title"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: "addEvent_title",
                                        defaultValue: addEvent_state.addEvent_title,
                                        onChange: addEventHandleChange,
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Açıklama"
                                    id="addEvent_description"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: "addEvent_description",
                                        defaultValue: addEvent_state.addEvent_description,
                                        onChange: addEventHandleChange,
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Ülke"
                                    id="addEvent_country"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        disabled: (eventSelectedValue === "bagis"),
                                        name: "addEvent_country",
                                        defaultValue: addEvent_state.addEvent_country,
                                        onChange: addEventHandleChange,
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Şehir"
                                    id="addEvent_city"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        disabled: (eventSelectedValue === "bagis"),
                                        name: "addEvent_city",
                                        defaultValue: addEvent_state.addEvent_city,
                                        onChange: addEventHandleChange,
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Semt"
                                    id="addEvent_state"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        disabled: (eventSelectedValue === "bagis"),
                                        name: "addEvent_state",
                                        defaultValue: addEvent_state.addEvent_state,
                                        onChange: addEventHandleChange,
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8}>
                                <CustomInput
                                    labelText="Adres"
                                    id="addEvent_neighbourhood"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        disabled: (eventSelectedValue === "bagis"),
                                        name: "addEvent_neighbourhood",
                                        defaultValue: addEvent_state.addEvent_neighbourhood,
                                        onChange: addEventHandleChange,
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={2}>
                                <CustomInput
                                    labelText="Enlem"
                                    id="enlem"
                                    formControlProps={{
                                        fullWidth: true
                                    }} inputProps={{
                                    value: addEvent_state.addEvent_latitude
                                }}
                                /></GridItem>
                            <GridItem xs={12} sm={12} md={2}>
                                <CustomInput
                                    labelText="Boylam"
                                    id="boylam"
                                    formControlProps={{
                                        fullWidth: true
                                    }} inputProps={{
                                    value: addEvent_state.addEvent_longitude
                                }}
                                /></GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Para Birimi"
                                    id="addEvent_currency"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        disabled: (eventSelectedValue !== "bagis"),
                                        name: "addEvent_currency",
                                        defaultValue: addEvent_state.addEvent_currency,
                                        onChange: addEventHandleChange,
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Bağış Miktarı"
                                    id="addEvent_amount"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        disabled: (eventSelectedValue !== "bagis"),
                                        name: "addEvent_amount",
                                        defaultValue: addEvent_state.addEvent_amount,
                                        onChange: addEventHandleChange,
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
                                    id="addEvent_is_emergency"
                                    onClick={() => setEmergencyChecked(addEvent_state.addEvent_is_emergency = !addEvent_state.addEvent_is_emergency)}
                                    checkedIcon={<Check className={classesc.checkedIcon}/>}
                                    icon={<Check className={classesc.uncheckedIcon}/>}
                                    classes={{
                                        isEmergencyChecked: classesc.checked
                                    }}
                                    inputProps={{
                                        disabled: (eventSelectedValue !== "bulusma")
                                    }}
                                />
                            </GridItem>


                        </GridContainer>


                    </CardBody>
                    <CardFooter>
                        <Button color="success" onClick={handleAddEvent}>Etkinlik İlanı Ekle</Button>
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
                                    id="addAnnouncement_title"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: "addAnnouncement_title",
                                        defaultValue: addAnnouncement_state.addAnnouncement_title,
                                        onChange: addAnnouncementHandleChange
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="İletişim"
                                    id="addAnnouncement_phone"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: "addAnnouncement_phone",
                                        defaultValue: addAnnouncement_state.addAnnouncement_phone,
                                        onChange: addAnnouncementHandleChange
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="İnsan / Evcil Hayvan"
                                    id="type"
                                    formControlProps={{
                                        fullWidth: true
                                    }} inputProps={{
                                    disabled: true
                                }}

                                /><Radio
                                checked={annSelectedValue === "insan"}
                                onChange={() => setAnnSelectedValue("insan")}
                                value="insan"
                                name="radiobutton4"
                                aria-label="insan"
                                icon={<FiberManualRecord className={classesc.radioUnchecked}/>}
                                checkedIcon={<FiberManualRecord className={classesc.radioChecked}/>}
                                classes={{
                                    checked: classesc.radio
                                }}
                            /><Radio
                                checked={annSelectedValue === "evcilhayvan"}
                                onChange={() => setAnnSelectedValue("evcilhayvan")}
                                value="evcilhayvan"
                                name="radiobutton5"
                                aria-label="evcilhayvan"
                                icon={<FiberManualRecord className={classesc.radioUnchecked}/>}
                                checkedIcon={<FiberManualRecord className={classesc.radioChecked}/>}
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
                                    id="addAnnouncement_description"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: "addAnnouncement_description",
                                        defaultValue: addAnnouncement_state.addAnnouncement_description,
                                        onChange: addAnnouncementHandleChange
                                    }}
                                />
                            </GridItem>


                        </GridContainer>

                        <Button color="rose" round><Icon>add_photo_alternate</Icon> Fotoğraf Ekle</Button>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary" onClick={handleAddAnnouncement} >Kayıp Evcil Hayvan İlanı Ekle</Button>
                    </CardFooter>
                </Card>
            </GridItem>


        </GridContainer>

        </div>
    );
}
