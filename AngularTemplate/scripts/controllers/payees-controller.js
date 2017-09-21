var app = app || angular.module("app", []);
app.controller('payeesController', payeesController);
app.directive('deletePayeeDirective', deletePayeeDirective);

payeesController.$inject = ['payeeService'];

function payeesController(service) {
    var p = this;
    p.payees = [];
    p.selectedPayeePayment = 0;
    p.selectedPayee = selectedPayee;

    p.newPayee = {};
    p.newPayee.Name = "";
    p.newPayee.DueDate = "";
    p.newPayee.Payment = 0;
    p.newPayee.Active = true;

    p.editPayee = {};
    p.editPayee.Name = "";
    p.editPayee.DueDate = "";
    p.editPayee.Payment = "";
    p.editPayee.Active = true;

    p.addPayee = addPayee;
    p.deletePayee = deletePayee;
    p.confirmDeletePayeeIsVisible = false;
    p.deletedPayee = {};

    p.getEditPayee = getEditPayee;
    p.editedPayee = null;

    p.getPayeesTotal = "";


    p.editSelectedPayee = editSelectedPayee;

    init();
    return p;

    function init() {
        getPayees();
    };

    function formatDate(date) {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }

    function addPayee() {
        service.addPayee(p.newPayee).then(function (response) {
            p.payees.push(response.data);
            getPayees();
        });
    }

    function deletePayee(id) {
        service.deletePayee(id).then(function (response) {
            p.deletedPayee = response.data;
            getPayees();
        })
    }

    function editSelectedPayee(payee) {
        service.editPayee(payee).then(function (response) {
            p.editedPayee = response.data;
            getPayees();
        })
    }

    function getPayees() {
        service.getPayees().then(function (response) {
            p.payees = response.data;
            getPayeesTotal();
        });
    }

    function getEditPayee(id) {
        service.getPayee(id).then(function (response) {
            p.editPayee = response.data;
        });
    }

    function selectedPayee(id) {
        service.getPayee(id).then(function (response) {
            p.selectedPayeePayment = response.data.Payment;
        })
    }

    function getPayeesTotal() {
        var total = 0;
        for (var i = 0; i < p.payees.length; i++) {
            var payment = p.payees[i].Payment;
            total += payment;
        }
        p.getPayeesTotal = total;
    }
}

function deletePayeeDirective() {
    return {
        restrict: 'A',
        scope: true,
        template: '<a href="javascript:void(0)" class="btn btn-warning btn-sm" ng-show="deleteIsVisible" ng-click="showConfirmDeletePayee()">Delete</a>' +
            '<div class="btn-group-vertical" role="group">' +
            '<a class="btn btn-danger btn-sm" ng-show="confirmDeleteIsVisible" ng-click="close()"><i class="fa fa-times" aria-hidden="true"></i></a>' +
            '<a class="btn btn-danger btn-sm" ng-show="confirmDeleteIsVisible" ng-click="p.deletePayee(payee.PayeeId)">Yep!</a>' +
            '</div>',
        controller: function ($scope) {
            $scope.confirmDeleteIsVisible = false;
            $scope.deleteIsVisible = true;

            $scope.showConfirmDeletePayee = function () {
                $scope.confirmDeleteIsVisible = true;
                $scope.deleteIsVisible = false;
            }
            $scope.close = function () {
                $scope.confirmDeleteIsVisible = false;
                $scope.deleteIsVisible = true;
            }
        }
    }
}