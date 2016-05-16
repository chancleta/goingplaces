//module App.Services {
//    'use strict';
//
//    export interface ILoginService {
//        doLogin():void;
//    }
//
//
//    export class GoogleServiceLogin {
//        <!--Add a button for the user to click to initiate auth sequence -->
//
//        private static clientId:string = '837050751313';
//        private static apiKey:string = 'AIzaSyAdjHPT5Pb7Nu56WJ_nlrMGOAgUAtKjiPM';
//        private static scopes:string = 'https://www.googleapis.com/auth/plus.me';
//
//        // Step 2: Reference the API key
//        handleClientLoad() {
//            gapi.client.setApiKey(GoogleServiceLogin.apiKey);
//            window.setTimeout(this.checkAuth, 1);
//        }
//
//        checkAuth() {
//            gapi.auth.authorize({
//                client_id: GoogleServiceLogin.clientId,
//                scope: GoogleServiceLogin.scopes,
//                immediate: true
//            }, this.handleAuthResult);
//        }
//
//        handleAuthResult(authResult) {
//            var authorizeButton = document.getElementById('authorize-button');
//            if (authResult && !authResult.error) {
//                authorizeButton.style.visibility = 'hidden';
//                this.makeApiCall();
//            } else {
//                authorizeButton.style.visibility = '';
//                authorizeButton.onclick = this.handleAuthClick;
//            }
//        }
//
//        // Step 3: get authorization to use private data
//        handleAuthClick(event) {
//            gapi.auth.authorize({
//                client_id: GoogleServiceLogin.clientId,
//                scope: GoogleServiceLogin.scopes,
//                immediate: false
//            }, this.handleAuthResult);
//            return false;
//        }
//
//        // Load the API and make an API call.  Display the results on the screen.
//        makeApiCall() {
//            // Step 4: Load the Google+ API
//            gapi.client.load('plus', 'v1').then(function () {
//                // Step 5: Assemble the API request
//                var request = gapi.client.plus.people.get({
//                    'userId': 'me'
//                });
//                // Step 6: Execute the API request
//                request.then(function (resp) {
//                    var heading = document.createElement('h4');
//                    var image = document.createElement('img');
//                    image.src = resp.result.image.url;
//                    heading.appendChild(image);
//                    heading.appendChild(document.createTextNode(resp.result.displayName));
//
//                    document.getElementById('content').appendChild(heading);
//                }, function (reason) {
//                    console.log('Error: ' + reason.result.error.message);
//                });
//            });
//        }
//
//    }
//
//
//}