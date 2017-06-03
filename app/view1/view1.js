'use strict';

angular.module('myApp.view1', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'driversController'
        })
                .when('/view2/:id', {
                    templateUrl: 'view2/view2.html',
                    controller: 'driverController'
                });
    }]).controller('driversController', function ($scope, ergastAPIservice) {
    $scope.nameFilter = null;
    $scope.driversList = [];

    $scope.searchFilter = function (driver) {
        var re = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || re.test(driver.Driver.givenName) || re.test(driver.Driver.familyName);
    };

    ergastAPIservice.getDrivers().success(function (response) {
        //Dig into the responde to get the relevant data
        $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });
});