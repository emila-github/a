<template>
  <div>
    <template v-for="item in list">
      <BuyItem
        :item="item"
        :key="item.id"
        timeType="time"
      ></BuyItem>
    </template>
  </div>
</template>

<script>
import { formatDate } from '@/utils/util'
import { SaleRecordsGroup } from '../dataConfig'
import BuyItem from './BuyItem'
import sortby from 'lodash.sortby'
import filter from 'lodash.filter'
import { getA } from '@/api/a'
import {
  numberToLocaleString,
  accAdd,
  accSub,
  accMul,
  accDiv,
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
  mixins: [],
  components: {
    BuyItem,
  },
  data() {
    return {
      description: '委托', // 表头
      list: [],
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
    dataSourceFilter(dataSource) {
      return filter(dataSource, item => {
        return item.__holdingHand > 0
      })
    },
  },

  created() {},
  mounted() {
    let list = []
    let currTime = new Date()
    let currTimeStr = formatDate(currTime, 'yyyy-MM-dd')
    SaleRecordsGroup.map(item => {
      list = [...list, ...item.list]
    })

    list = sortby(list, item => {
      let t = +new Date(item.day.replace(/-/g, '/') + item.time)
      return t
    }) // .reverse()

    list = filter(list, item => {
      return item.day === currTimeStr
    })
    console.log(list)
    this.$set(this, 'list', list)
  },
}
</script>

<style lang="scss" scoped>
.tab-point-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  .tab-point-group {
    display: flex;
    flex-direction: row;
    .tab-point-item {
      border-radius: 50%;
      width: 10px;
      height: 10px;
      display: flex;
      overflow: hidden;
      margin: 0 10px;
      background-color: #b4b4b4;
      &.curr {
        background-color: #ff1e00;
      }
    }
  }
}
.money-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  .money-item {
    position: relative;
    box-sizing: border-box;
    flex-basis: 33.33%;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    padding: 20px 20px 10px;
    line-height: 40px;
    color: #8b8b8b;
    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .content {
      color: #000;
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
        color: #8b8b8b;
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
      color: #222222;
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
.col-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  line-height: 46px;
}
.up {
  color: #f10606 !important;
}
.down {
  color: #37a75f !important;
}
</style>
