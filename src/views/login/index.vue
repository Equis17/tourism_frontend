<template>
  <div class="login">
    <div class="login-box">
      <div class="login-box-left">
        <div class="login-box-left-top">
          <p class="title">账号登录</p>
          <el-form :rules="rules" ref="loginForm" :model="form">
            <el-form-item prop="userName">
              <el-input v-model="form.userName" placeholder="您的账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="form.password" placeholder="您的密码"></el-input>
            </el-form-item>
            <p class="forget">
              <router-link to="/forget">忘记密码</router-link>
            </p>
            <el-form-item>
              <el-button type="primary" @click="handleLogin('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="login-box-left-bottom">
          <p>还没有账号?
            <router-link to="/register">马上注册</router-link>
          </p>
        </div>
      </div>

      <div class="login-box-right" @click="redirectToHome">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import { login } from '@/api/public'
  import encrypt from '@/utils/encrypt'

  export default {
    name: 'index',
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
    mounted() {
      this.$store.commit('common/GET_PUBLIC_KEY')
    },
    methods: {
      handleLogin() {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            const encryptedInfo = encrypt(this.$store.getters.publicKey, this.form.password)
            login({
              name: this.form.userName,
              password: encryptedInfo,
            }).then(res => {
              if (res.code === 200) {
                this.$store.dispatch('admin/resetToken').then(() => {
                  this.$store.commit('user/SET_TOKEN', res.data)
                  this.$router.push('/home')
                })
              }
            })
          } else {
            console.log('error')
            return false
          }
        })
      },
      redirectToHome() {
        this.$router.push('/home')
      },
    },
  }
</script>

<style scoped lang="less">
  .login {
    width: 100%;
    height: 100vh;
    background: url('../../assets/login_bg.jpg') no-repeat center;
    background-size: cover;

    &-box {
      overflow: hidden;
      width: 730px;
      height: 434px;
      border-radius: 5px;
      margin: 0 auto;
      position: relative;
      background: url('../../assets/page_bg.jpg');
      top: 50%;
      transform: translateY(-50%);

      &-left {
        width: 430px;
        height: 100%;
        float: left;
        display: inline-block;
        background-color: #FFF;

        &-top {
          margin: 0 80px;
          height: 80%;

          .title {
            height: 60px;
            text-align: center;
            line-height: 60px;
            border-bottom: 2px solid #FF9D00;
            margin-bottom: 22px;
            color: #999;
            font-size: 20px;

          }

          .forget {
            text-align: right;
            font-size: 14px;
            line-height: 22px;
          }

          .el-button {
            width: 100%;
          }
        }

        &-bottom {
          height: 20%;

          p {
            margin: 0 80px;
            font-size: 14px;
            color: #999;
            line-height: 80px;
          }
        }
      }

      &-right {
        width: 300px;
        float: left;
        display: inline-block;
        position: relative;
        cursor: pointer;

        &:hover {
          .el-icon-arrow-right {
            color: #FFF;
          }
        }

        .el-icon-arrow-right {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: inline-block;
          font-size: 80px;
          font-weight: bold;
          color: #FF9D00;

        }

        height: 100%;
      }
    }
  }
</style>
