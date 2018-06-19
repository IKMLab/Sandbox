function sendRequest(codeMirror){

    url = "http://127.0.0.1:9487/api";

    request = {
        "language": $("#compile-language").val(),
        "run-time": $("#compile-runtime").val(),
        "user-input": $("#user-input").val(),
        "code": codeMirror.getValue(),
    }

    

    console.log(request)
    console.log(JSON.stringify(request))
    var fadeMs = 300;
    $(document).ajaxStart(function(){
        $("#loading_img").fadeIn(fadeMs);
        $("#results_container").fadeOut(fadeMs);
        });
    $(document).ajaxStop(function(){
        $("#loading_img").fadeOut(fadeMs);
        $("#results_container").fadeIn(fadeMs);
    });

    $.ajax({
        type: 'get',
        url: url,
        data: request,
        dataType: 'json',
        success: function(result) {
            console.log("Success");
            result = jQuery.parseJSON(result);
            console.log(result);
            output = result['output'];
            result = result['status'];
            $("#code-memory").html("memory usage: " + String(result['memory']));
            $("#code-out").html("output: " + String(output));
            $("#code-result").html("result: " + String(result['result']));
            $("#code-vcpu").html("cpu time: " + String(result['cpu_time']));
            $("#code-realtime").html("real run time: " + String(result['real_time']));
            $("#code-error").html("error: " + String(result['error']));

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Failed");
            console.log(XMLHttpRequest.status);
        }
    });

        
}