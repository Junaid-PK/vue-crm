import LoginPage from "./views/LoginPage.vue";
import RegisterPage from "./views/RegisterPage.vue";
import DashboardPage from "./views/DashboardPage.vue";
import ManageDepartments from "./views/Departments/ManageDepartments.vue";
import ManageUsers from "./views/ManageUsers.vue";
import EditDepartments from "./views/Departments/EditDepartment.vue";
import AddDepartments from "./views/Departments/AddDepartment.vue";
import ManageTeams from "./views/Teams/ManageTeams.vue";
import EditTeams from "./views/Teams/EditTeam.vue";
import AddTeams from "./views/Teams/AddTeam.vue";
import ManageTeamMembers from "./views/TeamMembers/ManageTeamMembers.vue";
import ManageTeamLeads from "./views/TeamLeads/ManageTeamLeads.vue"
import ManageTasks from "./views/Tasks/ManageTasks.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
    children: [
      { path: "", name: "Dashboard", component: ManageUsers },
      { path: "manage-users", name: "ManageUsers", component: ManageUsers },
      { path: "manage-departments", name: "ManageDepartments", component: ManageDepartments },
      { path: "edit-department/:id", name: "EditDepartments", component: EditDepartments, props: true},
      { path: "add-department", name: "AddDepartments", component: AddDepartments},
      { path: "manage-teams", name: "ManageTeams", component: ManageTeams },
      { path: "edit-team/:id", name: "EditTeams", component: EditTeams },
      { path: "add-team", name: "AddTeams", component: AddTeams },
      { path: "manage-team-members", name: "ManageTeamMembers", component: ManageTeamMembers },
      { path: "manage-team-leads", name: "ManageTeamLeads", component: ManageTeamLeads },
      { path: "manage-tasks", name: "ManageTasks", component: ManageTasks },
    ],
  },
  { path: "/register", component: RegisterPage },
  { path: "/login", component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  var isAuthenticated = false;
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("token");
    console.log("Token", token);
    token ? (isAuthenticated = true) : (isAuthenticated = false);
    if (isAuthenticated) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
