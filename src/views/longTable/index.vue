<template>
  <div>
    <el-table
      ref="longTable"
      border
      :data="filteredData"
      :data-size="tableData.length"
      reserve-selection
      v-loadmore="handelLoadmore"
      style="width: 100%"
      :height="900"
      @row-click="handleRowClick"
      highlight-current-row
      v-loading="loading"
    >
      <el-table-column prop="index" label="#" width="55" align="center"></el-table-column>
      <el-table-column
        v-for="item in columns"
        :key="item.index"
        :label="item.label"
        :width="item.width"
        :prop="item.prop"
        show-overflow-tooltip
        :sortable="item.sortable"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script src="./script.js"></script>

<style scoped>
.el-table__body-wrapper .el-table__row td {
  display: none;
}
.el-table__body-wrapper .el-table__row {
  height: 38px;
}
</style>
