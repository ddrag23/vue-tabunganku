<template>
  <div class="card shadow-sm" :class="bgCard">
    <slot name="card-header"></slot>
    <div class="card-body">
      <slot name="card-body"></slot>
    </div>
    <slot name="card-footer"></slot>
  </div>
</template>
<script>
export default {
  props: {
    bg_card: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const bgCard = props.bg_card;
    return {
      bgCard,
    };
  },
};
</script>
