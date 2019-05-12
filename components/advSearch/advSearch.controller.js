

angular.module('AbuDhabiPolice').controller('advSearchController', ['$scope', function ($scope) {


    $('#dateFrom').datetimepicker({format: 'L'});
    $('#dateTo').datetimepicker({format: 'L'});
    $('.clockpicker').datetimepicker({ format: 'LT' });
    $scope.originalService = {
        dateFrom: '01/31/1980',
        dateTo: '01/31/1980',
        timeFrom: '12:12',
        timeTo: '12:12',
        serviceChannel: 'option',
        paymentMethod: 'option',
        status: 'option',
        requestType: 'option',
        customerName: 'customer name',
        mobileNumber: 012123,
        trafficFileNumber: 4454,
        requestNumber: 555,
    };

    //4. copy originalService to service. service will be bind to a form 
    $scope.service = angular.copy($scope.originalService);

    $scope.submitUpdateServiceForm = function () {
        // send $http request to save
    };

    $scope.resetForm = function () {
        $scope.service = angular.copy($scope.originalService);
    };



}]);
