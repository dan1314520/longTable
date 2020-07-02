<template>
   <el-submenu :popper-class="poperClass" ref="submenu" :index="menus.path" :route="menus.path" v-if="menus.children&&menus.children.length>0" :key="menus.id">
        <template slot="title">
          <i class="iconfont" :class="menus.icon"></i>
          <span slot="title">{{menus.label}}</span>
        </template>
        <MenuTree v-for="item in menus.children" :key="item.id" :menus="item"></MenuTree>
      </el-submenu>
      <el-menu-item :index="menus.path" :route="menus.path" v-else :key="menus.id">
        <i class="iconfont" :class="menus.icon"></i>
        <span slot="title">{{menus.label}}</span>
      </el-menu-item>
</template>

<script>
export default {
  name: 'MenuTree',
  props: ['menus', 'poperClass']
}
</script>
