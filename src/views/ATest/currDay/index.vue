<template>
  <div>
    <van-tabs v-model="active" :swipe-threshold="6" sticky>
      <van-tab title="买入"></van-tab>
      <van-tab title="卖出"></van-tab>
      <van-tab title="撤单"></van-tab>
      <van-tab title="委托">
        <van-tabs type="card" style="padding:15px 0; margin-bottom:200px;">
          <van-tab title="当日委托" style="margin-top:15px;">
            <Entrust></Entrust>
          </van-tab>
          <van-tab title="当日成交" style="margin-top:15px;">
            <Entrust></Entrust>
          </van-tab>
        </van-tabs>
      </van-tab>
      <van-tab title="持仓">
        <!-- <computerSaleRecords></computerSaleRecords> -->
        <Holding v-if="active === 4"></Holding>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { SaleRecordsGroup } from '../dataConfig'
// import computerSaleRecords from '../computerSaleRecords/index'
import Holding from './Holding'
import Entrust from './Entrust'

export default {
  components: {
    Holding,
    Entrust,
  },
  data() {
    return {
      active: 4,
    }
  },
  computed: {},
  methods: {},
  mounted() {},
}
</script>

<style scoped lang="scss">
.img-01 {
  width: 100%;
}
</style>
