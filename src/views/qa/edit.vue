<template>
  <div class="container">
    <div class="nav">
      <ul>
        <li>
          <router-link to="/">问答首页</router-link>
        </li>
        <li>
          <span>我要提问</span>
        </li>
      </ul>
    </div>
    <div class="left">
      <el-form :rules="rules" label-position="top" ref="questionForm" :model="form" label-width="80px">
        <el-form-item label="问题标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <p style="font-size: 12px;margin-bottom: 20px">问题详细内容</p>
        <div class="editor" id="editor" ref="editor"></div>
      </el-form>
      <div>
        <el-button type="primary" @click="handleSubmit">发布提问</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import { createQuestion } from '@/api/question'
  import { uploadImage } from '@/api/upload'
  import Editor from 'wangeditor'

  export default {
    name: 'edit.vue',
    data: function() {
      const validateTitle = (rule, value, callback) => {
        if (value === '')
          callback(new Error('标题不能为空'))
        callback()
      }
      return {
        form: {
          title: '',
          comment: '',
        },
        rules: {
          title: [
            { validator: validateTitle, trigger: 'blur' },
          ],
        },
        editor: {},
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
      this.editor.customConfig.onblur = html => {
        this.form.comment = html
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
            this.form.comment = this.editor.txt.html()
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
      containerDOM.style.minHeight = '400px'
      containerDOM.style.height = 'auto'
    },
    methods: {
      handleSubmit() {
        this.$refs['questionForm'].validate((valid) => {
          if (valid) {
            createQuestion({ ...this.form, comment: this.editor.txt.html() }).then(res => {
              if (res.code === 200) {
                this.$router.push('/QA/search/all')
              }
            })
          }
        })
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

  .container {
    width: 1000px;
    margin: 0 auto;

    .left {
      width: 700px;
      float: left;
    }
  }

  .editor {
    width: 100%;
    margin-bottom: 40px;

  }


  .w-e-text {
    overflow-y: auto !important;

  }

  .nav {
    height: 50px;
    line-height: 50px;
    font-size: 14px;

    li {
      float: left;

      &:after {
        content: '>';
        display: inline-block;
        color: #CCC;
        padding: 0 10px;


      }

      &:last-child:after {
        content: '';
      }
    }
  }
</style>
