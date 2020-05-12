<template>
  <div v-if="articleList.length>0" class="article-list clearfix">
    <div v-for="articleItem in showList" :key="articleItem.id" class="article-list-item"
    >
      <img class="article-list-image" :src="articleItem.imageUrl">
      <div class="article-list-box">
        <dl>
          <dt>
            <span @click="toEdit(articleItem.id)" class="article-list-box-link">
              {{articleItem.title||'暂无标题'}}

            </span>
            <span @click="handleDelete(articleItem.id)" class="delete" v-if="deleteable">
                 删除
              </span>
          </dt>
          <dd>
            <span @click="toEdit(articleItem.id)" class="article-list-box-comment">
            {{articleItem.comment||'暂无简介'}}
            </span>
          </dd>
        </dl>
        <div class="article-list-box-footer">
        </div>
      </div>
    </div>
    <div>
      <el-pagination
        layout="prev, pager, next"
        :total="totalPage"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </div>
  </div>
  <div v-else class="empty">
    <div>
      <i class="el-icon-folder"></i>
      <p> 暂无内容</p>
      <el-button type="primary">写攻略</el-button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'editList',
    props: {
      articleList: Array,
      deleteable: Boolean,
    },
    data() {
      return {
        pageNum: 1,
      }
    },
    computed: {
      totalPage() {
        return this.articleList.length
      },
      showList() {
        return this.articleList.slice(( this.pageNum - 1 ) * 10, this.pageNum * 10)
      },
    },
    methods: {
      handlePageChange(num) {
        this.pageNum = num
      },
      toUserCenter(id) {
        this.$router.push(`/user/info/${id}`)
      },
      toEdit(id) {
        this.$store.commit('edit/SET_EDIT_ID', id)
        this.$router.push('/article/edit')
      },
      handleDelete(id) {
        this.$emit('delete', id)
      },
    },
  }
</script>

<style scoped lang="less">
  .article-list {
    box-sizing: border-box;
    float: right;
    background-color: #FFF;
    width: 700px;

    &-item {
      width: 700px;
      border: 1px dashed #CCC;
      padding: 10px;
      border-radius: 15px;
      box-sizing: border-box;
      margin-bottom: 20px;
      line-height: 1;
    }

    &-image {
      display: inline-block;
      float: left;
      width: 200px;
      height: 150px;
    }

    &-box {
      display: inline-block;
      width: 455px;
      height: 150px;
      word-wrap: break-word;

      dl {
        box-sizing: border-box;
        margin-left: 20px;
        height: 117px;
      }

      dt {
        height: 26px;
        margin-bottom: 10px;
        font-size: 18px;
        line-height: 26px;
      }

      dd {
        line-height: 20px;
        font-size: 14px;
        overflow: hidden;
        text-align: left;
      }

      &-link {
        height: 26px;
        display: block;
        color: #333;
        cursor: pointer;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }


      &-footer {
        margin-left: 20px;
        height: 33px;
        overflow: hidden;
        line-height: 33px;

        .el-avatar {
          float: left;
          cursor: pointer;
        }

        span {
          vertical-align: top;
        }

        .nickName, .watch {
          padding-left: 20px;
          font-size: 14px;
          color: #666;
          float: left;
        }

        .like {
          font-size: 16px;
          float: right;
          margin-right: 60px;
          cursor: pointer;

          &:hover {
            color: #FF9D00;
          }

        }
      }
    }

  }

  .el-pagination {
    margin-top: 20px;
  }

  .clearfix:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
  }

  .empty {
    padding: 20px;
    height: 300px;
    box-sizing: border-box;
    float: right;
    background-color: #FFF;
    width: 700px;
    text-align: center;

    div {
      position: relative;
      top: 40%;
      color: #CCC;

      i {
        font-size: 40px;
        display: block;
      }

      p {
        line-height: 30px;
        font-size: 16px;
      }
    }
  }

  .delete {
    font-size: 14px;
    float: right;
    color: red;
    cursor: pointer;
  }

  .el-pagination {
    line-height: 1;
  }
</style>
