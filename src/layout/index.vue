<template>
  <div class="layout">
    <el-container>
      <el-header :height="'68px'">
        <Navigator></Navigator>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
  import Navigator from '@/components/Navigator'

  export default {
    name: 'index',
    components: {
      Navigator,
    },
  }
</script>

<style scoped lang="less">
  .layout {
  }

  .el-header, .el-footer {
    color: #333;
    line-height: 68px;
    box-shadow: 0 2px 5px #DDD;

  }

  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    padding: 0;
    color: #333;
  }


</style>

