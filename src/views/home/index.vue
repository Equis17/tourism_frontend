<template>
  <div class="home">
    <VerticalCarousel :hot-list="hotList"></VerticalCarousel>
    <DetailLayout>
      <template #aside>
        <RecommendList @like="getQuestion" :recommend-list="recommendList"></RecommendList>
      </template>
      <template #main>
        <ArticleList :article-list="articleList" @like="getArticle"></ArticleList>
      </template>
    </DetailLayout>
  </div>
</template>

<script>
  import { getArticleList, getHotList, getHotQuestionRecommend } from '@/api/public'
  import ArticleList from '@/components/ArticleList'
  import RecommendList from '@/components/RecommendList'
  import DetailLayout from '@/layout/DetailLayout'
  import VerticalCarousel from '@/views/home/VerticalCarousel'
  import moment from 'moment'

  export default {
    name: 'index',
    components: {
      VerticalCarousel,
      DetailLayout,
      ArticleList,
      RecommendList,
    },
    data() {
      return {
        articleList: [],
        recommendList: [],
        hotList: [],
      }
    },
    created() {
      getArticleList().then(res => {
        this.articleList.push(...res.data.articleList)
      })
      getHotList().then(res => {
        this.hotList.push(...res.data)
      })
      getHotQuestionRecommend().then(res => {
        const data = res.data.map(item => ( { ...item, time: moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss') } ))
        this.recommendList.push(...data)
      })
    },
    methods: {
      getArticle() {
        getArticleList().then(res => {
          this.articleList = []
          this.articleList.push(...res.data.articleList)
        })
      },
      getQuestion() {
        getHotQuestionRecommend().then(res => {
          const data = res.data.map(item => ( { ...item, time: moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss') } ))
          this.recommendList = []
          this.recommendList.push(...data)
        })
      },
    },
  }
</script>

<style scoped>
  .home {
    overflow: hidden;
  }
</style>
