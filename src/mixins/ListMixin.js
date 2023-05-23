import {
  filterObj
} from '@/utils/util'
import {
  getAction,
  deleteAction
} from '@/api/manage'
import filter from 'lodash.filter'
import debounce from 'lodash/debounce'
const ListMixin = {
  data() {
    this.loadData = debounce(this.loadData, 800)
    return {
      queryParam: {},
      /* 数据源 */
      dataSource: [],
      /* 分页参数 */
      ipagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      /* 排序参数 */
      // isorter: {
      //   column: 'createTime',
      //   order: 'desc',
      // },
      // table加载状态
      loading: false,
      // table是否加载完成
      finished: false,
      url: {},
    }
  },
  created() {
    this.__createdStart && this.__createdStart()
    this.loadData()
  },
  methods: {
    getQueryParams() {
      //获取查询条件
      let sqp = {}

      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      this.queryParam = sqp
      return filterObj(param)
    },
    // 查询事件
    searchQuery() {
      this.loadData && this.loadData(1)
    },
    loadData(arg) {
      console.log('加载列表 this.url.list: ', this.url.list)
      if (!this.url.list) {
        this.$notify('请设置url.list属性!')
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.dataSource = []
        this.ipagination.current = 1
      }
      var params = this.getQueryParams() //查询条件
      this.loading = true
      getAction(this.url.list, params).then(res => {
        if (res.success) {
          let {
            records = [], current = 1, total = 0, size = 0
          } = res.result

          if (total <= current * size) {
            this.finished = true
          }
          this.dataSource = this.dataSource.concat(records)
          this.ipagination.total = total
          this.ipagination.current = current + 1
          // 加载状态结束
          this.loading = false
        }
        if (res.code === 510) {
          this.$notify(res.message)
        }
      })
    },
    handleDelete: function (id) {
      if (!this.url.delete) {
        this.$notify('请设置url.delete属性!')
        return
      }
      let self = this
      this.$dialog
        .confirm({
          title: '删除',
          message: '删除操作不可逆，确定删除吗？',
        })
        .then(() => {
          // on confirm

          deleteAction(self.url.delete, {
            id: id
          }).then(res => {
            if (res.success) {
              this.$notify({
                type: 'success',
                message: res.message
              })
              this.dataSource = filter(this.dataSource, item => item.id !== id)

              // self.loadData()
            } else {
              this.$notify({
                type: 'danger',
                message: res.message
              })
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    },
  },
}
export default ListMixin