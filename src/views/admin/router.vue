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
          label="路由名"
        >
        </el-table-column>
        <el-table-column
          prop="url"
          label="路由地址"
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
  import { addRouter, deleteRouter, getRouterList, updateRouter } from '@/api/admin'
  import CDialog from '@/components/Dialog'

  export default {
    name: 'index',
    components: {
      CDialog,
    },
    data() {
      return {
        form: {
          name: '',
          url: '',
        },
        formItemList: [
          { label: '路由名', prop: 'name', type: 'input' },
          { label: '路由地址', prop: 'url', type: 'input' },
        ],
        tableData: [],
        dialogVisible: false,
        editId: -1,
      }
    },
    created() {
      getRouterList().then(res => {
        if (res.code === 200) {
          this.tableData.push(...res.data)
        }
      })
    },
    methods: {
      handleBeforeClose() {
        this.form = {
          name: '',
          url: '',
        }
        this.editId = -1
        this.dialogVisible = false
      },
      handleEdit(row) {
        this.form = {
          name: row.name,
          url: row.url,
        }
        this.editId = row.id
        this.dialogVisible = true
      },
      handleDelete(id) {
        deleteRouter({ id }).then(res => {
          if (res.code === 200) {
            getRouterList().then(res => {
              if (res.code === 200) {
                this.tableData = res.data
              }
            })
          }
        })
      },
      handleSubmit(value) {
        if (!value.id) {
          addRouter(value).then(res => {
            if (res.code === 200) {
              getRouterList().then(res => {
                if (res.code === 200) {
                  this.tableData = res.data
                  this.handleBeforeClose()
                }
              })
            }
          })
        } else {
          updateRouter(value).then(res => {
            if (res.code === 200) {
              getRouterList().then(res => {
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
