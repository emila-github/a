import { getAction, postAction, putAction, deleteAction } from '@/api/manage'

const wxBaseURL = process.env.VUE_APP_BASE_URL // 微信相关
// const isBaseURL = process.env.VUE_APP_INVOICE_BASE_URL // 保源相关

const WXBaseUri = ''

// 获取授权地址
export const getAuthUrl = params => getAction(`${WXBaseUri}/cp/wxAuth/getAuthUrl`, params, { baseURL: wxBaseURL })
// 获取用户登录信息 及token
export const getUserInfo = params => {
  return postAction(`${WXBaseUri}/cp/wxAuth/getUserInfo`, params, { baseURL: wxBaseURL })
}
// 获取权限验证配置
export const getSignature = params => {
  return getAction(`${WXBaseUri}/cp/wxAuth/getShareSignature`, params, { baseURL: wxBaseURL })
}

// 消息详情内容-通过id查询
export const thirdpartyMsgDetailQueryById = params =>
  getAction(`${WXBaseUri}/wx/cp/msg/third/info`, params, { baseURL: wxBaseURL })

const emosBaseUrl = process.env.VUE_APP_EMOS_URL

// 权限信息
export const queryPermissionsByUser = params =>
  getAction(`/sys/permission/getUserPermissionByToken`, params, { baseURL: emosBaseUrl })

const InvoiceBaseUri = ''

// 任务列表
export const invoiceTaskInfoList = params => getAction(`${InvoiceBaseUri}/data/taskInfo/list`, params)

// 任务表 - 创建任务
export const invoiceTaskInfoCreateTask = params => postAction(`${InvoiceBaseUri}/data/taskInfo/createTask`, params)
// 发票信息-通过id查询
export const invoiceInfoQueryById = params => getAction(`${InvoiceBaseUri}/data/invoiceInfo/queryById`, params)
// 发票编辑保存
export const invoiceInfoEdit = params => putAction(`${InvoiceBaseUri}/data/invoiceInfo/edit`, params)
// 发票信息-通过id解绑任务
export const setInvoiceInfoUnbindFromTask = params =>
  postAction(`${InvoiceBaseUri}/data/invoiceInfo/unbindFromTask`, params)

// 拜访跟踪-上传照片
export const uploadInvoice = params =>
  postAction(`${InvoiceBaseUri}/data/invoiceInfo/uploadInvoice`, params, {
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  })
// 任务追加计算书
export const invoiceTaskInfoBindCalcBook = params => postAction(`${InvoiceBaseUri}/data/taskInfo/bindCalcBook`, params)

// 任务表-解绑计算书号
export const setTaskInfoUnBindCalcBook = params => postAction(`${InvoiceBaseUri}/data/taskInfo/unBindCalcBook`, params)
// 提交审核
export const taskInfoCommitTask = params => postAction(`${InvoiceBaseUri}/data/taskInfo/commitTask`, params)

// 任务接收者列表
export const taskInfoQueryUserByRealName = params =>
  getAction(`${InvoiceBaseUri}/data/taskInfo/queryUserByRealName`, params)

// 任务转交
export const taskInfoTransferTask = params => postAction(`${InvoiceBaseUri}/data/taskInfo/transferTask`, params)
// 关闭任务
export const taskInfoCloseTask = params => postAction(`${InvoiceBaseUri}/data/taskInfo/closeTask`, params)

// 任务表-任务详情
export const invoiceTaskInfoQueryTask = params => getAction(`${InvoiceBaseUri}/data/taskInfo/queryTask`, params)

// 任务表-分享任务    参数 taskId 任务ID   expireTime 过期时间
export const invoiceTaskInfoShareTask = params => getAction(`${InvoiceBaseUri}/data/taskInfo/shareTask`, params)

// =====任务分享=====

// 任务分享-分享是否可用
// 参数
// taskId
export const shareIsValidate = params => getAction(`${InvoiceBaseUri}/share/isValidate`, params)

// 任务分享-登陆
// 参数
// taskId                        任务ID
// shareCode                分享码
export const shareLogin = params => postAction(`${InvoiceBaseUri}/share/login`, params)

// 任务分享-任务详情
export const shareQueryTask = params => getAction(`${InvoiceBaseUri}/share/queryTask`, params)

// 任务分享-发票列表
// 参数
// shareToken                 分享token
// pageNo
// pageSize
export const shareInvoiceList = params => getAction(`${InvoiceBaseUri}/share/invoiceList`, params)

// 任务分享-计算书列表
// 参数
// shareToken                 分享token
// pageNo
// pageSize
export const shareCalcBookList = params => getAction(`${InvoiceBaseUri}/share/calcBookList`, params)

// 任务分享-上传发票
export const shareUploadInvoice = params =>
  postAction(`${InvoiceBaseUri}/share/uploadInvoice`, params, {
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  })

// 任务分享-查询发票
// 参数
// shareToken
// id 发票id
export const shareQueryInvoice = params => getAction(`${InvoiceBaseUri}/share/queryInvoice`, params)

// 任务分享-编辑发票
// 参数
// shareToken
// (body)同原来的编辑接口
export const shareEditInvoice = params => putAction(`${InvoiceBaseUri}/share/editInvoice`, params)

// 任务分享-通过id删除发票
// 参数
// shareToken
// id 发票id
export const shareDeleteInvoice = params => deleteAction(`${InvoiceBaseUri}/share/deleteInvoice`, params)

// 任务分享-提交任务
// shareToken                 分享token
// remark                        备注
export const shareCommitTask = params => postAction(`${InvoiceBaseUri}/share/commitTask`, params)
