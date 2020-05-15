<template>
  <div>
    <div class="body">
      <div class="header">四川旅游网后台管理</div>
      <div class="login-box">
        <p>管理员登录</p>
        <el-form :rules="rules" ref="form" :model="form">
          <el-form-item prop="userName">
            <el-input v-model="form.userName" placeholder="您的账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="您的密码"></el-input>
          </el-form-item>
          <el-button @click="handleLogin" type="primary">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { adminLogin } from '@/api/public'
  import encrypt from '@/utils/encrypt'

  export default {
    name: 'login',
    data() {
      const validateUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'))
        }

        return callback()
      }
      return {
        form: {
          userName: '',
          password: '',
        },
        rules: {
          userName: [
            { validator: validateUserName, trigger: 'blur' },
          ],
        },
      }
    },
    created() {
      this.$store.commit('common/GET_PUBLIC_KEY')
    },
    methods: {
      handleLogin() {
        this.$refs['form'].validate(valid => {
          if (valid) {

            const encryptedInfo = encrypt(this.$store.getters.publicKey, this.form.password)
            adminLogin({
              name: this.form.userName,
              password: encryptedInfo,
            }).then(res => {
              if (res.code === 200) {
                this.$store.commit('admin/SET_ADMIN_TOKEN', res.data)
                this.$router.push('/admin/router')
              }
            })
          } else {
            console.log('error')
            return false
          }
        })
      },
    },
  }
</script>

<style scoped lang="less">
  .header {
    width: 100%;
    height: 80px;
    font-size: 30px;
    line-height: 80px;
    text-align: center;
    background-color: #FF9D00;
    text-shadow: 0 0 3px rgba(0, 0, 0, .9);
    color: #FFF;
  }

  .body {
    background: url('../../assets/admin_login_bg.jpg');
    background-size: cover;
    width: 100%;
    height: 100vh;
    position: relative;
  }

  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    box-shadow: 5px 5px 27px #666;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: #FFF;
    padding: 20px;

    p {
      line-height: 20px;
      font-size: 20px;
      margin-bottom: 22px;
      color: #666;
    }
  }

  .el-button {
    width: 100%;
  }
</style>
