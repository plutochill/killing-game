// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

   /* $rootScope.global = {
      version: '2',
      normalPerson: [{
        name: '',
        number: 0
      }],
      goodPerson: [{
        name: '',
        number: 0
      }],
      badPerson: [{
        name: '',
        number: 0
      }],
      superPerson: [{
        name: '',
        number: 0
      }],
      sum: {}
    };*/
    $rootScope.global = {
      "version":"2",
      "normalPerson":[{"name":"平民","number":8}],
      "goodPerson":[{"name":"警察","number":2}],
      "badPerson":[{"name":"杀手","number":2}],
      "superPerson":[{"name":"狙击手","number":1},{"name":"医生","number":1}],
      "sum":{"normalPerson":8,"goodPerson":2,"badPerson":2,"superPerson":2}
    };
})
  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('dash', {
        url: '/dash',
        title: '选择游戏版本',
        templateUrl: 'templates/dash.html',
        controller: 'DashCtrl',
        controllerAs: 'vm'
      })
      .state('set', {
        url: '/set',
        title: '游戏初始化配置',
        templateUrl: 'templates/set.html',
        controller: 'SetCtrl',
        controllerAs: 'vm'
      })

      .state('deal', {
        url: '/deal',
        title: '发牌',
        templateUrl: 'templates/deal.html',
        controller: 'DealCtrl',
        controllerAs: 'vm'
      })

      .state('result', {
        url: '/result',
        title: '法官查看',
        templateUrl: 'templates/result.html',
        controller: 'ResultCtrl',
        controllerAs: 'vm'
      })
      // Each tab has its own nav history stack:

      /*.state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });*/

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/dash');

  });
