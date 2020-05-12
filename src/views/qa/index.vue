<template>
  <div class="container">
    <div class="nav">
      <ul>
        <li>
          <router-link to="/QA/search/all">问答首页</router-link>
        </li>
        <li>
          <router-link to="/user/center/question">我的问答</router-link>
        </li>
      </ul>
    </div>
    <div class="left clearfix">
      <el-input v-model="searchForm.search" placeholder="提问前请先搜索,看看你的问题是否有小伙伴解决了">
        <template #suffix="">
          <span @click="submitForm" class="el-icon-search" style="line-height: 40px;cursor: pointer"></span>
        </template>
      </el-input>
      <div class="list">
        <div class='list-item' v-for="item in showList " :key="item.id">
          <router-link class="link" :to="`/QA/detail/${item.id}`">{{item.title}}</router-link>
          <div class="comment" v-if="item.comment!==''" v-html="item.comment"></div>
          <div v-else class="comment">暂无问答</div>
          <div class="list-item-footer">
            <el-avatar :size="30" :src="item.avatar_url"></el-avatar>
            <span class="nickName">{{item.nickName}}</span>
            <span class="nickName like" :style="`color:${item.isUserLike?'#FF9D00':'#000'}`"
                  @click="handleLike(item.id)">
            <i class="el-icon-thumb"></i>
            <span>{{item.like||0}}</span>
          </span>
            <span class="time">{{item.createdAt}}</span>
          </div>
        </div>
        <el-pagination
          layout="prev, pager, next"
          :total="totalPage"
          @current-change="handlePageChange"
        >
        </el-pagination>
      </div>
    </div>
    <div class="right clearfix">
      <RecommendList @like="getArticle" type="article" :recommend-list="recommendList"></RecommendList>
    </div>
  </div>
</template>

<script>
  import { getHotArticleRecommend, getQuestionList, searchQuestion } from '@/api/public'
  import { likeQuestion } from '@/api/question'
  import RecommendList from '@/components/RecommendList'
  import moment from 'moment'

  export default {
    name: 'index',
    components: {
      RecommendList,
    },
    data: function() {
      return {
        searchForm: {
          search: '',
        },
        list: [],
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
        getQuestionList().then(res => {
          if (res.code === 200) {
            const list = res.data.map(item => ( {
              ...item,
              createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            } ))
            this.list.push(...list)
          }
        })
      } else {
        searchQuestion(this.$router.history.current.params.search).then(res => {
          if (res.code === 200) {
            const list = res.data.map(item => ( {
              ...item,
              createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            } ))
            this.list.push(...list)
          }
        })
      }
      getHotArticleRecommend().then(res => {
        if (res.code === 200) {
          const data = res.data.map(item => ( { ...item, time: moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss') } ))
          this.recommendList.push(...data)
        }
      })
    },
    methods: {
      handleLike(id) {
        likeQuestion({ id }).then(res => {
          if (res.code === 200) {
            if (this.$router.history.current.params.search === 'all') {
              getQuestionList().then(res => {
                if (res.code === 200) {
                  const list = res.data.map(item => ( {
                    ...item,
                    createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                  } ))
                  this.list = []
                  this.list.push(...list)
                }
              })
            } else {
              searchQuestion(this.$router.history.current.params.search).then(res => {
                if (res.code === 200) {
                  const list = res.data.map(item => ( {
                    ...item,
                    createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                  } ))
                  this.list = []
                  this.list.push(...list)
                }
              })
            }
          }
        })
      },
      getArticle() {
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
      submitForm() {
        if (this.searchForm.search === '') {
          this.$router.push(`/QA/search/all`)
          getQuestionList().then(res => {
            if (res.code === 200) {
              const list = res.data.map(item => ( {
                ...item,
                createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
              } ))
              this.list = []
              this.list.push(...list)
            }
          })
        } else {
          if (this.$router.history.current.params.search !== this.searchForm.search) {
            this.$router.push(`/QA/search/${this.searchForm.search}`)
            if (this.searchForm.search === 'all') {
              getQuestionList().then(res => {
                if (res.code === 200) {
                  const list = res.data.map(item => ( {
                    ...item,
                    createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                  } ))
                  this.list = []
                  this.list.push(...list)
                }
              })
            } else {
              searchQuestion(this.$router.history.current.params.search).then(res => {
                if (res.code === 200) {
                  const list = res.data.map(item => ( {
                    ...item,
                    createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                  } ))
                  this.list = []
                  this.list.push(...list)
                }
              })
            }
          }
        }
      },
      handlePageChange(num) {
        this.pageNum = num
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

      .like {
        cursor: pointer;
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
