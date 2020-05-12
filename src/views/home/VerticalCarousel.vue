<template>
  <div class="carousel">
    <search class="search"></search>
    <el-carousel height="640px" arrow="always" :autoplay="true">
      <el-carousel-item v-for="item in hotList" :key="item.id">
        <div class="item" @click="handleClick(item.id)">
          <p class="title">{{ item.title }}</p>
          <p v-if="item.comment!==null" class="comment"><span class="quote">"</span>{{item.comment}}<span
            class="quote">"</span></p>
          <div>
            <img class="cover" :src="item.imageUrl">
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import Search from '@/components/Search'

  export default {
    name: 'VerticalCarousel',
    components: {
      Search,
    },
    props: {
      hotList: Array,
    },
    methods: {
      handleClick(id) {
        this.$router.push(`/article/detail/${id}`)
      },
    },
  }
</script>

<style scoped lang="less">
  .carousel {
    position: relative;

    .search {
      position: absolute;
      z-index: 1000;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10px;
    }
  }

  .item {
    cursor: pointer;
    position: relative;
  }

  .title {
    position: absolute;
    color: #FFF;
    top: 10%;
    left: 50%;
    transform: translateX(-600px);
    font-size: 32px;
    font-weight: bold;
    text-shadow: 0 1px 3px rgba(0, 0, 0, .9);
  }

  .comment {
    position: absolute;
    color: #FFF;
    top: 18%;
    left: 50%;
    transform: translateX(-600px);
    font-size: 28px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, .9);
  }

  .quote {
    font-size: 40px;
    color: #FF9D00;
  }

  .cover {
    width: 100%;
  }


</style>
