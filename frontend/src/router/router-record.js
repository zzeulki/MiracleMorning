import RecordDetailView from '../views/RecordDetail'
import RecordCalendarView from '../views/RecordCalendar'
import RecordCameraView from '../views/RecordCamera'

export default {
  RecordDetailRoute: {
    path: '/record',
    name: 'RecordDetail',
    component: RecordDetailView,
    meta: {
      title: '기록',
      isVisibleHeader: true,
      isVisibleBackBtn: true,
      isVisibleBottomNavigation: true
    }
  },

  RecordCalendarRoute: {
    path: '/record/calendar',
    name: 'RecordCalendar',
    component: RecordCalendarView,
    meta: {
      title: '캘린더',
      isVisibleHeader: true,
      isVisibleBackBtn: true,
      isVisibleBottomNavigation: true
    }
  },

  RecordCameraRoute: {
    path: '/record/camera',
    name: 'RecordCamera',
    component: RecordCameraView,
    meta: {
      title: '카메라',
      isVisibleHeader: true,
      isVisibleBackBtn: true,
      isVisibleBottomNavigation: true
    }
  }
}
