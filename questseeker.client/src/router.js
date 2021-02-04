import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

const questId = 'quests/:questid'
function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: questId + '/map',
    name: 'Map',
    component: loadPage('MapPage'),
    beforeEnter: authGuard
  },
  {
    path: questId + '/objectivedetails/:id',
    name: 'ObjectiveDetails',
    component: loadPage('ObjectiveDetailsPage'),
    beforeEnter: authGuard
  },
  {
    path: questId + '/addlocationpage',
    name: 'AddLocationPage',
    component: loadPage('AddLocationPage'),
    beforeEnter: authGuard
  },
  {
    path: questId + '/objectivereviewpage',
    name: 'ObjectiveReviewPage',
    component: loadPage('ObjectiveReviewPagePage'),
    beforeEnter: authGuard
  },
  {
    path: questId + '/teamspage',
    name: 'TeamsPage',
    component: loadPage('TeamsPagePage'),
    beforeEnter: authGuard
  },
  {
    path: questId + '/answerspage/:id',
    name: 'AnswersPage',
    component: loadPage('AnswersPage'),
    beforeEnter: authGuard
  }
]

const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

export default router
