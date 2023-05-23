<template>
  <div class="group-item-box">
    <div class="hd">
      <div class="info" @click="showStatus = !showStatus">
        <div class="name">{{ itemCurr.name }}</div>
        <div class="code">{{ itemCurr.code }}</div>
      </div>
      <div class="status" v-if="showStatus">
        <div>现价:</div>
        <div>
          <van-stepper
            v-model="itemCurr.currentPrice"
            step="0.01"
            min="0.01"
            :decimal-length="2"
            theme="round"
            button-size="22"
            input-width="80px"
          />
        </div>
      </div>
    </div>
    <div class="bd">
      <div class="bd-right" @click="show = !show">
        <div class="row">
          <div class="row-title">现价/成本</div>
          <div class="row-info">{{ itemCurr.__currentPrice }} / {{ itemCurr.__holdingCost }}</div>
        </div>
        <div class="row">
          <div class="row-title">持仓/可用</div>
          <div class="row-info">{{ itemCurr.__holdingHand }} / {{ itemCurr.__holdingHandUsable }}</div>
        </div>
        <div class="row">
          <div class="row-title">参考盈亏/盈亏率</div>
          <div class="row-info" :class="parseFloat(itemCurr.__income) > 0 ? 'up' : 'down'">
            {{ itemCurr.__income }} / {{ itemCurr.__incomeRate }}
          </div>
        </div>
      </div>
      <div v-if="show">
        <BuyItem v-for="item in item.list" :item="item" :key="item.id"></BuyItem>
      </div>
    </div>
  </div>
</template>

<script>
import { holdingReferenceProfitAndLoss, holdingReferenceProfitAndLossRate } from '@/utils/a'
import BuyItem from './BuyItem'
export default {
  components: { BuyItem },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    holdingReferenceProfitAndLoss,
    formatPrice(val) {
      return val.toFixed(3)
    },
  },

  data() {
    return {
      itemCurr: {},
      show: false,
      showStatus: false,
    }
  },
  watch: {
    'itemCurr.currentPrice'(val) {
      this.itemCurr.__income = holdingReferenceProfitAndLoss(this.item.list, val)
      this.itemCurr.__incomeRate = holdingReferenceProfitAndLossRate(this.item.list, val)
      this.itemCurr.__currentPrice = parseFloat(val).toFixed(3)
    },
  },
  computed: {},
  created() {},
  mounted() {
    // console.log('item=', this.item)
    this.itemCurr = this.item
  },
}
</script>

<style scoped lang="scss">
.up {
  color: #f10606;
}
.down {
  color: #37a75f;
}
.group-item-box {
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
      width: 50%;
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
    .status {
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
      // border-left: #e4e4e4 solid 1px;
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
