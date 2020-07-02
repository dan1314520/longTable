<template>
  <div class="tagview border-top over-hidden">
    <div class="tag tag-prev border-right f-l" @click="prev">
      <i class="el-icon-d-arrow-left"></i>
    </div>
    <div class="tag-next f-r">
      <i class="el-icon-d-arrow-right tag border-left" @click="next"></i>
      <i class="el-icon-refresh tag border-left" @click="refreshSelectedTag"></i>
      <el-dropdown @command="handleSelect">
        <i class="el-icon-circle-close tag border-left"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">关闭其他</el-dropdown-item>
          <el-dropdown-item command="2">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="tag-main inline-block">
      <div class="tag-scoll-wrapper" :style="`margin-left:${marginLeft}px`">
        <el-tag
          v-for="(tag,index) in visiableTags"
          :key="index"
          @contextmenu.prevent.native="openMenu(tag,$event)"
          @close.stop.prevent="handleClose(tag)"
          @click="topath(tag)"
          closable
          :type="tag.path ==active?'primary':'info'"
          size="small"
        >{{tag.meta.title}}</el-tag>
      </div>
    </div>

    <ul v-show="popoverVisible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag">刷新</li>
      <li @click="closeSelectedTag">关闭当前</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: '',
      popoverVisible: false,
      left: 0,
      top: 0,
      selectedTag: null,
      marginLeft: 0
    }
  },
  computed: {
    visiableTags () {
      return this.$store.state.tagsView.visiableTags
    }
  },
  watch: {
    $route (val) {
      this.addViewTags()
    },
    popoverVisible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted () {
    this.addViewTags()
  },
  methods: {
    prev () {
      this.marginLeft += 80
    },
    next () {
      this.marginLeft -= 80
    },
    topath (tag) {
      this.closeMenu()
      this.selectedTag = tag
      this.$router.push({
        path: tag.fullPath
      })
    },
    handleSelect (command) {
      switch (command - 0) {
        case 1:
          this.closeOthersTags()
          break
        case 2:
          this.closeAllTags()
          break
        default:
          break
      }
    },
    handleClose (tag) {
      this.$store.dispatch('delView', tag)
      if (this.active === tag.path) {
        var path = this.visiableTags.length
          ? this.visiableTags[this.visiableTags.length - 1].path
          : '/index'
        this.$router.push({ path: path })
      }
    },
    addViewTags () {
      if (this.$route) {
        this.active = this.$route.path
        const {path, name, params, query, fullPath, meta} = this.$route
        if (this.$route.name) {
          this.$store.dispatch('addView', {path, name, params, query, fullPath, meta})
        }
      }
      return false
    },
    openMenu (tag, e) {
      const menuMinWidth = 105
      // const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.popoverVisible = true
      this.top = e.clientY
      this.selectedTag = tag
    },
    closeMenu () {
      this.popoverVisible = false
    },
    refreshSelectedTag () {
      this.selectedTag = this.$route
      this.$store.dispatch('delCachedView', this.selectedTag).then(() => {
        const { fullPath } = this.selectedTag
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag () {
      this.handleClose(this.selectedTag)
    },
    closeOthersTags () {
      this.$store.dispatch('delOthersViews', this.selectedTag || this.$route)
    },
    closeAllTags () {
      this.$store.dispatch('delAllViews')
      let tag = this.selectedTag || this.$route
      if (tag.path !== '/index') this.$router.push('/index')
    }
  }
}
</script>
<style lang="less" scoped>
@import "./style";
</style>
