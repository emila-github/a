import {
  formatDate
} from '@/utils/util'
import sortby from 'lodash.sortby'
/**
			 *JavaScript在处理小数的时候会存在不准确的问题;
			  解决的方法可以是：将小数变为整数来处理。
			  https://www.jb51.net/article/47803.htm 
			*/

/**
 *  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
    Math.max(value1[,value2, ...]) 
    参数：value1, value2, ...一组数值
    返回值:返回给定的一组数字中的最大值。
    如果给定的参数中至少有一个参数无法被转换成数字，则会返回 NaN。
    如果没有参数，则结果为 - Infinity

	Math.pow() 函数返回基数（base）的指数（exponent）次幂;
	Math.pow(base, exponent) 表示base的exponent次方;
	参数:base基数;exponent 指数;
	如果 base 是 2 ，且 exponent 是 7，
	则 Math.pow() 函数返回 128 （2 的 7 次幂）
*/
/**
		 * 加法 
		 * 计算方式：1.先将所有的小数乘为整数；
			        2.待加减运算执行完之后再除去对应的 m 的值，将其变为小数输出;
		 * */
export function accAdd(arg1 = 0, arg2 = 0) {
  var r1, r2, m
  //获取arg1,arg2的小数点后的长度;
  r1 = arg1.toString().split('.')[1] ? arg1.toString().split('.')[1].length : 0
  r2 = arg2.toString().split('.')[1] ? arg2.toString().split('.')[1].length : 0
  // console.log('arg1=', arg1, 'arg2=', arg2, 'r1=', r1, 'r2=', r2, )
  m = Math.pow(10, Math.max(r1, r2))
  /**需要引入其他的方法
   * return m.div(parseFloat(arg1).mul(m)+parseFloat(arg2).mul(m))
   **/
  return (arg1 * m + arg2 * m) / m
}
/**
 * 给Number类型增加一个add方法，调用起来更加方便。
 *
 * */
Number.prototype.add = function (arg) {
  return accAdd(arg, this)
}
/**
 * 减法
 **/
export function accSub(arg1, arg2) {
  return accAdd(arg1, -arg2)
}
/**
 * 乘法
 * */
export function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString()
  m += s1.split('.')[1] ? s1.split('.')[1].length : 0
  m += s2.split('.')[1] ? s2.split('.')[1].length : 0

  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
}
/**
 *  给Number类型增加一个mul方法，调用起来更加方便。
 **/
Number.prototype.mul = function (arg) {
  return accMul(arg, this)
}
/**
 * 除法
 * */
export function accDiv(arg1, arg2) {
  Math.t1 = arg1.toString().split('.')[1] ? arg1.toString().split('.')[1].length : 0
  Math.t2 = arg2.toString().split('.')[1] ? arg2.toString().split('.')[1].length : 0

  Math.r1 = Number(arg1.toString().replace('.', ''))
  Math.r2 = Number(arg2.toString().replace('.', ''))
  return (Math.r1 / Math.r2) * Math.pow(10, Math.t2 - Math.t1)
}
/**
 * 给Number类型增加一个div方法，调用起来更加 方便。
 * */
Number.prototype.div = function (arg) {
  return accDiv(this, arg)
}
/**
 *  toFixed()实现方法可把 Number 四舍五入为指定小数位数的数字。
 * */
// Number.prototype.toFixed = function (len) {
//   var tempNum = 0;
//   var s;
//   var s1 = this + "";
//   var start = s1.indexOf(".");
//   if (s1.substr(start + len + 1, 1) >= 5) {
//     tempNum = 1
//   }
//   var temp = Math.pow(10, len);
//   s = Math.floor(Math.round(this * temp));
//   return s / temp
// };

/**
 * https://blog.csdn.net/luxxxx/article/details/90177682
 */
/**
 * trim() 方法用于删除字符串的头尾空格
 * \s匹配任何不可见字符，包括空格、制表符、换页符等等。
 * 等价于[ \f\n\r\t\v]
 *   \f: 匹配一个换页符。等价于\x0c和\cL。
 *   \n: 匹配一个换行符。等价于\x0a和\cJ。
 *   \r: 匹配一个回车符。等价于\x0d和\cM。
 *   \t: 匹配一个制表符。等价于\x09和\cI。
 *   \v: 匹配一个垂直制表符。等价于\x0b和\cK。
 * */
String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, '')
}

/** 
A股的交易费用包括佣金、印花税、过户费：
佣金：不超过成交金额的千分之三(包括交易所规费)，买卖双向收取，最低5元。实际佣金费率，可以自行查询计算，也可以联系营业部查询；
印花税：成交金额的千分之一，仅卖出收取，买入没有印花税；
过户费：上海A股按照成交金额的十万分之二买卖双向收取。
普通账户交易科创板股票的费用与沪A相同。
*/

const commissionRatio = 0.0003 // 佣金 万分之三
const stampDutyRatio = 0.001 // 印花税 千分之一
const transferFeeRatio = 0.00001 // 印花税 十万分之一
const handDefault = 1000 // 默认成交量
// 佣金 买卖都要支付 万分之三
export function commission(marketvalue = 0, ratio = commissionRatio) {
  let money = accMul(marketvalue, ratio)
  if (money > 5) {
    return money.toFixed(2)
  } else {
    return (5).toFixed(3)
  }
}
// 印花税 卖出支付 千分之一
export function stampDuty(marketvalue = 0, ratio = stampDutyRatio) {
  let money = accMul(marketvalue, ratio)
  return money.toFixed(2)
}
// 过户费 买卖出支付 十万分之一
export function transferFee(marketvalue = 0, ratio = transferFeeRatio) {
  let money = accMul(marketvalue, ratio)
  return money.toFixed(2)
}

// 买入佣金
export function commissionBuy(marketvalue = 0, ratio = commissionRatio) {
  let money = commission(marketvalue, ratio)
  // console.log('买入佣金', money)
  return money
}
// 卖出佣金
export function commissionSell(marketvalue = 0, ratio = commissionRatio) {
  let money = commission(marketvalue, ratio)
  // console.log('卖出佣金', money)
  return money
}
// 卖出印花税
export function stampDutySell(marketvalue = 0, ratio = stampDutyRatio) {
  let money = stampDuty(marketvalue, ratio)
  // console.log('卖出印花税', money)
  return money
}

// 买入过户费
export function transferFeeBuy(marketvalue = 0, ratio = transferFeeRatio) {
  let money = transferFee(marketvalue, ratio)
  // console.log('买入过户费', money)
  return money
}
// 卖出过户费
export function transferFeeSell(marketvalue = 0, ratio = transferFeeRatio) {
  let money = transferFee(marketvalue, ratio)
  // console.log('卖出过户费', money)
  return money
}

// 获取股票市值
export function getMarketvalue(price = 0, hand = handDefault) {
  let money = (price * hand).toFixed(2)
  // console.log('股票市值==', money, price, hand)
  return money
}
// 买入交易费用
export function costBuy(marketvalue = 0) {
  let money = accAdd(commissionBuy(marketvalue), transferFeeBuy(marketvalue)).toFixed(2)
  // console.log('买入交易费用==', money)
  return money
}
// 卖出交易费用
export function costSell(marketvalue = 0) {
  let money = accAdd(
    stampDutySell(marketvalue),
    accAdd(commissionSell(marketvalue), transferFeeSell(marketvalue)),
  ).toFixed(2)
  // console.log('卖出交易费用==', money)
  return money
}
// 买入资金流水(单次操作)
export function capitalFlowBuy(price = 0, hand = handDefault) {
  let marketvalue = getMarketvalue(price, hand)
  let money = accAdd(marketvalue, costBuy(marketvalue)).toFixed(3)
  // console.log('买入资金流水(单次操作)====', money)
  return money
}
// 卖出资金流水(单次操作)
export function capitalFlowSell(price = 0, hand = handDefault) {
  let marketvalue = getMarketvalue(price, hand)
  let money = accSub(marketvalue, costSell(marketvalue)).toFixed(3)
  // console.log('卖出资金流水(单次操作)====', money)
  return money
}

// 盈亏--只有交易完全结束才可以计算
export function income(buy = 0, sell = 0, hand = handDefault) {
  let money = (accSub(capitalFlowSell(sell, hand), capitalFlowBuy(buy, hand))).toFixed(3)
  console.log('income', money)
  return money
}
// 持仓成本
/**
 * saleRecords: 买卖记录列表
 * 有仓位返回持仓成本
 * 清仓后返回买入平均成本
 */
export function holdingCost(saleRecords = []) {
  let holdingPrice = 0
  const step = 0.001
  let capitalFlowCountBuy = 0 // 已买入流水
  let capitalFlowCountSell = 0 // 已卖出流水
  let handCountBuy = 0 // 买入总数量
  let handCountSell = 0 // 卖出总数量
  let holdingHand = 0 // 持仓总数量
  saleRecords.map(item => {
    if (item && item.buy && item.price && item.hand) {
      if (item.buy === '买') {
        capitalFlowCountBuy = accAdd(capitalFlowCountBuy, capitalFlowBuy(item.price, item.hand))
        handCountBuy = accAdd(handCountBuy, item.hand)
      } else if (item.buy === '卖') {
        capitalFlowCountSell = accAdd(capitalFlowCountSell, capitalFlowSell(item.price, item.hand))
        handCountSell = accAdd(handCountSell, item.hand)
      }
    }
    holdingHand = accSub(handCountBuy, handCountSell)
  })
  // console.log('已买入流水', capitalFlowCountBuy, handCountBuy)
  // console.log('已卖出流水', capitalFlowCountSell, handCountSell)
  if (holdingHand === 0) {
    // 都卖完 不存在持仓成本 返回平均成本
    // 成本基准价
    let basePrice = accDiv(capitalFlowCountBuy, handCountBuy).toFixed(3)
    holdingPrice = basePrice
    // console.log('basePrice=', basePrice)
    while (capitalFlowCountBuy >= capitalFlowSell(holdingPrice, handCountBuy)) {
      // console.log('holdingPrice=', holdingPrice)
      holdingPrice = accAdd(holdingPrice, step).toFixed(3)
    }
    return holdingPrice
  } else if (holdingHand > 0) {
    // 有未卖出的仓位
    // 成本基准价
    let basePrice = accDiv(accSub(capitalFlowCountBuy, capitalFlowCountSell), holdingHand).toFixed(3)
    // 成本价
    holdingPrice = basePrice
    // console.log('basePrice=', basePrice)

    while (capitalFlowCountBuy >= accAdd(capitalFlowCountSell, capitalFlowSell(holdingPrice, holdingHand))) {
      holdingPrice = accAdd(holdingPrice, step).toFixed(3)
      // console.log('holdingPrice=', holdingPrice)
    }
    return holdingPrice
  } else {
    // 出错了
    return 0
  }
}

// 持仓参考盈亏
/**
 * saleRecords: 买卖记录列表
 * currentPrice: 当前市价
 * 有仓位返回持仓参考盈亏
 * 清仓后返回实际盈亏
 */
export function holdingReferenceProfitAndLoss(saleRecords = [], currentPrice = 0) {
  let holdingPrice = 0
  const step = 0.001
  let capitalFlowCountBuy = 0 // 已买入流水
  let capitalFlowCountSell = 0 // 已卖出流水
  let handCountBuy = 0 // 买入总数量
  let handCountSell = 0 // 卖出总数量
  let holdingHand = 0 // 持仓总数量
  saleRecords.map(item => {
    if (item && item.buy && item.price && item.hand) {
      if (item.buy === '买') {
        capitalFlowCountBuy = accAdd(capitalFlowCountBuy, capitalFlowBuy(item.price, item.hand))
        handCountBuy = accAdd(handCountBuy, item.hand)
        // console.log('已买入流水累加器', capitalFlowCountBuy, handCountBuy)
      } else if (item.buy === '卖') {
        capitalFlowCountSell = accAdd(capitalFlowCountSell, capitalFlowSell(item.price, item.hand))
        handCountSell = accAdd(handCountSell, item.hand)
        // console.log('已卖出流水累加器', capitalFlowCountBuy, handCountBuy)
      }
    }
    holdingHand = accSub(handCountBuy, handCountSell)
  })
  // console.log('已买入流水', capitalFlowCountBuy, handCountBuy)
  // console.log('已卖出流水', capitalFlowCountSell, handCountSell)
  if (holdingHand === 0) {
    // 都卖完 不存在持仓成本 返回平均成本
    return accSub(capitalFlowCountSell, capitalFlowCountBuy).toFixed(2)
  } else if (holdingHand > 0) {
    // 有未卖出的仓位流水
    let capitalFlowUnSell = capitalFlowSell(currentPrice, holdingHand)
    return accSub(accAdd(capitalFlowUnSell, capitalFlowCountSell), capitalFlowCountBuy).toFixed(2)
  } else {
    // 出错了
    return 0
  }
}
// 持仓参考盈亏率
/**
 * saleRecords: 买卖记录列表
 * currentPrice: 当前市价
 * 有仓位返回持仓参考盈亏
 * 清仓后返回实际盈亏
 */
export function holdingReferenceProfitAndLossRate(saleRecords = [], currentPrice = 0) {
  let holdingPrice = 0
  const step = 0.001
  let capitalFlowCountBuy = 0 // 已买入流水
  let capitalFlowCountSell = 0 // 已卖出流水
  let handCountBuy = 0 // 买入总数量
  let handCountSell = 0 // 卖出总数量
  let holdingHand = 0 // 持仓总数量
  saleRecords.map(item => {
    if (item && item.buy && item.price && item.hand) {
      if (item.buy === '买') {
        capitalFlowCountBuy = accAdd(capitalFlowCountBuy, capitalFlowBuy(item.price, item.hand))
        handCountBuy = accAdd(handCountBuy, item.hand)
        // console.log('已买入流水累加器', capitalFlowCountBuy, handCountBuy)
      } else if (item.buy === '卖') {
        capitalFlowCountSell = accAdd(capitalFlowCountSell, capitalFlowSell(item.price, item.hand))
        handCountSell = accAdd(handCountSell, item.hand)
        // console.log('已卖出流水累加器', capitalFlowCountBuy, handCountBuy)
      }
    }
    holdingHand = accSub(handCountBuy, handCountSell)
  })
  // console.log('已买入流水', capitalFlowCountBuy, handCountBuy)
  // console.log('已卖出流水', capitalFlowCountSell, handCountSell)
  if (holdingHand === 0) {
    // 都卖完 不存在持仓成本 返回平均成本
    let income = accSub(capitalFlowCountSell, capitalFlowCountBuy).toFixed(3)
    return accMul(accDiv(income, capitalFlowCountBuy).toFixed(4), 100).toFixed(2) + '%'
  } else if (holdingHand > 0) {
    // 有未卖出的仓位流水
    let capitalFlowUnSell = capitalFlowSell(currentPrice, holdingHand)
    let income = accSub(accAdd(capitalFlowUnSell, capitalFlowCountSell), capitalFlowCountBuy).toFixed(3)
    return accMul(accDiv(income, capitalFlowCountBuy).toFixed(4), 100).toFixed(2) + '%'
  } else {
    // 出错了
    return 0
  }
}
// 持仓股数
/**
 * saleRecords 买卖记录
 * usable 是否单天可以交易 false:返回持仓数  true:只返回单天可用的持仓数
 */
export function holdingHand(saleRecords = [], usable = false) {
  let currTime = new Date()
  let currTimeStr = formatDate(currTime, 'yyyy-MM-dd')
  let handCountBuy = 0 // 买入总数量
  let handCountSell = 0 // 卖出总数量
  let holdingHand = 0 // 持仓总数量
  let currBuyHand = 0 // 当天买入数量 不能用的
  saleRecords.map(item => {
    if (item && item.buy && item.price && item.hand) {
      if (item.buy === '买') {
        handCountBuy = accAdd(handCountBuy, item.hand)
        if (usable && item.day === currTimeStr) { // 累加单日买入的数量
          currBuyHand = accAdd(currBuyHand, item.hand)
        }
      } else if (item.buy === '卖') {
        handCountSell = accAdd(handCountSell, item.hand)
      }
    }
    holdingHand = accSub(handCountBuy, handCountSell)
  })
  // console.log('currBuyHand', currBuyHand, accSub(holdingHand, currBuyHand))
  if (usable) {
    holdingHand = accSub(holdingHand, currBuyHand)
  }
  return holdingHand


}


// 格式买卖分组数据
export function formatSaleRecordsGroup(SaleRecordsGroup = []) {

  SaleRecordsGroup.map(item => {
    let buyNum = 0 // 买入次数
    let sellNum = 0 // 卖出次数
    const daytime = 1000 * 60 * 60 * 24 // 一天的时间戳
    let list = item.list || []

    item.__holdingCost = holdingCost(list) // 持仓成本
    item.__holdingHand = holdingHand(list) // 持仓总数量
    item.__holdingHandUsable = holdingHand(list, true) // 持仓总数量 - 可用
    item.__incomePrevclose = holdingReferenceProfitAndLoss(list, item.pricePrevclose ? item.pricePrevclose : item.currentPrice) // 持仓参考盈亏 - 昨日收盘
    item.__income = holdingReferenceProfitAndLoss(list, item.currentPrice) // 持仓参考盈亏
    item.__incomeRate = holdingReferenceProfitAndLossRate(list, item.currentPrice) // 持仓参考盈亏率
    item.__marketvalue = getMarketvalue(item.currentPrice, item.__holdingHand) // 市值
    item.__currentPrice = (item.currentPrice).toFixed(3)

    list = sortby(list, listIt => {
      let t = +new Date(listIt.day.replace(/-/g, '/') + ' ' + listIt.time)
      return parseInt(t)
    }).reverse()
    item.__dayStart = list[list.length - 1]['day'] // 建仓日期
    item.__dayEnd = list[0]['day'] //清仓日期
    item.__lastPrice = list[0]['price'] //清仓价格
    item.id = item.type + item.code + '-' + (+new Date(item.__dayStart.replace(/-/g, '/')))

    let tStart = new Date(item.__dayStart).getTime()
    let tEnd = new Date(item.__dayEnd).getTime()
    item.__dayLen = Math.abs(parseInt((tEnd - tStart) / daytime)) + 1 || 1 // 持仓天数

    list.map((listIt, index) => {
      listIt.__t = +new Date(listIt.day.replace(/-/g, '/') + ' ' + listIt.time)
      listIt.id = item.type + item.code + '-' + (+new Date(listIt.day.replace(/-/g, '/') + ' ' + listIt.time))
      if (listIt.buy === '卖') {
        sellNum += 1
        listIt.__buyLable = '卖出'
        if (index === 0 && item.__holdingHand === 0) {
          listIt.__buyLable = '清仓'
        }
      }
      if (listIt.buy === '买') {
        buyNum += 1
        listIt.__buyLable = '买入'
        if (index === list.length - 1) {
          listIt.__buyLable = '建仓'
        }

      }
      let marketvalue = getMarketvalue(listIt.price, listIt.hand)
      listIt.__j = marketvalue //金额
      listIt.__f = listIt.buy === '卖' ? costSell(marketvalue) : costBuy(marketvalue)

      //费用
    })
    item.__buyNum = buyNum
    item.__sellNum = sellNum
  })
  return SaleRecordsGroup
}

// 格式化数字字符串 3位加一逗号
export function numberToLocaleString(numStr) {

  let arr = (numStr + '').split('.')
  let a = parseFloat(arr[0]).toLocaleString()
  let b = arr[1] && arr[1].length ? arr[1] : '00'


  return a + '.' + b
}