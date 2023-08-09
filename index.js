
const taskContainer= document.querySelector(".task__container");

let globalStore =[];

const generateNewCard=(taskData) =>`
<div class="col-md-6 col-lg-4" >
             <div class="card ">
                 <div class="card-header d-flex justify-content-end gap-2">
                     <button type="button" class="btn btn-outline-success"><i class="fa-solid fa-pencil"></i></button>
                     <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
                     <i class="fa-solid fa-trash-can" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i></button>

                 </div>
                 <img src=${taskData.imageUrl} class="card-img-top" alt="...">

                 <div class="card-body">
                   <h5 class="card-title">${taskData.taskType}</h5>
                   <p class="card-text">${taskData.taskDescription}</p>
                   <a href="#" class="btn btn-primary">${taskData.taskType}</a>
                 </div>
                 <div class="card-footer text-muted">
                     <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
                 </div>
               </div>
               
         </div>
`;

const loadInitialCardData=()=>{

  //local storage to get tasky card data

  const getCardData=localStorage.getItem("tasky");

  //convert to normal object

  const {cards}= JSON.parse(getCardData);

  //loop over those array of task object to create HTML CARD ,inject it to DOM

  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));

    //update our globalstore
    globalStore.push(cardObject);
  })
}


const saveChanges = () => {
   const taskData ={
    id: `${Date.now()}`,  //unique number for id
    imageUrl: document.getElementById("imageUrl").value,
    taskTitle: document.getElementById("taskTitle").value,
    taskType: document.getElementById("taskType").value,
    taskDescription: document.getElementById("taskDescription").value,
   };
    
   taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

   globalStore.push(taskData);

   localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));

  };

  const deleteCard=(event)=>{
    //id
    event=window.event;
    const targetID=event.target.id;

    const tagname= event.target.tagName; //button

    //match the id of the element with the id inside the globalstore
    //if match found remove
    globalStore= globalStore.filter((cardObject)=> cardObject.id !== targetID);

    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));
    //we have updated array of cards
    //contact parent

    if(tagname==="BUTTON"){
      return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);

    }else{
      return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
   // taskContainer.removeChild(document.getElementById(targetID));

  }
//page refresh will cause data deleted  -> localstorage -> limit-> 5mb

//API-> apllication programming interface

// localstorage -> application 
//access application via -> programming
//interface as a middleman 
//local storage -> with some method -> javascript

// features 

// delete the card 
// edit the card 
// open the card 

