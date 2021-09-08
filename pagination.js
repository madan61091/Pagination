

let allItems = [];
let currentElements = []
let pageNumber = 1;
let totalItems = 0;
let totalPages = 0;

document.getElementById('next').addEventListener('click',() => jumpToPage(pageNumber+1));
document.getElementById('previous').addEventListener('click',() => jumpToPage(pageNumber-1));
document.getElementById('last').addEventListener('click',() => jumpToPage(totalPages));
document.getElementById('first').addEventListener('click',() => jumpToPage(1));

fetch("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json")
.then(res => {
    return res.json()
})
.then(data => {
    pageNumber = 1;
    allItems = data
    totalPages = data.length / 10;
    totalItems = data.length
    if(data.length%10) totalPages++;
    currentPageElements();

    let buttons = document.getElementById('buttons');
    for(let i = 1; i<= totalPages ; i++){
        let temp = document.createElement('span');
        temp.classList.add("option")
        temp.textContent = i;
        temp.addEventListener('click',() => jumpToPage(i));
        buttons.append(temp);
    }

})

function displayCurrentElements(){

    let table = document.getElementById('t-body');
    table.textContent = ""

    for(let i = 0; i < currentElements.length ; i++){
        let tr = document.createElement("tr");
        for(let key in  currentElements[i]){
            const td = document.createElement('td');
            td.textContent = currentElements[i][key];
            tr.append(td);
        }
        table.append(tr);
    }
    
   let buttons = document.getElementsByClassName('option');
    Array.from(buttons).forEach(ele => {
        if(ele.textContent == pageNumber){
            ele.style.background = "lightgray"
            ele.style.color = "black"
        }else{
            ele.style.background = "";
            ele.style.color = "";
        }
    })
}

function currentPageElements(){

    currentElements = [];

    let x = pageNumber - 1;

    for(let i = x*10; i < x*10 + 10 && i < totalItems;i++){
        currentElements.push(allItems[i]);
    }

    displayCurrentElements()

}

function jumpToPage(newPage){

    if(newPage >= 1 && newPage <= totalPages)
    pageNumber = newPage;
    currentPageElements()

}