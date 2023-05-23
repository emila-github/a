<template>
  <div>
    <!-- {{ holdingReferenceProfitAndLoss(saleRecords, 7.13) }} -->
    <template v-if="dataSource && dataSource.length">
      <GroupItem v-for="item in dataSource" :item="item" :key="item.id"></GroupItem>
    </template>
  </div>
</template>

<script>
import Vue from 'vue'
import { SaleRecordsGroup } from '../dataConfig'
import pick from 'lodash.pick'
import groupby from 'lodash.groupby'
import filter from 'lodash.filter'
import add from 'lodash.add'
import GroupItem from './GroupItem'
import { getA } from '@/api/a'
import {
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
    GroupItem,
  },
  data() {
    return {
      model: {
        buy: null,
        sell: null,
        hand: 1000,
      },
      saleRecordsGroup: SaleRecordsGroup,
      incomeValShow: false,
      dataSource: [],
    }
  },
  computed: {
    // currSaleRecordsGroup() {
    //   let codeAndTypeArr = []
    //   this.saleRecordsGroup.map(item => {
    //     codeAndTypeArr.push(item.type + item.code)
    //   })
    //   this.updatePrice(codeAndTypeArr.join(','))
    //   return this.formatSaleRecordsGroup(this.saleRecordsGroup)
    // },
  },
  watch: {},
  methods: {
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

    // 更新市值 codeAndTypeStr 例:'sz000001,sh600556'
    async updatePrice(codeAndTypeStr) {
      let dataSource = this.formatSaleRecordsGroup(this.saleRecordsGroup)
      let codeAndTypeArr = []
      dataSource.map(item => {
        codeAndTypeArr.push(item.type + item.code)
      })
      await getA({ q: codeAndTypeArr.join(',') }).then(res => {
        // console.log('getA====', res)
        // let j = eval(res)
        let rs = res.split(/;\s/g)
        let gArr = []
        rs.map(item => {
          let g = item.split('=')
          let __key = g[0]
          let __attrs = g[1]
          if (__key && __attrs) {
            let attrs = __attrs.split('~')
            gArr.push({
              key: __key,
              name: attrs[1],
              code: attrs[2],
              price: parseFloat(attrs[3]),
            })

            dataSource.map(item => {
              if (item.code === attrs[2]) {
                item.currentPrice = parseFloat(attrs[3])
              }
            })
          }
        })

        this.$set(this, 'dataSource', this.dataSourceFilter(dataSource))
        // console.log(gArr, this.dataSource)
      })
    },
  },

  created() {},
  async mounted() {
    await this.updatePrice()
  },
}
</script>

<style scoped lang="scss"></style>
