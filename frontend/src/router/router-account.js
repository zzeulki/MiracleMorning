import SignUpView from '../views/SignUp'
import InitSetupView from '../views/InitSetUp'

export default {
  SignUpRoute: {
    path: '/account/sign-up',
    name: 'SignUp',
    component: SignUpView,
    meta: {
      title: '회원가입',
      isVisibleHeader: false,
      isVisibleBackBtn: false,
      isVisibleBottomNavigation: false
    }
  },
  initSetRoute: {
    path: '/account/init-set',
    name: 'InitSetUp',
    component: InitSetupView,
    meta: {
      title: '초기설정',
      isVisibleHeader: false,
      isVisibleBackBtn: false,
      isVisibleBottomNavigation: false
    }
  }
}
