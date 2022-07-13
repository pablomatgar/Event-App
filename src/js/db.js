import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
} from 'firebase/firestore/lite';
import firebaseConfiguration from './firebaseConfiguration';

const firebaseConfig = firebaseConfiguration;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const generateId = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

const addEvent = (event) => {
  setDoc(doc(db, 'events', generateId()), {
    summary: event.summary,
    description: event.description,
    date: event.date,
    date_end: event.date_end,
    attendees: event.attendees,
    location: event.location,
  });
};

async function getEvents() {
  const eventsCol = collection(db, 'events');
  const eventsSnapshot = await getDocs(eventsCol);
  const events = eventsSnapshot.docs.map((document) => document.data());
  events.sort((a, b) => a.date.toDate() - b.date.toDate());
  const eventsFive = events.slice(0, 5);
  return eventsFive;
}

export { addEvent, getEvents };
