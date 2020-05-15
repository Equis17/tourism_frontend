<template>
  <el-container>
    <el-header>
      四川旅游网后台管理
      <div class="right">
        您好,{{name}}
        <span class="exit" @click="exit">退出</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <ul>
          <li v-for="item in list"
              :class="$router.history.current.fullPath===item.url?'active':'inactive'" :key="item.id"
          >
            <router-link :to="item.url">
              {{item.name}}
            </router-link>
          </li>
        </ul>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  import { getRouterList } from '@/api/admin'
  import JWTDecode from 'jwt-decode'

  export default {
    name: 'adminLayout',
    data() {
      return {
        name: '',
        list: [],
        liclass: '',
      }
    },
    created() {
      if (this.$store.getters.adminToken) {
        this.name = JWTDecode(this.$store.getters.adminToken).name
        this.getRouterList()
      } else {
        this.$router.push('/admin/login')
      }
    },
    methods: {
      getRouterList() {
        getRouterList().then(res => {
          if (res.code === 200)
            this.list = res.data
        })
      },
      exit() {
        this.$store.dispatch('admin/resetToken').then(() => {
          this.$router.push('/admin/login')
        })
      },
    },
  }
</script>

<style scoped lang="less">
  .el-header {
    background-color: #FFF;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #FFF;
    color: #333;
    line-height: 40px;
    text-align: left;
    height: calc(100vh - 60px);

    a {
      padding: 0 20px;
    }
  }

  .el-main {
    background-color: #F6F6F6;
  }

  .right {
    float: right;
  }

  .exit {
    color: #FF9D00;
    cursor: pointer;
  }

  .active {
    background-color: #FF9D00;

    a {
      color: #FFF;
    }
  }

  .inactive {
    a {
      color: #FF9D00;
    }
  }
</style>
