<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ routeName }}</a>
      <button class="navbar-toggler navbar-burger" type="button" @click="toggleSidebar"
        :aria-expanded="$sidebar.showSidebar" aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">

        <!--   <drop-down class="nav-item" title="5 Notifications" title-classes="nav-link" icon="ti-bell">
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </drop-down>
 -->

          <li class="nav-item">
            <a href="#" class="nav-link" @click="logout">
              <i class="ti-new-window"></i>
              <p>Cerrar sesion</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import axios from 'axios';
export default {

  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      activeNotifications: false,
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },

    async logout() {
      try {
        await axios.post("http://3.135.246.206/api/logout");
        delete axios.defaults.headers.common["Authorization"];
        await Promise.all([
          localStorage.removeItem('token'),
          localStorage.removeItem('user'),
          localStorage.removeItem('isAuthenticated')
        ]);
        this.$router.push('/login');
        window.location.reload();
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }

  },
};
</script>
<style></style>
