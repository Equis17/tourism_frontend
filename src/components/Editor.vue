<template>
  <div class="subcontainer">
    <div class="editor" id="editor" ref="editor"></div>
    <div class="button-group">
      <router-link to="/article/preview" class="preview">预览</router-link>
      <el-button type="normal" @click="handleSave">保存草稿箱</el-button>
      <el-button type="primary" @click="handlePublish">发布攻略</el-button>
    </div>
  </div>

</template>

<script>
  import { uploadImage } from '@/api/upload'
  import Editor from 'wangeditor'

  export default {
    name: 'Editor',
    props: {
      html: String,
    },
    data() {
      return {
        activeName: 'first',
        editor: '', // 存放实例化的wangEditor对象，在多个方法中使用
        interval: null,
      }
    },
    mounted() {
      const _this = this
      this.interval = setInterval(() => {
        this.$emit('save', this.editor.txt.html())
      }, 60 * 1000)
      this.editor = new Editor('#editor') //new即可

      this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
      this.editor.customConfig.uploadImgServer = '/api/upload/uploadImage'// 配置服务器端地址
      this.editor.customConfig.uploadImgHeaders = {} // 自定义 header
      this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024 // 将图片大小限制为 10M
      this.editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 30 * 1000 // 设置超时时间
      this.editor.customConfig.zIndex = 2000
      this.editor.customConfig.onblur = function(html) {
        // html 即编辑器中的内容
        _this.$emit('save', html)
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
            _this.$emit('save', _this.editor.txt.html())
          }
        })

      }
      //下面的为一些配置参数，默认全部都有，我们需要那些留下那些即可
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
      containerDOM.style.minHeight = '600px'
      containerDOM.style.height = 'auto'
    },
    methods: {
      handlePublish() {
        this.$emit('publish', this.editor.txt.html())
      },
      handleSave() {
        this.$emit('save', this.editor.txt.html())
      },
    },
    watch: {
      html() {
        this.editor.txt.html(this.html)
      },
    },
    beforeDestory() {
      clearInterval(this.interval)
      console.log('destory')
    },
  }
</script>

<style scoped lang="less">
  .subcontainer {
    height: 100%;
    width: 100%;

    .tabs {
      padding: 20px 0;
    }
  }

  .editor {
    width: 100%;
    margin-bottom: 40px;

  }

  .w-e-text-container {
    height: 600px !important;
  }

  .w-e-text {
    overflow-y: auto !important;

  }

  .button-group {
    text-align: right;
    margin-bottom: 30px;
  }

  .preview {
    float: left;
  }
</style>
