import NotFound from '@/components/NotFound'
import Layout from '@/layout/index'
import ArticleDetail from '@/views/article/detail'
import ArticleEdit from '@/views/article/edit'
import Article from '@/views/article/index'
import ArticlePreview from '@/views/article/preview'
import Destination from '@/views/destination'
import Exit from '@/views/exit'
import Home from '@/views/home/index'
import Login from '@/views/login/index'
import QADetail from '@/views/qa/detail'
import QAEdit from '@/views/qa/edit'
import QA from '@/views/qa/index'
import Register from '@/views/register/index'
import UserCenter from '@/views/user/center'
import ArticleInfo from '@/views/user/components/ArticleInfo'
import MyArticle from '@/views/user/components/MyArticle'
import MyEdit from '@/views/user/components/MyEdit'
import MyQuestion from '@/views/user/components/MyQuestion'
import QuestionInfo from '@/views/user/components/QuestionInfo'
import UserInfo from '@/views/user/info'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home,
        meta: {
          title: 'home',
          icon: 'qq',
        },
      },
      {
        path: 'user/info/:id',
        component: UserInfo, redirect: 'user/info/:id/article',
        children: [
          { path: 'article', component: ArticleInfo },
          { path: 'question', component: QuestionInfo },
        ],
      },
      {
        path: 'article/search/:search',
        component: Article,
      },
      {
        path: 'article/detail/:id',
        component: ArticleDetail,
      },
      {
        path: 'article/edit',
        component: ArticleEdit,
      },
      {
        path: 'article/preview',
        component: ArticlePreview,
      },
      {
        path: 'QA/detail/:id',
        component: QADetail,
      },
      {
        path: 'user/center',
        component: UserCenter,
        redirect: 'user/center/article',
        children: [
          { path: 'article', component: MyArticle },
          { path: 'edit', component: MyEdit },
          { path: 'question', component: MyQuestion },
        ],
      },
      {
        path: 'destination',
        component: Destination,
      },
      {
        path: 'QA/search/:search',
        component: QA,
      },
      {
        path: 'QA/edit',
        component: QAEdit,
      },
    ],
  },
  {
    path: '/exit',
    component: Exit,
  },
  {
    path: '*',
    component: NotFound,
  },
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constRoutes,
})
