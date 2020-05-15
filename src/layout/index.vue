<template>
  <div class="layout">
    <el-container>
      <el-header :height="'68px'">
        <Navigator></Navigator>
      </el-header>
      <el-main>
        <router-view></router-view>
        <div @click="backTop" class="footer">
          <i class="el-icon-arrow-up"></i>
        </div>
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
    methods: {
      backTop() {
        window.scrollTo(0, 0)
      },
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

  .footer {
    width: 50px;
    height: 50px;
    background-color: #FFF;
    box-shadow: 0 0 3px rgba(0, 0, 0, .3);
    color: #FF9D00;
    text-align: center;
    position: fixed;
    right: 200px;
    bottom: 100px;
    cursor: pointer;

    i {
      font-size: 24px;
      line-height: 50px;
      font-weight: bold;
    }
  }

</style>

