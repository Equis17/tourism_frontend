<template>
  <div class="container">
    <div class="nav">
      <ul>
        <li>
          <router-link to="/article/search/all">旅游攻略</router-link>
        </li>
        <li>
          <router-link to="/user/center/article">我的攻略</router-link>
        </li>
      </ul>
    </div>
    <div class="left clearfix">
      <el-input v-model="searchForm.search" placeholder="搜索小伙伴发布的攻略">
        <template #suffix="">
          <span @click="submitForm" class="el-icon-search" style="line-height: 40px;cursor: pointer"></span>
        </template>
      </el-input>
      <ArticleList @like="getArticle" :article-list="articleList"></ArticleList>
    </div>
    <div class="right clearfix">
      <RecommendList type="article" @like="getHotArticle" :recommend-list="recommendList"></RecommendList>
    </div>
  </div>
</template>

<script>
  import { getArticleList, getHotArticleRecommend, searchArticle } from '@/api/public'
  import ArticleList from '@/components/ArticleList'
  import RecommendList from '@/components/RecommendList'
  import moment from 'moment'

  export default {
    name: 'index',
    components: {
      RecommendList,
      ArticleList,
    },
    data: function() {
      return {
        searchForm: {
          search: '',
        },
        articleList: [],
        recommendList: [],
        pageNum: 1,
      }
    },
    computed: {
      totalPage() {
        return this.list.length
      },
      showList() {
        return this.list.slice(( this.pageNum - 1 ) * 10, this.pageNum * 10)
      },
    },
    created() {
      if (this.$router.history.current.params.search === 'all') {
        getArticleList().then(res => {
          if (res.code === 200) {
            const list = res.data.articleList.map(item => ( {
              ...item,
              createdAt: moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
            } ))
            this.articleList.push(...list)
          }
        })
      } else {
        searchArticle(this.$router.history.current.params.search).then(res => {
          if (res.code === 200) {
            const list = res.data.map(item => ( {
              ...item,
              createdAt: moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
            } ))
            this.articleList.push(...list)
          }
        })
      }
      this.getHotArticle()
    },
    methods: {
      submitForm() {
        if (this.searchForm.search === '') {
          this.$router.push(`/article/search/all`)
          this.getArticle()
        } else {
          if (this.$router.history.current.params.search !== this.searchForm.search) {
            this.$router.push(`/article/search/${this.searchForm.search}`)
            this.getArticle()
          }
        }
      },
      handlePageChange(num) {
        this.pageNum = num
      },
      getArticle() {
        if (this.$router.history.current.params.search === 'all') {
          getArticleList().then(res => {
            if (res.code === 200) {
              const list = res.data.articleList.map(item => ( {
                ...item,
                createdAt: moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
              } ))
              this.articleList = []
              this.articleList.push(...list)
            }
          })
        } else {
          searchArticle(this.$router.history.current.params.search).then(res => {
            if (res.code === 200) {
              const list = res.data.map(item => ( {
                ...item,
                createdAt: moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
              } ))
              this.articleList = []
              this.articleList.push(...list)
            }
          })
        }
      },
      getHotArticle() {
        getHotArticleRecommend().then(res => {
          if (res.code === 200) {
            const data = res.data.map(item => ( {
              ...item,
              time: moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
            } ))
            this.recommendList = []
            this.recommendList.push(...data)
          }
        })
      },
    },
  }
</script>

<style scoped lang="less">
  .nav {
    height: 50px;
    line-height: 50px;
    font-size: 16px;

    li {
      float: left;

      &:after {
        content: '|';
        display: inline-block;
        color: #CCC;
        padding: 0 10px;


      }

      &:last-child:after {
        content: '';
      }
    }
  }

  .clearfix {
    &:after {
      display: block;
      content: '';
      height: 0;
      clear: both;
    }
  }

  .container {
    width: 1000px;
    box-sizing: border-box;
    margin: 0 auto;

    .right {
      margin-top: 20px;
      width: 300px;
      float: left;
    }

    .left {
      width: 700px;
      float: left;

      .el-input {
        margin-bottom: 20px;
      }
    }
  }

  .list {
    min-height: 600px;

    &-item {
      border-radius: 15px;
      margin-bottom: 20px;
      padding: 20px;
      border: 1px dashed #CCC;

      .link {
        font-size: 20px;
        line-height: 30px;
      }

      .comment {
        padding-top: 20px;
        min-height: 70px;
        max-height: 70px;
        height: 70px;
        overflow: hidden;
        font-size: 14px !important;
        color: #666;
      }

      .nickName {
        line-height: 30px;
        vertical-align: top;
        padding-left: 10px;
      }

      .time {
        color: #666;
        float: right;
        line-height: 30px;
        vertical-align: top;
        font-size: 13px;
      }
    }
  }
</style>
