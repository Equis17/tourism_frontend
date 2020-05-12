<template>
  <div class="detail">
    <div class="detail-cover">
      <div class="detail-cover-box">
      </div>
      <p class="detail-cover-title">{{title}}</p>
    </div>
    <div class="wrapper">
      <div class="detail-writer">
        <div class="detail-writer-wrap">
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
      <div class="detail-content">
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
        <div class="detail-html" v-html="html"></div>
      </div>
      <div class="detail-comment">
        <p class="title">
          评论
        </p>
        <div v-if="commentList.length > 0">
          <div class="detail-comment-list" v-for="item in commentList" :key="item.id">
            <div class="detail-comment-item">
              <div class="richText" v-if="item.comment!==''" v-html="item.comment">
              </div>
              <div class="footer">
                <el-avatar :src="item.avatar_url" :size="30"></el-avatar>
                <span class="nickName">{{item.nickName}}</span>
                <span class="like">
                 <i class="el-icon-thumb"></i>
                <span>{{item.like||0}}</span>
              </span>
                <span class="time">{{item.updatedAt}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-comment-empty" v-else>
          <p class="detail-comment-empty-words">暂无评论</p>
        </div>
        <div class="comment-box">
          <div class="editor" id="editor" ref="editor"></div>
          <el-button type="primary" class="clearfix" @click="handleComment">发表评论</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { createComment } from '@/api/commentInfo'
  import { getArticleDetail } from '@/api/public'
  import { uploadImage } from '@/api/upload'
  import moment from 'moment'
  import Editor from 'wangeditor'

  export default {
    name: 'detail',
    data() {
      return {
        editor: null,
        comment: '',
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
        commentList: [],
      }
    },
    created() {
      const { id } = this.$router.history.current.params
      getArticleDetail(id).then(res => {
        if (res.code === 200) {
          const { commentList, imageUrl, richText, avatar_url, title, nickName, userId, updatedAt, watch, like, time, days, fee, people } = res.data
          this.html = richText
          this.commentList = commentList.map(item => ( {
            ...item,
            updatedAt: moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
          } ))
          this.coverUrl = imageUrl
          this.title = title
          this.avatar_url = avatar_url
          this.nickName = nickName
          this.userId = userId
          this.time = time ? moment(time).format('YYYY-MM-DD') : '无'
          this.days = days || '0'
          this.fee = fee || '0'
          this.people = people || '无'
          this.updatedAt = moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')
          this.watch = watch || 0
          this.like = like
          if (this.coverUrl !== '' || this.coverUrl !== null) {
            const parentNode = document.querySelector('.detail-cover-box')
            const newImageNode = document.createElement('img')
            newImageNode.src = this.coverUrl
            newImageNode.className = 'detail-cover-image'
            newImageNode.style.width = '100%'
            parentNode.appendChild(newImageNode)
          }
        }

      })
    },
    mounted() {
      this.editor = new Editor('#editor') //new即可

      this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
      this.editor.customConfig.uploadImgServer = '/api/upload/uploadImage'// 配置服务器端地址
      this.editor.customConfig.uploadImgHeaders = {} // 自定义 header
      this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024 // 将图片大小限制为 10M
      this.editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 30 * 1000 // 设置超时时间
      this.editor.customConfig.zIndex = 2000
      this.editor.customConfig.onblur = html => {
        this.comment = html
      }
      this.editor.customConfig.customUploadImg = function(files, insert) {
        let formData = new FormData()
        files.forEach((file, i) => {
          formData.append(`file[${i}]`, file, file.name)
        })
        uploadImage(formData)
        .then(res => {
          if (res.errorno === 0) {
            const { data } = res
            data.forEach(url => insert(url))
            this.comment = this.editor.txt.html()
          }
        })

      }
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        // 'quote',  // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'video', // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo', // 重复
      ]
      this.editor.create() //以上配置完成之后调用其create()方法进行创建
      //点击事件，拿到富文本编辑器里面的值
      const containerDOM = this.$refs['editor'].querySelector('.w-e-text-container')
      containerDOM.style.minHeight = '200px'
      containerDOM.style.height = 'auto'
    },
    methods: {
      handleComment() {
        createComment({
          articleId: this.$router.history.current.params.id,
          comment: this.editor.txt.html(),
        }).then(res => {
          if (res.code === 200) {
            this.editor.txt.html('')
            const { id } = this.$router.history.current.params
            getArticleDetail(id).then(res => {
              if (res.code === 200) {
                const { commentList, imageUrl, richText, avatar_url, title, nickName, userId, updatedAt, watch, like, time, days, fee, people } = res.data
                this.html = richText
                this.commentList = commentList
                this.coverUrl = imageUrl
                this.title = title
                this.avatar_url = avatar_url
                this.nickName = nickName
                this.userId = userId
                this.time = time ? moment(time).format('YYYY-MM-DD') : '无'
                this.days = days || '0'
                this.fee = fee || '0'
                this.people = people || '无'
                this.updatedAt = moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')
                this.watch = watch || 0
                this.like = like
                if (this.coverUrl !== '' || this.coverUrl !== null) {
                  const parentNode = document.querySelector('.detail-cover-box')
                  const newImageNode = document.createElement('img')
                  newImageNode.src = this.coverUrl
                  newImageNode.className = 'detail-cover-image'
                  newImageNode.style.width = '100%'
                  parentNode.appendChild(newImageNode)
                }
              }

            })
          }
        })
      },
    },
  }
</script>

<style lang="less">
  .clearfix {
    &:after {
      display: block;
      content: '';
      height: 0;
      clear: both;
    }
  }

  .detail {
    background-color: #FFF;
    margin: 0 auto;
    overflow: hidden;

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

  .detail-writer {
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

  .detail-content {
    width: 1000px;
    margin: 20px auto;

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

  .detail-comment {
    border-top: 1px dashed #CCC;
    padding-top: 20px;
    width: 700px;

    .el-button {
      float: right;
      margin-bottom: 20px;
    }

    .editor {
      p {
        font-size: 14px !important;
        color: #000;
        margin-bottom: 0 !important;
      }
    }

    p {
      font-size: 18px;
      color: #FF9D00;
      margin-bottom: 20px;
    }

    &-item {
      border: 1px dashed #CCC;
      border-radius: 15px;
      padding: 20px;
      margin-bottom: 20px;

      .footer {
        span {
          font-size: 14px;
          vertical-align: top;
          line-height: 30px;
        }

        .nickName {
          margin-left: 20px;
        }

        .like {
          margin-left: 20px;
        }

        .time {
          float: right;
        }
      }

      .richText {
        p {
          color: #000;
          font-size: 14px !important;
        }

        img {
          width: 200px;
          height: auto;
        }
      }
    }
  }

  .detail-comment-empty-words {
    color: #666 !important;
    font-size: 14px !important;

  }

  .wrapper {
    width: 1000px;
    margin: 0 auto;
  }

  .editor {
    border-top: 1px dashed #CCC;
    margin-bottom: 20px;
    padding-top: 20px;
  }
</style>
