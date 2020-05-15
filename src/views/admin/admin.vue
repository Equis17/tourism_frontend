<template>
  <div class="body">
    <div class="op">
      <el-button type="primary" @click="dialogVisible = true">新增</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="管理员账号"
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
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <c-dialog
      :editId="editId"
      :form="form"
      :form-item-list="formItemList"
      :dialog-visible="dialogVisible"
      @close="dialogVisible = false"
      @beforeClose="handleBeforeClose"
      @submit="handleSubmit"
    >
    </c-dialog>
  </div>
</template>

<script>
  import { addAdmin, deleteAdmin, getAdminList, updateAdmin } from '@/api/admin'
  import CDialog from '@/components/Dialog'
  import encrypt from '@/utils/encrypt'

  export default {
    name: 'admin',
    components: {
      CDialog,
    },
    data() {
      return {
        form: {
          name: '',
          password: '',
        },
        formItemList: [
          { label: '账号', prop: 'name', type: 'input' },
          { label: '密码', prop: 'password', type: 'password' },
        ],
        tableData: [],
        dialogVisible: false,
        editId: -1,
      }
    },
    created() {
      this.$store.commit('common/GET_PUBLIC_KEY')
      getAdminList().then(res => {
        if (res.code === 200) {
          this.tableData.push(...res.data)
        }
      })
    },
    methods: {
      handleBeforeClose() {
        this.form = {
          name: '',
          password: '',
        }
        this.editId = -1
        this.dialogVisible = false
      },
      handleEdit(row) {
        this.form = {
          name: row.name,
          password: '',
        }
        this.editId = row.id
        this.dialogVisible = true
      },
      handleDelete(id) {
        deleteAdmin({ id }).then(res => {
          if (res.code === 200) {
            getAdminList().then(res => {
              if (res.code === 200) {
                this.tableData = res.data
              }
            })
          }
        })
      },
      handleSubmit(value) {
        if (!value.id) {
          const formData = {
            ...value,
            password: encrypt(this.$store.getters.publicKey, value.password),
          }
          addAdmin(formData).then(res => {
            if (res.code === 200) {
              getAdminList().then(res => {
                if (res.code === 200) {
                  this.tableData = res.data
                  this.handleBeforeClose()
                }
              })
            }
          })
        } else {
          const formData = {
            ...value,
            password: encrypt(this.$store.getters.publicKey, value.password),
          }
          updateAdmin(formData).then(res => {
            if (res.code === 200) {
              getAdminList().then(res => {
                if (res.code === 200) {
                  this.tableData = res.data
                  this.handleBeforeClose()
                }
              })
            }
          })
        }
      },
    },
  }
</script>

<style scoped lang="less">
  .el-table {
    margin-top: 20px;
  }
</style>
