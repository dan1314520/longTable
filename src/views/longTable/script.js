
import loadmore from '@/mixins/loadmore'
import {getLongTableData} from '@/api/modules/longTable'
export default {
  name: 'longTable',
  mixins: [loadmore],
  data () {
    return {
      loading: false,
      tableData: [],
      currentStartIndex: 0,
      currentEndIndex: 29,
      selectIndex: [],
      multipleSelection: [],
      checkAll: false,
      columns: [
        { prop: 'name', label: '名称' },
        { prop: 'code', label: '代码', sortable: true },
        { prop: 'up', label: '涨幅', sortable: true },
        { prop: 'currentPrice', label: '现价', sortable: true },
        { prop: 'down', label: '涨跌', sortable: true },
        { prop: 'dealAmount', label: '成交量', sortable: true },
        { prop: 'dealMoney', label: '成交额', sortable: true },
        { prop: 'speed', label: '涨速', sortable: true },
        { prop: 'hand', label: '换手', sortable: true },
        { prop: 'amountRate', label: '量比', sortable: true },
        { prop: 'todayOpen', label: '今开', sortable: true },
        { prop: 'max', label: '最高', sortable: true },
        { prop: 'min', label: '最低', sortable: true },
        { prop: 'yestodayProfit', label: '昨收', sortable: true },
        { prop: 'rate', label: '市盈率', sortable: true }
      ],
      currentRowIndex: 0
    }
  },
  created () {
    this.getTableData()
  },
  mounted () {
    this.handleSetCurrentRow(0)
    window.addEventListener('keydown', e => {
      let event = e || window.event
      let keyCode = event.keyCode || event.which || event.charCode
      e.preventDefault()
      if (keyCode === 38) {
        this.handlePressUp()
        return
      }
      if (keyCode === 40) {
        this.handlePressDown()
      }
    })
  },
  methods: {
    getTableData () {
      this.loading = true
      getLongTableData().then(res => {
        this.tableData = res
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleRowClick (row) {
      // console.log('handleRowClick:', this.currentRowIndex)
      this.currentRowIndex = row.index - 1
    },
    handlePressUp () {
      // console.log('handlePressUp:', this.currentRowIndex)
      if (this.currentRowIndex !== 0) {
        this.currentRowIndex--
      }
      this.handleSetCurrentRow()
    },
    handlePressDown () {
      // console.log('handlePressDown:', this.currentRowIndex)
      if (this.tableData.length !== this.currentRowIndex) {
        this.currentRowIndex++
      }
      this.handleSetCurrentRow()
    },
    handleSetCurrentRow () {
      if (!this.$refs.longTable) return
      this.$refs.longTable.setCurrentRow(this.tableData[this.currentRowIndex])
    }
  }
}
