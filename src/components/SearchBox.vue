<template>
  <el-input v-model="input" :class="isFocus ?'search-box-focus':''" @focus="inputFocus(true)"
            @blur="inputFocus(false)" @click="submitForm">
    <template #suffix="">
      <span @click="submitForm" class="el-icon-search" style="line-height: 40px;cursor: pointer"></span>
    </template>
  </el-input>
</template>

<script>
  export default {
    name: 'SearchBox',
    data() {
      return {
        input: '',
        isFocus: false,
      }
    },
    methods: {
      inputFocus(bool) {
        this.isFocus = bool
      },
      submitForm() {
        console.log(this.input)
      },
    },
  }
</script>

<style scoped lang="less">
  .el-input {
    transition: all .5s;
    line-height: 1;
    margin: 15px 0;
    width: 200px;
  }

  .search-box-focus {
    transition: all .5s;
    width: 300px !important;
  }
</style>
