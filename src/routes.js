import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Home from "@material-ui/icons/House";
import Events from "@material-ui/icons/Event";
import Pets from "@material-ui/icons/Pets";
import FlashOn from "@material-ui/icons/FlashOn";
import MapIcon from "@material-ui/icons/Map";
import Anasayfa from "views/Anasayfa/Anasayfa.js";
import Profil from "views/Profil/Profil.js";
import Ilan_ekle from "views/Ilan_ekle/Ilan_ekle.js";
import Etkinlik_ilanlari from "views/Etkinlik_ilanlari/Etkinlik_ilanlari.js";
import Ev_ilanlari from "views/Ev_ilanlari/Ev_ilanlari.js";
import Kayip_evcil_hayvan_ilanlari from "views/Kayip_evcil_hayvan_ilanlari/Kayip_evcil_hayvan_ilanlari.js";
import Deprem_listesi from "views/Ekstra/Deprem_listesi";
import Harita from "views/Harita/Harita";
import Goster from "views/Harita/Goster";


const dashboardRoutes = [
  {
    path: "/anasayfa",
    name: "Ana Sayfa",
   
    icon: Dashboard,
    component: Anasayfa,
    layout: "/admin"
  },
  {
    path: "/profil",
    name: "Profil",

    icon: Person,
    component: Profil,
    layout: "/admin"
  },
  {
    path: "/ilan_ekle",
    name: "İlan Ekle",
  
    icon: "content_paste",
    component: Ilan_ekle,
    layout: "/admin"
  },
  
  {
    path: "/ev_ilanlari",
    name: "Evler",
    icon: Home,
    component: Ev_ilanlari,
    layout: "/admin"
  },
  {
    path: "/etkinlik_ilanlari",
    name: "Etkinlikler",

    icon: Events,
    component: Etkinlik_ilanlari,
    layout: "/admin"
  },
  

  {
    path: "/kayip_evcil_hayvan_ilanlari",
    name: "Kayıp İlanları",
    icon: Pets,
    component: Kayip_evcil_hayvan_ilanlari,
    layout: "/admin"
  },


  {
    path: "/yakin_depremler",
    name: "Yakın Depremler",
    icon: FlashOn,
    component: Deprem_listesi,
    layout: "/admin"
  },
  
  {
    path: "/harita",
    name: "Harita",
    icon: MapIcon,
    component: Goster,
    layout: "/admin"
  }
 
];

export default dashboardRoutes;
