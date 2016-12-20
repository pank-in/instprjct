'use strict';

(function() {

  firebase.initializeApp({
  apiKey: "AIzaSyCk_UeyKeR6Jb7QYAvK4vx1e9hDfK3lh0E",
    authDomain: "instprjct.firebaseapp.com",
    databaseURL: "https://instprjct.firebaseio.com",
    storageBucket: "instprjct.appspot.com",
    messagingSenderId: "660377249540"
  });

  //=require 'lib/*.js'
  //=require 'middlewares/*.js'
  //=require 'routes/*.js'

  const { location, history, templates } = window;
  const rootElement = qs('#root');

  function render(tplName, data = {}) {
    const user = firebase.auth().currentUser;
    const userData = user ? user.toJSON() : null;
    data = Object.assign(data, { user: userData });
    rootElement.innerHTML = templates[tplName](data);
  }

  function render404() {
    render('404');
  }

  page('*', auth);
  page('/', main);
  page('/login', login);
  page('/logout', logout);
  page('/signup', signup);
  page('*', render404);

  render('preloader');

  // simulate firebase 'onready' behavior
  const unsubsribe = firebase.auth().onAuthStateChanged(() => {
    page();
    unsubsribe();
  });

} ());
