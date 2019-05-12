var app = angular.module('AbuDhabiPolice', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./components/dashboard/dashboard.html",
        controller : ""
    })
    .when("/group", {
        templateUrl : "./components/security/security.component.html"
    })
    .when("/tasks", {
        templateUrl : "./components/tasks/tasks.component.html"
    })


 });
