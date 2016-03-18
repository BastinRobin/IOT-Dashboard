$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = window.location.href === 'http://localhost:8000/dashboard' ?
                'upload' : 'upload';
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        redirect: 'http://localhost:8000/upload',
        done: function (e, data) {
            console.log(data);
            window.location.href = window.location.href + 'dashboard/datalist';
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');   
        


    // Dynamic form filtering function
    $('.filter-control').change(function() {
        // Key value pair for eg: Category: Total Income

        // Check if key already exist in payload
        if ($(this).data('header') in Litmus.payload) {
            if($(this).is(":checked"))
                Litmus.payload[$(this).data('header')].push($(this).val());
            else
                Litmus.payload[$(this).data('header')].pop($(this).val());
        } else {
            // if key does not exist create key and append value
            Litmus.payload[$(this).data('header')] = [];

            if($(this).is(":checked"))
                Litmus.payload[$(this).data('header')].push($(this).val());
            else
                Litmus.payload[$(this).data('header')].pop($(this).val());
        }    


        Litmus._get(Litmus.payload, "/dashboard/filter");
    });
});