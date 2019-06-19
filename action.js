var Todo = function(todo, indicator,date){
  this.todo = todo;
  this.isDone = indicator;
  this.date = date;
  this.todoConstructor = function(){
    return `${this.todo}  ${this.isDone} ${this.date}`;
  }
}

let toDoList = [];

const DATATIMEOUT = 60;

function listChanged(list1, list2){
  if(list1.length != list2.length)
    return false;
  for(let i=0; i<list1.length; i++){
    if(! list2.get(list1[i])){
      return false;
      break;
    }
  }
}
function convertJsonToTodo(oldTodo){
  oldTodo = JSON.parse(oldTodo);
  if(oldTodo){
    for(let i=0; i<oldTodo.length; i++){
      let temp = new Todo(oldTodo[i].todo,oldTodo[i].isDone,oldTodo[i].date);
      toDoList.push(temp);
    }
  }
}  
function fetchData(){ 
  let oldData = localStorage.getItem('toDoList');
  if(oldData){
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  }
  else{
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  }
}

function init(){
  let timmy = setInterval(fetchData, 5000); 
  convertJsonToTodo(localStorage.getItem('toDoList'));
  showToDoList();
  showDoneTasks();
  getActiveElements();
  showDoneTasksButton();
}
        
document.addEventListener('DOMContentLoaded', init);

function getCurrentTime(){
  var currentDate = new Date();

  var date = currentDate.getDate();
  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
  var year = currentDate.getFullYear();
  var hour = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();

  return `${date}-${(month + 1)}-${year} ${hour}:${minutes}:${seconds}` ;
}
function appendToList(){
  var dateString = getCurrentTime();
  
  var todo = new Todo(toDoListInput.value,true,dateString);
  toDoList.unshift(todo);
  showToDoList();
  getActiveElements();
  document.getElementById("toDoListInput").value='';
}
document.onkeydown=function(){
  if(window.event.keyCode=='13'){
    if(toDoListInput.value != "")
      appendToList();
  }
}
function getLastTrueElementIndex(){
  let index = 0;
  for(let i=0; i<toDoList.length; i++){
    if(toDoList[i].isDone === false){
      index = i;
      break;
    }
  }
  return index;
}
function listItemDone(item){
  for(let i=0; i< toDoList.length;i++){
    if(toDoList[i].todo+toDoList[i].date == item.target.parentNode.textContent){
      if(toDoList[i].isDone == true){
        //toDoList.splice(i,1,new Todo(toDoList[i].todo,false,toDoList[i].date));
        let temp = toDoList.splice(i,1);
        toDoList.push(new Todo(temp[0].todo,false,temp[0].date));
        break;
      }
      else if(toDoList[i].isDone == false){
        let temp = toDoList.splice(i,1);
        toDoList.splice(getLastTrueElementIndex(),0,new Todo(temp[0].todo,true,temp[0].date));
        break;
      }
    }
  }
  showToDoList();
  showDoneTasks();
  getActiveElements();
  showDoneTasksButton();
}
function deleteItem(item){
  for(let i=0; i< toDoList.length;i++){
    if(toDoList[i].todo+toDoList[i].date === item.target.parentNode.parentNode.parentNode.textContent){
      toDoList.splice(i,1);
    }
  }
  console.log(toDoList);
  showToDoList();
  getActiveElements();
  showDoneTasks();
  showDoneTasksButton();
}

function editItem(item){
  var current = null;
  var currentIndex = 0;
  for(let i=0; i< toDoList.length;i++){
    if(toDoList[i].todo+toDoList[i].date == item.target.parentNode.textContent){
      current = toDoList[i];
      currentIndex = i;
    }
  }
  swal({   
        title: "Edit",   
        text: "Edit your task",   
        content: {
          element: "input",
          attributes: {
            value: current.todo
          },
        },   
        buttons: true}).then(inputValue =>  
        {   
          if (inputValue == false) 
            return false;    
          if (inputValue == "") {     
            swal.showInputError("Please enter task!");     
            return false   
          } 
          if(inputValue === null)
            return;
          toDoList.splice(currentIndex,1,new Todo(inputValue,true,getCurrentTime()));
          showToDoList();
          showDoneTasks();
          getActiveElements();
          showDoneTasksButton();
          swal({text:"Task edited Successfully!",icon: "success"}); 
        });
}

function getActiveElements(){
  var count = 0;
  for(let item of toDoList)
  {
    if(item.isDone === true)
    {
      count +=1;
    }
  }
  //return count;
  if(toDoList.length > 0){
    var listLength = document.getElementById('listLength');
    listLength.textContent = `${count} To-Do items in the list.`;
  }
  else{
    var listLength = document.getElementById('listLength');
    listLength.textContent = '';
  }
}

function showToDoList(){
  var div = document.getElementById('toDoListDiv');
  if(div.hasChildNodes()){
    div.removeChild(div.firstChild);
  }

  var ul = document.createElement('ul');

  for(let i=0; i<toDoList.length; i++){
    if(toDoList[i].isDone == true){
      var temp = document.createElement('li');      //ul -> li -> i -> deleteDiv -> i ->
      temp.className = 'well todo-li';
      temp.textContent = toDoList[i].todo;
      var iele = document.createElement('i');
      iele.className = 'fa fa-check-circle icon black';
      iele.addEventListener('click',function(ev){
        listItemDone(ev);
      });
      temp.appendChild(iele);

      var iedit = document.createElement('i');
      iedit.className = 'fa fa-edit icon black';
      iedit.addEventListener('click',function(ev){
        editItem(ev);
      });
      temp.appendChild(iedit);
      
      var deleteDiv = document.createElement('div');
      deleteDiv.style = 'float:right;';

      var dateDiv = document.createElement('div');
      dateDiv.style = 'display:inline-block;';

      var dateLabel = document.createElement('p');
      dateLabel.className= 'dateLabelStyle';
      dateLabel.textContent = toDoList[i].date;
      dateDiv.appendChild(dateLabel);
      deleteDiv.appendChild(dateDiv);

      var iDiv = document.createElement('div');
      iDiv.style = 'display:inline-block;';
      var i2 = document.createElement('i');
      i2.className = 'fa fa-times-circle icon red';
      i2.addEventListener('click',function(ev){
        deleteItem(ev);
      });
      iDiv.appendChild(i2);
      deleteDiv.appendChild(iDiv);
      temp.appendChild(deleteDiv);
      ul.appendChild(temp);
    }
    div.appendChild(ul);
  }
  return 1;
}

function toggleDoneTasks(){
  var doneDiv = document.getElementById('doneTasksDiv');
  if (doneDiv.style.display === "none") {
    doneDiv.style.display = "block";
    document.getElementById('toggleDoneButton').innerText = "Hide done tasks";
  } else {
    doneDiv.style.display = "none";
    document.getElementById('toggleDoneButton').innerText = "Show done tasks";
  }
}

function showDoneTasks(){
  var doneDiv = document.getElementById('doneTasksDiv');

  if(doneDiv.hasChildNodes()){
    doneDiv.removeChild(doneDiv.firstChild);
  }

  var doneUl = document.createElement('ul');
  
  for(let i=0; i<toDoList.length; i++){
    if(toDoList[i].isDone == false){
      var temp = document.createElement('li');
      temp.className = 'well todo-li';
      temp.textContent = toDoList[i].todo;
      var lineDive = document.createElement('div');
      lineDive.style = 'text-decoration:line-through';
      var x = document.createElement('i');
      x.className = 'fa fa-check-circle icon black';
      x.addEventListener('click',function(ev){
        listItemDone(ev);
      });
      temp.appendChild(x);

      var deleteDiv = document.createElement('div');
      deleteDiv.style = 'float:right;';

      var dateDiv = document.createElement('div');
      dateDiv.style = 'display:inline-block;';

      var dateLabel = document.createElement('p');
      dateLabel.className= 'dateLabelStyle';
      dateLabel.textContent = toDoList[i].date;
      dateDiv.appendChild(dateLabel);
      deleteDiv.appendChild(dateDiv);

      var iDiv = document.createElement('div');
      iDiv.style = 'display:inline-block;';

      var i2 = document.createElement('i');
      i2.className = 'fa fa-times-circle icon red';
      i2.addEventListener('click',function(ev){
        deleteItem(ev);
      });
      iDiv.appendChild(i2);
      lineDive.appendChild(temp);
      deleteDiv.appendChild(iDiv);
      temp.appendChild(deleteDiv);
      doneUl.appendChild(lineDive);
    }
    doneDiv.appendChild(doneUl);
  }
  return 1;
}

function doneTasksCount(){
  let count = 0;
  for(let i=0; i<toDoList.length; i++){
    if(toDoList[i].isDone === false){
      count++;
    }
  }
  return count;
}

function showDoneTasksButton(){
  var toggleButton = document.getElementById('toggleDoneButton');
  if(doneTasksCount() > 0){
    toggleButton.style.display = "block";
  }
  else{
    toggleButton.style.display = "none";
    toggleButton.innerText = "Show done tasks";
    document.getElementById('doneTasksDiv').style.display = "none";
  }
}