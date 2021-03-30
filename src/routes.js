import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Home from "@material-ui/icons/House";
import Events from "@material-ui/icons/Event";
import Pets from "@material-ui/icons/Pets";
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import NotificationsPage from "views/Notifications/Notifications.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Ana Sayfa",
   
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Profil",

    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "İlan Ekle",
  
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  
  {
    path: "/icons",
    name: "Ev İlanları",
    icon: Home,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Etkinlik İlanları",

    icon: Events,
    component: Typography,
    layout: "/admin"
  },

  {
    path: "/notifications",
    name: "Kayıp Pet İlanları",
    icon: Pets,
    component: NotificationsPage,
    layout: "/admin"
  }
 
  
  
 
];

export default dashboardRoutes;
