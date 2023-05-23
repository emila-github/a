<template>
  <div class="group-buy-item-box">
    <div class="hd">
      <div class="info">
        <div
          class="name"
          :class="item.buy === '卖' ? 'down2' : 'up2'"
        >{{ item.buyLable }}</div>
        <div class="code">{{ timeType === 'day' ? item.time : item.day }}</div>
      </div>
      <!-- <div class="status">{{item.status}}</div> -->
    </div>
    <div class="bd">
      <div class="bd-left">
        <div class="row">
          <div class="row-title">价格</div>
          <div class="row-info">{{ formatPrice(item.price) }}</div>
        </div>
        <div class="row">
          <div class="row-title">数量</div>
          <div class="row-info">{{ item.hand }}</div>
        </div>
      </div>
      <div class="bd-right">
        <div class="row">
          <div class="row-title">金额</div>
          <div class="row-info">{{ item.__j }}</div>
        </div>
        <div class="row">
          <div class="row-title">费用</div>
          <div class="row-info">{{ item.__f }}</div>
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
.group-buy-item-box {
  background-color: #fff;
  color: #b6b4b4;
  display: flex;
  flex-direction: column;
  font-size: 26px;
  font-weight: 500;
  border-top: 2px solid #ebedf0;
  margin: 0;
  .hd {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 15px;
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
      justify-content: flex-end;
      .name {
        color: #545355;
        font-size: 30px;
        font-weight: normal;
      }
      .buy {
        color: #f10606;
      }
      .sell {
        color: #37a75f;
      }
      .code {
        padding-left: 10px;
        flex: 1;
        font-size: 28px;
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
    padding: 20px 15px;

    .bd-left {
      display: flex;
      flex-direction: column;
      width: 50%;
      padding-right: 15px;
      justify-content: flex-start;
    }
    .bd-right {
      display: flex;
      flex-direction: column;
      flex: 1;
      border-left: #e4e4e4 solid 1px;
      padding-left: 15px;
      justify-content: flex-start;
    }
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
.up2 {
  color: #c6504e !important;
}
.down2 {
  color: #55637d !important;
}
</style>
