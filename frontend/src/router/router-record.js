import RecordDetailView from '../views/RecordDetail'
import RecordSummaryView from '../views/RecordSummary'
import RecordCalendarView from '../views/RecordCalendar'

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

  RecordSummaryRoute: {
    path: '/record/summary',
    name: 'RecordSummary',
    component: RecordSummaryView,
    meta: {
      title: '캘린더',
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
  }
}
