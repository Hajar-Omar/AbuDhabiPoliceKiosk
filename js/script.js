
$(document).ready(function () {


    //********************** header
    $(".logOut").hover(function () {
        $(".logOut i").removeClass("fa-lock").addClass("fa-unlock");
    }, function () {
        $(".logOut i").removeClass("fa-unlock").addClass("fa-lock");
    });

    //********************* side menu
    $('#sidebar ul li > a:not(.route-link)').click(function (e) {
        $('#sidebar ul li').removeClass('selected');
        $(this).parent().addClass('selected');
    });

    $('#sidebarCollapse').on('click', function (e) {
        $('#sidebar, #content').toggleClass('active');
        $('#sidebar .collapse.in').toggleClass('in');
        $('#sidebar a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    //********************** advanced search
    $('#dateFrom').datetimepicker({ format: 'L' });
    $('#dateTo').datetimepicker({ format: 'L' });
    $('.clockpicker').datetimepicker({ format: 'LT' });




    //********************** security page
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



    //********************** tasks page
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





    //multiple select
    $(".dropdown.multipleSelect dt a").on('click', function () {
        $(".dropdown dd ul").slideToggle('fast');
    });

    $(".dropdown.multipleSelect dd ul li a").on('click', function () {
        $(".dropdown.multipleSelect dd ul").hide();
    });

    function getSelectedValue(id) {
        return $("#" + id).find("dt a span.value").html();
    }

    $(document).bind('click', function (e) {
        var $clicked = $(e.target);
        if (!$clicked.parents().hasClass("multipleSelect")) $(".dropdown.multipleSelect dd ul").hide();
    });

    var itemsShowen = 0;
    var allSelected =''; 
   // $(".hida").css('width','100%');

    $('.mutliSelect input[type="checkbox"]').on('click', function () {

        var title = $(this).closest('.mutliSelect').find('input[type="checkbox"]').val(),
            title = $(this).val() + ",";
           // allSelected += title;
        if ($(this).is(':checked')) {
            allSelected += title;
            var html = '<span title="' + title + '">' + title + '</span>';
            $('.multiSel').append(html).attr('title', allSelected);
            $(".hida").hide();

            itemsShowen++;

        } else {
            allSelected = allSelected.replace(title, '');
            $('span[title="' + title + '"]').remove();
            var ret = $(".hida");
            $('.dropdown.multipleSelect dt a').append(ret);

            $('.multiSel').attr('title', allSelected);


            itemsShowen--;
            if (itemsShowen == 0) {
                $(".hida").show();
            }
        }
    });

  
//select2 
// $('#status').select2({
//     closeOnSelect: false
// });








});