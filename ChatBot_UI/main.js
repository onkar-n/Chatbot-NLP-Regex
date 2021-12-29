function message(){
    let x = document.getElementById('query').value;
    var div = document.createElement('div')
    var att = document.createAttribute("class");
    att.value = "input";                          
    div.setAttributeNode(att);  
    var span = document.createElement('span')
    var text = document.createTextNode(x)
    span.append(text)
    div.append(span)
    document.getElementById("response").appendChild(div)
    div.style.marginTop = '10px';
}

async function makeRequest(){
    try
    {
        let query = document.getElementById('query').value;

        let myInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query: query})
        }

        let res = await fetch('http://127.0.0.1:5000/helloworld', myInit);
        let data = await res.json();

        if (data.Reply == '[ERR: No Reply Matched]'){
            data.Reply = "Sorry, couldn't understand your query."
        }

        var div = document.createElement('div')
        var att = document.createAttribute("class");
        att.value = "output";                          
        div.setAttributeNode(att);  
        var span = document.createElement('span')
        var text = document.createTextNode(data.Reply)
        span.append(text)
        div.append(span)
        document.getElementById("response").appendChild(div)
        div.style.marginTop = '10px';
    }
    catch(error){
        console.log(error)
    }
}

function clr(){
    document.getElementById('query').value = null;
}

document.getElementById('query').addEventListener('keydown', ()=>{
    if(event.keyCode == 13){
        message()
        makeRequest()
        clr()
    }
});

document.getElementById('submit').addEventListener('click', ()=>{
    message()
    makeRequest()
    clr()
    
});