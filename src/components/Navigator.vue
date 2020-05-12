<template>
  <el-menu :router="true" :default-active="activeIndex" mode="horizontal">
    <el-menu-item index="/home">首页</el-menu-item>
    <el-menu-item index="/destination">目的地</el-menu-item>
    <el-menu-item index="/article/search/all">旅游攻略</el-menu-item>
    <el-menu-item index="/QA/search/all">问答</el-menu-item>
    <NavigatorRight class="navigator-right"></NavigatorRight>
    <SearchBox class="search-box"></SearchBox>
  </el-menu>
</template>

<script>
  import NavigatorRight from '@/components/NavigatorRight'
  import SearchBox from '@/components/SearchBox'

  export default {
    name: 'Navigator',
    components: {
      NavigatorRight,
      SearchBox,
    },
    data: function() {
      return {
        activeIndex: '1',
      }
    },
  }
</script>

<style scoped lang="less">
  .el-menu {
    height: 68px;
    width: 1000px;
    margin: 0 auto;
    border-bottom: 0;
  }

  .el-menu-item {
    height: 68px;
  }

  .search-box {
    float: right;
    margin-right: 30px;
  }

  .navigator-right {
    min-width: 100px;
    float: right;
  }
</style>
