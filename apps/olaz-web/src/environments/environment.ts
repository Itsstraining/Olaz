// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    apiKey: "AIzaSyBiG7yvSYrGqcRjI_T9xU4M2OXI-ig7Fw0",
    authDomain: "olaz-backup.firebaseapp.com",
    projectId: "olaz-backup",
    storageBucket: "olaz-backup.appspot.com",
    messagingSenderId: "1004786821210",
    appId: "1:1004786821210:web:7041062be2c57bcac45063"
  },
  production: false,
  endpoint: "https://task-server-oolzqmo74q-uc.a.run.app/api/",
  endPointMessenger: "https://messenger-server-oolzqmo74q-uc.a.run.app/api/",
  endPointVideo: "https://video-server-oolzqmo74q-uc.a.run.app/api"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
