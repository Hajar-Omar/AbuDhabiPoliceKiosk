angular.module('AbuDhabiPolice').controller('headerController', ['$scope', function ($scope) { 
    

 $(".logOut").hover(function(){
    $(".logOut i").removeClass("fa-lock").addClass("fa-unlock");
    }, function(){
    $(".logOut i").removeClass("fa-unlock").addClass("fa-lock");
});

}])