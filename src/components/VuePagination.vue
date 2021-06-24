<style scoped>
.hidden {
  display: none;
}
</style>
<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <!-- {{
        paginate
      }} -->
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          @click.prevent="changePage(paginate.current_page - 1)"
          :class="{ hidden: paginate.current_page === 1 }"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{ active: paginate.current_page === p }"
        v-for="p in paginate.last_page"
        :key="p"
      >
        <a class="page-link" href="#" @click.prevent="changePage(p)">{{ p }}</a>
      </li>
      <li class="page-item">
        <a
          class="page-link"
          :class="{ hidden: paginate.current_page === paginate.last_page }"
          @click.prevent="changePage(paginate.current_page + 1)"
          href="#"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "Pagination",
  props: ["paginate"],
  methods: {
    changePage(page) {
      this.$emit("pagination", page);
    },
  },
};
</script>