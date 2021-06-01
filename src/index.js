import './styles/styles.scss';
import '..//node_modules/jquery/dist/jquery';

import '..//node_modules/bootstrap/dist/js/bootstrap.bundle';


import { Entry, List, App } from './models';


 
restore(); 

function callAlert(type, content)
{
    const collection = document.getElementById("alert-collection"); 
    let alert = collection.querySelector(`.${type}`); 
    alert.setAttribute("style", "display: flex !important"); 
    alert.querySelector(".alert-text").textContent = content; 
 
    setTimeout(() => { 
        $(alert).fadeOut(1000)
    }, 3000)
}

// ложная активация чекбоса 

// отображение чекбоксов другого списка  
function toggleList()
{ 
    let content = App.getCurList().entryList; 
    
    let field = document.querySelector("#field"); 
    field.innerHTML = ''; 
    
    for(let i of content)
        field.append(i.elem); 

    document.getElementById(App.cur_focus_list).click(); 
}
// создаёт и возвращает placeholder-подсказку 
function getFieldPlaceHolder()
{
    let div = document.createElement("div"); 
    div.className = "empty-field-pl-hold"; 
    let span = document.createElement("span"); 
    span.className = "ph-msg"; 
    span.innerText = 'Добавте или выберете список'; 

    div.append(span); 
    return div; 
}

document.getElementById("menu").addEventListener("click", (e) =>
{
    let target = e.target; 
    console.log(target.tagName);
    
    if(target.tagName == "BUTTON")
    {
        console.log(App.cur_focus_list); 
        if(App.cur_focus_list != -1 && App.cur_focus_list != undefined)
        {
            console.log(App.cur_focus_list)
            let prev = document.querySelector(`#${App.cur_focus_list}`); 
            prev.disabled = false; 
        }
        
        App.cur_focus_list = target.id; 
        target.disabled = true;  
        toggleList(); 
        document.querySelector(".empty-field-pl-hold").style.display = 'none';  
    }
})


document.querySelector("button[data-bs-target=\"#addListModal\"]")
.addEventListener("click", () =>
{
    let elem = document.querySelector("#title-list-text");
    elem.placeholder = `New List ${App.lists.length+1}` 

})

document.getElementById("addList_btn").addEventListener("click", (e) =>
{
    let text = document.querySelector("#title-list-text").value; 
    text = text.length == 0 ? `New List ${App.lists.length+1}` : text;  
    
    console.log(text); 
    let list = new List(text); 
    App.addList(list); 
    
    document.querySelector('#menu').append(list.elem); 
    document.querySelector(".empty-field-pl-hold").style.display = 'none';  
})

document.getElementById("addEntry_btn").addEventListener("click", (e) =>
{
    let entry = new Entry("some text", true); 
    let curList = App.getCurList(); 
    curList.addEntry(entry);  
    console.log(entry.elem)
    entry.elem.addEventListener("dblclick", entrySectionClick); 
    entry.elem.addEventListener("click", del_entry); 
    entry.elem.querySelector(".check-namer").addEventListener("blur", changeEntryName); 

    document.querySelector('#field').append(entry.elem);
})

document.getElementById("save_btn").addEventListener("click", (e) =>
{
    localStorage.setItem("lastSave", JSON.stringify(App.lists));
    localStorage.setItem("lastFocus", App.cur_focus_list);
    callAlert("alert-success", `Данные были сохранены`);
})

function restore()
{
    console.dir(JSON.parse(localStorage.getItem('lastSave'))); 
    const data = JSON.parse(localStorage.getItem('lastSave')); 
    if(data)
    {
        //App.cur_focus_list = localStorage.getItem("lastFocus");
        // инициализирую api объекты 
        for(let listData of data)
        {
            let restoredList = new List(listData.title); 
            restoredList.id = listData.id; 
            restoredList.elem = restoredList.createElement(); 
            for(let entryData of listData.entryList)
            {
                let restoredEntry = new Entry(entryData.text, entryData.isChecked); 
                restoredEntry.id = entryData.id; 
                restoredEntry.elem = restoredEntry.createElement(); 
                restoredEntry.elem.addEventListener("dblclick", entrySectionClick); 
                restoredEntry.elem.addEventListener("click", del_entry); 
                restoredEntry.elem.querySelector(".check-namer").addEventListener("blur", changeEntryName); 
                restoredList.addEntry(restoredEntry); 
            }
            
            App.addList(restoredList); 
            restoredList.elem.disabled = false; 
            document.getElementById("menu").append(restoredList.elem); 
        }
        //toggleList(); 
    }
}

document.getElementById("deleteList_btn").addEventListener("click", (e) =>
{
    if(confirm(`Вы  действительнохотите удалить список: ${App.cur_focus_list}`))
    {
        const deleted = App.getCurList(); 
        const del_index = App.lists.indexOf(deleted); 

        App.deleteCurList(); 
        document.getElementById(deleted.id).remove(); 
        //document.getElementById("field").innerHTML = ""; 
        App.cur_focus_list = -1; 
        
        if(App.lists.length == 0)
        {
            let field = document.getElementById("field"); 
            field.innerHTML = ''; 
            field.append(getFieldPlaceHolder()); 
        }
        else
        {
            if(del_index < App.lists.length - 1) 
                App.cur_focus_list = App.lists[del_index].id; 
            else 
                App.cur_focus_list = App.lists[del_index - 1].id; 

            console.log(App.cur_focus_list);
            toggleList(); 
        }
        callAlert("alert-danger", `Вы удалили список ${deleted.title}`)
    }
})


document.getElementById("deleteAll_btn").addEventListener("click", (e) =>
{
    document.getElementById("field").innerHTML = ''; 
    document.getElementById("menu").innerHTML = ''; 
    localStorage.clear(); 
    App.deleteAll(); 
    field.append(getFieldPlaceHolder()); 
    callAlert("alert-danger", `Все данные были удалены`);

})

function entrySectionClick(e)
{
    console.log("event")
    let target = e.target; 
    let cur = e.currentTarget; 

    console.log(target);
   
    if(target.className == "form-check-label")
    {
        const id = target.dataset.for;  
        let entry = App.getEntryById(id); 
        let namer = document.querySelector(`input[data-for=\"${id}\"]`);    
        namer.value = entry.text; 
        namer.dataset.for = id; 
        namer.style.display = "block"; 
        namer.focus(); 
        // console.log(namer); 
        // console.log("complete"); 

    }
    if(target.className == "form-check-input")
    {
        let entry = App.getEntryById(target.getAttribute("id")); 
        entry.isChecked = target.checked; 
        console.dir(App); 
    }
} 

function del_entry(e)
{
    console.log("lksjdgflsjldfjg")
    if(e.target.className == "check-delete-img")
    {
        
        let id = e.target.dataset.for; 
        App.getCurList().deleteEntry(id); 
        let elem = e.target.closest('.form-check'); 
        console.log(elem)
        elem.remove(); 
        //elem.outerHTML = ""; 
    }
}

function changeEntryName(e)
{
    const text = e.target.value; 
    const id = e.target.dataset.for; 
    
    let entry = App.getEntryById(id); 
    entry.text = text; 
    document.querySelector(`label[data-for=\"${id}\"]`).textContent = text; 
    e.target.style.display = "none"; 
}
