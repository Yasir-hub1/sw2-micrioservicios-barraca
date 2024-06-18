import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from "@/pages/NotFoundPage.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Customer from "@/pages/Customer.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import Login from "@/pages/Login.vue";
import Sale from "../pages/Sale.vue";
import Inventory from "../pages/Inventory.vue";
import Reports from "../pages/Reports.vue";
import Dispatch_orders from "../pages/Dispatch_orders.vue";

const routes = [
  {
    path: "/",
    component: Login, // Ruta inicial dirigida al componente Login
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    redirect: "/dashboard/cliente",
    children: [
  
      {
        path: "/dashboard/cliente",
        name: "Clientes",
        component: Customer,
      },
      {
        path: "/dashboard/venta",
        name: "Venta",
        component: Sale,
      },
      {
        path: "/dashboard/inventario",
        name: "Inventario",
        component: Inventory,
      },

    ],
  },
  { path: "*", component: NotFound },
];

export default routes;
