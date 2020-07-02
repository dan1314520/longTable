<template>
  <el-scrollbar wrap-class="list" view-class="view-box">
    <div @dblclick="taggleCollapse">
      <el-menu
        router
        unique-opened
        :default-active="activePath"
        @open="handleOpen"
        @close="handleClose"
        :collapse="collapse"
        @select="handleSelect"
        :class="theme"
      >
        <menu-tree v-for="item in menus " :poperClass="theme" :key="item.index" :menus="item"></menu-tree>
      </el-menu>
    </div>
  </el-scrollbar>
</template>
<script>
import menuTree from './menuTree'
import {get} from '@/api/axios'
export default {
  data () {
    return {
      menus: []
    }
  },
  computed: {
    collapse () {
      return this.$store.getters.collapse
    },
    activePath () {
      return this.$route.meta.activeMenu || this.$route.path
    },
    device () {
      return this.$store.state.app.device
    },
    theme () {
      return `theme${this.$store.getters.theme}`
    }
  },
  created () {
    this.getMenu()
  },
  methods: {
    handleOpen (key, keyPath) {},
    handleClose (key, keyPath) {},
    handleSelect (index, indexPath) {
      if (this.device === 'mobile') {
        this.taggleCollapse()
      }
    },
    taggleCollapse () {
      this.$store.dispatch('taggleCollapse')
    },
    getMenu () {
      get('/static/data/menu.json').then((res) => {
        this.menus = res
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  components: {
    menuTree
  }
}
</script>
<style lang="less" scoped>
@import "./style";
</style>
