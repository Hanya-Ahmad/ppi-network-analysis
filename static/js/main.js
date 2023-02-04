                                // init buttons //
document.getElementById('Graph btn').addEventListener("click", function(){
    document.getElementById('Graph page').style.display = 'block';
    document.getElementById('material').style.display = 'none';
    document.getElementById('layout').style.display = 'none';
    document.getElementById('Protein page').style.display = 'none';
    document.getElementById('UniProtID page').style.display = 'none';
    document.getElementById('btns').style.display = 'none';
    console.log('suceesss')
})
document.getElementById('Protein btn').addEventListener("click", function(){
    document.getElementById('Protein page').style.display = 'block';
    document.getElementById('Graph page').style.display = 'none';
    document.getElementById('material').style.display = 'none';
    document.getElementById('layout').style.display = 'none';
    document.getElementById('UniProtID page').style.display = 'none';
    document.getElementById('btns').style.display = 'none';
    console.log('suceesss')
})
document.getElementById('UniProtID btn').addEventListener("click", function(){
    document.getElementById('UniProtID page').style.display = 'block';
    document.getElementById('Protein page').style.display = 'none';
    document.getElementById('Graph page').style.display = 'none';
    document.getElementById('material').style.display = 'none';
    document.getElementById('layout').style.display = 'none';
    document.getElementById('btns').style.display = 'none';
    document.getElementById('gene-msg').style.display = 'flex';
    document.getElementById('gene').style.display = 'flex';
    document.getElementById('sendgene').style.display = 'flex';
    console.log('suceesss')
})
document.getElementById('return1 btn').addEventListener("click", function(){
    document.getElementById('UniProtID page').style.display = 'none';
    document.getElementById('Protein page').style.display = 'none';
    document.getElementById('Graph page').style.display = 'none';
    document.getElementById('material').style.display = 'flex';
    document.getElementById('layout').style.display = 'flex';
    document.getElementById('btns').style.display = 'block';
    console.log('suceesss')
})
document.getElementById('return2 btn').addEventListener("click", function(){
    document.getElementById('UniProtID page').style.display = 'none';
    document.getElementById('Protein page').style.display = 'none';
    document.getElementById('Graph page').style.display = 'none';
    document.getElementById('material').style.display = 'flex';
    document.getElementById('layout').style.display = 'flex';
    document.getElementById('btns').style.display = 'block';
    console.log('suceesss')
})
document.getElementById('return3 btn').addEventListener("click", function(){
    document.getElementById('UniProtID page').style.display = 'none';
    document.getElementById('Protein page').style.display = 'none';
    document.getElementById('Graph page').style.display = 'none';
    document.getElementById('material').style.display = 'flex';
    document.getElementById('layout').style.display = 'flex';
    document.getElementById('btns').style.display = 'block';
    console.log('suceesss')
})
///////////////////////////////////////////////////////////////////
                       //     Graph Page    //
document.getElementById('import data btn').addEventListener('click',function(){
    document.getElementById('import data').click();
})
document.getElementById ("import data").addEventListener("change", function(e){
    document.getElementById('graph').style.display = 'none';
    document.getElementById('spanning').style.display = 'none';
    document.getElementById('loader3').style.display='flex';
    document.getElementById('choose-data').style.display = 'none';
    document.getElementById('show spanning btn').style.display = 'none';
    document.getElementById('data-msg').style.display = 'none';
    document.getElementById('send-value').style.display = 'none';
    console.log(document.getElementById('import data').value)
if (document.getElementById ("import data").value){                            
    var xhr = new XMLHttpRequest();
    const formData = new FormData();
    const files = document.getElementById("import data");
    formData.append("imported-data", files.files[0] );
    xhr.open('POST', '/importdata', true);
    xhr.onload = function (e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
        document.getElementById('choose-data').style.display = 'flex';
        document.getElementById('show spanning btn').style.display = 'flex';
        document.getElementById('data-msg').style.display = 'flex';
        document.getElementById('send-value').style.display = 'flex';
        document.getElementById('loader3').style.display='none';
        send_graph();
        send_spanning();
            console.log('ana etb3t')
            document.getElementById('graph').style.display = 'flex';
        //document.getElementById('Graph img')
        } else {
            console.log(xhr.response);
}
};

xhr.send(formData);
}
    else{
    console.log('failed')
    }
    })

document.getElementById('show spanning btn').addEventListener('click',function(){
    document.getElementById('graph').style.display = 'none';
    document.getElementById('spanning').style.display = 'flex';
    document.getElementById('hide spanning btn').style.display = 'flex';
    document.getElementById('show spanning btn').style.display = 'none';
    document.getElementById("adj btn").disabled = true;
})
document.getElementById('hide spanning btn').addEventListener('click',function(){
    document.getElementById('graph').style.display = 'flex';
    document.getElementById('spanning').style.display = 'none';
    document.getElementById('hide spanning btn').style.display = 'none';
    document.getElementById('show spanning btn').style.display = 'flex';
    document.getElementById("adj btn").disabled = false;
})

document.getElementById('send-value').addEventListener('click', function(e){
    e.preventDefault();
    console.log(document.getElementById('choose-data').value)
    var xhr = new XMLHttpRequest();
    value =document.getElementById('choose-data').value;
    datasent =document.getElementById ("import data").value
    var JSON_sent = {value,datasent};
    var formData = new FormData();
    formData.append("choosedata",datasent);
    formData.append("value",JSON_sent)
    xhr.open('POST', '/choosedata', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            
            console.log(datasent)
            send_graph();
            send_spanning();
        }
        };  
    xhr.send(JSON.stringify(JSON_sent));
});

document.getElementById('adj btn').addEventListener('click',function(e){
    document.getElementById('loader3').style.display='flex';
    document.getElementById('choose-data').style.display = 'flex';
    document.getElementById('show spanning btn').style.display = 'flex';
    document.getElementById('data-msg').style.display = 'flex';
    document.getElementById('send-value').style.display = 'flex';
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    datasent =document.getElementById ("import data").value
    var JSON_sent = {datasent};
    var formData = new FormData();
    formData.append("unweighted",datasent);
    xhr.open('POST', '/unweighted', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('loader3').style.display='none';
            document.getElementById('choose-data').style.display = 'flex';
            document.getElementById('show spanning btn').style.display = 'flex';
            document.getElementById('data-msg').style.display = 'flex';
            document.getElementById('send-value').style.display = 'flex';
            console.log(datasent)
            send_unweightedgraph();
        }
        };  
xhr.send(JSON.stringify(JSON_sent));
document.getElementById('spanning').style.display = 'none';
document.getElementById('graph').style.display = 'none';
document.getElementById('convert-back btn').style.display = 'flex';
document.getElementById('adj btn').style.display = 'none';
document.getElementById("show spanning btn").disabled = true;
document.getElementById("hide spanning btn").disabled = true;
document.getElementById('unweighted').style.display = 'flex';
})
document.getElementById('convert-back btn').addEventListener('click',function(){
    document.getElementById('graph').style.display = 'flex';
document.getElementById('convert-back btn').style.display = 'none';
document.getElementById('adj btn').style.display = 'flex';
document.getElementById('spanning').style.display = 'none';
document.getElementById('unweighted').style.display = 'none';
document.getElementById("show spanning btn").disabled = false;
document.getElementById("hide spanning btn").disabled = false;
})

document.getElementById('unw btn').addEventListener('click',function(e){
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    //value =document.getElementById('choose-data').value;
    datasent =document.getElementById ("import data").value
    var JSON_sent = {datasent};
    var formData = new FormData();
    formData.append("adj_matrix",datasent);
    xhr.open('POST', '/exportadj', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(datasent)
            send_unweightedgraph();
        }
        };  
xhr.send(JSON.stringify(JSON_sent));

})


function send_unweightedgraph(){
    checkIfImageExists('/static/imgs/unweightedGraph.jpg', (exists) => {
    if (exists) {
        console.log('Image exists.')
        var timestamp = new Date().getTime();
        result_received = document.createElement("img");
        result_received.src = '/static/imgs/unweightedGraph.jpg?t='+ timestamp;
        document.getElementById('unweighted').innerHTML = " ";
        document.getElementById('unweighted').appendChild(result_received);
        console.log("sucessfully send");
        } else {
            console.log('Image does not exists.')
        }
    });
    }
function send_graph(){
    checkIfImageExists('/static/imgs/weightedGraph.jpg', (exists) => {
    if (exists) {
        console.log('Image exists.')
        var timestamp = new Date().getTime();
        result_received = document.createElement("img");
        result_received.src = '/static/imgs/weightedGraph.jpg?t='+ timestamp;
        document.getElementById('graph').innerHTML = " ";
        document.getElementById('graph').appendChild(result_received);
        console.log("sucessfully send");
        } else {
        console.log('Image does not exists.')
        }
    });
}
function send_spanning(){
    checkIfImageExists('/static/imgs/spanningtree.jpg', (exists) => {
    if (exists) {
        console.log('Image exists.')
            var timestamp = new Date().getTime();
            result_received = document.createElement("img");
            result_received.src = '/static/imgs/spanningtree.jpg?t='+ timestamp;
            document.getElementById('spanning').innerHTML = " ";
            document.getElementById('spanning').appendChild(result_received);
            console.log("sucessfully send");
        } else {
            console.log('Image does not exists.')
        }
    });
        }
// end of first page // 
function checkIfImageExists(url, callback) {
const img = new Image();
img.src = url;
if (img.complete) {
callback(true);
} else {
img.onload = () => {
callback(true);
};
img.onerror = () => {
callback(false);
};
}
}
// proteins
function send_shortest(){
checkIfImageExists('/static/imgs/shortestpath.jpg', (exists) => {
if (exists) {
console.log('Image exists.')
var timestamp = new Date().getTime();
result_received = document.createElement("img");
result_received.src = '/static/imgs/shortestpath.jpg?t='+ timestamp;
document.getElementById('shortest').innerHTML = " ";
document.getElementById('shortest').appendChild(result_received);
console.log("sucessfully send");
} else {
console.log('Image does not exists.')
}
});}
function send_dishortest() { 
checkIfImageExists('/static/imgs/dijkstrashortestpath.jpg', (exists) => {
if (exists) {
console.log('Image exists.')
var timestamp = new Date().getTime();
result_received = document.createElement("img");
result_received.src = '/static/imgs/dijkstrashortestpath.jpg?t='+ timestamp;
document.getElementById('dishortest').innerHTML = " ";
document.getElementById('dishortest').appendChild(result_received);
console.log("sucessfully send");
} else {
console.log('Image does not exists.')
}
});
};
function send_allshortest() { 
checkIfImageExists('/static/imgs/allshortestpaths.jpg', (exists) => {
if (exists) {
console.log('Image exists.')
var timestamp = new Date().getTime();
result_received = document.createElement("img");
result_received.src = '/static/imgs/allshortestpaths.jpg?t='+ timestamp;
document.getElementById('allshortest').innerHTML = " ";
document.getElementById('allshortest').appendChild(result_received);
console.log("sucessfully send");
} else {
console.log('Image does not exists.')
}
});
};
function send_histogram() { 
checkIfImageExists('/static/imgs/histogram.jpg', (exists) => {
if (exists) {
console.log('Image exists.')
var timestamp = new Date().getTime();
result_received = document.createElement("img");
result_received.src = '/static/imgs/histogram.jpg?t='+ timestamp;
document.getElementById('histogram').innerHTML = " ";
document.getElementById('histogram').appendChild(result_received);
console.log("sucessfully send");
} else {
console.log('Image does not exists.')
}
});
};
document.getElementById('importprotein data btn').addEventListener('click',function(){
    document.getElementById('import data2').click();
    document.getElementById('paths-btn').style.display ='none';
})
document.getElementById ("import data2").addEventListener("change", function(e){
    document.getElementById('loader').style.display='flex';

    proteindata= document.getElementById('import data2').value;
    console.log(proteindata);
    if (document.getElementById ("import data2").value){                            
        var xhr = new XMLHttpRequest();
        const formData = new FormData();
        const files = document.getElementById("import data2");
        formData.append("imported-protein", files.files[0] );
        xhr.open('POST', '/protein', true);
        xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            send_histogram();
                console.log('ana etb3t')
                document.getElementById('loader').style.display='none';
            } else {
                console.log(xhr.response);
    }
    };
    
    xhr.send(formData);
    }
        else{
        console.log('failed')
        }
    })

document.getElementById('sendoneprotein').addEventListener('click', function(e){
e.preventDefault();
console.log(document.getElementById('oneprotein').value)
var xhr = new XMLHttpRequest();
value =document.getElementById('oneprotein').value;
datasent =document.getElementById ("import data2").value
var JSON_sent = {value,datasent};
var formData = new FormData();
formData.append("protein",datasent);
formData.append("value",JSON_sent)
xhr.open('POST', '/oneprotein', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function (e) {
if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(datasent)
    document.getElementById('indeg ').innerHTML =JSON.parse(xhr.response)[0];
    document.getElementById('outdeg ').innerHTML =JSON.parse(xhr.response)[1];
}
};  
xhr.send(JSON.stringify(JSON_sent));
});
document.getElementById('sendtwoprotein').addEventListener('click', function(e){
document.getElementById('loader2').style.display='flex'; 
document.getElementById('paths-btn').style.display ='flex';
document.getElementById('shortest').style.display = 'none';
document.getElementById('dishortest').style.display = 'none';
document.getElementById('allshortest').style.display = 'none';

e.preventDefault();
console.log(document.getElementById('twoprotein').value)
var xhr = new XMLHttpRequest();
value =document.getElementById('twoprotein').value;
datasent =document.getElementById ("import data2").value
var JSON_sent = {value,datasent};
var formData = new FormData();
formData.append("protein",datasent);
formData.append("value",JSON_sent)
xhr.open('POST', '/twoprotein', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function (e) {
if (xhr.readyState === 4 && xhr.status === 200) {
    document.getElementById('loader2').style.display='none';
    send_shortest();
    send_dishortest();
    send_allshortest();
    document.getElementById('shortest').style.display='flex';
    console.log('ana geeeeet')
/// add imgs here when u return from aisha
}
};  
xhr.send(JSON.stringify(JSON_sent));
});

document.getElementById('sendsetprotein').addEventListener('click', function(e){
    e.preventDefault();
    console.log(document.getElementById('setprotein').value)
    var xhr = new XMLHttpRequest();
    value =document.getElementById('setprotein').value;
    datasent =document.getElementById ("import data2").value
    var JSON_sent = {value,datasent};
    var formData = new FormData();
    formData.append("protein",datasent);
    formData.append("value",JSON_sent)
    xhr.open('POST', '/setproteins', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.response)
        send_histogram();
        /// add imgs here when u return from aisha
    }
    };  
    xhr.send(JSON.stringify(JSON_sent));
    });


document.getElementById('one-btn').addEventListener('click',function(){
    document.getElementById('sendoneprotein').style.display = 'flex';
    document.getElementById('oneprotein').style.display ='flex';
    document.getElementById('indegree-msg').style.display = 'flex'; 
    document.getElementById('outdegree-msg').style.display ='flex'; 
    document.getElementById('one-layout').style.display = 'flex';
    document.getElementById('sendtwoprotein').style.display ='none';
    document.getElementById('paths-btn').style.display ='none';
    document.getElementById('twoprotein').style.display ='none';
    document.getElementById("two layout").style.display='none';
    document.getElementById('two-msg').style.display ='none';
    document.getElementById('sendsetprotein').style.display ='none';
    document.getElementById('setprotein').style.display ='none';
    document.getElementById("set layout").style.display='none';
    document.getElementById('set-msg').style.display ='none';
    document.getElementById('histogram').style.display = 'none';
});

document.getElementById('two-btn').addEventListener('click',function(){
    document.getElementById("one-layout").style.display ='none';
    document.getElementById("two layout").style.display='flex';
    document.getElementById('oneprotein').style.display ='none';
    document.getElementById('sendoneprotein').style.display = 'none';
    document.getElementById('oneprotein').style.display ='none';
    document.getElementById('indegree-msg').style.display ='none';
    document.getElementById('sendtwoprotein').style.display ='flex';
    document.getElementById('twoprotein').style.display ='flex';
    document.getElementById('two-msg').style.display ='flex';
    document.getElementById('sendsetprotein').style.display ='none';
    document.getElementById('setprotein').style.display ='none';
    document.getElementById("set layout").style.display='none';
    document.getElementById('set-msg').style.display ='none';
    document.getElementById('histogram').style.display = 'none';
})
document.getElementById('set-btn').addEventListener('click',function(){
    document.getElementById('sendoneprotein').style.display = 'none';
    document.getElementById('oneprotein').style.display ='none';
    document.getElementById('indegree-msg').style.display = 'none'; 
    document.getElementById('outdegree-msg').style.display ='none'; 
    document.getElementById('one-layout').style.display = 'none';
    document.getElementById('sendtwoprotein').style.display ='none';
    document.getElementById('paths-btn').style.display ='none';
    document.getElementById('twoprotein').style.display ='none';
    document.getElementById("two layout").style.display='none';
    document.getElementById('two-msg').style.display ='none';
    document.getElementById('sendsetprotein').style.display ='flex';
    document.getElementById('setprotein').style.display ='flex';
    document.getElementById("set layout").style.display='flex';
    document.getElementById('set-msg').style.display ='flex';
    document.getElementById('histogram').style.display = 'flex';
    document.getElementById('shortest').style.display = 'none';
    document.getElementById('dishortest').style.display = 'none';
    document.getElementById('allshortest').style.display = 'none';
}) 
document.getElementById('shortest-btn').addEventListener('click',function(){
    document.getElementById('shortest').style.display = 'flex';
    document.getElementById('dishortest').style.display = 'none';
    document.getElementById('allshortest').style.display = 'none';
    document.getElementById('histogram').style.display = 'none';
    console.log('hhahaha')
})
document.getElementById('dipath-btn').addEventListener('click',function(){
    document.getElementById('shortest').style.display = 'none';
    document.getElementById('dishortest').style.display = 'flex';
    document.getElementById('allshortest').style.display = 'none';
    document.getElementById('histogram').style.display = 'none';
    console.log('hohoh')
})
document.getElementById('allpath-btn').addEventListener('click',function(){
    document.getElementById('shortest').style.display = 'none';
    document.getElementById('dishortest').style.display = 'none';
    document.getElementById('allshortest').style.display = 'flex';
    document.getElementById('histogram').style.display = 'none';
    console.log('hahahah')
})

////////// GENE NAME CONVERTER ////////////////

document.getElementById('sendgene').addEventListener('click', function(e){
    document.getElementById('loader4').style.display='flex';
    e.preventDefault();
    proteinlist = document.getElementById('gene').value
    var xhr = new XMLHttpRequest();
    var JSON_sent = proteinlist;
    xhr.open('POST', '/Genename', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
        document.getElementById('loader4').style.display='none';
        const link = document.createElement("a");
        document.getElementById('save-btn').addEventListener('click',function(){
            link.click();
            URL.revokeObjectURL(link.href);
        })
        //link.id = 'link';
        const file = new Blob([xhr.response], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
        link.download = "UniProtIDtoGeneName.txt";
        console.log(xhr.response)
        document.getElementById('name').value = xhr.response;
        /// add imgs here when u return from aisha
    }
    };  
    xhr.send(JSON.stringify(JSON_sent));
    });
