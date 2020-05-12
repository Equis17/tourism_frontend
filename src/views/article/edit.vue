<template>
  <div class="edit">
    <div class="edit-cover">
      <div class="edit-upload-cover">
        <img class="edit-upload-cover-image" src="../../assets/page_bg.jpg">
      </div>
      <div v-show="coverFile===''" class="edit-cover-add">
        <i class="el-icon-picture-outline" @click="uploadClick">
          <input type="file" ref="file" hidden @change="uploadChange">
        </i>
        <p class="title">设置攻略头图</p>
        <p class="comment">图片建议选择尺寸大于1680px的高清大图，如相机原图</p>
      </div>
      <div v-show="coverFile!==''" class="edit-cover-edit" @click="uploadClick">
        <div class="edit-cover-edit-button">
          <i class="el-icon-s-tools"></i>
          <span>重新添加</span>
        </div>
      </div>
      <div class="edit-cover-input">

        <el-form :model="form" ref="editor-form" :rules="rules">
          <el-form-item prop="title">
            <el-input type="text" v-model="form.title" placeholder="输入攻略标题" @blur="handleSave()">

            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="article-comment">
      <el-input @blur="handleSave() " maxlength="200" v-model="comment" type="textarea" rows="3"
                placeholder="攻略简介"></el-input>
    </div>
    <div class="article-info">
      <el-form :inline="true" ref="info-form" :model="infoForm" label-width="80px">
        <el-form-item label="出发时间" prop="time">
          <el-date-picker @blur="handleSave() " v-model="infoForm.time" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="出行天数" prop="days">
          <el-input-number @blur="handleSave() " v-model="infoForm.days" :min="1" :max="10000"></el-input-number>
        </el-form-item>
        <el-form-item label="人物" prop="people">
          <el-input @blur="handleSave() " v-model="infoForm.people"></el-input>
        </el-form-item>
        <el-form-item label="人均费用" prop="fee">
          <el-input-number @blur="handleSave() " v-model="infoForm.fee" :min="1" :max="10000000"></el-input-number>
          RMB
        </el-form-item>

      </el-form>
    </div>
    <div class="edit-editor">
      <Editor :html="this.html" @save="handleSave" @publish="handlePublish">
      </Editor>
    </div>
  </div>
</template>

<script>
  import { createArticle, previewArticle, publishArticle, saveArticle } from '@/api/article'
  import { uploadCover } from '@/api/upload'
  import Editor from '@/components/Editor'

  export default {
    name: 'edit',
    components: {
      Editor,
    },
    created() {
      if (this.$store.getters.editId === '') {
        createArticle().then(res => {
          if (res.code === 200) this.$store.commit('edit/SET_EDIT_ID', res.data.id)
        })
      } else {
        previewArticle(this.$store.getters.editId).then(res => {
          if (res.code === 200) {
            const { imageUrl, title, richText, time, days, fee, people, comment } = res.data
            this.html = richText
            this.form.title = title
            this.infoForm = { time, days, fee, people }
            this.comment = comment
            if (imageUrl) {
              this.coverFile = imageUrl
            }
            if (this.coverFile !== '' && this.coverFile !== null) {
              const parentNode = document.querySelector('.edit-upload-cover')
              const imageNode = document.querySelector('.edit-upload-cover-image')
              parentNode.removeChild(imageNode)
              const newImageNode = document.createElement('img')
              newImageNode.src = imageUrl
              newImageNode.className = 'edit-upload-cover-image'
              newImageNode.style.width = '100%'
              parentNode.appendChild(newImageNode)
            }
          }
        })
      }
    },
    data() {
      return {
        html: '',
        form: {
          title: '',
        },
        coverFile: '',
        rules: {
          title: [
            { required: true, message: '请输入攻略标题' },
          ],
        },
        comment: '',
        infoForm: {
          time: '',
          days: 1,
          people: '',
          fee: 1,
        },
      }
    },
    methods: {
      uploadClick() {
        this.$refs.file.click()
      },
      uploadChange() {
        const fileList = this.getFile()
        if (fileList === null) return
        //本地预览
        const form = new FormData()
        form.append('file', fileList, fileList.name)
        uploadCover(form).then(res => {
          const imageURL = res.data[0]
          this.coverFile = imageURL
          const parentNode = document.querySelector('.edit-upload-cover')
          const imageNode = document.querySelector('.edit-upload-cover-image')
          parentNode.removeChild(imageNode)
          const newImageNode = document.createElement('img')
          newImageNode.src = imageURL
          newImageNode.className = 'edit-upload-cover-image'
          newImageNode.style.width = '100%'
          parentNode.appendChild(newImageNode)
          this.handleSave()
        })
      },
      getFile() {
        const file = this.$refs.file
        if (file.files.length === 0) {
          console.log('no file')
          return null
        }
        return file.files[0]
      },
      handleSave(richText) {
        if (this.$store.getters.editId === '') {
          createArticle().then(res => {
            if (res.code === 200) this.$store.commit('edit/SET_EDIT_ID', res.data.id)
            return saveArticle({
              id: res.data.id,
              richText,
              imageUrl: this.coverFile,
              title: this.form.title,
              comment: this.comment,
              ...this.infoForm,
            })
          })
        } else {
          saveArticle({
            id: this.$store.getters.editId,
            richText,
            imageUrl: this.coverFile,
            title: this.form.title,
            comment: this.comment,
            ...this.infoForm,
          })
        }
      },
      handlePublish() {
        this.$refs['editor-form'].validate((valid) => {
          if (valid) {
            if (this.$store.getters.editId) {
              publishArticle(this.$store.getters.editId).then(res => {
                if (res.code === 200) {
                  this.$router.push('/user/center/article')
                }
              })
            }
          }
        })
      },
    },
  }
</script>

<style scoped lang="less">
  .edit {
    background-color: #FFF;
    margin: 0 auto;

    &-upload-cover {
      overflow: hidden;
      height: 640px;

      img {
        width: 100%;
      }

    }

    &-cover {
      position: relative;
      width: 100%;
      overflow: hidden;
      background: url('../../assets/page_bg.jpg') center 0 no-repeat;
      background-size: cover;

      &-add {
        position: absolute;
        width: 600px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .title {
          font-size: 24px;
          line-height: 50px;
        }

        .comment {
          font-size: 16px;
          line-height: 25px;
          color: #666;
        }

        .el-icon-picture-outline {
          float: left;
          cursor: pointer;
          font-size: 80px;
          color: #FFF;

          &:hover {
            color: #FF9D00;
          }
        }
      }
    }

    &-cover-input {
      width: 800px;
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
    }

    &-cover-edit {
      width: 800px;
      position: absolute;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);

      &-button {
        cursor: pointer;
        background-color: rgba(0, 0, 0, .7);
        color: #FF9D00;
        line-height: 30px;
        width: 130px;
        font-size: 18px;

        &:hover {
          color: #FFF;

          i {
            color: #FFF;
          }
        }

        i {
          padding: 0 10px;
          color: #FF8A00;
        }
      }
    }

    &-editor {
      width: 1000px;
      margin: 0 auto;
    }
  }

  .article-comment {
    width: 1000px;
    margin: 25px auto;
    border: 1px dashed #CCC

  }

  .article-info {
    width: 1000px;
    padding-top: 22px;
    margin: 25px auto;
    border: 1px dashed #CCC;

    .el-input {
      width: 220px;
    }

    .el-input-number {
      width: 220px;
    }
  }
</style>
