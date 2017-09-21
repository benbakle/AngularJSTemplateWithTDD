var app = app || angular.module("app", []);

app.factory('transactionService', function ($http) {
    return {
        getTransactions: function () {
            return new $http.get("http://localhost:60532/api/TransactionsApi/GetAllTransactions/");
        },
        getPayees: function (id) {
            return new $http.get("http://localhost:60532/api/TransactionsApi/GetUpcomingBills/" + id);
        },
        addTransaction: function (transaction) {
            return new $http({
                method: 'POST',
                url: 'http://localhost:60532/api/TransactionsApi/PostTransaction/',
                data: JSON.stringify(transaction),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        editPayee: function (payee) {
            return new $http({
                method: 'PUT',
                url: 'http://localhost:60532/api/PayeesApi/PutPayee/' + payee.PayeeId,
                data: JSON.stringify(payee),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        }
        //deleteTransaction: function (id) {
        //    return new $http({
        //        method: 'DELETE',
        //        url: 'http://localhost:60532/api/TransactionsApi/DeleteTransaction/' + id,
        //        headers: {
        //            'Content-Type': 'application/json'
        //        }
        //    })

        //},
        //editTransaction: function (transaction) {
        //    return new $http({
        //        method: 'PUT',
        //        url: 'http://localhost:60532/api/TransactionsApi/PutTransaction/' + transaction.TransactionId,
        //        data: JSON.stringify(transaction),
        //        headers: {
        //            'Content-Type': 'application/json'
        //        }
        //    })

        //}
    }
});