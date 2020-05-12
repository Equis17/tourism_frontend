<template>
  <div class="preview">
    <div class="preview-cover">
      <div class="preview-cover-box">
      </div>
      <p class="preview-cover-title">{{title}}</p>
    </div>
    <div class="preview-writer">
      <div class="preview-writer-wrap">
        <el-avatar :src="avatar_url" :size="120">
        </el-avatar>
        <div class="writer-info">
          <router-link :to='`/user/info/${userId}`'>{{nickName}}</router-link>
          <span class="updatedAt">{{updatedAt}}</span>
          <span class="watch">
            <i class="el-icon-view"></i>
            {{watch}}
          </span>
        </div>
      </div>
    </div>
    <div class="preview-content">
      <div class="article-info">
      <span>
        <i class="el-icon-time"></i>
        出发时间
        <span class="slice">/</span>
        {{time}}
      </span>
        <span>
        <i class="el-icon-moon"></i>
        出行天数
        <span class="slice">/</span>
        {{days}}天
      </span>
        <span>
        <i class="el-icon-user"></i>
        人物
        <span class="slice">/</span>
        {{people}}
      </span>
        <span>
        <i class="el-icon-coin"></i>
        人均费用
        <span class="slice">/</span>
        {{fee}}RMB
      </span>
      </div>
      <div class="preview-html" v-html="html"></div>
    </div>
  </div>
</template>

<script>
  import { previewArticle } from '@/api/article'
  import moment from 'moment'

  export default {
    name: 'preview',
    data() {
      return {
        html: '',
        coverUrl: '',
        title: '',
        avatar_url: '',
        nickName: '',
        userId: '',
        updatedAt: '',
        like: '',
        watch: '',
        time: '',
        days: '',
        people: '',
        fee: '',
      }
    },
    created() {
      if (this.$store.getters.editId === '') {
        this.$router.push('/home')
      } else {
        previewArticle(this.$store.getters.editId).then(res => {
          if (res.code === 200) {
            const { imageUrl, richText, avatar_url, title, nickName, userId, updatedAt, watch, like, time, days, fee, people } = res.data
            this.html = richText
            this.coverUrl = imageUrl
            this.title = title
            this.avatar_url = avatar_url
            this.nickName = nickName
            this.userId = userId
            this.time = time ? moment(time).format('YYYY-MM-DD') : '无'
            this.days = days
            this.fee = fee
            this.people = people
            this.updatedAt = moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')
            this.watch = watch || 0
            this.like = like
            if (this.coverUrl !== '' || this.coverUrl !== null) {
              const parentNode = document.querySelector('.preview-cover-box')
              const newImageNode = document.createElement('img')
              newImageNode.src = this.coverUrl
              newImageNode.className = 'preview-cover-image'
              newImageNode.style.width = '100%'
              parentNode.appendChild(newImageNode)
            }
          }
        })
      }
    },
  }
</script>

<style lang="less">
  .preview {
    background-color: #FFF;
    margin: 0 auto;

    &-cover {
      height: 640px;
      overflow: hidden;
      position: relative;

      &-title {
        position: absolute;
        bottom: 50px;
        left: 50%;
        font-size: 28px;
        color: #FFF;
        font-weight: bold;
        transform: translateX(-50%-130px);

      }

      &-img {
        width: 100%;
      }

      &-box {
        position: relative;
        width: 100%;
        height: 640px;
        background: url('../../assets/page_bg.jpg') center 0 no-repeat;
        background-size: cover;
      }
    }

    &-html {
      margin-top: 20px;
      min-height: 600px;
      width: 700px;

      p {
        line-height: 30px;
      }
    }
  }

  .preview-writer {
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #CCC;

    &-wrap {
      width: 1000px;
      margin: 0 auto;
      height: 80px;

      .el-avatar {
        display: inline-block;
        position: relative;
        top: -60px
      }
    }
  }

  .writer-info {
    display: inline-block;
    vertical-align: top;
    margin-left: 30px;
    margin-top: 30px;

    .updatedAt {
      font-size: 13px;
      color: #CCC;
      margin-left: 20px;
    }

    .watch {
      color: #CCC;
      font-size: 13px;
      margin-left: 20px;
    }
  }

  .preview-content {
    width: 1000px;
    margin: 0 auto;

    .article-info {
      margin-top: 20px;
      padding: 20px;
      width: 660px;
      border: 1px dashed #CCC;

      > span {
        display: inline-block;
        width: 220px;
        font-size: 14px;
        line-height: 40px;
        color: #666;

        i {
          color: #FF9D00;
        }

        .slice {
          color: #FF9D00;
        }
      }
    }

  }
</style>

