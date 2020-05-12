<template>
  <div class="navigator" @mouseleave="showList(false)">
    <div v-if="!$store.getters.token">
      <router-link to="/login" class="link">登录</router-link>
      <span class="split"></span>
      <router-link to="/register" class="link">注册</router-link>
    </div>
    <span v-else @click="redirectToUserCenter" @mouseover="showList(true)">
      <el-avatar size="medium" :src="avatarUrl"></el-avatar>
    </span>
    <div @mouseover="showList(true)" v-show="isShowUserList" class="userList">
      <ul class="clearfix">
        <li>
          <span class="toEdit" @click="edit('/article/edit')">去写攻略</span>
        </li>
        <li>
          <router-link to="/user/center/article">我的攻略</router-link>
        </li>
        <li>
          <router-link to="/user/center/edit">我的草稿箱</router-link>
        </li>
        <li>
          <router-link to="/user/center/question">我的问题</router-link>
        </li>
        <li>
          <router-link to="/user/center">个人中心</router-link>
        </li>
        <li>
          <router-link to="/exit">退出</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import JWTDecode from 'jwt-decode'

  export default {
    name: 'MenuRight',
    data() {
      return {
        input: '',
        isShowUserList: false,
        avatarUrl: '',
      }
    },
    created() {
      if (this.$store.getters.token) {
        const { avatar_url } = JWTDecode(this.$store.getters.token)
        this.avatarUrl = avatar_url || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      }
    },
    methods: {
      redirectToUserCenter() {
        this.$router.push('/user/center')
      },
      showList(show) {
        this.isShowUserList = show
      },
      edit(to) {
        this.$store.commit('edit/RESET_EDIT_ID')
        this.$router.push(to)
      },
    },
  }
</script>

<style scoped lang="less">
  .clearfix:after {
    content: '';
    display: block;
    height: 0;
    clear: both;

  }

  .navigator {
    position: relative;
  }

  .userList {
    z-index: 1000;
    position: absolute;
    left: -100px;
    top: 66px;
    background-color: #FFF;

    ul {
      width: 150px;

      li {
        height: 36px;
        line-height: 36px;
        padding: 0 10px;

        > a {
          display: inline-block;
          width: 100%;
          height: 100%;
          color: #000;
          font-size: 12px
        }

        &:hover {
          background-color: #EEE;


        }
      }
    }
  }

  .link {
    font-size: 14px;
  }

  .router-link-active {
    font-size: 14px;
  }

  .split {
    display: inline-block;
    color: #CCC;
    width: 0;
    height: 15px;
    vertical-align: middle;
    border-right: 1px solid #CCC;
    margin: 0 5px;
  }

  .el-avatar {
    margin-top: 16px;
    border: 2px solid #FF9D00;
    cursor: pointer;

  }

  .toEdit {
    font-size: 12px;
    color: #000;
    cursor: pointer;
  }
</style>
