var app = app || angular.module("app", []);

app.factory('payeeService', function ($http) {
    return {
        getPayees: function () {
            return new $http.get("http://localhost:60532/api/PayeesApi/GetAllPayees/");
        },
        getPayee: function (id) {
            return new $http.get("http://localhost:60532/api/PayeesApi/GetPayee/" + id);
        },
        getPayeeLastPayment: function (id) {
            return new $http.get("http://localhost:60532/api/PayeesApi/GetPayeeLastPayment/" + id);
        },
        addPayee: function (payee) {
            return new $http({
                method: 'POST',
                url: 'http://localhost:60532/api/PayeesApi/PostPayee/',
                data: JSON.stringify(payee),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        deletePayee: function (id) {
            return new $http({
                method: 'DELETE',
                url: 'http://localhost:60532/api/PayeesApi/DeletePayee/' + id,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

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
    }
});