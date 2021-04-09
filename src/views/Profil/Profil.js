import React, {useState} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Icon from "@material-ui/core/Icon";
import Home from "@material-ui/icons/House";
import Events from "@material-ui/icons/Event";
import Pets from "@material-ui/icons/Pets";
// core components
import Tabs from "components/CustomTabs/CustomTabs.js";
import Tasks from "components/Tasks/Tasks.js";

import Checkbox from "@material-ui/core/Checkbox";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Radio from "@material-ui/core/Radio";
// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

//core components
import stylesc from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";


import {evilanlari, etkinlikilanlari, kayippetilanlari} from "variables/general.js";
import {userActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";


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
const useStylesc = makeStyles(stylesc);
export default function Profil_sayfasi() {
    const classes = useStyles();
    const classesc = useStylesc();
    const [visibilityChecked, setVisibilityChecked] = React.useState(false);
    const [magdurChecked, setMagdurChecked] = React.useState([]);
    const [evcilChecked, setEvcilChecked] = React.useState([]);
    const [acilChecked, setAcilChecked] = React.useState([]);
    const [eventSelectedValue, setEventSelectedValue] = React.useState(null);
    const [annSelectedValue, setAnnSelectedValue] = React.useState(null);
    const [coordinates, setCoordinates] = React.useState({lat: '', lon: ''});
    const {lat, lon} = coordinates;

    const [submitted, setSubmitted] = React.useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);
    const [userHomes, setUserHomes] = React.useState([]);
    const [userHomesPreview, setUserHomesPreview] = React.useState([]);
    const [userHomesPreviewIndex, setUserHomesPreviewIndex] = React.useState([]);

    const [profile, setProfile] = React.useState({
        profile_name: "",
        profile_surname: "",
        profile_email: "",
        profile_phone: "",
        profile_password: "",
    })

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setCoordinates({lat: position.coords.latitude, lon: position.coords.longitude})
        });
    }, []);


    function addProfileHandleChange(evt) {
        const value = evt.target.value;

        setProfile({
            ...profile,
            [evt.target.name]: value
        });
    }

    function handleUpdateProfile(evt) {
        evt.preventDefault();

        dispatch(userActions.updateProfile(profile));
    }

    function handleDeleteProfile(evt) {
        evt.preventDefault();

        dispatch(userActions.deleteProfile(profile));
    }

    React.useEffect(() => {
        var user = JSON.parse(localStorage.getItem('user'));

        setProfile({
            profile_name: user['user']['name'],
            profile_surname: user['user']['surname'],
            profile_email: user['user']['email'],
            profile_phone: user['user']['phone'],
            profile_password: user['user']['password']
        })
    }, []);

    // get home list
    React.useEffect(() => {
        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];

        axios.get(`https://bauphi-api.herokuapp.com/api/users/${user_id}/homes`,
            { headers: { 'Content-Type': 'application/json', 'session_key': 'admin' }})
            .then((response) =>  {
                    setUserHomes(response.data.homes);

                    // save home names into temp list
                const homes = [];
                const homeIndexes = [];
                for (const [index, value] of response.data.homes.entries()) {
                    homes.push(value.home_name);
                    homeIndexes.push(index);
                }
                setUserHomesPreview(homes);
                setUserHomesPreviewIndex(homeIndexes);
            })
    }, []);

    React.useEffect(()=>{console.log(userHomes)},[userHomes])
    React.useEffect(()=>{console.log(userHomesPreview)},[userHomesPreview])

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
                                        id="profile_name"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "profile_name",
                                            value: profile.profile_name,
                                            onChange: addProfileHandleChange,
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Soyisim"
                                        id="profile_surname"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "profile_surname",
                                            value: profile.profile_surname,
                                            onChange: addProfileHandleChange,
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Email Adresi"
                                        id="profile_email"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "profile_email",
                                            value: profile.profile_email,
                                            onChange: addProfileHandleChange,
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Telefon Numarası"
                                        id="profile_phone"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "profile_phone",
                                            value: profile.profile_phone,
                                            onChange: addProfileHandleChange,
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Şifre"
                                        id="profile_password"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "profile_password",
                                            value: profile.profile_password,
                                            onChange: addProfileHandleChange,
                                        }}
                                    />
                                </GridItem>

                            </GridContainer>


                        </CardBody>
                        <CardFooter>
                            <Button color="warning" onClick={handleUpdateProfile}>Profili Güncelle</Button>
                            <Button color="danger" onClick={handleDeleteProfile}><Icon>dangerous</Icon>Üyeliğimi Sil</Button>
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
                                tasksIndexes={userHomesPreviewIndex}
                                tasks={userHomesPreview}
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


            <GridContainer>

                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Ev İlanımı Güncelle </h4>
                            <p className={classes.cardCategoryWhite}>
                                Ev ilanınız için değişiklik yapmak istediğiniz alanı düzenleyiniz.
                            </p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Ev Adı"
                                        id="home_name"
                                        formControlProps={{
                                            fullWidth: true
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
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Şehir"
                                        id="city"
                                        formControlProps={{
                                            fullWidth: true
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
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={2}>
                                    <CustomInput
                                        labelText="Enlem"
                                        id="enlem"
                                        formControlProps={{
                                            fullWidth: true
                                        }} inputProps={{
                                        value: lat
                                    }}
                                    /></GridItem>
                                <GridItem xs={12} sm={12} md={2}>
                                    <CustomInput
                                        labelText="Boylam"
                                        id="boylam"
                                        formControlProps={{
                                            fullWidth: true
                                        }} inputProps={{
                                        value: lon
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
                                        onClick={() => setMagdurChecked(!magdurChecked)}
                                        checkedIcon={<Check className={classesc.checkedIcon}/>}
                                        icon={<Check className={classesc.uncheckedIcon}/>}
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
                                        }} inputProps={{
                                        disabled: true
                                    }}
                                    />
                                    <Checkbox
                                        tabIndex={-1}
                                        onClick={() => setEvcilChecked(!evcilChecked)}
                                        checkedIcon={<Check className={classesc.checkedIcon}/>}
                                        icon={<Check className={classesc.uncheckedIcon}/>}
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
                                        }} inputProps={{
                                        disabled: true
                                    }}
                                    /><Checkbox
                                    tabIndex={-1}
                                    onClick={() => setVisibilityChecked(!visibilityChecked)}
                                    checkedIcon={<Check className={classesc.checkedIcon}/>}
                                    icon={<Check className={classesc.uncheckedIcon}/>}
                                    classes={{
                                        visibilityChecked: classesc.checked
                                    }}
                                /></GridItem>


                            </GridContainer>


                        </CardBody>
                        <CardFooter>
                            <Button color="primary">Ev İlanımı Güncelle</Button>
                        </CardFooter>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="danger">
                            <h4 className={classes.cardTitleWhite}>Etkinlik İlanımı Güncelle</h4>
                            <p className={classes.cardCategoryWhite}>
                                Etkinlik ilanınızda değiştirmek istediğiniz alanları etkinlik türünü seçtikten sonra
                                güncelleyiniz.
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
                                    checked={eventSelectedValue === "bagis"}
                                    onChange={() => setEventSelectedValue("bagis")}
                                    value="bagis"
                                    name="radiobutton1"
                                    aria-label="Bagis"
                                    icon={<FiberManualRecord className={classesc.radioUnchecked}/>}
                                    checkedIcon={<FiberManualRecord className={classesc.radioChecked}/>}
                                    classes={{
                                        checked: classesc.radio
                                    }}
                                /><Radio
                                    checked={eventSelectedValue === "erzak"}
                                    onChange={() => setEventSelectedValue("erzak")}
                                    value="erzak"
                                    name="radiobutton2"
                                    aria-label="Erzak"
                                    icon={<FiberManualRecord className={classesc.radioUnchecked}/>}
                                    checkedIcon={<FiberManualRecord className={classesc.radioChecked}/>}
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
                                        icon={<FiberManualRecord className={classesc.radioUnchecked}/>}
                                        checkedIcon={<FiberManualRecord className={classesc.radioChecked}/>}
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
                                        }} inputProps={{
                                        value: lat
                                    }}
                                    /></GridItem>
                                <GridItem xs={12} sm={12} md={2}>
                                    <CustomInput
                                        labelText="Boylam"
                                        id="boylam"
                                        formControlProps={{
                                            fullWidth: true
                                        }} inputProps={{
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
                                        checkedIcon={<Check className={classesc.checkedIcon}/>}
                                        icon={<Check className={classesc.uncheckedIcon}/>}
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
                            <Button color="danger">Etkinlik İlanımı Güncelle</Button>
                        </CardFooter>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>Kayıp İlanımı Güncelle</h4>
                            <p className={classes.cardCategoryWhite}>
                                Bir yakınınızın veya evcil hayvanınızın kayıp ilanında değiştirmek istediğiniz alanı
                                güncelleyiniz.
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
                            <Button color="info">Kayıp İlanımı Güncelle</Button>
                        </CardFooter>
                    </Card>
                </GridItem>


            </GridContainer>

        </div>
    )
}
