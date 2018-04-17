// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBmnm2VTmCHgcNE7OPA_V7PjKQKa2MVyc0',
    authDomain: 'udemy-fitness-tracker.firebaseapp.com',
    databaseURL: 'https://udemy-fitness-tracker.firebaseio.com',
    projectId: 'udemy-fitness-tracker',
    storageBucket: 'udemy-fitness-tracker.appspot.com',
    messagingSenderId: '780992114804'
  }
};
