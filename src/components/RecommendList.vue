<template>
  <div v-if="recommendList.length>0" class="recommend-list">
    <div v-for="item in recommendList" :key="item.id">
      <div class="recommend-list-item">
        <p>
          <span @click="toUserCenter(item.userId)">
            <el-avatar :src="item.avatar_url" :size="40"></el-avatar>
          </span>
          <router-link class="title" :to="`/QA/detail/${item.id}`">{{item.title}}</router-link>
        </p>
        <div class="footer">
          <span class="time">{{item.time}}</span>
          <span class="like" @click="handleLike(item.id)" :style="`color: ${item.isUserLike?'#FF9D00':'#000'}`">
            <i class="el-icon-thumb"></i>
            <span>{{item.like||0}}</span>
         </span>
        </div>
      </div>
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

  import { likeArticle } from '@/api/article'
  import { likeQuestion } from '@/api/question'

  export default {
    name: 'RecommendList',
    props: {
      recommendList: {
        type: Array,
      },
      type: {
        type: String,
      },
    },
    methods: {
      toUserCenter(id) {
        this.$router.push(`/user/info/${id}`)
      },
      handleLike(id) {
        this.type !== 'article'
          ? likeQuestion({ id }).then(res => {
            if (res.code === 200) {
              this.$emit('like')
            }
          })
          : likeArticle({ id }).then(res => {
            if (res.code === 200) this.$emit('like')
          })
      },
    },
  }
</script>

<style scoped lang="less">
  .recommend-list {
    padding: 20px;
    box-sizing: border-box;

    &-item {
      border: 1px dashed #CCC;
      border-radius: 15px;
      padding: 20px;
      text-align: left;
      margin-top: 20px;

      .footer {
        margin-top: 10px;
      }

      .title {
        line-height: 40px;
        margin-left: 10px;
        vertical-align: top;
        color: #FF9D00;
        font-size: 16px;
      }

      .time {
        color: #666;
        font-size: 14px;
      }

      .like {
        font-size: 14px;
        float: right;
        cursor: pointer;
      }
    }
  }

  .empty {
    padding: 20px;
    height: 300px;
    box-sizing: border-box;
    float: right;
    background-color: #FFF;
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


  .el-avatar {
    cursor: pointer;
  }

</style>
