<template>
  <div v-if="showList.length>0" class="list">
    <div class='list-item' v-for="item in showList " :key="item.id">
      <router-link class="link" :to="`/QA/detail/${item.id}`">{{item.title}}</router-link>
      <div class="comment" v-if="item.comment!==''" v-html="item.comment"></div>
      <div v-else class="comment">暂无问答</div>
      <div class="list-item-footer">
        <el-avatar :size="30" :src="item.avatar_url"></el-avatar>
        <span class="nickName">{{item.nickName}}</span>
        <span class="nickName like" @click="handleLike(item.id)"
              :style="`color: ${item.isUserLike?'#FF9D00':'#000'}`">
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
  <div v-else class="empty">
    <div>
      <i class="el-icon-folder"></i>
      <p> 暂无内容</p>
    </div>
  </div>
</template>

<script>
  import { getQuestionByUserId } from '@/api/public'
  import { likeQuestion } from '@/api/question'
  import moment from 'moment'

  export default {
    name: 'MyQuestion',
    data() {
      return {
        list: [],
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
      if (this.$router.history.current.params.id) {
        getQuestionByUserId(this.$router.history.current.params.id).then(res => {
          if (res.code === 200) {
            const list = res.data.map(item => ( {
              ...item,
              createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            } ))
            this.list.push(...list)
          }
        })
      }
    },
    methods: {
      handlePageChange(num) {
        this.pageNum = num
      },
      handleLike(id) {
        likeQuestion({ id }).then(res => {
          if (res.code === 200) {
            getQuestionByUserId(this.$router.history.current.params.id).then(res => {
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
        })
      },
    },
  }
</script>

<style scoped lang="less">
  .list {
    min-height: 600px;
    background-color: #FFF;
    width: 700px;

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

      .like {
        cursor: pointer;
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
</style>
