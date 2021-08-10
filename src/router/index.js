import Vue from 'vue'
import VueRouter from 'vue-router'
import RouteView from './RouteView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/Admin/WelcomeAdmin',
    component: () => import('@/views/Layouts/BasicLayout'),
    children: [
      {
        path: '/Admin',
        redirect: '/Admin/WelcomeAdmin',
        meta: { title: 'Drama & Music Teaching MS - A', icon: 'user' },
        component: RouteView,
        children: [
          {
            path: '/Admin/WelcomeAdmin',
            name: 'WelcomeAdmin',
            component: () => import('@/views/Admin/WelcomeAdmin'),
            meta: { title: 'Welcome admin', icon: 'audit' }
            //we will hide this from the menu later
          },
          {
            path: '/Admin/InstructorMS',
            name: 'InstructorMS',
            component: () => import('@/views/Admin/InstructorMS'),
            meta: { title: 'Manage Instructor', icon: 'audit' }
          },
          {
            path: '/Admin/InstructorDetail',
            name: 'InstructorDetail',
            component: () => import('@/views/Admin/InstructorDetail'),
            meta: { title: 'Instructor Detail', icon: 'audit' }
          }
          // add the path for your pages for admin here
          , {
            path: '/Admin/Backups',
            name: 'Backups',
            component: () => import('@/views/Admin/Backup'),
            meta: { title: 'Manage Backups', icon: 'audit' }
          },
          {
            path: '/Admin/Assignments',
            name: 'Assignments',
            component: () => import('@/views/Admin/Assn'),
            meta: { title: 'Manage Assignments', icon: 'audit' }
          },
          {
            path: '/Admin/AssnInstr',
            name: 'AssnInstr',
            component: () => import('@/views/Admin/AssnInstr'),
            meta: { title: 'AssnInstr', icon: 'audit' }
          },
          {
            path: '/Admin/AssnCourse',
            name: 'AssnCourse',
            component: () => import('@/views/Admin/AssnCourse'),
            meta: { title: 'AssnCourse', icon: 'audit' }
          },
          {
            path: '/Admin/ComitteeList',
            name: 'ComitteeList',
            component: () => import('@/views/Admin/ComitteeList'),
            meta: { title: 'Committee List', icon: 'appstore' }

          },
        ]
      },
      {
        path: '/NormalUser',
        redirect: '/NormalUser/NormalUserWelcome',
        meta: { title: 'Drama & Music Teaching MS -U', icon: 'user' },
        component: RouteView,
        children: [
          {
            path: '/NormalUser/NUWelcome',
            name: 'NormalUserWelcome',
            component: () => import('@/views/NormalUser/NUWelcome'),
            meta: { title: 'Welcome user', icon: 'audit' }
          },
          // add the path for your pages for normal user here
          {
            path: '/NormalUser/NUInstructorMS',
            name: 'NUInstructorMS',
            component: () => import('@/views/NormalUser/NUInstructorMS'),
            meta: { title: 'Search Instructor', icon: 'audit' }
          },
          {
            path: '/NormalUser/NUInstructorDetail',
            name: 'InstructorDetail',
            component: () => import('@/views/NormalUser/NUInstructorDetail'),
            meta: { title: 'Instructor Detail', icon: 'audit' }
          },
          {
            path: '/NormalUser/Assn',
            name: 'Assn',
            component: () => import('@/views/NormalUser/Assn'),
            meta: { title: 'View Assignments', icon: 'audit' }
          },

        ]
      }

    ],
    meta: { requiresAuth: true }
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/Error/404'),
    meta: { requiresAuth: false }
  }
]

const router = new VueRouter({
  routes
})

export default router

