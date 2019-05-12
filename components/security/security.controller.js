

angular.module('AbuDhabiPolice').controller('securityController', ['$scope', function ($scope) {


// dtatTable
    $('#exampleTable').DataTable(
        {
            "paging": true,
            "ordering": false,
            "bFilter": false,
            "info": true, "dom":
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-lg-2 col-md-2 col-sm-6 col-sx-6'i><'col-lg-4 col-md-4 col-sm-6 col-sx-6'l><'col-lg-6 col-md-6 col-sm-12 col-sx-12'p>>",
        }
    );
    $("#exampleTable_previous a").html('<i class="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp;First');
    $("#exampleTable_next a").html('Last&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i>');
    $("#exampleTable_info").text($("#exampleTable_info").text().replace("entries", "items."));
    $(".dataTables_length>label").html('<select name="exampleTable_length" aria-controls="exampleTable" class="form-control input-sm"><option value="5">05 items</option><option value="25">25 items</option><option value="50">50 items</option><option value="100">100 items</option></select>')
    

    $('#exampleTableTwo').DataTable(
        {
            "paging": true,
            "ordering": false,
            "bFilter": false,
            "info": true, "dom":
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-lg-2 col-md-2 col-sm-6 col-sx-6'i><'col-lg-4 col-md-4 col-sm-6 col-sx-6'l><'col-lg-6 col-md-6 col-sm-12 col-sx-12'p>>",
        }
    );
    $("#exampleTableTwo_previous a").html('<i class="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp;First');
    $("#exampleTableTwo_next a").html('Last&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i>');
    $("#exampleTableTwo_info").text($("#exampleTableTwo_info").text().replace("entries", "items."));
    $(".dataTables_length>label").html('<select name="exampleTableTwo_length" aria-controls="exampleTableTwo" class="form-control input-sm"><option value="5">05 items</option><option value="25">25 items</option><option value="50">50 items</option><option value="100">100 items</option></select>')
    ///






    
    $('#btnRight').click(function (e) {
        var selectedOpts = $('#lstBox1 option:selected');
        if (selectedOpts.length == 0) {
            alert("Nothing to move.");
            e.preventDefault();
        }

        $('#lstBox2').append($(selectedOpts).clone());
        $(selectedOpts).remove();
        e.preventDefault();
    });

    $('#btnAllRight').click(function (e) {
        var selectedOpts = $('#lstBox1 option');
        if (selectedOpts.length == 0) {
            alert("Nothing to move.");
            e.preventDefault();
        }

        $('#lstBox2').append($(selectedOpts).clone());
        $(selectedOpts).remove();
        e.preventDefault();
    });

    $('#btnLeft').click(function (e) {
        var selectedOpts = $('#lstBox2 option:selected');
        if (selectedOpts.length == 0) {
            alert("Nothing to move.");
            e.preventDefault();
        }

        $('#lstBox1').append($(selectedOpts).clone());
        $(selectedOpts).remove();
        e.preventDefault();
    });

    $('#btnAllLeft').click(function (e) {
        var selectedOpts = $('#lstBox2 option');
        if (selectedOpts.length == 0) {
            alert("Nothing to move.");
            e.preventDefault();
        }

        $('#lstBox1').append($(selectedOpts).clone());
        $(selectedOpts).remove();
        e.preventDefault();
    });





}])