function showTeam(){
    document.getElementById("teamBox").style.display = "inline";
    document.getElementById("appBox").style.display = "none";
    document.getElementById("appBox").style.display = "none";
    
    document.getElementById("showTeam").style.color = "white";
    document.getElementById("showApp").style.color = "rgba(255, 255, 255, 0.5)";
    document.getElementById("showEditor").style.color = "rgba(255, 255, 255, 0.5)";
}


function showApp(){
    document.getElementById("appBox").style.display = "inline";
    document.getElementById("editorBox").style.display = "none";
    document.getElementById("teamBox").style.display = "none";
    
    document.getElementById("showTeam").style.color = "rgba(255, 255, 255, 0.5)";
    document.getElementById("showApp").style.color = "white";
    document.getElementById("showEditor").style.color = "rgba(255, 255, 255, 0.5)";
}

function showEditor(){
    document.getElementById("editorBox").style.display = "inline";
    document.getElementById("appBox").style.display = "none";
    document.getElementById("teamBox").style.display = "none";
    
    document.getElementById("showTeam").style.color = "rgba(255, 255, 255, 0.5)";
    document.getElementById("showApp").style.color = "rgba(255, 255, 255, 0.5)";
    document.getElementById("showEditor").style.color = "white";
}