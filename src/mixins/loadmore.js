
export default {
  data () {
    return {
      tableData: [],
      currentStartIndex: 0,
      currentEndIndex: 19,
      selectIndex: [],
      multipleSelection: [],
      checkAll: false,
      indeterminate: false
    }
  },
  computed: {
    filteredData () {
      return this.tableData.filter((item, index) => {
        if (index < this.currentStartIndex) {
          return false
        } else if (index > this.currentEndIndex) {
          return false
        }
        item.index = index + 1 // 解决index列问题
        return true
      })
    }
  },
  methods: {
    handelLoadmore (currentStartIndex, currentEndIndex) {
      this.currentStartIndex = currentStartIndex
      this.currentEndIndex = currentEndIndex
    },
    // 全选
    handleSelectAll (val) {
      this.checkAll = val
      this.indeterminate = false
      if (val) {
        for (let i = 1; i <= this.tableData.length; i++) {
          this.selectIndex.push(i)
        }
        this.multipleSelection = [...this.tableData]
        // console.log('全选结束selectIndex', this.selectIndex)
        // console.log('全选结束multipleSelection', this.multipleSelection)
        return false
      }
      this.multipleSelection = []
      this.selectIndex = []
    },
    checkboxChange (val, index) {
      if (val) {
        this.selectIndex.push(index)
        this.multipleSelection.push(this.tableData[index - 1])
        if (this.selectIndex.length === this.tableData.length) {
          this.checkAll = true
          this.indeterminate = false
          return false
        }
        this.checkAll = false
        this.indeterminate = true
        return false
        // console.log('勾选结束selectIndex', this.selectIndex)
        // console.log('勾选结束multipleSelection', this.multipleSelection)
      }
      const i = this.selectIndex.findIndex((i) => i === index)
      this.selectIndex.splice(i, 1)
      this.multipleSelection.splice(i, 1)
      this.checkAll = false
      this.indeterminate = true
      // console.log('取消勾选结束selectIndex', this.selectIndex)
      // console.log('取消勾选结束multipleSelection', this.multipleSelection)
    },
    renderHeader (h, { column, $index }) {
      const _this = this
      return h('el-checkbox', {
        on: {
          change: (value) => _this.handleSelectAll(value)
        },
        attrs: {
          checked: _this.checkAll,
          value: _this.checkAll,
          indeterminate: _this.indeterminate
        }
      })
    },
    clearSelection () {
      this.selectIndex = []
      this.checkAll = false
      this.indeterminate = false
      this.currentStartIndex = 0
      this.currentEndIndex = 19
      this.multipleSelection = []
    }
  }
}
