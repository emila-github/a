// 数据配置

// 是否
export const YN_FLAG = [{
    id: 'Y',
    name: '是',
  },
  {
    id: 'N',
    name: '否',
  },
]
// 是否
export const TF_FLAG = [{
    id: 1,
    name: '是',
  },
  {
    id: 0,
    name: '否',
  },
]

// 车行类型
export const CAR_SHOP_TYPE = [{
    id: 'SHOP_4S',
    name: '4S店',
  },
  {
    id: 'LEVEL_2',
    name: '二级车行',
  },
  {
    id: 'SECOND_HAND',
    name: '二手车行',
  },
  {
    id: 'REPAIR_SHOP',
    name: '修理厂',
  },
]

// 计算机号状态
export const CALC_BOOK_TYPE = [{
    id: 'DOING',
    name: '编辑中',
    tag: 'primary',
  },
  {
    id: 'DONE',
    name: '完成',
    tag: 'success',
  },
  {
    id: 'BACK',
    name: '退回',
    tag: 'danger',
  },
  {
    id: 'CLOSE',
    name: '关闭',
    tag: 'warning',
  },
]
// 任务状态
export const TASK_INFO_TYPE = [{
    id: 'DOING',
    name: '编辑中',
    tag: 'primary',
  },
  {
    id: 'DONE',
    name: '完成',
    tag: 'success',
  },
  {
    id: 'BACK',
    name: '退回',
    tag: 'danger',
  },
  {
    id: 'CLOSE',
    name: '关闭',
    tag: 'warning',
  },
  // {
  //   id: 'COMMITTED',
  //   name: '已提交',
  //   tag: 'success',
  // },
]
// 发票状态
export const INVOICE_STATUS = [{
    id: 'DOING',
    name: '编辑中',
    tag: 'primary',
  },
  {
    id: 'DONE',
    name: '完成',
    tag: 'success',
  },
  {
    id: 'BACK',
    name: '退回',
    tag: 'danger',
  },
  {
    id: 'CLOSE',
    name: '关闭',
    tag: 'warning',
  },
  {
    id: 'PASSED',
    name: '复核通过', // '核验通过',
    tag: 'success',
  },
  {
    id: 'FAILED',
    name: '系统验票失败', // '核验不通过',
    tag: 'danger',
  },
]
// 增值税发票类型
export const INVOICE_TYPE = [{
    id: 'special',
    name: '增值税专用发票',
  },
  {
    id: 'normal',
    name: '增值税普通发票',
  },
  {
    id: 'electronic',
    name: '增值税电子普通发票（含通行费发票）',
  },
  {
    id: 'special_electronic',
    name: '增值税电子专用发票',
  },
  {
    id: 'roll',
    name: '增值税普通发票（卷票）',
  },
  {
    id: 'toll',
    name: '增值税普通发票（卷票）',
  },
  {
    id: 'fully_digitalized_special_electronic',
    name: '全电专用发票',
  },
  {
    id: 'fully_digitalized_normal_electronic',
    name: '全电普通发票',
  },
]

// calcBookType
// 计算书类型 0：省内 1：省间  -1：未知
export const CALCBOOK_TYPE = [{
    id: 0,
    name: '省内',
  },
  {
    id: 1,
    name: '省间',
  },
  {
    id: -1,
    name: '未知',
  },
]