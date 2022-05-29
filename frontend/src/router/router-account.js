import SignUpView from '../views/SignUp'

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
  }
}
