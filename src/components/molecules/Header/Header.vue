<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Header",
  setup() {
    const balance = ref<number>(921.48);

    return {
      balance,
    };
  },
});
</script>

<template>
  <header>
    <div class="balance">
      <h3 class="balance-title">My balance</h3>
      <h1 class="balance-price">${{ balance }}</h1>
    </div>
    <div class="logo">
      <img src="@/assets/images/logo.svg" alt="" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/colors.scss";
@media screen and (max-width: 500px) {
  header {
    width: 80% !important;
  }
}
header {
  width: 520px;
  height: 125px;
  background: $red;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1.5rem;
  h3 {
    font-size: 18px;
    font-weight: 400;
    color: $white;
  }
  h1 {
    font-size: 32px;
    font-weight: bold;
    color: $white;
  }
}
</style>
