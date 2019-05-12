
angular.module('AbuDhabiPolice').controller('tasksController', ['$scope', function ($scope) {
    
    
    // dtatTable
        $('#exampleTableThree').DataTable(
            {
                "paging": false,
                "ordering": false,
                "bFilter": false,
                "info": false,
                 "dom":
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-lg-2 col-md-2 col-sm-6 col-sx-6'i><'col-lg-4 col-md-4 col-sm-6 col-sx-6'l><'col-lg-6 col-md-6 col-sm-12 col-sx-12'p>>",
            }
        );
        $("#exampleTableThree_previous a").html('<i class="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp;First');
        $("#exampleTableThree_next a").html('Last&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i>');
        $("#exampleTableThree_info").text($("#exampleTableThree_info").text().replace("entries", "items."));
        $(".dataTables_length>label").html('<select name="exampleTableThree_length" aria-controls="exampleTableThree" class="form-control input-sm"><option value="5">05 items</option><option value="25">25 items</option><option value="50">50 items</option><option value="100">100 items</option></select>')
    
        


        


}]);