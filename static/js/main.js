$.support.cors = true;

//everything in this block will be executed on pageload
$(document).ready(function() {

    var sparqlEndpoints = [];

    //code block below to load endpoints on pageload
    {
        $("#sparqlTextArea").val("\n" +
            "SELECT DISTINCT ?s \n" +
            "WHERE{ \n" +
            "\t?s a ?Concept " +
            "\n} LIMIT 100");
        var editor = CodeMirror.fromTextArea(document.getElementById("sparqlTextArea"), {
            mode: "application/x-sparql-query",
            lineNumbers: true,
            indentUnit: 6,
            autofocus: true,
            matchBrackets: true
        });

    }

    $('#btnQuery').click(function() {

	    var btn = $(this);
	    btn.button('loading');

		var sparqlQuery = $('#sparqlTextArea').val();
		$.ajax({
			type: 'GET',
			headers: {
				Accept : "application/sparql-results+json"
			},

			url: 'query/',
			data: {'query':sparqlQuery},
			//dataType: "application/sparql-results+json",
			dataType: "json",
			crossDomain: true,
			success: function(data, textStatus, jqXHR){
				console.log(data);
				// renderResults(data);

			},
			error: function(jqXHR, textStatus, errorThrown){

				console.log(jqXHR.status);
				console.log(jqXHR.responseText);
				console.log(textStatus);
				// $('#tblRes thead tr').remove();
				// $('#tblRes tbody tr').remove();

				infoError("Querying fialed: "+textStatus);

			}
		}).always(function () {
		      btn.button('reset');
	    });

    });

});