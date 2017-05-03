import * as fb from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

fb.initializeApp({
  apiKey: "AIzaSyAAEdkCBIbctDxoVs9DYK9LYHJmgAfQMsw",
  authDomain: "statcal-7bcda.firebaseapp.com",
  databaseURL: "https://statcal-7bcda.firebaseio.com",
  projectId: "statcal-7bcda"
});

export const firebase = fb;
