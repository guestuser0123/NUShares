import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username: username,
    email: email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...
