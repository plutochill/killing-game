angular.module('starter.controllers', [])

  .controller('DashCtrl', function($state) {
    var vm = this;
    vm.title = $state.current.title;


  })
  .controller('SetCtrl', function($state, $ionicHistory) {
    var vm = this;
    vm.title = $state.current.title;

    vm.version = $state.params.version;

    vm.back = function() {
      $ionicHistory.goBack();
    }
  })
  .controller('DealCtrl', function($state) {
    var vm = this;

    vm.number = $state.params.number;
    vm.status = $state.params.status;


  })
  .controller('ResultCtrl', function($state) {
    var vm = this;
    vm.title = $state.current.title;

    vm.number = $state.params.number;
    vm.status = $state.params.status;


  });;

