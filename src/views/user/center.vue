<template>
  <div class="center">
    <div class="center-map">
      <map-svg></map-svg>
    </div>
    <div class="center-content clearfix">
      <div class="center-menu clearfix">
        <ul>
          <li>
            <router-link to="/user/center/article">我的攻略</router-link>
          </li>
          <li>
            <router-link to="/user/center/edit">我的草稿箱</router-link>
          </li>
          <li>
            <router-link to="/user/center/question">我的提问</router-link>
          </li>
          <li>
            <router-link to="/exit">退出</router-link>
          </li>
        </ul>
      </div>
      <div class="center-content-left">
        <el-avatar :size="150" :src="avatar_url"></el-avatar>
        <p class="nickName">{{nickName}}</p>
        <p class="userInfo"><i class="el-icon-user"></i>{{age}}</p>
        <p class="userInfo"><i class="el-icon-phone"></i>{{phoneNumber}}</p>
        <p class="userInfo"><i class="el-icon-message"></i>{{email}}</p>
        <el-input @blur="handleComment" v-model="comment" type="textarea" rows="3" placeholder="填写个人简介"></el-input>
      </div>
      <div class="center-content-right clearfix">
        <div class="right-operation clearfix">
          <ul class="clearfix">
            <li @click="to('/article/edit')">
              <i class="el-icon-edit"></i>
              <span>写攻略</span>
            </li>
            <li @click="to('/QA/edit')">
              <i class="el-icon-search"></i>
              <span>去提问</span>
            </li>
            <li @click="to('/article/search/all')">
              <i class="el-icon-chat-line-square"></i>
              <span>看攻略</span>
            </li>
            <li @click="to('/QA/search/all')">
              <i class="el-icon-thumb"></i>
              <span>看问答</span>
            </li>
          </ul>
        </div>
        <div class="right-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getComment, updateComment } from '@/api/user'
  import MapSvg from '@/components/MapSvg'
  import JWTDecode from 'jwt-decode'

  export default {
    name: 'center',
    components: {
      MapSvg,

    },
    data() {
      return {
        avatar_url: '',
        nickName: '',
        phoneNumber: '',
        age: '',
        email: '',
        comment: '',
        showComment: false,
      }
    },
    created() {
      if (this.$store.getters.token) {
        const { avatar_url, nickName, phoneNumber, age, email } = JWTDecode(this.$store.getters.token)
        this.avatar_url = avatar_url
        this.nickName = nickName
        this.phoneNumber = phoneNumber
        this.age = age
        this.email = email
        getComment().then(res => {
          if (res.code === 200) {
            this.comment = res.data.comment || ''

          }
        })
      }
    },
    methods: {
      handleComment() {
        updateComment({ comment: this.comment }).then(res => {
          if (res.code === 200) {
            getComment().then(res => {
              if (res.code === 200) {
                this.comment = res.data.comment || ''

              }
            })
          }
        })
      },
      to(url) {
        if (url === '/article/edit') this.$store.commit('edit/RESET_EDIT_ID')
        this.$router.push(url)
      },
    },
  }
</script>

<style scoped lang="less">
  .clearfix {
    &:after {
      content: '';
      display: block;
      height: 0;
      clear: both;
    }
  }

  .center {
    background-color: #EEE;

    &-map {
      width: 100%;
      height: 480px;
      overflow: hidden;
      background-color: #233658;
    }

    &-content {
      width: 1000px;
      margin: 0 auto;

      &-left {
        position: relative;
        background-color: #FFF;

        padding: 0 20px 20px 20px;
        float: left;
        width: 240px;

        .el-avatar {
          position: absolute;
          left: 65px;
          top: -168px
        }

        .nickName {
          font-size: 20px;
          text-align: center;
          margin-bottom: 20px;
        }

        .userInfo {
          line-height: 30px;
          font-size: 14px;

          i {
            margin-right: 10px;
          }
        }

        .el-button {
          margin-top: 15px;
          width: 100%;
        }
      }

      &-right {
        float: left;
        margin-left: 20px;

        .right-operation {
          margin-top: 25px;

          ul {
            background-color: #FFF;
            border: 1px solid #EEE;

            li {
              float: left;
              width: 172px;
              text-align: center;
              border-right: 1px solid #EEE;
              height: 80px;
              margin: 20px 0;

              &:hover {
                cursor: pointer;

                i, span {
                  color: #FF9D00;
                }
              }

              &:last-child {
                border-right: 0;
              }

              i {
                margin-bottom: 10px;
                display: block;
                font-size: 40px;
                line-height: 50px;
              }
            }
          }
        }
      }
    }

    &-menu {
      padding-left: 280px;
      background-color: #FFF;

      li {
        float: left;
        display: inline-block;
        width: 100px;
        height: 68px;
        line-height: 68px;

        &:last-child {
          float: right;
        }
      }
    }


  }

  .right-content {
    margin-top: 25px;
  }
</style>
