<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Card",
  props: ["data"],
  setup(props) {
    const activeDay = new Date()
      .toLocaleDateString("en-EN", { weekday: "long" })
      .toLowerCase()
      .slice(0, 3);

    const getActiveDay = (day: string) => {
      return activeDay === day;
    };

    const scale = computed(() => {
      return props.data?.reduce(
        (
          acc: number,
          curr: { amount: any },
          idx: number,
          arr: string | any[]
        ) => {
          acc += curr?.amount ?? 0;

          if (idx === arr.length - 1) {
            acc /= arr.length;
          }

          return acc;
        },
        0
      );
    });

    const getTotalAmounts = () => {
      return props.data.reduce(
        (
          total: number,
          item: {
            day: string;
            amount: number;
          }
        ) => total + item.amount,
        0
      );
    };

    return {
      scale: scale,
      getActiveDay,
      getTotalAmounts,
    };
  },
});
</script>

<template>
  <article class="card">
    <div class="card-title">
      <h1>Spending - Last 7 days</h1>
    </div>
    <div class="card-content">
      <div class="days" v-for="exp in data" :key="exp">
        <div class="bar-container">
          <div
            class="bar"
            :class="{ active: getActiveDay(exp.day) }"
            :style="{
              height: `${(exp.amount / scale) * 7}rem`,
            }"
          >
            <span class="tooltip">${{ exp.amount }}</span>
          </div>
        </div>
        <span>{{ exp.day }}</span>
      </div>
    </div>
    <div class="separator" />
    <div class="card-footer">
      <div class="card-footer-title">
        <h4>Total this month</h4>
        <h1>${{ getTotalAmounts() }}</h1>
      </div>
      <div class="card-footer-percentage">
        <p class="percentage">+2.4%</p>
        <p class="from">from last month</p>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/colors.scss";

@media screen and (max-width: 500px) {
  article {
    width: 75% !important;
    padding-bottom: 1.5em;
  }
  .bar {
    border-radius: 3px !important;
    width: 33px !important;
  }
}
article {
  background: $white;
  width: 510px;
  height: 511px;
  padding-inline: 2rem;
  border-radius: 20px;
  margin: 1.5rem 0;
  .card-title {
    h1 {
      font-size: 32px;
      font-weight: bold;
      color: $dark-brown;
      margin: 2rem 0;
    }
  }
  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 3rem;

    .bar {
      position: relative;
      border-radius: 0.5rem;
      width: 50.36px;
      background: #ec775f;
      cursor: pointer;

      &.active {
        background: $cyan;
      }

      &:hover {
        background: rgba($red, 0.75);
        &.active {
          background: rgba($cyan, 0.75);
        }
        .tooltip {
          visibility: visible;
        }
      }

      .tooltip {
        font-size: 1.125rem;
        font-weight: 700;
        visibility: hidden;
        padding: 0.5rem;
        color: #fff;
        background: #382314;
        min-width: fit-content;
        width: 100%;
        height: 2rem;
        position: absolute;
        top: -3.5rem;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 0.5rem;
        z-index: 10;
        text-align: center;
        display: flex;
        align-items: center;
      }
    }

    .label {
      color: $medium-brown;
      text-align: center;
    }
    .days {
      text-align: center;

      span {
        color: $medium-brown;
      }
    }
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-footer-title {
    h4 {
      color: $medium-brown;
      font-weight: 400;
    }
    h1 {
      font-size: 48px;
      color: $dark-brown;
    }
  }
  .card-footer-percentage {
    .percentage {
      color: $dark-brown;
      font-size: 18px;
      font-weight: bold;
      text-align: right;
    }
    .from {
      color: $medium-brown;
    }
  }
  .separator {
    margin: 2rem 0;
    background: #f8e9dd;
    width: 100%;
    height: 2px !important;
  }
}
</style>
