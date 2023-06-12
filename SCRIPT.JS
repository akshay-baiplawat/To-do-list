let taskinput =document.getElementById('task');
let plusbutton =document.getElementById('plus');
let deletbutton =document.getElementById('delete');
let closebutton =document.getElementById('close');
let sortbutton =document.getElementById('sort');
let listtaskoutput =document.getElementById('listtaskoutput');


let taskData=[
//     {task: "",
//     state: ""
// }
];

let temptask=[];

let ischange =false;

 function addtask(){
    let data ={
        task : taskinput.value,
        state : false
    };

    taskData.push(data);
   
    renderTaskList();
    saveTaskList();

}

function swap(array, index1, index2) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
    saveTaskList();
    renderTaskList();
  }

function renderTaskList(){
    listtaskoutput.innerHTML="";
    for (let i=0;i<taskData.length;i++) {
        let li =document.createElement('li');
        let checkbox =document.createElement('input');
        checkbox.type="checkbox";
        checkbox.id = 'checkbox' + i;
        checkbox.checked =false;
        checkbox.addEventListener('change', function() {
                getcheckbox(checkbox.checked, textSpan.innerText,li);
                if (taskData[i].state) {
                    li.style.textDecoration = 'line-through';
                  } else {
                    li.style.textDecoration = 'none';
                  }
                  if(ischange===false){
                  ischange=true;}
            });
            if (taskData[i].state) {
                li.style.textDecoration = 'line-through';
              } else {
                li.style.textDecoration = 'none';
              }
    let upButton = document.createElement('button');
    upButton.innerText = '\u2191';
    upButton.classList.add('arrow-button-up');
    // ...

    let downButton = document.createElement('button');
    downButton.innerText = '\u2193';
    downButton.classList.add('arrow-button-down');

    upButton.addEventListener('click', function(e){
        if(!(taskData[i].state === true && taskData[i-1].state === true)){
        ischange = true;
    }
        swap(taskData,i,i-1);


    });

    downButton.addEventListener('click', function(e){
        if(!(taskData[i].state === true && taskData[i+1].state === true)){
        ischange = true;
        }
        swap(taskData,i,i+1);

    });

    let divspace = document.createElement('div');
    divspace.innerText=" ";
    divspace.classList.add('div-space');

    let divspace1 = document.createElement('div');
    divspace1.innerText=" ";
    divspace1.classList.add('div-space1');

    let textSpan = document.createElement('span');
    textSpan.innerText = taskData[i].task;
    checkbox.checked = taskData[i].state;
    textSpan.classList.add('textSpan');
    li.appendChild(checkbox);
    if(i !== 0)
    li.appendChild(upButton);
    else{
        li.appendChild(divspace);
    }

    if(i !== taskData.length-1 )
    li.appendChild(downButton);
    else{
        li.appendChild(divspace1);
    }

    li.appendChild(textSpan);

    listtaskoutput.appendChild(li);

    }
}

function getcheckbox(state,textbox,li){
    for( let i=0; i < taskData.length; i++ ) {
        if (taskData[i].task === textbox) {
            taskData[i].state = state;
        }
    }
    saveTaskList();
}

function saveTaskList(){
    localStorage.setItem("taskData",JSON.stringify(taskData));
    taskinput.value ="";
}

function retriveTaskList(){
    let renderTask = localStorage.getItem("taskData");
    if(renderTask){
        taskData = JSON.parse(renderTask);
    }
}

function delettasks(){
    let l=taskData.length;
    for(let i=l-1;i>=0;i--){
        if(taskData[i].state===true){
            taskData.splice(i,1);
           // alert(taskData[i].state);
            // alert(taskData[i].task);
        }
        
    }
    saveTaskList();
    renderTaskList();
}

function closetask(){
    taskData=[];
    saveTaskList();
    renderTaskList();

}

function sorttask(){
    if(ischange==false)
    return 1;
    temptask.length = taskData.length;
    let p1=0,p2=taskData.length-1;
    let i=taskData.length-1;
    while(p1<=p2){
        if(taskData[i].state===false){
            temptask[p1]=taskData[i];
            p1++;
            }else{
                temptask[p2]=taskData[i];
                p2--;
            }
            i--;

    }
    ischange=false;
    taskData=[];
    for(let i=0; i<temptask.length; i++){
    taskData.push(temptask[i]);
    }
    temptask=[];
    saveTaskList();
    renderTaskList();
}

function restart(){
    ischange=true;
    sorttask();
    renderTaskList();
}

plusbutton.onclick = function(){
    if(taskinput.value){
    addtask();
    ischange=true;
    }
}

deletbutton.onclick = function(){
    delettasks();
}

closebutton.onclick = function(){
    closetask();
}

sortbutton.onclick = function(){
    sorttask();

}

taskinput.addEventListener("keyup", function(event){
    if(taskinput.value)
    if(event.keyCode === 13){
        addtask();
        ischange=true;
    }
})
retriveTaskList();
restart();