<template>
  <div class="detail">
    <div class="left clearfix">
      <p class="title">{{title}}</p>
      <div class="userInfo">
        <el-avatar :src="avatar_url" :size="30"></el-avatar>
        <span class="nickName">{{nickName}}</span>
        <span class="time">{{createdAt}}</span>
      </div>
      <div class="rich-text" v-if="comment" v-html="comment"></div>
      <div class="detail-comment">
        <p class="title">
          回答
        </p>
        <div v-if="questionList.length > 0">
          <div class="detail-comment-list" v-for="item in questionList" :key="item.id">
            <div class="detail-comment-item">
              <div class="richText" v-if="item.comment!==''" v-html="item.comment">
              </div>
              <div class="footer">
                <el-avatar :src="item.avatar_url" :size="30"></el-avatar>
                <span class="nickName">{{item.nickName}}</span>
                <span v-if="item.isAnswer" class="setAnswer">最佳答案</span>
                <span v-else-if="!item.isAnswer&&isQuestioner" class="setAnswer"
                      @click="handleAnswer(item.id)">设为答案</span>
                <span class="like" @click="handleLike(item.id)" :style="`color: ${item.isUserLike?'#FF9D00':'#000'}`">
                  <i class="el-icon-thumb"></i>
                <span>{{item.like||0}}</span>
             </span>
                <span class="time">{{item.createdAt}}</span>
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
    <div class="right clearfix"></div>

  </div>
</template>

<script>
  import { createAnswer, likeAnswer, setAnswer } from '@/api/answer'
  import { getQuestionDetail } from '@/api/public'
  import { uploadImage } from '@/api/upload'
  import JWTDecode from 'jwt-decode'
  import moment from 'moment'
  import Editor from 'wangeditor'

  export default {
    name: 'detail',
    data() {
      return {
        comment: '',
        createdAt: '',
        like: '0',
        questionList: [],
        title: '',
        userId: '',
        avatar_url: '',
        nickName: '',
        editor: null,
        isQuestioner: false,
      }
    },
    created() {
      const { id } = this.$router.history.current.params
      if (id) {
        getQuestionDetail(id).then(res => {
          if (res.code === 200) {
            const { comment, createdAt, like, questionList, title, userId, avatar_url, nickName } = res.data
            this.comment = comment
            this.createdAt = moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
            this.like = like
            this.questionList = questionList.map(item => ( {
              ...item,
              createdAt: moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
            } ))
            this.title = title
            this.userId = userId
            this.avatar_url = avatar_url
            this.nickName = nickName
            if (this.$store.getters.token) {
              const { id } = JWTDecode(this.$store.getters.token)
              if (this.userId === id) {
                this.isQuestioner = true
              }
            }
          }
        })
      }
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
      handleLike(id) {
        likeAnswer({ id }).then(res => {
          if (res.code === 200) {
            getQuestionDetail(this.$router.history.current.params.id).then(res => {
              if (res.code === 200) {
                const { comment, createdAt, like, questionList, title, userId, avatar_url, nickName } = res.data
                this.comment = comment
                this.createdAt = moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
                this.like = like
                this.questionList = questionList.map(item => ( {
                  ...item,
                  createdAt: moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
                } ))
                this.title = title
                this.userId = userId
                this.avatar_url = avatar_url
                this.nickName = nickName
              }
            })
          }
        })
      },
      handleAnswer(answerId) {
        setAnswer({ id: answerId, questionId: this.$router.history.current.params.id }).then(res => {
          if (res.code === 200) {
            getQuestionDetail(this.$router.history.current.params.id).then(res => {
              if (res.code === 200) {
                const { comment, createdAt, like, questionList, title, userId, avatar_url, nickName } = res.data
                this.comment = comment
                this.createdAt = moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
                this.like = like
                this.questionList = []
                this.questionList = questionList.map(item => ( {
                  ...item,
                  createdAt: moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
                } ))
                this.title = title
                this.userId = userId
                this.avatar_url = avatar_url
                this.nickName = nickName
              }
            })
          }
        })
      },
      handleComment() {
        createAnswer({
          questionId: this.$router.history.current.params.id,
          comment: this.editor.txt.html(),
        }).then(res => {
          if (res.code === 200) {
            this.editor.txt.html('')
            getQuestionDetail(this.$router.history.current.params.id).then(res => {
              if (res.code === 200) {
                const { comment, createdAt, like, questionList, title, userId, avatar_url, nickName } = res.data
                this.comment = comment
                this.createdAt = moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
                this.like = like
                this.questionList = questionList.map(item => ( {
                  ...item,
                  createdAt: moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
                } ))
                this.title = title
                this.userId = userId
                this.avatar_url = avatar_url
                this.nickName = nickName
              }
            })
          }
        })
      },
    },
  }
</script>

<style scoped lang="less">
  .detail {
    min-height: 600px;
    width: 1000px;
    margin: 20px auto;

    .clearfix {
      &:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
      }
    }

    .left {
      width: 700px;
      float: left;

      .title {
        color: #FF9D00;
        font-size: 20px;
      }

      .userInfo {
        margin-top: 20px;

        .nickName {
          padding-left: 10px;
          font-size: 16px;
          vertical-align: top;
          line-height: 30px;
        }

        .time {
          font-size: 14px;
          color: #666;
          float: right;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .rich-text {
        margin-top: 20px;
        margin-bottom: 20px;
        min-height: 100px;
        border: 1px dashed #CCC;
        padding: 20px;
        border-radius: 15px;
      }
    }

    .right {
      float: right;
    }
  }

  .setAnswer {
    float: right;
    color: green;
    padding-left: 20px;
    cursor: pointer;
  }

  .like {
    font-size: 14px;
    cursor: pointer;
  }
</style>
