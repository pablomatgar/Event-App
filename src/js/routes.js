import Event2Page from '../pages/Event2Page';
import EventPage from '../pages/EventPage';
import HomePage from '../pages/HomePage';
import ListPage from '../pages/ListPage';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/event',
    component: EventPage,
  },
  {
    path: '/event2',
    component: Event2Page,
  },
  {
    path: '/list',
    component: ListPage,
  },
];

export default routes;
