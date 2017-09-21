/// <reference path="../services/payees-service.js" />
var app = app || angular.module("app", []);
app.controller('transactionsController', transactionsController);
app.directive('checkboxSelectorDirective', checkboxSelectorDirective);
transactionsController.$inject = ['transactionService'];
function transactionsController(service) {
    var t = this;

    t.payees = [];
    t.transactions = [];

    t.populateTransactionById = populateTransactionById;

    t.upcomingDueDate = upcomingDueDate;
    t.pastDueDate = pastDueDate;

    t.transaction = {};
    t.transaction.Description = "";
    t.transaction.Amount = 0.0;
    t.transaction.PostDate = new Date();
    t.transaction.ClearDate = new Date();
    t.transaction.PayeeId = null;
    t.transaction.ConfirmationNumber = "";
    t.transactionPayeePosition = null;

    t.getTransactions = getTransactions;
    t.addTransaction = addTransaction;

    t.getPayees = getPayees;
    t.updatePayee = updatePayee;
    t.updatePayeeDueDate = updatePayeeDueDate;
    t.addTransactionAndUpdatePayee = addTransactionAndUpdatePayee;

    t.upcomingPayeeOffset = 50;

    init();

    return t;

    function init() {
        getTransactions();
        getPayees(t.upcomingPayeeOffset);
    }

    function populateTransactionById(id) {
        for (i = 0; i < t.payees.length; i++) {
            if (t.payees[i].PayeeId == id) {
                t.transactionPayeePosition = i;
                t.transaction.PayeeId = t.payees[i].PayeeId;
                t.transaction.Description = t.payees[i].Name;
                t.transaction.Amount = t.payees[i].Payment;
            }
        }
    }
    function updatePayee(payee) {
        service.editPayee(payee).then(function (response) {
        })
    }
    function getPayees(daysOffset) {
        service.getPayees(daysOffset).then(function (response) {
            t.payees = response.data;
        });
    }
    function updatePayeeDueDate() {
        var payeeDueDate = new Date(t.payees[t.transactionPayeePosition].DueDate);
        t.payees[t.transactionPayeePosition].DueDate = new Date(payeeDueDate.setMonth(payeeDueDate.getMonth() + 1));
    }
    function addTransactionAndUpdatePayee(payeeId) {
        updatePayeeDueDate();
        updatePayee(t.payees[t.transactionPayeePosition]);
        addTransaction();
        getPayees(t.upcomingPayeeOffset);
    }
    function getTransactions() {
        service.getTransactions().then(function (response) {
            t.transactions = response.data;
        });
    }
    function addTransaction() {
        service.addTransaction(t.transaction).then(function (response) {
            t.transactions.push(response.data);
            getTransactions();
        });
    }
    function upcomingDueDate(prop) {
        return function (item) {
            return new Date(item[prop]) > new Date();
        }
    }
    function pastDueDate(prop) {
        return function (item) {
            return new Date(item[prop]) < new Date();
        }
    }
    function addPropertyToList(property, value, list) {
        angular.forEach(list, function (bill) {
            bill[property] = value;
        });
    }

}

function checkboxSelectorDirective() {
    return {
        retrict: 'E',
        scope: { object: '=' },
        template: '<input type="checkbox" value="{{object.value}}" name="{{object.name}}" />'
    }
}


