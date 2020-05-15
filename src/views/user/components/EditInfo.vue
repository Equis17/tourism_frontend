<template>
  <div class="info">
    <el-form ref="register-form" :model="form" :rules="rules">
      <el-upload
        ref="upload"
        class="avatar-uploader"
        action="/api/upload/uploadAvatar"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="form.avatar_url" :src="form.avatar_url" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form-item prop="nickName">
        <el-input v-model="form.nickName" placeholder="您的昵称"></el-input>
      </el-form-item>
      <el-form-item prop="age" label="年龄">
        <el-input-number :controls="false" :min="0" :max="100" v-model="form.age"
                         placeholder="您的年龄"></el-input-number>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="form.email" placeholder="您的邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="phoneNumber">
        <el-input v-model="form.phoneNumber" placeholder="您的手机号"></el-input>
      </el-form-item>
      <el-form-item prop="beforePassword">
        <el-input type="password" v-model="form.beforePassword" placeholder="原密码"></el-input>
      </el-form-item>
      <el-form-item prop="afterPassword">
        <el-input type="password" v-model="form.afterPassword" placeholder="新密码"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register('register-form')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getUserInfo, setUserInfo } from '@/api/user'
  import encrypt from '@/utils/encrypt'
  import regex from '@/utils/regex'

  export default {
    name: 'EditInfo',
    data() {
      const validateName = (rule, value, callback) => {
        if (!value) return callback(new Error('账号不能为空'))
        if (value.length < 6 || value.length > 18) {
          return callback(new Error('账号为6-18位'))
        }
        return callback()
      }
      const validateNickName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('昵称不能为空'))
        }
        if (value.length < 1 || value.length > 16) {
          return callback(new Error('昵称为1-12位'))
        }
        return callback()
      }
      const validateEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        if (!regex.email.test(value)) {
          return callback(new Error('请输入正确的邮箱'))
        }
        return callback()
      }

      const validatePhoneNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'))
        }
        if (!regex.phoneNumber.test(value)) {
          return callback(new Error('请输入正确的手机号'))
        }
        return callback()
      }
      const validateConfirmPassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'))
        }
        if (value.length < 6 || value.length > 18) {
          return callback(new Error('密码为6-18位'))
        }
        if (value !== this.form.afterPassword) {
          return callback(new Error('两次输入的密码不相同'))
        }
        return callback()
      }
      const validatePassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'))
        }
        if (value.length < 6 || value.length > 18) {
          return callback(new Error('密码为6-18位'))
        }
        return callback()
      }
      return {
        form: {
          nickName: '',
          name: '',
          age: 0,
          email: '',
          phoneNumber: '',
          avatar_url: '',
          password: '',
          confirmPassword: '',
          afterPassword: '',
          beforePassword: '',
        },
        rules: {
          nickName: [
            { validator: validateNickName, trigger: 'blur' },
          ],
          name: [
            { validator: validateName, trigger: 'blur' },
          ],
          email: [
            { validator: validateEmail, trigger: 'blur' },
          ],
          phoneNumber: [
            { validator: validatePhoneNumber, trigger: 'blur' },
          ],
          afterPassword: [
            { validator: validatePassword, trigger: 'blur' },
          ],
          confirmPassword: [
            { validator: validateConfirmPassword, trigger: 'blur' },
          ],
        },
      }
    },
    created() {
      getUserInfo().then(res => {
        if (res.code === 200) {
          const { nickName, name, age, email, phoneNumber, avatar_url } = res.data
          this.form.nickName = nickName
          this.form.name = name
          this.form.age = age
          this.form.email = email
          this.form.phoneNumber = phoneNumber
          this.form.avatar_url = avatar_url
        }
      })
    },
    mounted() {
      this.$store.commit('common/GET_PUBLIC_KEY')
    },
    methods: {
      register(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const { afterPassword, confirmPassword, beforePassword, ...rest } = this.form
            if (afterPassword === confirmPassword) {
              const encryptedInfo = encrypt(this.$store.getters.publicKey, afterPassword)
              const beforPasswordInfo = encrypt(this.$store.getters.publicKey, beforePassword)

              setUserInfo({ ...rest, password: encryptedInfo, beforePassword: beforPasswordInfo }).then(res => {
                if (res.code === 200) {
                  this.$store.dispatch('user/resetToken').then(() => {
                    this.$router.push('/login')
                  })

                }
              })
            }
          } else {
            console.log('error')
            return false
          }
        })
      },
      handleAvatarSuccess(res) {
        this.form.avatar_url = res.data[0]
      },
      beforeAvatarUpload(file) {
        const isPic = ( /^image\/(jpg)|(jpeg)|(png)/ ).test(file.type)
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isPic) {
          this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isPic && isLt2M
      },
    },
  }
</script>

<style lang="less">
  .info {
    padding: 20px;
    box-sizing: border-box;
    background-color: #FFF;

    .el-button {
      width: 100%;
    }
  }


  .avatar-uploader .el-upload {
    border: 1px dashed #D9D9D9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-bottom: 22px;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8C939D;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }
</style>
