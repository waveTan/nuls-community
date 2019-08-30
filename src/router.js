import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import NewAddress from './views/user/NewAddress'
import ImportAddress from './views/user/ImportAddress'
import BackupsAddress from './views/user/BackupsAddress'
import Vote from './views/vote/Vote'
import Council from './views/council/Council'
import Proposal from './views/proposal/Proposal'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/NewAddress',
      name: 'newAddress',
      component: NewAddress
    },
    {
      path: '/ImportAddress',
      name: 'importAddress',
      component: ImportAddress
    },
    {
      path: '/BackupsAddress',
      name: 'backupsAddress',
      component: BackupsAddress
    },
    {
      path: '/Vote',
      name: 'vote',
      component: Vote
    },
    {
      path: '/Council',
      name: 'council',
      component: Council
    },
    {
      path: '/Proposal',
      name: 'proposal',
      component: Proposal
    },
  ]
})
