<template>
  <div class="forget">
    <div class="forget-box">
      <p class="title">
        忘记密码
      </p>
      <el-form v-if="!isValidating&&!isResetting" ref="forget-form" :model="form" :rules="rules">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="您的邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="forget('forget-form')">下一步</el-button>
        </el-form-item>
      </el-form>
      <el-form :rules='validateRules' v-else-if="isValidating&&!isResetting" ref="validate-form" :model="validateForm">
        <el-form-item prop="validateCode">
          <el-input v-model="validateForm.validateCode" placeholder="接收到的验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click=" validate('validate-form')">下一步</el-button>
        </el-form-item>
      </el-form>
      <el-form ref="setting-form" :model="settingForm" :rules="settingRules" v-else-if="isResetting">
        <p class="email">邮箱:{{this.form.email}}</p>
        <el-form-item prop="password">
          <el-input v-model="settingForm.password" type="password" placeholder="您的密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input v-model="settingForm.confirmPassword" type="password" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reset('setting-form')">重置密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { checkForgetValidate, forget, resetPassword } from '@/api/public'
  import encrypt from '@/utils/encrypt'
  import regex from '@/utils/regex'

  export default {
    name: 'index',
    created() {
      this.$store.commit('common/GET_PUBLIC_KEY')
    },
    data() {
      const validateEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        if (!regex.email.test(value)) {
          return callback(new Error('请输入正确的邮箱'))
        }
        return callback()
      }
      const validateCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('验证码不能为空'))
        }
        if (value.length !== 8) {
          return callback(new Error('请输入正确的验证码'))
        }
        return callback()
      }
      const validatePassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'))
        }
        if (value.length < 6 || value.length > 18) {
          return callback(new Error('密码的长度为6-18'))
        }
        return callback()
      }

      const validateConfirmPassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('确认密码不能为空'))
        }
        if (value.length < 6 || value.length > 18) {
          return callback(new Error('确认密码的长度为6-18'))
        }
        if (value !== this.settingForm.password) {
          return callback(new Error('两次输入的密码不同'))
        }
        return callback()
      }
      return {
        isResetting: false,
        isValidating: false,
        form: {
          email: '',
        },
        validateForm: {
          validateCode: '',
        },
        settingForm: {
          password: '',
          confirmPassword: '',
        },
        rules: {
          email: [
            { validator: validateEmail, trigger: 'blur' },
          ],
        },
        validateRules: {
          validateCode: [
            { validator: validateCode, trigger: 'blur' },
          ],
        },
        settingRules: {
          password: [
            { validator: validatePassword, trigger: 'blur' },
          ],
          confirmPassword: [
            { validator: validateConfirmPassword, trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      forget(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            forget({ email: this.form.email }).then(res => {
              if (res.code === 200) {
                this.isValidating = true
              }
            })
          } else {
            return false
          }
        })
      },
      validate(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            checkForgetValidate({ validateCode: this.validateForm.validateCode, email: this.form.email }).then(res => {
              if (res.code === 200)
                this.isResetting = true
            })
          }
        })
      },
      reset(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const password = encrypt(this.$store.getters.publicKey, this.settingForm.password)
            resetPassword({ ...this.validateForm, password, email: this.form.email }).then(res => {
              if (res.code === 200) {
                this.$router.push('/login')
              }
            })
          }
        })
      },
    },
  }
</script>

<style scoped lang="less">
  .forget {
    width: 100%;
    height: 100vh;
    background: url('../../assets/forget_bg.jpg') center no-repeat;
    background-size: cover;

    &-box {
      width: 370px;
      overflow: hidden;
      border: 1px solid #F5F5F5;
      background: #FFF;
      border-radius: 5px;
      position: relative;
      box-shadow: 0 3px 3px rgba(0, 0, 0, .4);
      margin: 0 auto;
      transform: translateY(-50%);
      top: 50%;

      .el-form {
        margin: 20px 20px;
      }

      .title {
        color: #999;
        height: 57px;
        border-bottom: 1px solid #D8D8D8;
        padding-left: 20px;
        line-height: 57px;
        background-color: #F5F5F5;
      }

      .el-button {
        width: 100%;
      }


    }
  }

  .email {
    display: inline-block;
    line-height: 1;
    font-size: 15px;
    padding: 0 0 0 15px;
    margin-bottom: 22px;
  }
</style>
