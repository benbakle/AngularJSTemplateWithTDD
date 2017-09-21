var app = app || angular.module("app", []);
app.controller('templateController', templateController);
templateController.$inject = ['$scope', 'templateService'];

function templateController($scope, service) {
    $scope.stuff = [];
    $scope.orderStuffBy = "name";

    init();

    function init() {
        getStuff();
    }
    function getStuff() {
        service.getStuffByUsername('angular').then(function (response) {
            $scope.stuff = [response.data, { name: "Fake", url: "a sort example for url" }];
        });
    }
}


