<template>
  <div class="detail-layout">
    <el-container>
      <el-aside v-if="$slots.aside">
        <slot name="aside"></slot>
      </el-aside>
      <el-main v-if="$slots.main">
        <slot name="main"></slot>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'DetailLayout',
  }
</script>

<style scoped lang="less">
  .detail-layout {
    width: 1000px;
    margin: 0 auto;
  }

  .el-aside {
    color: #333;
    box-sizing: border-box;
    width: 280px !important;
    text-align: center;
  }

  .el-main {
    color: #333;
    text-align: center;
  }

</style>
