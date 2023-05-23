<template>
  <div class="history-buy-item-box">
    <div class="hd">
      <div class="info">
        <div
          class="name"
          :class="item.buy === '卖' ? 'sell' : 'buy'"
        >{{ item.__buyLable }}</div>
        <div class="code">{{ timeType === 'day' ? item.time : item.day }}</div>
      </div>
      <!-- <div class="status">{{item.status}}</div> -->
    </div>
    <div class="bd">
      <div class="bd-left">
        <div class="row">
          <span class="row-title">价格</span>
          <span class="row-info">{{ numberToLocaleString(formatPrice(item.price)) }}</span>
        </div>
        <div class="row">
          <span class="row-title">数量</span>
          <span class="row-info">{{ numberToLocaleString(item.hand) }}</span>
        </div>
      </div>
      <div class="bd-right">
        <div class="row">
          <span class="row-title">金额</span>
          <span class="row-info">{{ numberToLocaleString(item.__j) }}</span>
        </div>
        <div class="row">
          <span class="row-title">费用</span>
          <span class="row-info">{{ numberToLocaleString(item.__f) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { numberToLocaleString } from '@/utils/a'
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
    numberToLocaleString,
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
.history-buy-item-box {
  background-color: #fff;
  color: #b6b4b4;
  display: flex;
  flex-direction: column;
  font-size: 26px;
  border-top: 2px solid #ebedf0;
  margin: 0;
  .hd {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 15px 0px;
    position: relative;
    // &:after {
    //   position: absolute;
    //   box-sizing: border-box;
    //   content: ' ';
    //   pointer-events: none;
    //   right: 0;
    //   bottom: 0;
    //   left: 15px;
    //   border-bottom: 2px solid #ebedf0;
    //   -webkit-transform: scaleY(0.5);
    //   transform: scaleY(0.5);
    // }
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
        color: #e44739;
      }
      .sell {
        color: #3c537c;
      }
      .code {
        padding-left: 10px;
        flex: 1;
        font-size: 24px;
      }
    }
    .strtus {
      font-size: 26px;
      color: #222222;
      padding-right: 15px;
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
      // border-left: #e4e4e4 solid 1px;
      padding-left: 15px;
      justify-content: flex-start;
    }
    .row {
      display: flex;
      flex-direction: row;
      // justify-content: space-between;
      padding: 5px 0;
      .row-title {
        color: #7c7c7c;
        padding-right: 30px;
      }
      .row-info {
        color: #282828;
        // text-align: right;
      }
    }
  }
}
</style>
