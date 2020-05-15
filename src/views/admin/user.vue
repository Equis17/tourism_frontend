<template>
  <div class="body">
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="nickName"
          label="用户名"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="账号"
        >
        </el-table-column>
        <el-table-column
          prop="comment"
          label="简介"
        >
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
        >
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          label="更新时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <router-link class="link" :to="`/user/info/${scope.row.id}`">查看</router-link>
            <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { deleteUser, getUserList } from '@/api/admin'

  export default {
    name: 'user',
    data() {
      return {
        tableData: [],
      }
    },
    created() {
      getUserList().then(res => {
        if (res.code === 200) {
          this.tableData.push(...res.data)
        }
      })
    },
    methods: {
      handleDelete(id) {
        deleteUser({ id }).then(res => {
          if (res.code === 200) {
            getUserList().then(res => {
              if (res.code === 200) {
                this.tableData = res.data
              }
            })
          }
        })
      },
    },
  }
</script>


<style scoped lang="less">
  .el-table {
    margin-top: 20px;
  }

  .link {
    padding-right: 20px;
    font-size: 12px;
  }
</style>
