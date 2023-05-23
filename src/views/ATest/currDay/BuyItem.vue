<template>
  <div class="buy-item-box">
    <div class="hd">
      <div class="info">
        <div class="name">{{ item.name }}</div>
        <div class="code">{{ item.code }}</div>
      </div>
      <div class="status">{{ item.status }}</div>
    </div>
    <div class="bd">
      <div class="bd-left">
        <div :class="item.buy === '卖' ? 'sell' : 'buy'">{{ item.buy }}</div>
        <div class="time">{{ timeType === 'time' ? item.time : item.day }}</div>
      </div>
      <div class="bd-right">
        <div class="row">
          <div class="row-title">委托信息</div>
          <div class="row-info">{{ formatPrice(item.price) }}/{{ item.hand }}</div>
        </div>
        <div class="row">
          <div class="row-title">成交信息</div>
          <div class="row-info">{{ formatPrice(item.price) }}/{{ item.hand }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    timeType: {
      type: String,
      default: 'time', // time |  day
    },
  },
  methods: {
    formatPrice(val) {
      return val.toFixed(3)
    },
  },

  data() {
    return {}
  },
  computed: {},
}
</script>

<style scoped lang="scss">
.buy-item-box {
  margin-top: 30px;
  background-color: #fff;
  color: #b6b4b4;
  display: flex;
  flex-direction: column;
  font-size: 26px;
  font-weight: 500;
  margin: 20px 0px;
  .hd {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    position: relative;
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0;
      bottom: 0;
      left: 15px;
      border-bottom: 2px solid #ebedf0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    .info {
      display: flex;
      flex-direction: row;
      align-items: center;
      .name {
        color: #545355;
        font-size: 30px;
        font-weight: normal;
      }
      .code {
        padding-left: 10px;
        flex: 1;
        font-size: 30px;
      }
    }
    .strtus {
      font-size: 26px;
      color: #222222;
    }
  }
  .bd {
    display: flex;
    flex-direction: row;
    padding: 15px;
    .bd-left {
      display: flex;
      flex-direction: column;
      width: 25%;
      padding-right: 15px;
      justify-content: center;
      .buy {
        color: #f10606;
      }
      .sell {
        color: #37a75f;
      }
      .time {
      }
    }
    .bd-right {
      display: flex;
      flex-direction: column;
      flex: 1;
      border-left: #e4e4e4 solid 1px;
      padding-left: 15px;
      justify-content: center;
      .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 2px 0;
        .row-title {
        }
        .row-info {
          text-align: right;
        }
      }
    }
  }
}
</style>
