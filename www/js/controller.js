angular.module('starter.controllers', [])

  .controller('DashCtrl', function($rootScope,$state) {
    var vm = this;
    vm.title = $state.current.title;

    vm.toSet = function(version) {
      $rootScope.global.version = version;
      $state.go('set',{},{reload: true});
    };

  })


  .controller('SetCtrl', function($state, $scope, $rootScope) {
    var vm = this;
    vm.title = $state.current.title;

    vm.version = $rootScope.global.version;

    vm.back = function() {
      $state.go('dash');
    };

    vm.data = {
      normalPerson: $rootScope.global.normalPerson,
      goodPerson: $rootScope.global.goodPerson,
      badPerson: $rootScope.global.badPerson,
      superPerson: $rootScope.global.superPerson
    };
    vm.calculate = function() {
      vm.sum = 0;
      angular.forEach(vm.data, function(val, key) {
        angular.forEach(val, function(item) {

          vm.sum += +item.number;
        })
      });
    };
    vm.calculate();

    vm.addData = function(type) {
      vm.data[type].push({
        name: '',
        number: 0
      });
    };
    vm.removeData = function(type, index) {
      if (vm.data[type].length == 1) {
        alert('已经是最后个角色了，不要再减了吧？')
      } else {
        vm.data[type].splice(index, 1);
      }
    };

    vm.start = function() {
      // 计算验证
      // 平民，好人，坏人都不可为0
      var sum = {
        normalPerson: 0,
        goodPerson: 0,
        badPerson: 0,
        superPerson: 0
      };
      angular.forEach(vm.data, function(val, key) {
        angular.forEach(val, function(item) {
          sum[key] += +item.number;
        })
      });
      if (sum.normalPerson == 0) {
        alert('平民不能为0');
      } else if (sum.goodPerson == 0) {
        alert('好人不能为0');
      } else if (sum.badPerson == 0) {
        alert('坏人也不能为0');
      }

      $rootScope.global.normalPerson = vm.data.normalPerson;
      $rootScope.global.goodPerson = vm.data.goodPerson;
      $rootScope.global.badPerson = vm.data.badPerson;
      $rootScope.global.superPerson = vm.data.superPerson;
      $rootScope.global.sum = sum;

      $state.go('deal',{},{reload: true});
    }
  })


  .controller('DealCtrl', function($state, $rootScope) {
    var vm = this;

    vm.number = 0;
    vm.status = 1;

    var global = $rootScope.global;
    vm.version = global.version;

    var sumNumber = global.sum.normalPerson + global.sum.goodPerson + global.sum.badPerson + global.sum.superPerson;


    var chaoticArray = function(arr) {
      arr.sort(function() {
        return 0.5 - Math.random();
      });
      return arr;
    };
    var createRolesArray1 = function() {
      var arr = [];

      angular.forEach(global, function(value, key) {
        if (Object.prototype.toString.call( value ) === '[object Array]' && key.indexOf('Person') > -1) {
          angular.forEach(value, function(item) {
            for (var i = 0; i < item.number; i++) {
              arr.push(item.name);
            }
          });
        }
      });

      return chaoticArray(arr);
    };
    var createRolesArray2 = function() {
      var arr = [];

      angular.forEach(global, function(value, key) {
        if (Object.prototype.toString.call( value ) === '[object Array]' && key.indexOf('Person') > -1) {
          angular.forEach(value, function(item) {
            for (var i = 0; i < item.number; i++) {
              if (key.indexOf('normal') > -1) {
                arr.push({name: item.name, value: 1});
              } else if (key.indexOf('good') > -1) {
                arr.push({name: item.name, value: 50});
              } else if (key.indexOf('bad') > -1) {
                arr.push({name: item.name, value: -50});
              } else if (key.indexOf('super') > -1) {
                arr.push({name: item.name, value: 100});
              }
            }
          });
        }
      });

      return createTwoDimensionalArr(arr);
    };

    // 生成二维数组
    function createTwoDimensionalArr(arr) {
      var suitArr = createSuitArr(arr);
      var resultArr = [];
      for (var i = 0; i < sumNumber/2; i++) {
        resultArr.push([])
      }
      angular.forEach(resultArr, function(item, i) {
        resultArr[i] = [suitArr[i * 2].name, suitArr[i * 2 + 1].name];
      });
      return resultArr;

    }
    // 检查组合是否爆牌
    function createSuitArr(arr) {
      var chaoticArr = chaoticArray(arr);
      for (var i = 0; i < sumNumber / 2; i++) {
        if (chaoticArr[i * 2].value + chaoticArr[i * 2 + 1].value == 0) {
          createSuitArr(arr, i);
          return false;
        } else {
          return chaoticArr;
        }
      }
    }

    if (global.version == 1) {
      vm.roles = createRolesArray1();
      $rootScope.global.roles = vm.roles;
    } else if (global.version == 2) {
      vm.roles = createRolesArray2();
      $rootScope.global.roles = vm.roles;
    } else {
      $state.go('dash');
    }

    vm.next = function() {
      if (vm.version == 1) {
        if (vm.status < 2) {
          vm.status++;
        } else if (vm.status == 2 && vm.number < sumNumber - 1) {
          vm.number++;
          vm.status = 1;
          $state.go('deal', {number: vm.number});
        } else {
          vm.status = 3;
        }
      } else if (vm.version == 2) {
        if (vm.status < 2) {
          vm.status++;
        } else if (vm.status == 2 && vm.number < sumNumber / 2 - 1) {
          vm.number++;
          vm.status = 1;
          $state.go('deal', {number: vm.number});
        } else {
          vm.status = 3;
        }
      }
    };

    vm.nextPage = function() {
      vm.number = 0;
      vm.status = 1;
      $state.go('result',{},{reload: true});
    };

  })


  .controller('ResultCtrl', function($state,$rootScope) {
    var vm = this;
    vm.title = $state.current.title;

    vm.version = $rootScope.global.version;
    vm.lists = $rootScope.global.roles;

    if (!vm.lists) {
      $state.go('set');
    }
    vm.over = function() {
      delete $rootScope.global.roles;
      $state.go('set',{},{reload: true});
    };
  });

