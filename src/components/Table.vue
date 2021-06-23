<template>
  <table class="table table-striped table-bordered">
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