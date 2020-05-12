<template>
  <div v-if="articleList.length>0" class="article-list clearfix">
    <div v-for="articleItem in showList" :key="articleItem.id" class="article-list-item">
      <img class="article-list-image" :src="articleItem.imageUrl">
      <div class="article-list-box">
        <dl>
          <dt>
            <router-link :to="`/article/detail/${articleItem.id}`" class="article-list-box-link">
              {{articleItem.title||'暂无标题'}}
            </router-link>
          </dt>
          <dd>
            <router-link :to="`/article/detail/${articleItem.id}`" class="article-list-box-comment">
              {{articleItem.comment||'暂无简介'}}
            </router-link>
          </dd>
        </dl>
        <div class="article-list-box-footer">
          <span @click="toUserCenter(articleItem.userId)">
            <el-avatar :src="articleItem.avatar_url" :size="30"></el-avatar>
          </span>
          <router-link class="nickName" :to="`/user/info/${articleItem.userId}`">{{articleItem.nickName}}</router-link>
          <span class="watch">
            <i class="el-icon-view"></i>
          <span>{{articleItem.watch||0}}</span>
         </span>
          <span @click="handleDelete(articleItem.id)" class="delete" v-if="deleteable">
            删除
          </span>
          <span class="like" :style="`color:${articleItem.isUserLike?'#FF9D00':'#000'}`"
                @click="handleLike(articleItem.id)">
            <i class="el-icon-thumb"></i>
            <span>{{articleItem.like||0}}</span>
          </span>

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
      <el-button v-if="isMy" type="primary">写攻略</el-button>
    </div>
  </div>
</template>

<script>
  import { likeArticle } from '@/api/article'
  import { deleteArticle } from '@/api/user'

  export default {
    name: 'ArticleList',
    props: {
      deleteable: Boolean,
      isMy: {
        type: Boolean,
        default: true,
      },
      articleList: Array,
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
      handleDelete(id) {
        deleteArticle(id).then(res => {
          if (res.code === 200) {
            this.$emit('like')
          }
        })
      },
      handlePageChange(num) {
        this.pageNum = num
      },
      toUserCenter(id) {
        this.$router.push(`/user/info/${id}`)
      },
      handleLike(id) {
        likeArticle({ id }).then(res => {
          if (res.code === 200) {
            this.$emit('like')
          }
        })
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

  .el-pagination {
    line-height: 1;
  }

  .delete {
    font-size: 14px;
    float: right;
    color: red;
    cursor: pointer;
  }
</style>
