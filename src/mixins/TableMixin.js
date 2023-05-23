import {
  filterObj
} from '@/utils/util'
import {
  getAction
} from '@/api/manage'
const ListMixin = {
  data() {
    return {
      queryParam: {},
      /* 数据源 */
      dataSource: [],
      /* 分页参数 */
      ipagination: {
        current: 1,
        pageSize: 15,
        pageSizeOptions: ['10', '15', '20'],
        // showTotal: (total, range) => {
        //   return range[0] + '-' + range[1] + ' 共' + total + '条'
        // },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
      },
      // table加载状态
      loading: false,
      filteredInfo: null,
      sortedInfo: null,
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
    handleTableChange(pagination, filters, sorter) {
      console.log('Various parameters', pagination, filters, sorter)
      this.filteredInfo = filters
      this.sortedInfo = sorter
      this.ipagination = pagination
      this.loadData()
    },
    formatDataSource(datas) {
      return datas
    },
    loadData(arg) {
      if (!this.url.list) {
        this.$notify('请设置url.list属性!')
        return
      }
      this.loading = true
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.dataSource = []
        this.ipagination.current = 1
      }
      var params = this.getQueryParams() //查询条件
      this.loading = true
      getAction(this.url.list, params).then(res => {
          let {
            success,
            result,
            message
          } = res
          if (success) {
            this.dataSource = this.formatDataSource(result.records) || []
            this.ipagination.total = result.total
          } else {
            this.$notify({
              type: 'danger',
              message
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

  },
}
export default ListMixin