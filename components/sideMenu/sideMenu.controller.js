

angular.module('AbuDhabiPolice').controller('sideMenuController', ['$scope', function ($scope) { 

    
    $('#sidebar ul li > a:not(.route-link)').click(function(e){
        e.preventDefault(); 
        $('#sidebar ul li').removeClass('selected');
        $(this).parent().addClass('selected');
    });
    
    $('#sidebarCollapse').on('click', function (e) {
        e.preventDefault();
        $('#sidebar, #content').toggleClass('active');
        $('#sidebar .collapse.in').toggleClass('in');
        $('#sidebar a[aria-expanded=true]').attr('aria-expanded', 'false');
    });


}])