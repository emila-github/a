<template>
  <div>
    <van-form>
      <van-field
        v-model="model.buy"
        name="buy"
        label="买入价"
        placeholder="买入价"
        input-align="right"
        type="number"
        clearable
        :rules="[{ required: true, message: '请填写买入价' }]"
      />
      <van-field
        v-model="model.sell"
        name="sell"
        placeholder="卖出价"
        input-align="right"
        type="number"
        clearable
        :rules="[{ required: true, message: '请填写卖出价' }]"
      >
        <template #label>
          卖出价 <van-tag type="success">本 {{ costPriceVal }}</van-tag>
        </template>
      </van-field>

      <van-field
        name="hand"
        label="数量"
        placeholder="数量"
        input-align="right"
        type="digit"
        clearable
        :rules="[{ required: true, message: '请填写数量' }]"
      >
        <template #label>
          <div class="hand-box">
            <span>数量</span>
            <van-tag type="success" size="medium" class="hand-item" @click="qHand(500)">500</van-tag>
            <van-tag type="primary" size="medium" class="hand-item" @click="qHand(1000)">1000</van-tag>
            <van-tag type="danger" size="medium" class="hand-item" @click="qHand(2000)">2000</van-tag>
          </div>
        </template>
        <template #input>
          <van-stepper v-model="model.hand" step="100" />
        </template>
      </van-field>
    </van-form>
    <van-cell-group>
      <van-cell
        title="盈亏"
        :value="incomeVal"
        is-link
        :arrow-direction="incomeValShow ? 'up' : 'down'"
        @click="incomeValShow = !incomeValShow"
      />
      <template v-if="incomeValShow">
        <van-cell title="佣金" :value="commissionBuyVal" :label="`买:${commissionBuyVal} 卖:${commissionSellVal}`" />
        <van-cell title="印花税" :value="stampDutySellVal" :label="`卖:${stampDutySellVal}`" />
        <van-cell title="过户费" :value="transferFeeVal" :label="`买:${transferFeeBuyVal} 卖:${transferFeeSellVal}`" />
      </template>
    </van-cell-group>
  </div>
</template>

<script>
import Vue from 'vue'
import { BuyList } from '../dataConfig'
import pick from 'lodash.pick'
import add from 'lodash.add'
import {
  accAdd,
  accSub,
  accMul,
  holdingCost,
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
} from '@/utils/a'
export default {
  components: {},
  data() {
    return {
      model: {
        buy: null,
        sell: null,
        hand: 1000,
      },
      incomeValShow: false,
    }
  },
  computed: {
    costPriceVal() {
      let { buy = 0, hand = 1000 } = this.model
      return this.holdingCost([
        {
          buy: '买',
          hand,
          price: buy,
        },
      ])
    },
    incomeVal() {
      let { buy = 0, sell = 0, hand = 1000 } = this.model
      return this.income(buy, sell, hand)
    },
    commissionBuyVal() {
      let { buy, hand } = this.model
      return this.commissionBuy(getMarketvalue(buy, hand))
    },
    commissionSellVal() {
      let { sell, hand } = this.model
      return this.commissionSell(getMarketvalue(sell, hand))
    },
    stampDutySellVal() {
      let { sell, hand } = this.model
      return this.stampDutySell(getMarketvalue(sell, hand))
    },
    transferFeeBuyVal() {
      let { buy, hand } = this.model
      return this.transferFeeBuy(getMarketvalue(buy, hand))
    },
    transferFeeSellVal() {
      let { sell, hand } = this.model
      return this.transferFeeSell(getMarketvalue(sell, hand))
    },
    transferFeeVal() {
      return accAdd(this.transferFeeBuyVal, this.transferFeeSellVal)
    },
  },
  watch: {
    'model.buy'() {
      this.setLsCurrPriceModel()
    },
    'model.sell'() {
      this.setLsCurrPriceModel()
    },
    'model.hand'() {
      this.setLsCurrPriceModel()
    },
  },
  methods: {
    holdingCost,
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
    qHand(hand) {
      this.$set(this.model, 'hand', hand)
    },
    setLsCurrPriceModel() {
      Vue.ls.set('currPriceModel', pick(this.model, 'buy', 'sell', 'hand'))
    },
  },

  created() {
    const currPriceModel = Vue.ls.get('currPriceModel') || {}

    this.model = Object.assign({}, this.model, currPriceModel)
  },
}
</script>

<style scoped lang="scss">
.img-01 {
  width: 100%;
}
.hand-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  .hand-item {
    margin-left: 15px;
  }
}
</style>
