var app = app || angular.module("app", []);

app.factory('templateService', function ($http) {
    return {
        getStuffByUsername: function (username) {
            return new $http.get("https://api.github.com/users/" + username);
        }
        //addStuff: function (payee) {
        //    return new $http({
        //        method: 'POST',
        //        url: 'http://localhost:60532/api/PayeesApi/PostPayee/',
        //        data: JSON.stringify(payee),
        //        headers: {
        //            'Content-Type': 'application/json'
        //        }
        //    });
        //},
        //deleteStuff: function (id) {
        //    return new $http({
        //        method: 'DELETE',
        //        url: 'http://localhost:60532/api/PayeesApi/DeletePayee/' + id,
        //        headers: {
        //            'Content-Type': 'application/json'
        //        }
        //    })

        //},
        //editStuff: function (payee) {
        //    return new $http({
        //        method: 'PUT',
        //        url: 'http://localhost:60532/api/PayeesApi/PutPayee/' + payee.PayeeId,
        //        data: JSON.stringify(payee),
        //        headers: {
        //            'Content-Type': 'application/json'
        //        }
        //    })

        //}
    }
});
