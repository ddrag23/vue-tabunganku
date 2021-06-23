<template>
  <div class="card shadow-sm">
    <slot name="card-header"></slot>
    <div class="card-body">
      <slot name="card-body"></slot>
    </div>
    <slot name="card-footer"></slot>
  </div>
</template>