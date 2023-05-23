<template>
  <div>
    <van-tabs
      v-model="active"
      :swipe-threshold="6"
      sticky
    >
      <van-tab
        title="本月"
        name="a"
      ></van-tab>
      <van-tab
        title="近3月"
        name="b"
      ></van-tab>
      <van-tab
        title="近半年"
        name="c"
      ></van-tab>
      <van-tab
        title="近1年"
        name="d"
      >
      </van-tab>
      <van-tab
        title="自定义"
        name="e"
      >

      </van-tab>
    </van-tabs>
    <div class="a-info-box">
      <div class="a-remark">清仓数据更新到上一日</div>
      <div class="a-total">
        <span class="label">实现总盈亏</span>
        <span
          class="val"
          :class="parseFloat(totalIncome) > 0 ? 'up' : 'down'"
        >{{numberToLocaleString(totalIncome)}}</span>
      </div>
      <div class="a-total-other">
        <div class="other-item">
          <span class="label">清仓次数</span>
          <span class="val">{{clearanceNum}}</span>
        </div>
        <div class="other-item">
          <span class="label">选股成功率</span>
          <span class="val">{{successRate}}</span>
        </div>
        <div class="other-item">
          <span class="label">平均持仓天数</span>
          <span class="val">{{averageDayLen}}</span>
        </div>
        <div class="other-item">
          <span class="label">交易股票数量</span>
          <span class="val">{{aNum}}</span>
        </div>
        <div class="other-item">
          <span class="label">最大盈利</span>
          <span
            class="val"
            :class="parseFloat(maxIncome) > 0 ? 'up' : 'down'"
          >{{maxIncome}}</span>
        </div>
        <div class="other-item">
          <span class="label">最大亏损</span>
          <span
            class="val"
            :class="parseFloat(maxUnIncome) > 0 ? 'up' : 'down'"
          >{{maxUnIncome}}</span>
        </div>
      </div>
    </div>

    <div class="holding-box">
      <div class="bd">
        <a-table
          v-if="action01 && action02"
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
          <!-- <span slot="expandedRowRender" slot-scope="record">
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
              <div>{{ record.code }}</div>
            </router-link>
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
              <div>{{ record.__incomeRate }}</div>
            </div>
          </span>
          <span
            slot="__av"
            slot-scope="text, record, index"
          >
            <div
              class="col-box"
              :class="parseFloat(record.__av) > 0 ? 'up' : 'down'"
              :data="record"
              :index="index"
            >

              {{ record.__av ? record.__av + '%' : '-'}}

            </div>
          </span>
        </a-table>

      </div>
    </div>
  </div>

</template>

<script>
import moment from 'moment'
import { formatDate } from '@/utils/util'
import { SaleRecordsGroup } from '../../dataConfig'
import groupby from 'lodash.groupby'
import filter from 'lodash.filter'
import sortby from 'lodash.sortby'
import { getA, getA300 } from '@/api/a'
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
    let currTime = new Date()
    let timeCfg = {
      a: {
        // 本月
        startTime: moment()
          .startOf('month')
          .format('YYYY/MM/DD'),
        endTime: moment()
          .endOf('month')
          .format('YYYY/MM/DD'),
      },
      b: {
        // 近3月
        startTime: moment(currTime)
          .subtract(2, 'months')
          .startOf('month')
          .format('YYYY/MM/DD'),
        endTime: moment(currTime)
          .endOf('month')
          .format('YYYY/MM/DD'),
      },
      c: {
        // 近半年
        startTime: moment(currTime)
          .subtract(5, 'months')
          .startOf('month')
          .format('YYYY/MM/DD'),
        endTime: moment(currTime)
          .endOf('month')
          .format('YYYY/MM/DD'),
      },
      d: {
        // 近1年
        startTime: moment(currTime)
          .subtract(11, 'months')
          .startOf('month')
          .format('YYYY/MM/DD'),
        endTime: moment(currTime)
          .endOf('month')
          .format('YYYY/MM/DD'),
      },
      e: {
        // 近1年
        startTime: moment(currTime)
          .subtract(11, 'months')
          .startOf('month')
          .format('YYYY/MM/DD'),
        endTime: moment(currTime)
          .endOf('month')
          .format('YYYY/MM/DD'),
      },
    }
    return {
      description: '持仓', // 表头
      // 表格滚动配置
      tableScroll: { x: 1500, y: 'calc(100vh - 10px)' },
      saleRecordsGroup: SaleRecordsGroup,
      showMoney: false,
      dataSource: [],
      filteredInfo: null,
      sortedInfo: null,
      a300: [],
      active: 'b',
      queryParam: timeCfg.b,
      timeCfg: timeCfg,
      action01: false,
      action02: false,
    }
  },
  computed: {
    // 清仓次数
    clearanceNum() {
      let dataSource = this.dataSource
      return dataSource.length
    },
    // 交易股票数量
    aNum() {
      let dataSource = this.dataSource
      let num = Object.getOwnPropertyNames(groupby(dataSource, 'code')).length
      return num
    },
    // 平均持仓天数
    averageDayLen() {
      let dataSource = this.dataSource
      let dayLenTotal = 0
      dataSource.map(item => {
        dayLenTotal = dayLenTotal + item.__dayLen
      })
      return accDiv(dayLenTotal, dataSource.length).toFixed(1)
    },
    // 选股成功率
    successRate() {
      let dataSource = this.dataSource
      let success = 0
      dataSource.map(item => {
        if (item.__income > 0) {
          success += 1
        }
      })
      return accMul(accDiv(success, dataSource.length).toFixed(4), 100).toFixed(2) + '%'
    },
    // 最大盈利
    maxIncome() {
      let dataSource = this.dataSource
      let maxIncome = 0
      dataSource.map(item => {
        maxIncome = item.__income > 0 && item.__income > maxIncome ? item.__income : maxIncome
      })
      return maxIncome
    },
    // 最大亏损
    maxUnIncome() {
      let dataSource = this.dataSource
      let maxUnIncome = 0
      dataSource.map(item => {
        maxUnIncome = item.__income < 0 && item.__income < maxUnIncome ? item.__income : maxUnIncome
      })
      return maxUnIncome
    },
    //实现总盈亏
    totalIncome() {
      let dataSource = this.dataSource
      let totalIncome = 0
      dataSource.map(item => {
        totalIncome = accAdd(totalIncome, item.__income)
      })
      return totalIncome.toFixed(2)
    },

    columns() {
      let self = this
      let { sortedInfo, filteredInfo } = this
      sortedInfo = sortedInfo || {}
      filteredInfo = filteredInfo || {}
      const columns = [
        {
          title: '股票名称',
          fixed: 'left',
          align: 'left',
          dataIndex: 'name',
          width: 100,
          scopedSlots: { customRender: 'name' },
          filteredValue: filteredInfo.name || null,
          sorter: (a, b) => {
            return self.superSorter(a, b, 'name')
          },
          sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        },
        {
          title: '区间盈亏',
          align: 'right',
          dataIndex: '__income',
          width: 100,
          scopedSlots: { customRender: '__income' },
          filteredValue: filteredInfo.__income || null,
          sorter: (a, b) => {
            return self.superSorter(a, b, '__income')
          },
          sortOrder: sortedInfo.columnKey === '__income' && sortedInfo.order,
        },
        {
          title: '同期大盘',
          align: 'right',
          dataIndex: '__av',
          width: 100,
          scopedSlots: { customRender: '__av' },
          filteredValue: filteredInfo.__av || null,
          sorter: (a, b) => {
            return self.superSorter(a, b, '__av')
          },
          sortOrder: sortedInfo.columnKey === '__av' && sortedInfo.order,
        },
        {
          title: '持仓天数',
          align: 'right',
          dataIndex: '__dayLen',
          width: 100,
          filteredValue: filteredInfo.__dayLen || null,
          sorter: (a, b) => {
            return self.superSorter(a, b, '__dayLen')
          },
          sortOrder: sortedInfo.columnKey === '__dayLen' && sortedInfo.order,
        },
        {
          title: '清仓日期',
          align: 'right',
          dataIndex: '__dayEnd',
          width: 100,
          filteredValue: filteredInfo.__dayEnd || null,
          sorter: (a, b) => {
            return self.superSorter(a, b, '__dayEnd')
          },
          sortOrder: sortedInfo.columnKey === '__dayEnd' && sortedInfo.order,
        },
        // {
        //   title: '建仓日期',
        //   align: 'right',
        //   dataIndex: '__dayStart',
        //   width: 100,
        //   filteredValue: filteredInfo.__dayStart || null,
        //   sorter: (a, b) => {
        //     return self.superSorter(a, b, '__dayStart')
        //   },
        //   sortOrder: sortedInfo.columnKey === '__dayEnd' && sortedInfo.order,
        // },
        {
          title: '清仓价格',
          align: 'right',
          dataIndex: '__lastPrice',
          width: 100,
        },
        {
          title: '',
          align: 'left',
        },
      ]
      return columns
    },
  },
  watch: {
    async active(val) {
      switch (val) {
        case val: // 本月
          this.queryParam = this.timeCfg[val]
          break
      }
      console.log('this.queryParam', this.queryParam)
      await this.__init()
    },
  },
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
      let { startTime, endTime } = this.queryParam
      let startTimestamp = +new Date(startTime.replace(/-/g, '/'))
      let endTimestamp = +new Date(endTime.replace(/-/g, '/'))
      return filter(dataSource, item => {
        let day = item.list[0].day
        let dayTimestamp = +new Date(day.replace(/-/g, '/'))
        console.log('startTimestamp', startTimestamp, startTime)
        console.log('endTimestamp', endTimestamp, endTime)
        console.log(
          'dayTimestamp====',
          item.name,
          dayTimestamp,
          day,
          item.__holdingHand === 0 &&
            day !== currTimeStr &&
            startTimestamp < dayTimestamp &&
            endTimestamp > dayTimestamp,
        )
        return (
          item.__holdingHand === 0 &&
          day !== currTimeStr &&
          startTimestamp < dayTimestamp &&
          endTimestamp > dayTimestamp
        )
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
      console.log('==========todo updatePrice ssssssssssssssss')

      // console.log('this.saleRecordsGroup====', this.saleRecordsGroup)
      let dataSource = this.formatSaleRecordsGroup(this.saleRecordsGroup) // 计算持仓情况
      dataSource = this.dataSourceFilter(dataSource) // 过滤掉清仓数据
      let codeAndTypeArr = []

      dataSource.map(item => {
        let list = item.list
        codeAndTypeArr.push(item.type + item.code)
      })
      console.log('dataSource===', dataSource, codeAndTypeArr)

      // 获取现有股价
      await getA({ q: codeAndTypeArr.join(',') }).then(res => {
        console.log('getA====', res)
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
        this.action01 = true
        console.log('==========todo updatePrice eeeeeeeeeeeeeeeeeeee')
      })
    },
    async initA300() {
      console.log('==========todo initA300 ssssssssssssssssssss')

      await getA300().then(res => {
        console.log('getA300===', res)
        let a300 = []
        res.data.klines.map(item => {
          let arr = item.split(',')
          a300.push({
            t: arr[0],
            v: arr[8],
          })
        })
        a300 = sortby(a300, item => {
          let t = +new Date(item.t)
          return t
        }) // .reverse()
        // console.log('a300===', a300)
        // this.a300 = a300
        let dataSource = this.dataSource
        dataSource.map(item => {
          let finditem = a300.find(ait => {
            return item.__dayEnd === ait.t
          })
          console.log('finditem===', finditem)
          if (finditem) {
            item.__av = finditem.v
          } else {
            item.__av = '-'
          }
        })

        this.$set(this, 'dataSource', dataSource)
        this.action02 = true
        console.log('dataSource===1', this.dataSource)
        console.log('==========todo initA300 eeeeeeeeeeeeeeeeeeee')
      })
    },
    async __init() {
      await this.updatePrice()
      await this.initA300()
    },
  },

  created() {},
  async mounted() {
    await this.__init()
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
.a-info-box {
  display: flex;
  flex-direction: column;
  font-size: 22px;
  background-color: #fff;
  .a-remark {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    font-size: 18px;
  }
  .a-total {
    display: flex;
    flex-direction: row;
    position: relative;
    height: 60px;
    align-items: center;
    padding: 20px;
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0;
      bottom: 0;
      left: 0px;
      border-bottom: 2px solid #ebedf0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    .label {
      color: #5e5d5d;
      padding-right: 20px;
    }
    .val {
      font-size: 36px;
    }
  }
  .a-total-other {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 20px;
    box-sizing: border-box;

    position: relative;
    .other-item {
      display: flex;
      flex-direction: row;
      flex-basis: 50%;
      padding: 10px 0;

      .label {
        color: #8f8f8f;
        padding-right: 20px;
        font-size: 22px;
      }
      .val {
        color: #000000;
        font-size: 24px;
      }
    }
  }
}
</style>
