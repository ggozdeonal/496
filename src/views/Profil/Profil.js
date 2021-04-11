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
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
// core components
import Tabs from "components/CustomTabs/CustomTabs.js";
import Tasks from "components/Tasks/Tasks.js";
import Table from "components/Table/Table.js";

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
    const [magdurChecked, setMagdurChecked] = React.useState(false);
    const [evcilChecked, setEvcilChecked] = React.useState(false);
    const [acilChecked, setAcilChecked] = React.useState(false);
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
    const [userEvents, setUserEvents] = React.useState([]);
    const [userEventsPreview, setUserEventsPreview] = React.useState([]);
    const [userMissingPets, setUserMissingPets] = React.useState([]);
    const [userMissingPetsPreview, setUserMissingPetsPreview] = React.useState([]);

    const [selectedHomeIndexUpdate, setSelectedHomeIndexUpdate] = React.useState(-1);
    const [selectedHomeIndexDelete, setSelectedHomeIndexDelete] = React.useState(-1);
    const [selectedEventIndexUpdate, setSelectedEventIndexUpdate] = React.useState(-1);
    const [selectedEventIndexDelete, setSelectedEventIndexDelete] = React.useState(-1);
    const [selectedAnnouncementIndexUpdate, setSelectedAnnouncementIndexUpdate] = React.useState(-1);
    const [selectedAnnouncementIndexDelete, setSelectedAnnouncementIndexDelete] = React.useState(-1);

    function addHomeEditButtons(home_id)
    {
        const buttons = [
            {color: "success", icon: Edit},
        ].map((prop, key) => {
            return (
                <Button color={prop.color} className={classes.actionButton} key={key}
                        onClick={() => setSelectedHomeIndexUpdate(home_id)}>
                    <prop.icon className={classes.icon}/>
                </Button>
            );
        });

        return buttons;
    }

    function addHomeDeleteButtons(home_id)
    {
        const buttons = [
            {color: "danger", icon: Close}
        ].map((prop, key) => {
            return (
                <Button color={prop.color} className={classes.actionButton} key={key}
                        onClick={() => setSelectedHomeIndexDelete(home_id)}>
                    <prop.icon className={classes.icon}/>
                </Button>
            );
        });

        return buttons;
    }

    function addEventEditButtons(event_id)
    {
        const buttons = [
            {color: "success", icon: Edit},
        ].map((prop, key) => {
            return (
                <Button color={prop.color} className={classes.actionButton} key={key}
                        onClick={() => setSelectedEventIndexUpdate(event_id)}>
                    <prop.icon className={classes.icon}/>
                </Button>
            );
        });

        return buttons;
    }

    function addEventDeleteButtons(event_id)
    {
        const buttons = [
            {color: "danger", icon: Close}
        ].map((prop, key) => {
            return (
                <Button color={prop.color} className={classes.actionButton} key={key}
                        onClick={() => setSelectedEventIndexDelete(event_id)}>
                    <prop.icon className={classes.icon}/>
                </Button>
            );
        });

        return buttons;
    }

    function addAnnouncementEditButtons(announcement_id)
    {
        const buttons = [
            {color: "success", icon: Edit},
        ].map((prop, key) => {
            return (
                <Button color={prop.color} className={classes.actionButton} key={key}
                        onClick={() => setSelectedAnnouncementIndexUpdate(announcement_id)}>
                    <prop.icon className={classes.icon}/>
                </Button>
            );
        });

        return buttons;
    }

    function addAnnouncementDeleteButtons(announcement_id)
    {
        const buttons = [
            {color: "danger", icon: Close}
        ].map((prop, key) => {
            return (
                <Button color={prop.color} className={classes.actionButton} key={key}
                        onClick={() => setSelectedAnnouncementIndexDelete(announcement_id)}>
                    <prop.icon className={classes.icon}/>
                </Button>
            );
        });

        return buttons;
    }

    const [profile, setProfile] = React.useState({
        profile_name: "",
        profile_surname: "",
        profile_email: "",
        profile_phone: "",
        profile_password: "",
        profile_password_hashed: "",
    })

    const [userHomesTable, setUserHomesTable] = React.useState({
        city: "",
        country: "",
        home_id: "",
        home_name: "",
        home_owner: "",
        isVisible: false,
        latitude: "",
        longitude: "",
        neighbourhood: "",
        state: "",
        availableForVictims: false,
        availableForAnimals: false
    })

    const [userEventsTable, setUserEventsTable] = React.useState({
        event_id: "",
        type: "",
        start_time: "",
        end_time: "",
        title: "",
        description: "",
        is_emergency: false,
        country: "",
        city: "",
        state: "",
        neighbourhood: "",
        latitude: "",
        longitude: "",
        currency: "",
        amount: "",
    })

    const [userAnnouncementTable, setUserAnnouncementTable] = React.useState({
        announcement_id: "",
        image: "",
        phone: "",
        title: "",
        description: "",
        isHuman: false,
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

    function addHomeHandleChange(evt) {
        const value = evt.target.value;

        setUserHomesTable({
            ...userHomesTable,
            [evt.target.name]: value
        });
    }

    function addEventHandleChange(evt) {
        const value = evt.target.value;

        setUserEventsTable({
            ...userEventsTable,
            [evt.target.name]: value
        });
    }

    function addAnnouncementHandleChange(evt) {
        const value = evt.target.value;

        setUserAnnouncementTable({
            ...userAnnouncementTable,
            [evt.target.name]: value
        });
    }

    function handleUpdateProfile(evt) {
        evt.preventDefault();

        dispatch(userActions.updateProfile(profile));
    }

    function handleDeleteProfile(evt) {
        evt.preventDefault();

        dispatch(userActions.deleteProfile());
    }

    function handleUpdateHome(evt) {
        evt.preventDefault();

        console.log(userHomesTable);
        dispatch(userActions.updateHome(userHomesTable));
    }

    function deleteHome(home_id) {
        if (home_id >= 0)
        {
            console.log("home will be deleted:", home_id);
            dispatch(userActions.deleteHome(home_id));
        }
    }

    function handleUpdateEvent(evt) {
        evt.preventDefault();

        console.log(userEventsTable);
        dispatch(userActions.updateEvent(userEventsTable));
    }

    function deleteEvent(event_id) {
        if (event_id >= 0)
        {
            console.log("event will be deleted:", event_id);
            dispatch(userActions.deleteEvent(event_id));
        }
    }

    function handleUpdateAnnouncement(evt) {
        evt.preventDefault();

        userAnnouncementTable.isHuman = (annSelectedValue === "insan");
        console.log(userAnnouncementTable);
        dispatch(userActions.updateAnnouncement(userAnnouncementTable));
    }

    function deleteAnnouncement(announcement_id) {
        if (announcement_id >= 0)
        {
            console.log("announcement will be deleted:", announcement_id);
            dispatch(userActions.deleteAnnouncement(announcement_id));
        }
    }

    function updateHomeTable(home_id)
    {
        if (home_id >= 0)
        {
            const home = userHomes.filter(home => home.home_id === home_id);

            if (home && home.length === 1)
            {
                console.log(home[0]);

                setUserHomesTable({
                    city: home[0].city,
                    country: home[0].country,
                    home_id: home[0].home_id,
                    home_name: home[0].home_name,
                    home_owner: home[0].home_owner,
                    isVisible: home[0].isVisible,
                    latitude: home[0].latitude,
                    longitude: home[0].longitude,
                    neighbourhood: home[0].neighbourhood,
                    state: home[0].state,
                    availableForVictims: home[0].availableForVictims,
                    availableForAnimals: home[0].availableForAnimals,
                });

                setVisibilityChecked(home[0].isVisible);
                setEvcilChecked(home[0].availableForAnimals);
                setMagdurChecked(home[0].availableForVictims);
            }
        }
    }

    function updateEventTable(event_id)
    {
        if (event_id >= 0)
        {
            const event = userEvents.filter(event => event.event_id === event_id);

            if (event && event.length === 1)
            {
                console.log(event[0]);
                const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

                setUserEventsTable({
                    event_id: event[0].event_id,
                    type: event[0].type,
                    start_time: new Date(event[0].start_time).toLocaleDateString([],options),
                    end_time: new Date(event[0].end_time).toLocaleDateString([],options),
                    title: event[0].title,
                    description: event[0].description,
                    is_emergency: event[0].is_emergency,
                    country: event[0].country,
                    city: event[0].city,
                    state: event[0].state,
                    neighbourhood: event[0].neighbourhood,
                    latitude: event[0].latitude,
                    longitude: event[0].longitude,
                    currency: event[0].currency,
                    amount: event[0].amount,
                })

                setEventSelectedValue(event[0].type);
                setAcilChecked(event[0].is_emergency);
            }
        }
    }

    function updateAnnouncementTable(announcement_id)
    {
        if (announcement_id >= 0)
        {
            const announcement = userMissingPets.filter(announcement => announcement.announcement_id === announcement_id);

            if (announcement && announcement.length === 1)
            {

                setUserAnnouncementTable({
                    announcement_id: announcement[0].announcement_id,
                    image: announcement[0].image,
                    phone: announcement[0].phone,
                    title: announcement[0].title,
                    description: announcement[0].description,
                    isHuman: announcement[0].isHuman
                });

                setAnnSelectedValue(announcement[0].isHuman ? "insan" : "evcilhayvan");
            }
        }
    }

    // set user profile information fields
    React.useEffect(() => {
        var user = JSON.parse(localStorage.getItem('user'));

        setProfile({
            profile_name: user['user']['name'],
            profile_surname: user['user']['surname'],
            profile_email: user['user']['email'],
            profile_phone: user['user']['phone'],
            profile_password_hashed: user['user']['password']
        })
    }, []);

    // get home list
    React.useEffect(() => {
        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];

        axios.get(`https://bauphi-api.herokuapp.com/api/users/${user_id}/homes`,
            {headers: {'Content-Type': 'application/json', 'session_key': 'admin'}})
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    setUserHomes(response.data.homes);

                    localStorage.setItem("userHomes", JSON.stringify(response.data.homes));

                    // save home names into temp list
                    const homes = [];
                    for (const [index, value] of response.data.homes.entries()) {
                        const tempItem = [value.home_name, addHomeEditButtons(value.home_id), addHomeDeleteButtons(value.home_id)];
                        homes.push(tempItem);
                    }
                    setUserHomesPreview(homes);
                }
            })
    }, []);

    // get event list
    React.useEffect(() => {
        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];

        axios.get(`https://bauphi-api.herokuapp.com/api/users/${user_id}/events`,
            {headers: {'Content-Type': 'application/json', 'session_key': 'admin'}})
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    setUserEvents(response.data.events);

                    // save event names into temp list
                    const events = [];
                    for (const [index, value] of response.data.events.entries()) {
                        const tempItem = [value.title, addEventEditButtons(value.event_id), addEventDeleteButtons(value.event_id)];
                        events.push(tempItem);
                    }
                    setUserEventsPreview(events);
                }
            })
    }, []);

    // get announcement list
    React.useEffect(() => {
        let user_id = JSON.parse(localStorage.getItem('user'));
        user_id = user_id['user']['user_id'];

        axios.get(`https://bauphi-api.herokuapp.com/api/users/${user_id}/announcements`,
            {headers: {'Content-Type': 'application/json', 'session_key': 'admin'}})
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    setUserMissingPets(response.data.announcements);

                    // save announcements into temp list
                    const announcements = [];
                    for (const [index, value] of response.data.announcements.entries()) {
                        const tempItem = [value.title, addAnnouncementEditButtons(value.announcement_id), addAnnouncementDeleteButtons(value.announcement_id)];
                        announcements.push(tempItem);
                    }
                    setUserMissingPetsPreview(announcements);
                }
            })
    }, []);

    // React.useEffect(()=>{console.log("prew", userHomesPreview)},[userHomesPreview])

    React.useEffect(()=> { updateHomeTable(selectedHomeIndexUpdate) },[selectedHomeIndexUpdate])
    React.useEffect(()=> { deleteHome(selectedHomeIndexDelete) },[selectedHomeIndexDelete])
    React.useEffect(()=> { updateEventTable(selectedEventIndexUpdate) },[selectedEventIndexUpdate])
    React.useEffect(()=> { deleteEvent(selectedEventIndexDelete) },[selectedEventIndexDelete])
    React.useEffect(()=> { updateAnnouncementTable(selectedAnnouncementIndexUpdate) },[selectedAnnouncementIndexUpdate])
    React.useEffect(()=> { deleteAnnouncement(selectedAnnouncementIndexDelete) },[selectedAnnouncementIndexDelete])

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
                            <Button color="danger" onClick={handleDeleteProfile}><Icon>dangerous</Icon>Üyeliğimi
                                Sil</Button>
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
                            <Table
                                tableHead={["Ev Adi", "Evi Guncelle", "Evi Sil"]}
                                tableData={userHomesPreview}
                            />
                        )
                    },
                    {
                        tabName: "Etkinlik İlanlarım",
                        tabIcon: Events,
                        tabContent: (
                            <Table
                                tableHead={["Etkinlik Adi", "Etkinligi Guncelle", "Etkinligi Sil"]}
                                tableData={userEventsPreview}
                            />
                        )
                    },
                    {
                        tabName: "Kayıp Pet İlanlarım",
                        tabIcon: Pets,
                        tabContent: (
                            <Table
                                tableHead={["Duyurular", "Duyuru Guncelle", "Duyuru Sil"]}
                                tableData={userMissingPetsPreview}
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
                                        inputProps={{
                                            name: "home_name",
                                            value: userHomesTable.home_name,
                                            onChange: addHomeHandleChange,
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
                                            value: userHomesTable.country,
                                            onChange: addHomeHandleChange,
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
                                            value: userHomesTable.city,
                                            onChange: addHomeHandleChange,
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
                                            value: userHomesTable.state,
                                            onChange: addHomeHandleChange,
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
                                            value: userHomesTable.neighbourhood,
                                            onChange: addHomeHandleChange,
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
                                            name: "latitude",
                                            value: userHomesTable.latitude,
                                            onChange: addHomeHandleChange,
                                        }}
                                    /></GridItem>
                                <GridItem xs={12} sm={12} md={2}>
                                    <CustomInput
                                        labelText="Boylam"
                                        id="longitude"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "longitude",
                                            value: userHomesTable.longitude,
                                            onChange: addHomeHandleChange,
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
                                        checked={magdurChecked}
                                        id="availableForVictims"
                                        onClick={() => setMagdurChecked(userHomesTable.availableForVictims = !userHomesTable.availableForVictims)}                                    checkedIcon={<Check className={classesc.checkedIcon}/>}
                                        icon={<Check className={classesc.uncheckedIcon}/>}
                                        classes={{
                                            magdurChecked: classesc.checked,
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
                                        checked={evcilChecked}
                                        id="availableForAnimals"
                                        onClick={() => setEvcilChecked(userHomesTable.availableForAnimals = !userHomesTable.availableForAnimals)}                                    checkedIcon={<Check className={classesc.checkedIcon}/>}
                                        icon={<Check className={classesc.uncheckedIcon}/>}
                                        classes={{
                                            evcilChecked: classesc.checked,
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Evim görünür olabilir."
                                        id="visibility"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true
                                        }}
                                    />
                                    <Checkbox
                                    tabIndex={-1}
                                    checked={visibilityChecked}
                                    id="isVisible"
                                    onClick={() => setVisibilityChecked(userHomesTable.isVisible = !userHomesTable.isVisible)}                                    checkedIcon={<Check className={classesc.checkedIcon}/>}
                                    icon={<Check className={classesc.uncheckedIcon}/>}
                                    classes={{
                                        visibilityChecked: classesc.checked,
                                    }}
                                /></GridItem>
                            </GridContainer>

                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={handleUpdateHome} >Ev İlanımı Güncelle</Button>
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
                                        id="start_time"
                                        labelText="Başlangıç Tarihi"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            // type: "date",
                                            name: "start_time",
                                            value: userEventsTable.start_time,
                                            onChange: addEventHandleChange
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Bitiş Tarihi"
                                        id="end_time"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            // type: "date",
                                            name: "end_time",
                                            value: userEventsTable.end_time,
                                            onChange: addEventHandleChange
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
                                        inputProps={{
                                            name: "title",
                                            value: userEventsTable.title,
                                            onChange: addEventHandleChange
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
                                        inputProps={{
                                            name: "description",
                                            value: userEventsTable.description,
                                            onChange: addEventHandleChange
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
                                            disabled: (eventSelectedValue === "bagis"),
                                            name: "country",
                                            value: userEventsTable.country,
                                            onChange: addEventHandleChange
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
                                            disabled: (eventSelectedValue === "bagis"),
                                            name: "city",
                                            value: userEventsTable.city,
                                            onChange: addEventHandleChange
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
                                            disabled: (eventSelectedValue === "bagis"),
                                            name: "state",
                                            value: userEventsTable.state,
                                            onChange: addEventHandleChange
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
                                            disabled: (eventSelectedValue === "bagis"),
                                            name: "neighbourhood",
                                            value: userEventsTable.neighbourhood,
                                            onChange: addEventHandleChange
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
                                            name: "latitude",
                                            value: userEventsTable.latitude,
                                            onChange: addEventHandleChange
                                        }}
                                    /></GridItem>
                                <GridItem xs={12} sm={12} md={2}>
                                    <CustomInput
                                        labelText="Boylam"
                                        id="longitude"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "longitude",
                                            value: userEventsTable.longitude,
                                            onChange: addEventHandleChange
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
                                            disabled: (eventSelectedValue !== "bagis"),
                                            name: "currency",
                                            value: userEventsTable.currency,
                                            onChange: addEventHandleChange
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
                                            disabled: (eventSelectedValue !== "bagis"),
                                            name: "amount",
                                            value: userEventsTable.amount,
                                            onChange: addEventHandleChange
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
                                        checked={acilChecked}
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
                            <Button color="danger" onClick={handleUpdateEvent} >Etkinlik İlanımı Güncelle</Button>
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
                                        id="title"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "title",
                                            value: userAnnouncementTable.title,
                                            onChange: addAnnouncementHandleChange
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="İletişim"
                                        id="phone"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "phone",
                                            value: userAnnouncementTable.phone,
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
                                        id="description"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "description",
                                            value: userAnnouncementTable.description,
                                            onChange: addAnnouncementHandleChange
                                        }}
                                    />
                                </GridItem>


                            </GridContainer>

                            <Button color="rose" round><Icon>add_photo_alternate</Icon> Fotoğraf Ekle</Button>
                        </CardBody>
                        <CardFooter>
                            <Button color="info" onClick={handleUpdateAnnouncement}>Kayıp İlanımı Güncelle</Button>
                        </CardFooter>
                    </Card>
                </GridItem>


            </GridContainer>

        </div>
    )
}
