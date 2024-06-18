<template>
  <div class="login-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Iniciar Sesión</h3>
              <form @submit.prevent="login()">
                <div class="form-group">
                  <label for="username">Usuario</label>
                  <input type="text" class="form-control" id="username" v-model="username" required>
                </div>
                <div class="form-group">
                  <label for="password">Contraseña</label>
                  <input type="password" class="form-control" id="password" v-model="password" required>
                </div>

               <!--  <button v-show="!loading" type="submit" class="btn btn-primary btn-block">Iniciar
                  Sesión</button> -->
                  <button type="submit" class="btn btn-primary btn-block">Iniciar
                  Sesión</button>
               <!--  <div v-show="loading" class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                  <span class="sr-only">Loading...</span>
                </div> -->


              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      loading: false

    };

  },


  methods: {

    async login() {

     let payload = {
        name: this.username,
        password: this.password,
        device_name: 'web',
      }
      this.loading = true;
      console.log('THIS ', this.$toast)


       try {
        const resp = await axios.post('http://3.135.246.206/api/login', payload);
        console.log("res Login", resp.data.data);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + resp.data.data.token;

        localStorage.setItem('token', resp.data.data.token)
        localStorage.setItem('user', resp.data.data.user)
        localStorage.setItem('isAuthenticated', "S")


        this.$toast.success(resp.data.message);
        this.$router.push('/dashboard/cliente')
       } catch (err) {
        this.$toast.error("El usuario no existe");
        console.log("err Login", err.message
        );
      } finally {
        this.loading = false;
      }
    }

  }
}
</script>

<style scoped>
.login-page {
  background-image: url('../assets/admin/rutas.webp');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
}

.card {
  border: 12px solid #dee2e600;
}

.card-body {
  padding: 30px;
}
</style>
