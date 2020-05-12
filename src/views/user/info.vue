<template>
  <div class="center">
    <div class="center-map">
      <map-svg></map-svg>
    </div>
    <div class="center-content clearfix">
      <div class="center-menu clearfix">
        <ul>
          <li>
            <router-link :to="`/user/info/${$router.history.current.params.id}/article`">TA的攻略</router-link>
          </li>
          <li>
            <router-link :to="`/user/info/${$router.history.current.params.id}/question`">TA的提问</router-link>
          </li>
        </ul>
      </div>
      <div class="center-content-left">
        <el-avatar :size="150" :src="avatar_url"></el-avatar>
        <p class="nickName">{{nickName}}</p>
        <p class="userInfo"><i class="el-icon-user"></i>{{age}}</p>
        <p class="userInfo"><i class="el-icon-phone"></i>{{phoneNumber}}</p>
        <p class="userInfo"><i class="el-icon-message"></i>{{email}}</p>
        <p class="comment">{{comment||'暂无个人简介'}}</p>
      </div>
      <div class="center-content-right clearfix">
        <div class="right-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import { getUserInfoById } from '@/api/user'
  import MapSvg from '@/components/MapSvg'

  export default {
    name: 'info',
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
      if (this.$router.history.current.params.id) {
        getUserInfoById(this.$router.history.current.params.id).then(res => {
          if (res.code === 200) {
            const { avatar_url, nickName, phoneNumber, age, email, comment } = res.data
            this.avatar_url = avatar_url
            this.nickName = nickName
            this.phoneNumber = phoneNumber
            this.age = age
            this.email = email
            this.comment = comment || ''
          }
        })
      }
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

      }
    }


  }

  .comment {
    font-size: 12px;
    color: #CCC;
    line-height: 30px;
  }

  .right-content {
    margin-top: 25px;
  }
</style>
