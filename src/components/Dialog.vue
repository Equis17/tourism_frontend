<template>
  <el-dialog
    :title="editId===-1?'新增':'编辑'"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleBeforeClose">
    <el-form :rules="rules" ref="form" :model="form" label-width="80px">
      <el-form-item v-for="formItem in formItemList" :prop="formItem.prop" :label="formItem.label" :key="formItem.prop">
        <el-input v-model="form[formItem.prop]" :type="formItem.type"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'Dialog',
    props: {
      editId: {
        type: Number,
      },
      dialogVisible: {
        type: Boolean,
      },
      form: {
        type: Object,
      },
      formItemList: {
        type: Array,
      },
      rules: {
        type: Array,
      },
    },
    methods: {
      handleClose() {
        this.$emit('close')
      },
      handleSubmit() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.editId === -1)
              this.$emit('submit', this.form)
            else {
              this.$emit('submit', { ...this.form, id: this.editId })
            }
          }
        })
      },
      handleBeforeClose() {
        this.$emit('beforeClose')
      },
    },
  }
</script>

<style scoped>

</style>
