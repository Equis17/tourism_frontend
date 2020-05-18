<template>
  <div class="destination">
    <search title="Don't fear the unknown" class="search"></search>
    <div class="info">
      <p class="title">{{title}}</p>
      <span v-if="comment">
        <span class="quote">"</span>
          <span class="comment">{{comment}}</span>
        <span class="quote">"</span>
      </span>
      <router-link :to="`/article/detail/${id}`" class="link">阅读全文</router-link>
    </div>
    <div class="cover">
      <img :src="imgUrl">
    </div>
    <div class="hot">
      <div class="hotList">
        <p class="title">
          <router-link to="/article/search/热门">热门目的地</router-link>
        </p>
        <ul ref="hotRef" class="hotItem-ul clearfix" @mouseover="hoverHot">
          <li style="color:#FF9D00" value="0">国内</li>
          <li value="1">港澳台</li>
          <li value="2">日本</li>
          <li value="3">东南亚</li>
          <li value="4">南亚 西亚</li>
          <li value="5">欧洲 美洲</li>
          <li value="6">澳洲 非洲</li>
        </ul>
        <div class="hotBox">
          <div v-for="(item,index) in hotItem" :key="item.name" :class="index%2===0 ?'left clearfix':'right clearfix'">
            <router-link :to="`/article/search/${item.name}`" class="title">{{item.name}}</router-link>
            <router-link class="city" v-for="(valueItem) in item.value.split(' ')" :to="`/article/search/${valueItem}`"
                         :key="valueItem">{{valueItem}}
            </router-link>
          </div>
        </div>

      </div>
    </div>
    <div class="month">
      <div class="monthList">
        <p class="title">
          <router-link to="/article/search/推荐">当季推荐</router-link>
        </p>
        <ul ref="monthRef" class="monthItem-ul clearfix" @mouseover="hoverMonth">
          <li style="color:#FF9D00" value="0">1月</li>
          <li value="1">2月</li>
          <li value="2">3月</li>
          <li value="3">4月</li>
          <li value="4">5月</li>
          <li value="5">6月</li>
          <li value="6">7月</li>
          <li value="7">8月</li>
          <li value="8">9月</li>
          <li value="9">10月</li>
          <li value="10">11月</li>
          <li value="11">12月</li>
        </ul>
        <div class="monthBox">
          <div v-for="(item) in monthItem" :key="item.name" class="month-item">
            <router-link :to="`/article/search/${item.name}`" class="title">{{item.name}}</router-link>
            <img :src="item.value">
          </div>
        </div>
      </div>
    </div>
    <div class="theme">
      <div class="themeList">
        <p class="title">
          <router-link to="/article/search/主题">主题精选</router-link>
        </p>
        <ul ref="themeRef" class="themeItem-ul clearfix" @mouseover="hoverTheme">
          <li style="color:#FF9D00" value="0">全年适宜</li>
          <li value="1">季节</li>
          <li value="2">出行方式</li>
          <li value="3">节假日</li>
        </ul>
        <div class="themeBox">
          <div v-for="(item) in themeItem" :key="item.name" class="theme-item">
            <router-link :to="`/article/search/${item.name}`" class="title">{{item.name}}</router-link>
            <img :src="item.value">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { getDestinationArticle, getDestinationList } from '@/api/public'
  import Search from '@/components/Search'

  export default {
    name: 'index',
    components: {
      Search,
    },
    computed: {
      hotItem() {
        return this.hotList[this.hotIndex]
      },
      monthItem() {
        return this.monthList[this.monthIndex]
      },
      themeItem() {
        return this.themeList[this.themeIndex]
      },
    },
    data() {
      return {
        imgUrl: '../../assets/page_bg.jpg',
        title: '',
        comment: '',
        id: '',
        hotList: [],
        hotIndex: 0,
        monthIndex: 0,
        monthList: [],
        themeIndex: 0,
        themeList: [],
      }
    },
    created() {
      getDestinationArticle().then(res => {
        if (res.code === 200) {
          const { imageUrl, title, comment, id } = res.data[0]
          this.imgUrl = imageUrl
          this.title = title
          this.comment = comment
          this.id = id

        }
      })
      getDestinationList().then(res => {
        if (res.code === 200) {
          const { hot, theme, month } = res.data
          this.hotList.push(...hot)
          this.themeList.push(...theme)
          this.monthList.push(...month)
        }
      })
    },
    methods: {
      hoverHot(e) {
        if (e.target.value !== this.hotIndex) {
          const ul = this.$refs.hotRef
          let selectors = [ ...ul.querySelectorAll('li') ]
          selectors.map(item => ( item.style.color = '#000' ))
          selectors[e.target.value].style.color = '#FF9D00'
          this.hotIndex = e.target.value
        }
      },
      hoverMonth(e) {
        if (e.target.value !== this.monthIndex) {
          const ul = this.$refs.monthRef
          let selectors = [ ...ul.querySelectorAll('li') ]
          selectors.map(item => ( item.style.color = '#000' ))
          selectors[e.target.value].style.color = '#FF9D00'
          this.monthIndex = e.target.value
        }
      },
      hoverTheme(e) {
        if (e.target.value !== this.themeIndex) {
          const ul = this.$refs.themeRef
          let selectors = [ ...ul.querySelectorAll('li') ]
          selectors.map(item => ( item.style.color = '#000' ))
          selectors[e.target.value].style.color = '#FF9D00'
          this.themeIndex = e.target.value
        }
      },
    },
  }
</script>

<style scoped lang="less">
  .clearfix {
    &:after {
      clear: both;
      content: '';
      height: 0;
      display: block;
    }
  }

  .destination {
    position: relative;
    overflow: hidden;
  }

  .search {
    position: absolute;
    right: 55%;
    top: 600px;
    width: 400px;
  }

  .info {
    position: absolute;
    width: 500px;
    word-wrap: break-word;
    left: 60%;
    top: 400px;
    color: #FFF;

    .link {
      font-size: 27px;
      text-shadow: 0 0 3px rgba(0, 0, 0, .9);

    }

    .title {
      font-size: 42px;
      text-shadow: 0 0 3px rgba(0, 0, 0, .9);
      margin-bottom: 20px;
    }

    .quote {
      color: #FF9D00;
      font-size: 30px;
      text-shadow: 0 0 3px rgba(0, 0, 0, .9);
    }

    .comment {
      font-size: 24px;
      text-shadow: 0 0 3px rgba(0, 0, 0, .9);
    }
  }

  .cover {
    img {
      height: 970px;
      width: 100%;
    }
  }

  .hot {
    width: 100%;
    border-bottom: 2px solid #CCC;
  }

  .hotList {
    width: 1000px;
    margin: 20px auto;

    .title {
      text-align: center;
      font-size: 24px;
      line-height: 48px;
    }

    .hotItem-ul {
      display: flex;

      li {
        float: left;
        flex: 1;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
      }
    }

    .hotBox {
      min-height: 400px;
      margin-top: 20px;

      .left {
        width: 450px;
        float: left;
        border-bottom: 1px dashed #EEE;
      }

      .right {
        width: 450px;
        border-bottom: 1px dashed #EEE;

        float: right;
        text-align: left;
      }

      .title {
        font-size: 18px;
        padding-right: 10px;
      }

      .city {
        font-size: 14px;
      }
    }
  }

  .month {
    width: 100%;
    background-color: #FAFAFA;
  }

  .monthList {
    min-height: 650px;
    width: 1000px;
    padding-top: 20px;
    margin: 0 auto;

    .title {
      text-align: center;
      font-size: 24px;
      line-height: 48px;
    }

    .monthItem-ul {
      display: flex;

      li {
        float: left;
        text-align: center;

        flex: 1;
        font-size: 18px;
        cursor: pointer;
      }
    }

    .month-item {
      position: relative;
      display: inline-block;
      padding: 15px;

      .title {
        position: absolute;
        font-size: 18px;
        color: #FFF;
        bottom: 40px;
        left: 40px;
        text-shadow: 0 0 3px rgba(0, 0, 0, .9);
      }

      img {
        border-radius: 10px;
        min-height: 200px;
        width: 300px;
        height: auto;
      }
    }
  }


  .theme {
    width: 100%;
    background-color: #FFF;
  }

  .themeList {
    min-height: 650px;
    width: 1000px;
    padding-top: 20px;
    margin: 0 auto;

    .title {
      text-align: center;
      font-size: 24px;
      line-height: 48px;
    }

    .themeItem-ul {
      display: flex;

      li {
        float: left;
        text-align: center;
        flex: 1;
        font-size: 18px;
        cursor: pointer;
      }
    }

    .theme-item {
      position: relative;
      display: inline-block;
      padding: 15px;

      .title {
        position: absolute;
        font-size: 18px;
        color: #FFF;
        bottom: 40px;
        left: 40px;
        text-shadow: 0 0 3px rgba(0, 0, 0, .9);
      }

      img {
        border-radius: 10px;
        min-height: 200px;
        width: 300px;
        height: auto;
      }
    }
  }

</style>
