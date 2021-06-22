<template>
  <navbar></navbar>
  <main class="mt-5 pt-3">
    <div class="container-fluid">
      <slot></slot>
    </div>
  </main>
</template>
<script>
import Navbar from "../../components/Navbar.vue";
export default {
  name: "Layout",
  components: {
    Navbar,
  },
};
</script>
