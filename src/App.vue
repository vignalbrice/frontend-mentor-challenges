<script lang="ts">
import Header from "./components/molecules/Header/Header.vue";
import Card from "./components/atoms/Card/Card.vue";
import { useExpensesStore } from "./stores/expenses";
import { computed, onMounted } from "vue";

export default {
  components: { Header, Card },
  setup() {
    const expensesStore = useExpensesStore();
    onMounted(() => {
      expensesStore.fetchExpenses();
    });
    const expenses = computed(() => {
      return expensesStore.expenses;
    });
    return { expenses };
  },
};
</script>

<template>
  <main>
    <Header />
    <Card :data="expenses" />
    <footer class="attribution">
      Challenge by
      <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
        >Frontend Mentor</a
      >. Coded by <a href="https://github.com/vignalbrice">Vignal Brice</a>.
    </footer>
  </main>
</template>

<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/colors.scss";
* {
  margin: 0;
}
body {
  background: $cream-bg;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.attribution {
  font-size: 11px;
  text-align: center;
}
.attribution a {
  color: hsl(228, 45%, 44%);
}
</style>
