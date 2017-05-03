import { firebase } from '../firebase';

import { actionTypes } from '../constants';

const provider = new firebase.auth.GithubAuthProvider();

export const actions = {

  // MSG

  dismissMessage: (num)=> ({type: actionTypes.DISMISS_MSG, num }),


  // AUTH

  startListeningToAuth: () => (dispatch,getState) => {
    dispatch({type: actionTypes.START_AUTH_LISTEN});
    firebase.auth().onAuthStateChanged(auth => {
      let uid = getState().auth.uid;
      if (!auth){
        if (uid){
          firebase.database().ref('data/'+uid).off();
        }
        dispatch({type: actionTypes.LOGOUT});
      } else {
        firebase.database().ref('data/'+auth.uid).on('value',snapshot=>{
          dispatch({type: actionTypes.RECEIVE_DATA, data: snapshot.val()})
        });
        dispatch({type: actionTypes.LOGIN, authData: auth});
      }
    });
  },
  signInWithGitHubPopup: () => (dispatch,getState) => {
    if (!getState().auth.authListening){
      throw new Error("Cannot try to sign in before calling startListeningToAuth action!");
    }
    dispatch({type: actionTypes.ATTEMPTING_LOGIN});
    firebase.auth().signInWithPopup(provider).then(result => {
      // no need to do anything here, we fix this in subscription!
    }).catch(error => {
      console.log("Authentication error",error);
      dispatch({type: actionTypes.SHOW_ERROR_MSG, message: 'Login failed: '+error });
    });
  },
  logOut: () => ({type: actionTypes.LOGOUT}),

  // DATA

  addNewNote: opts => (dispatch,getState) => {
    // TODO - syncdispatch thing to start spinner

    let ref = firebase.database().ref().child('data/'+getState().auth.uid);
    let newNoteId = ref.child('notes').push().key;
    let instructions = {
      ['dates/'+opts.date+'/'+newNoteId]: true,
      ['notes/'+newNoteId+'/date']: opts.date
    };
    if (opts.desc){
      instructions['notes/'+newNoteId+'/desc'] = opts.desc
    };
    (opts.tags || []).forEach(t => {
      if (!t.tagIsNew){
        instructions['notes/'+newNoteId+'/tags/'+t.tag] = true;
        instructions['tags/'+t.tag+'/notes/'+newNoteId] = true;
      } else {
        let newTagId = ref.child('tags').push().key;
        instructions['notes/'+newNoteId+'/tags/'+newTagId] = true;
        instructions['tags/'+newTagId] = {
          name: t.tag,
          notes: {
            [newNoteId]: true
          }
        };
        if (t.groupIsNew){
          let newGroupId = ref.child('groups').push().key;
          instructions['groups/'+newGroupId] = {
            name: t.group,
            tags: {
              [newTagId]: true
            }
          };
          instructions['tags/'+newTagId].group = newGroupId;
        } else {
          instructions['tags/'+newTagId].group = t.group;
        }
      }
    });
    console.log("WIII", instructions);
    ref.update(instructions);
  }
};
