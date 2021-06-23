<template>
  <table class="table table-striped">
    <thead>
      <slot name="thead"></slot>
    </thead>
    <tbody>
      <slot name="tbody"></slot>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "VueTable",
};
</script>