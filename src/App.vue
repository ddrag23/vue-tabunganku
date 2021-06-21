<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
  <navbar></navbar>
  <main class="mt-5 pt-3">
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    Navbar,
    Sidebar,
  },
}
</script>
