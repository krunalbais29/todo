let todoRootContEl = document.getElementById("todoRootCont");
let onAddTodoEl = document.getElementById("onAddTodo");
let userInEl = document.getElementById("userIn");
let errorMsgEl = document.getElementById("errorMsg");



function onGetTodoFromLocalStorage(){

   let localStorageData = localStorage.getItem("myTodoList");

   if(localStorageData === null){
      return [];
   }
   else{
      let parsedData = JSON.parse(localStorageData);
      return parsedData;
   }
  
}

let todoList = onGetTodoFromLocalStorage();


function onStatusChange(titleId,checkboxId){
   let myTitle = document.getElementById(titleId);
   isChecked = document.getElementById(checkboxId).checked;
   let uniId  = titleId.slice(5);

   if(isChecked === true){
      myTitle.style.textDecoration = "line-through";
   }
   else{
      myTitle.style.textDecoration = "none";
   }

   let index = todoList.findIndex((e)=>e.id == uniId);
   
   if(todoList[index].isChecked === true){
      todoList[index].isChecked = false;
   }
   else{
      todoList[index].isChecked = true;
   }
}

function onDeleteTodo(todoId){
   let myTodo = document.getElementById(todoId);
   todoRootContEl.removeChild(myTodo);

   let uniId  = todoId.slice(5);
   let index = todoList.findIndex((e)=>e.id == uniId);
   todoList.splice(index,1);
   localStorage.setItem("myTodoList",JSON.stringify(todoList));

}

function createAppendTodo(todo){

   let checkboxId = "checkbox" + todo.id;
   let titleId = "title" + todo.id;
   let todoId = "li" + todo.id;

   let todoListItem = document.createElement("li");
   todoListItem.classList.add("todo-list-cont");
   todoListItem.id = todoId; 
   todoRootContEl.appendChild(todoListItem);

   let checkBoxEl = document.createElement("input");
   checkBoxEl.type = "checkbox";
   checkBoxEl.checked = false;
   checkBoxEl.classList.add("todo-check");
   checkBoxEl.onclick = function() {
      onStatusChange(titleId,checkboxId);
   }
   checkBoxEl.id = checkboxId;
   if(todo.isChecked === true){
      checkBoxEl.checked = true;
   }
   todoListItem.appendChild(checkBoxEl);

   let labelEl = document.createElement("label");
   labelEl.classList.add("todo-label");
   labelEl.htmlFor = checkboxId;
   todoListItem.appendChild(labelEl);

   let titleEl = document.createElement("h5");
   titleEl.textContent=todo.title;
   titleEl.id = titleId;
   if(todo.isChecked === true){
      titleEl.style.textDecoration = "line-through";
   }
   labelEl.appendChild(titleEl);

   let deleteBtn = document.createElement("button");
   deleteBtn.classList.add("delete-btn");
   deleteBtn.onclick = function(){
      onDeleteTodo(todoId);
   }
   labelEl.appendChild(deleteBtn);

   let deleteIcon = document.createElement("i");
   deleteIcon.classList.add("fa-solid","fa-trash");
   deleteBtn.appendChild(deleteIcon);
}

for(each of todoList){
   createAppendTodo(each);
}

onAddTodoEl.onclick = function(){
   if(userInEl.value === ""){
      errorMsgEl.textContent="Please fill out all the fields";
   }
   else{
      let userVal = userInEl.value;

      let newTodo = {
         title: userVal,
         id: todoList.length + 1,
         isChecked: false
      }

      createAppendTodo(newTodo);

      todoList.push(newTodo);

      userInEl.value = "";

      errorMsgEl.textContent = "";

      let list = JSON.stringify(todoList);
      localStorage.setItem("myTodoList",list);
   }

   console.log(todoList);

}


function onSetItem(){
   let list = JSON.stringify(todoList);
   localStorage.setItem("myTodoList",list);
}



/* 

let dataEl = document.getElementById("data");

let userName = "Krunal Bais";

let storedName = localStorage.getItem("name");
dataEl.textContent = storedName;
function onSetItem(){
   localStorage.setItem("name", userName);
}

function onGetItem(){
   let storedName = localStorage.getItem("name");
   dataEl.textContent = storedName;
}

function onDeleteItem(){
   localStorage.removeItem("name");
}

*/



/*

let arr = [1,2,3,4,5,6];
arr.splice(3,1);
console.log(arr);

*/