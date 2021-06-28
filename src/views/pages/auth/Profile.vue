<template>
  <layout>
    <div class="row">
      <div class="col-4">
        <card>
          <template v-slot:card-body>
            <div>ok</div>
          </template>
        </card>
      </div>
    </div>
  </layout>
</template>
<script>
import Layout from "@/views/pages/Layout.vue";
import Card from "@/components/Card.vue";
export default {
  name: "profile",
  components: {
    Layout,
    Card,
  },
};
</script>