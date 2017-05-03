import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../data'

export const App = connect(
  appState => appState,
  actions
)(props => {
  console.log("WTF",props)
  if (!props.auth.uid){
    return (
      <button onClick={props.signInWithGitHubPopup}>Log in</button>
    );
  }
  let newNote = {
    date: 170502,
    desc: "An interesting observation if I may say so myself",
    tags: [{tag:'weird',group:'misc',tagIsNew:true,groupIsNew:true}]
  };
  return (
    <div>
      <div>Hello! :D <button onClick={props.logOut}>Log out</button></div>
      <div><button onClick={e=>props.addNewNote(newNote)}>Dangerous test button!</button></div>
      <pre>{JSON.stringify(props.data.fromServer || {})}</pre>
    </div>
  );
});
