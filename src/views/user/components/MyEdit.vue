<template>
  <div>
    <EditList :deleteable="true" @delete="handleDelete" class="list clearfix" :article-list="articleList"></EditList>
  </div>
</template>

<script>
  import { getArticleEdit } from '@/api/article'
  import { deleteArticle } from '@/api/user'
  import EditList from '@/components/EditList'

  export default {
    name: 'MyEdit',
    components: {
      EditList,
    },
    data() {
      return {
        articleList: [],
      }
    },
    created() {
      getArticleEdit().then(res => {
        if (res.code === 200) {
          this.articleList.push(...res.data)
        }
      })
    },
    methods: {
      handleDelete(id) {
        deleteArticle(id).then(res => {
          if (res.code === 200) {
            getArticleEdit().then(res => {
              if (res.code === 200) {
                this.articleList = []
                this.articleList.push(...res.data)
              }
            })
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
