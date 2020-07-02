  <template>
  <div :style="style" class="page-pagination pagination-items bg-fff">
    <span class="pagination-item hidden-xs-only">共 {{ total}} 条</span>
    <span class="pagination-item  hidden-xs-only">每页</span>
    <el-select
      v-model="size"
      default-first-option
      allow-create
      remote
      filterable
      class="pagination-select hidden-xs-only"
    >
      <el-option v-for="(item , index) in pageSizes" :key="index" :label="item" :value="item"></el-option>
    </el-select>
    <span class="pagination-item hidden-xs-only">条</span>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :pager-count="5"
      background
      layout="prev,pager,next,jumper"
      :total="total"
    ></el-pagination>
    <!-- <span class="pagination-item hidden-sm-and-down" v-if="showTotalPage" > -->
      <!-- 共 {{totalPage}} 页</span> -->
    <br>
  </div>
</template>
<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 100
    },
    pageSizes: {
      type: Array,
      default: () => [50, 100, 150, 200]
    },
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number
    },
    showTotalPage: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      style: {}
    }
  },
  computed: {
    totalPage () {
      let page = (this.total - 0) / (this.pageSize - 0)
      page = Math.ceil(page)
      return page
    },
    size: {
      get () {
        return this.pageSize - 0
      },
      set (val) {
        this.selectChange(val)
      }
    }
  },
  mounted () {
    // 在DOM渲染数据时，设置下区域高度为浏览器可视区域高度．
    // 监听window的resize事件．在浏览器窗口变化时再设置下区域高度．
    // const _this = this
    // setTimeout(() => {
    //   this.$nextTick(() => {
    //     _this.$store.dispatch('getClientHeight')
    //     //  this.temp()
    //   })
    // }, 600)
    // window.onresize = function temp () {
    //   // _this.temp()
    //   _this.$store.dispatch('getClientHeight')
    // }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('size-change', val)
      this.$store.dispatch('getClientHeight')
      // setTimeout(() => {
      //   this.$nextTick(() => { this.temp() })
      // }, 600)
    },
    handleCurrentChange (val) {
      this.$store.dispatch('getClientHeight')
      this.$emit('current-change', val)
      // setTimeout(() => {
      //   this.$nextTick(() => { this.temp() })
      // }, 600)
    },
    selectChange (s) {
      this.$store.dispatch('getClientHeight')
      const size = parseInt(s)
      if (typeof size !== 'number') this.size = ''
      this.$emit('size-change', size)
      // setTimeout(() => {
      //   this.$nextTick(() => { this.temp() })
      // }, 600)
    },
    temp () {
      // 如果页数存在
      if (document.querySelector('.pagination-items')) {
        if (document.querySelector('.app-main').offsetHeight <= document.querySelector('.app-main>div').clientHeight) {
          this.style = {
            position: 'fixed',
            bottom: '0',
            left: '210px',
            right: '0',
            height: '40px',
            padding: '4px 0',
            boxShadow: '-1px 0px 10px -5px'
          }
          document.querySelector('.page-body').style.marginBottom = '30px'
        } else {
          this.style = {
            position: 'inherit',
            height: '50px',
            padding: '10px 0'
          }
          document.querySelector('.page-body').style.marginBottom = '0'
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import './style';
</style>
