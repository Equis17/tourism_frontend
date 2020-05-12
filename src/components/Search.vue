<template>
  <div class="search">
    <el-form ref="search-form" :model="form" label-width="80px">
      <p v-if="title">{{title}}</p>
      <el-radio-group v-else v-model="form.radioGroup">
        <el-radio label="article"> 旅游攻略</el-radio>
        <el-radio label="qa">问答</el-radio>
      </el-radio-group>
      <el-input v-model="form.search" placeholder="搜索">
        <template #suffix="">
          <span @click="submitForm" class="el-icon-search" style="line-height: 40px;cursor: pointer"></span>
        </template>
      </el-input>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Search',
    props: {
      title: String,
    },
    data() {
      return {
        form: {
          radioGroup: 'article',
          search: '',
        },
      }
    },
    methods: {
      submitForm() {
        if (this.form.radioGroup === 'article') {
          this.$router.push(`/article/search/${this.form.search || 'all'}`)
        } else {
          this.$router.push(`/QA/search/${this.form.search || 'all'}`)
        }
      },
    },
  }
</script>

<style scoped lang="less">
  p {
    font-size: 22px;
    line-height: 30px;
    color: #FFF;
  }

  .search {
    background-color: rgba(0, 0, 0, .6);
    border-radius: 10px;
    height: 100px;
    width: 600px;
    box-sizing: border-box;
    padding: 10px 20px;
  }

  .el-radio {
    color: #FFF;
    margin-bottom: 10px;
  }

</style>
