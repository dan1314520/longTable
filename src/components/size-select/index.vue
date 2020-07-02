<template>
  <el-radio
    v-model="size"
    :label="item.value"
    border
    size="small"
    class="set-radio"
  >{{item.label}}</el-radio>
</template>

<script>
export default {
  data() {
    return {
      sizeOptions: [
        { label: "Default", value: "default" },
        { label: "Medium", value: "medium" },
        { label: "Small", value: "small" },
        { label: "Mini", value: "mini" }
      ]
    };
  },
  computed:{
    size:{
      get(){
        return this.$store.getters.size.trim()
      },
      set(val){
        this.handleSetSize(val)
      }
    }
  }
,  methods: {
    handleSetSize(size) {
      this.$store.dispatch("setSize", size);
      this.$ELEMENT.size = size;
      this.refreshView();
      this.$message({
        message: "切换布局成功",
        type: "success"
      });
    },
    refreshView() {
      const { fullPath } = this.$route;
      this.$nextTick(() => {
        this.$router.replace({
          path: "/redirect" + fullPath
        });
      });
    }
  }
};
</script>

