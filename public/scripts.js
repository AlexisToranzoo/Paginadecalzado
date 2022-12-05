
$(document).ready(
    function(){
    $("#hacergrande2").hide();

    $("#vergrande").click(function(){
        $("#hacergrande2").hide();
        $("#hacergrande").show();
    });

    $("#vergrande2").click(function(){
        $("#hacergrande").hide();
        $("#hacergrande2").show();
    });
});



function cargarloader(){
    document.getElementById("loader").style.display = "grid"
}



console.log("ads")