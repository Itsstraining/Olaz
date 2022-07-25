// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'olaz-90e43',
    appId: '1:859382530359:web:c3469d145e975f44969ab2',
    databaseURL: 'https://olaz-90e43-default-rtdb.asia-southeast1.firebasedatabase.app',
    storageBucket: 'olaz-90e43.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyBgMSIckJzH7XP4mkQIrC0KDXqgsHE4Ais',
    authDomain: 'olaz-90e43.firebaseapp.com',
    messagingSenderId: '859382530359',
  },
  production: false,
  endpoint: "http://localhost:3333/api/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
