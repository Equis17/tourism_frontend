<template>
  <div>
    <el-radio-group v-model="searchRadio">
      <el-radio :label="0">全部</el-radio>
      <el-radio :label="1">目的地</el-radio>
      <el-radio :label="2">攻略</el-radio>
      <el-radio :label="3">问答</el-radio>
    </el-radio-group>
    <el-input v-model="input" placeholder="搜目的地/攻略/问答"></el-input>
  </div>
</template>

<script>
  export default {
    name: 'SearchContainer',
    data() {
      return {
        input: '',
        searchRadio: 0,
      }
    },
  }
</script>

<style scoped>

</style>
