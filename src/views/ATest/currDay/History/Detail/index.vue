<template>
  <div>
    <div class="detail-box">
      <div class="base-info">{{detail.name}} {{detail.code}}</div>
      <div class="time-info">持仓时间: {{detail.__dayStart}}~{{detail.__dayEnd}}</div>
      <div class="income-info">
        <div class="income-inbo-item">
          <div
            class="val"
            :class="parseFloat(detail.__income) > 0 ? 'up' : 'down'"
          >{{numberToLocaleString(detail.__income)}}</div>
          <div class="label">盈亏金额</div>
        </div>
        <div class="income-inbo-item">
          <div
            class="val"
            :class="parseFloat(detail.__income) > 0 ? 'up' : 'down'"
          >{{detail.__incomeRate}}</div>
          <div class="label">盈亏率</div>
        </div>
      </div>
      <div class="holding-info">持仓{{detail.__dayLen}}天, 买入{{detail.__buyNum}}次, 卖出{{detail.__sellNum}}次</div>
    </div>
    <div class="holding-box">
      <div class="hd">
        <div class="bd-left">
          <span class="name">交易记录</span>

        </div>
        <div class="bd-right">历史清仓记录></div>
      </div>
      <div class="bd">
        <BuyItem
          v-for="item in detail.list"
          :key="item.id"
          :item="item"
        ></BuyItem>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import pick from 'lodash.pick'
import groupby from 'lodash.groupby'
import filter from 'lodash.filter'
import BuyItem from './BuyItem'
// import { getA } from '@/api/a'
import {
  numberToLocaleString,
  accAdd,
  accSub,
  accMul,
  holdingCost,
  holdingHand,
  holdingReferenceProfitAndLoss,
  commission,
  stampDuty,
  transferFee,
  commissionBuy,
  commissionSell,
  stampDutySell,
  transferFeeBuy,
  transferFeeSell,
  getMarketvalue,
  costBuy,
  costSell,
  capitalFlowBuy,
  capitalFlowSell,
  income,
  formatSaleRecordsGroup,
} from '@/utils/a'
export default {
  components: {
    BuyItem,
  },
  data() {
    return {
      detail: {},
    }
  },
  computed: {},
  watch: {},
  methods: {
    numberToLocaleString,
    holdingCost,
    holdingHand,
    holdingReferenceProfitAndLoss,
    commission,
    stampDuty,
    transferFee,
    commissionBuy,
    commissionSell,
    stampDutySell,
    transferFeeBuy,
    transferFeeSell,
    getMarketvalue,
    costBuy,
    costSell,
    capitalFlowBuy,
    capitalFlowSell,
    income,
    formatSaleRecordsGroup,
  },

  created() {},
  mounted() {
    // console.log('this.$route', this.$route)
    const { params } = this.$route
    const { datas } = params
    const currhistoryDetail = Vue.ls.get('currhistoryDetail') || {}
    this.detail = datas
    if (datas && datas.code) {
      Vue.ls.set('currhistoryDetail', this.detail)
    } else {
      this.detail = currhistoryDetail
    }
    // console.log('detail', this.detail)
  },
}
</script>

<style scoped lang="scss">
.detail-box {
  background-color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size: 24px;
  overflow: visible;
  .base-info {
    color: #000;
    // background-color: #eeeded;
    padding-top: 10px;
  }
  .time-info {
    padding: 30px 0;
  }
  .income-info {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .income-inbo-item {
      display: flex;
      flex-direction: column;
      flex-basis: 50%;
      line-height: 60px;
      box-sizing: border-box;
      .val {
        font-size: 38px;
      }
      .label {
        color: #8f8f8f;
      }
    }
  }
  .holding-info {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: #000;
    position: relative;
    height: 80px;
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0;
      top: 0;
      left: 0px;
      border-top: 2px solid #ebedf0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
}
.holding-box {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-top: 20px;
  .hd {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px;

    .bd-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 70%;
      .name {
        color: #686868;
        font-size: 26px;
        font-weight: 500;
      }
      .code {
        color: #545355;
        padding-left: 20px;
        padding-right: 20px;
        font-size: 30px;
        font-weight: 500;
      }
    }
    .bd-right {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      flex: 1;
      font-size: 26px;
      color: #adadad;
    }
  }
  .bd {
    display: flex;
    flex-direction: column;
    position: relative;
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0;
      top: 0;
      left: 0px;
      border-top: 2px solid #ebedf0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
}
.up {
  color: #f10606 !important;
}
.down {
  color: #37a75f !important;
}
</style>
