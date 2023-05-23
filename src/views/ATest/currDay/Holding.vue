<template>
  <div>
    <div class="holding-box">
      <div class="hd">
        <div class="bd-left">
          <span class="name">人民币总资产</span>
          <template v-if="showMoney">
            <span class="code">{{ numberToLocaleString(totalAssets) }}</span>
            <van-icon
              name="eye"
              color="#ee0a24"
              size="16"
              @click="showMoney = !showMoney"
            />
          </template>
          <template v-if="!showMoney">
            <span class="code">****</span>
            <van-icon
              name="closed-eye"
              color="#ee0a24"
              size="16"
              @click="showMoney = !showMoney"
            />
          </template>
        </div>
        <div class="bd-right"></div>
      </div>
      <div
        class="bd"
        v-if="showMoney"
      >
        <div class="money-box">
          <div class="money-item">
            <div class="title">总市值
              <van-icon name="question-o" />
            </div>
            <div class="content">{{ numberToLocaleString(totalMarketvalue) }}</div>
          </div>
          <div class="money-item">
            <div class="title">持仓参考盈亏</div>
            <div
              class="content"
              :class="parseFloat(totalIncome) > 0 ? 'up' : 'down'"
            >
              {{ numberToLocaleString(totalIncome) }}
            </div>
          </div>
          <div class="money-item">
            <div class="title">当日参考盈亏
              <van-icon name="question-o" />
            </div>
            <div
              class="content"
              :class="parseFloat(totalCurrDayIncome) > 0 ? 'up' : 'down'"
            >
              {{ numberToLocaleString(totalCurrDayIncome) }}
            </div>
          </div>
          <div class="money-item">
            <div class="title">仓位
              <van-icon name="question-o" />
            </div>
            <div class="content">{{ positionRate }}</div>
          </div>
          <div class="money-item">
            <div class="title">
              可用 <van-tag
                color="#fd7b43"
                plain
                style="font-size:9px; margin-left:5px;"
              >国债></van-tag>
            </div>
            <div class="content">{{ numberToLocaleString(totalAssetsUsable) }}</div>
          </div>
          <div class="money-item">
            <div class="title">
              可取<van-tag
                color="#fd7b43"
                plain
                style="font-size:9px; margin-left:5px;"
              >转账></van-tag>
            </div>
            <div class="content">{{ numberToLocaleString(totalAssetsUsable) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tab-point-box">
      <div class="tab-point-group">
        <div class="tab-point-item curr"></div>
        <div class="tab-point-item"></div>
        <div class="tab-point-item"></div>
      </div>
    </div>
    <div class="holding-box">
      <div class="hd">
        <div class="bd-left">
          <span class="name">我的持仓</span>
          <van-icon
            name="wap-nav"
            color="#1989fa"
            size="16"
          />
        </div>
        <div class="bd-right"></div>
      </div>
      <div class="bd">
        <a-table
          ref="table"
          size="middle"
          class="mobile-ant-table"
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          :scroll="tableScroll"
          @change="handleTableChange"
        >
          <!-- <span
            slot="expandedRowRender"
            slot-scope="record"
          >
            <div class="expand-row">
              <div class="expand-item">
                {{ record.name }}
              </div>
            </div>
          </span> -->

          <span
            slot="name"
            slot-scope="text, record, index"
          >
            <router-link
              :to="{ name: 'ATestCurrDayHistoryDetail', params: { datas: record } }"
              class="col-box"
              :data="record"
              :index="index"
            >
              <div>{{ record.name }}</div>
              <!-- <div>
            {{ record.__marketvalue }}
          </div> -->
              <div>
                {{
                  parseFloat(record.__marketvalue.split('.')[0]).toLocaleString() +
                    '.' +
                    record.__marketvalue.split('.')[1]
                }}
              </div>
            </router-link>
          </span>
          <span
            slot="__holdingHand"
            slot-scope="text, record, index"
          >
            <div
              class="col-box"
              :data="record"
              :index="index"
            >
              <div>{{ record.__holdingHand.toLocaleString() }}</div>
              <div>{{ record.__holdingHandUsable.toLocaleString() }}</div>
            </div>
          </span>
          <span
            slot="__currentPrice"
            slot-scope="text, record, index"
          >
            <div
              class="col-box"
              :data="record"
              :index="index"
            >
              <div>{{ record.__currentPrice }}</div>
              <div>{{ record.__holdingHand!==0 ? record.__holdingCost : '0.000' }}</div>
            </div>
          </span>
          <span
            slot="__income"
            slot-scope="text, record, index"
          >
            <div
              class="col-box"
              :class="parseFloat(record.__income) > 0 ? 'up' : 'down'"
              :data="record"
              :index="index"
            >
              <div>
                {{ parseFloat(record.__income.split('.')[0]).toLocaleString() + '.' + record.__income.split('.')[1] }}
              </div>
              <div>{{ record.__holdingHand!==0 ? record.__incomeRate : '0.00%' }}</div>
            </div>
          </span>
        </a-table>

      </div>
    </div>

    <div class="history-menu">
      <div class="item">
        <router-link :to="{ name: 'ATestCurrDayHistory'}">查看清仓股票</router-link>
      </div>
      <div class="item left">查看国债持仓</div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/util'
import { SaleRecordsGroup } from '../dataConfig'
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
  components: {},
  data() {
    return {
      description: '持仓', // 表头
      // 表格滚动配置
      tableScroll: { x: 1500, y: 'calc(100vh - 10px)' },
      saleRecordsGroup: SaleRecordsGroup,
      showMoney: false,
      dataSource: [],
      filteredInfo: null,
      sortedInfo: null,
    }
  },
  computed: {
    // 可用 可取
    totalAssetsUsable() {
      return accSub(this.totalAssets, this.totalMarketvalue).toFixed(2)
    },
    // 仓位
    positionRate() {
      return accMul(accDiv(this.totalMarketvalue, this.totalAssets).toFixed(4), 100).toFixed(2) + '%'
    },

    //总资产
    totalAssets() {
      let totalAssets = 300000 + 15432.45 //总资产
      return (totalAssets = accAdd(totalAssets, this.totalIncome)).toFixed(2)
    },
    //当日参考盈亏
    totalCurrDayIncome() {
      let dataSource = this.dataSource
      let totalCurrDayIncome = 0
      dataSource.map(item => {
        totalCurrDayIncome = accAdd(totalCurrDayIncome, item.__incomePrevclose)
      })
      let money = accSub(this.totalIncome, totalCurrDayIncome).toFixed(2)
      return money
    },
    //持仓参考盈亏
    totalIncome() {
      let dataSource = this.dataSource
      let totalIncome = 0
      dataSource.map(item => {
        totalIncome = accAdd(totalIncome, item.__income)
      })
      return totalIncome.toFixed(2)
    },
    //总市值
    totalMarketvalue() {
      let dataSource = this.dataSource
      let totalMarketvalue = 0
      dataSource.map(item => {
        totalMarketvalue = accAdd(totalMarketvalue, item.__marketvalue)
      })

      return totalMarketvalue
    },
    columns() {
      let self = this
      let { sortedInfo, filteredInfo } = this
      sortedInfo = sortedInfo || {}
      filteredInfo = filteredInfo || {}
      const columns = [
        {
          title: '证券/市值',
          fixed: 'left',
          align: 'left',
          dataIndex: 'name',
          width: 95,
          scopedSlots: { customRender: 'name' },
          filteredValue: filteredInfo.name || null,
          sorter: (a, b) => {
            return self.superSorter(a, b, 'name')
          },
          sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        },
        {
          title: '持仓/可用',
          align: 'right',
          dataIndex: '__holdingHand',
          width: 95,
          scopedSlots: { customRender: '__holdingHand' },
          filteredValue: filteredInfo.__holdingHand || null,
          sorter: (a, b) => {
            return self.superSorter(a, b, '__holdingHand')
          },
          sortOrder: sortedInfo.columnKey === '__holdingHand' && sortedInfo.order,
        },
        {
          title: '现价/成本',
          align: 'right',
          dataIndex: '__currentPrice',
          width: 95,
          scopedSlots: { customRender: '__currentPrice' },
          filteredValue: filteredInfo.__currentPrice || null,
          sorter: (a, b) => {
            return self.superSorter(a, b, '__currentPrice')
          },
          sortOrder: sortedInfo.columnKey === '__currentPrice' && sortedInfo.order,
        },
        {
          title: '持仓参考盈亏',
          align: 'right',
          dataIndex: '__income',
          width: 120,
          scopedSlots: { customRender: '__income' },
          filteredValue: filteredInfo.__income || null,
          sorter: (a, b) => {
            return self.superSorter(a, b, '__income')
          },
          sortOrder: sortedInfo.columnKey === '__income' && sortedInfo.order,
        },
        {
          title: '证券代码',
          align: 'center',
          dataIndex: 'code',
          width: 80,
        },
        {
          title: '',
          align: 'left',
        },
      ]
      return columns
    },
  },
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
      let currTime = new Date()
      let currTimeStr = formatDate(currTime, 'yyyy-MM-dd')
      return filter(dataSource, item => {
        return item.__holdingHand > 0 || (item.__holdingHand === 0 && item.list[0].day === currTimeStr)
      })
    },
    // 百分比排序
    percentSorter(a, b, key) {
      a['__' + key] = +a[key].replace('%', '')
      b['__' + key] = +b[key].replace('%', '')
      return this.superSorter(a, b, '__' + key)
    },
    // 锁定统计行 其他行排序
    superSorter(a, b, key) {
      return a[key] - b[key]
    },
    handleTableChange(pagination, filters, sorter) {
      console.log('Various parameters', pagination, filters, sorter)
      this.filteredInfo = filters
      this.sortedInfo = sorter
    },
    // 更新市值 codeAndTypeStr 例:'sz000001,sh600556'
    async updatePrice(codeAndTypeStr) {
      console.log('this.saleRecordsGroup====', this.saleRecordsGroup)
      let dataSource = this.formatSaleRecordsGroup(this.saleRecordsGroup) // 计算持仓情况
      dataSource = this.dataSourceFilter(dataSource) // 过滤掉清仓数据
      let codeAndTypeArr = []
      dataSource.map(item => {
        codeAndTypeArr.push(item.type + item.code)
      })
      console.log('dataSource===', dataSource, codeAndTypeArr)
      // 获取现有股价
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
              price: parseFloat(attrs[3]), // 现价
              pricePrevclose: parseFloat(attrs[4]), // 昨收
              priceOpen: parseFloat(attrs[5]), // 今开
            })

            dataSource.map(item => {
              if (item.code === attrs[2]) {
                item.currentPrice = parseFloat(attrs[3]) // 现价
                item.pricePrevclose = parseFloat(attrs[4]) // 昨收
                item.priceOpen = parseFloat(attrs[5]) // 今开
              }
            })
          }
        })
        dataSource = this.formatSaleRecordsGroup(dataSource) // 根据现价重新计算相关属性
        this.$set(this, 'dataSource', dataSource)
        console.log(gArr, this.dataSource)
      })
    },
  },

  created() {},
  async mounted() {
    await this.updatePrice()
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
  color: rgba(0, 0, 0, 0.651);
}
.up {
  color: #f10606 !important;
}
.down {
  color: #37a75f !important;
}

.history-menu {
  display: flex;
  flex-direction: row;
  padding: 30px 0;
  .item {
    width: 50%;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 28px;
    color: #1989fa;
    &.left {
      border-left: #e4e4e4 solid 1px;
    }
  }
}
</style>
