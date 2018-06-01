var dataset = 0
var dataset3 = 0
var ml = 0
var machine = 0

function setDataset(a){
	dataset = a;
	if (a == 'e'){
		document.getElementById("dataset").innerHTML = 'Enzyme';
	} else if (a == 'ic'){
		document.getElementById("dataset").innerHTML = 'ION Channel';
	} else if (a == 'nr'){
		document.getElementById("dataset").innerHTML = 'Nuclear Receptor';
	} else if (a == 'gpcr'){
		document.getElementById("dataset").innerHTML = 'GPCR';
	}
}

function setDatasetButton3(a){
    dataset3 = a;
    if (a == 'e'){
        document.getElementById("datasetButton3").innerHTML = 'Enzyme';
    } else if (a == 'ic'){
        document.getElementById("datasetButton3").innerHTML = 'ION Channel';
    } else if (a == 'nr'){
        document.getElementById("datasetButton3").innerHTML = 'Nuclear Receptor';
    } else if (a == 'gpcr'){
        document.getElementById("datasetButton3").innerHTML = 'GPCR';
    }
}

function setML(aux){
	ml = aux;
    if (aux == 'semEP') document.getElementById("mltool").innerHTML = 'semEP';
    else if(aux == 'NBI') document.getElementById("mltool").innerHTML = 'NBI';
    else if(aux == 'BLM') document.getElementById("mltool").innerHTML = 'BLM';
    else if(aux == 'GIP') document.getElementById("mltool").innerHTML = 'GPI';
    else if(aux == 'LapRLS') document.getElementById("mltool").innerHTML = 'LapRLS';
    else if(aux == 'KBMF2K') document.getElementById("mltool").innerHTML = 'KBMF2K';
    else if(aux == 'NBI_plus_semEP') document.getElementById("mltool").innerHTML = 'NBI + semEP';
    else if(aux == 'BLM_plus_semEP') document.getElementById("mltool").innerHTML = 'BLM + semEP';
    else if(aux == 'GIP_plus_semEP') document.getElementById("mltool").innerHTML = 'GPI + semEP';
    else if(aux == 'LapRLS_plus_semEP') document.getElementById("mltool").innerHTML = 'LapRLS + semEP';
    else if(aux == 'KBMF2K_plus_semEP') document.getElementById("mltool").innerHTML = 'KBMF2K + semEP';
    else if(aux == 'NBI_plus_ncut') document.getElementById("mltool").innerHTML = 'NBI + ncut';
    else if(aux == 'BLM_plus_ncut') document.getElementById("mltool").innerHTML = 'BLM + ncut';
    else if(aux == 'GIP_plus_ncut') document.getElementById("mltool").innerHTML = 'GPI + ncut';
    else if(aux == 'LapRLS_plus_ncut') document.getElementById("mltool").innerHTML = 'LapRLS + ncut';
    else if(aux == 'KBMF2K_plus_ncut') document.getElementById("mltool").innerHTML = 'KBMF2K + ncut';
    else if(aux == 'NBI_plus_metis') document.getElementById("mltool").innerHTML = 'NBI + metis';
    else if(aux == 'BLM_plus_metis') document.getElementById("mltool").innerHTML = 'BLM + metis';
    else if(aux == 'GIP_plus_metis') document.getElementById("mltool").innerHTML = 'GPI + metis';
    else if(aux == 'LapRLS_plus_metis') document.getElementById("mltool").innerHTML = 'LapRLS + metis';
    else if(aux == 'KBMF2K_plus_metis') document.getElementById("mltool").innerHTML = 'KBMF2K + metis';
    else if(aux == 'NBI_plus_random') document.getElementById("mltool").innerHTML = 'NBI + random';
    else if(aux == 'BLM_plus_random') document.getElementById("mltool").innerHTML = 'BLM + random';
    else if(aux == 'GIP_plus_random') document.getElementById("mltool").innerHTML = 'GPI + random';
    else if(aux == 'LapRLS_plus_random') document.getElementById("mltool").innerHTML = 'LapRLS + random';
    else if(aux == 'KBMF2K_plus_random') document.getElementById("mltool").innerHTML = 'KBMF2K + random';
}

function setMachine(aux) {
    alert(aux)
    machine = aux
    if (aux == 'semEP') document.getElementById("machines").innerHTML = 'semEP';
    else if (aux == 'metis') document.getElementById("machines").innerHTML = 'METIS';
    else if (aux == 'ncut') document.getElementById("machines").innerHTML = 'NCUT';
}


function search(){
	var html = dataset+'_'+ml;
	console.log(html+'.html');
    if (dataset == 0 || ml == 0){
        $("#myModal5").modal();
    } else {
	window.location.href = '../'+html+'.html';
    }
}

function searchButton3() {
    var html = machine+"_"+dataset3;
    console.log(html+'.html');
    if (machine == 0 || dataset3 == 0){
        $("#myModal6").modal();
    } else {
    window.location.href = '../'+html+'.html';
    }
}