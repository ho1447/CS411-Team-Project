import { initializeApp } from 'firebase/app';
import {
  getDocs,
  setDoc,
  doc,
  collection,
  getFirestore,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC7745gEFZj6N3ypB4-06gBKXOj55swGWA',
  authDomain: 'cs-411-team-project.firebaseapp.com',
  projectId: 'cs-411-team-project',
  storageBucket: 'cs-411-team-project.appspot.com',
  messagingSenderId: '237553195499',
  appId: '1:237553195499:web:97fd1b4119ac15f06461ae',
  measurementId: 'G-413TWB0N92',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const colRef = collection(db, 'savedRecipes');
