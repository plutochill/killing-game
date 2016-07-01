angular.module('starter.controllers', [])

  .controller('DashCtrl', function($rootScope,$state) {
    var vm = this;
    vm.title = $state.current.title;

    vm.toSet = function(version) {
      $rootScope.global.version = version;
      $state.go('set');
    };

  })


  .controller('SetCtrl', function($state, $rootScope, $ionicHistory) {
    var vm = this;
    vm.title = $state.current.title;

    vm.version = $rootScope.global.version;

    vm.back = function() {
      $ionicHistory.goBack();
    };

    vm.data = {
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
      }]
    };
    vm.addData = function(type) {
      vm.data[type].push({
        name: '',
        number: 0
      });
    };
    vm.removeData = function(type, index) {
      vm.data[type].slice(index, 1);
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


  });

