<template>
  <div class="box clearfix">
    <ArticleList :deleteable="true" @like="handleLike" class="list" :article-list="articleList"></ArticleList>
  </div>
</template>

<script>
  import { getArticle } from '@/api/user'
  import ArticleList from '@/components/ArticleList'

  export default {
    name: 'myArticle',
    components: {
      ArticleList,
    },
    data() {
      return {
        articleList: [],
      }
    },
    created() {
      getArticle().then(res => {
        if (res.code === 200) {
          this.articleList.push(...res.data)
        }
      })
    },
    methods: {
      handleLike() {
        getArticle().then(res => {
          if (res.code === 200) {
            this.articleList = []
            this.articleList.push(...res.data)
          }
        })
      },
    },
  }
</script>

<style lang="less">
  .clearfix {
    &:after {
      content: '';
      clear: both;
      display: block;
      height: 0;
    }
  }

  .list {
    padding: 20px;
    box-sizing: border-box;

    .article-list-item {
      width: 660px;
    }

    .article-list-box {
      width: 400px;
    }
  }
</style>
