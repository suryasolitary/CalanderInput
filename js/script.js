const Calander = document.querySelector('.calander');
const MonthBanner = document.querySelector('.mounth');
let navigation = 0;
let clicked = null;
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let events = localStorage.getItem("event") ? JSON.parse(localStorage.getItem("event")):[];
console.log(events)


function LoadCalander(){
    const dateobj = new Date();
    if(navigation!=0){
        dateobj.setMonth(new Date().getMonth()+navigation);
    }
    const day = dateobj.getDate();
    const month = dateobj.getMonth();
    const year = dateobj.getFullYear();
    MonthBanner.innerText = `${dateobj.toLocaleDateString("en-us",{month:"long"})} ${year}`
    Calander.innerHTML="";
    const DayofMonth = new Date(year,month+1,0).getDate();
    //console.log(DayofMonth);
    const FirstDayofMonth = new Date(year,month,1);

    const dayText = FirstDayofMonth.toLocaleDateString("en-us",{
        weekday:"long",
        year:"numeric",
        month:"numeric",
        day:"numeric",
    })
    //console.log(day)
    const DayString = dayText.split(',')[0]
    const EmptyDays = weekdays.indexOf(DayString)

    for(let i=1;i<=DayofMonth+EmptyDays;i++){

        const dayBox = document.createElement('div')
        dayBox.classList.add('days');
        const MonthVal = (month+1)<10?"0"+(month+1):month+1;

        const  DateVal = (i-EmptyDays)<10 ? "0"+(i-EmptyDays):i-EmptyDays;

        const dateTxt = `${DateVal}-${MonthVal}-${year}`;
        //console.log(dateTxt)
        const EventofTheMonth = events.find((e)=>e.date==dateTxt)
        //console.log(EventofTheMonth)
       
        if(i>EmptyDays){
            dayBox.innerText=i-EmptyDays

            //const EventofTheMonth = events.find((e)=>e.date==dateTxt)

            if(i-EmptyDays==day && navigation == 0){
                dayBox.id="current-day";
            }

            if(EventofTheMonth){
                const EventofContant = document.createElement('div');
                EventofContant.classList.add('event');
                EventofContant.innerText=EventofTheMonth.title;
                dayBox.appendChild(EventofContant)
            }

            dayBox.addEventListener('click',()=>{
                ShowModel(dateTxt);
            })

        }else{
            dayBox.classList.add('plain')
        }
        Calander.append(dayBox)
    }
}

function Buttons(){
    const BtnBack = document.querySelector('#btn-back');
    const BtnRight= document.querySelector('#btn-right');
    const BtnDelete = document.querySelector('#btn-delete');
    const BtnSave = document.querySelector('#btn-save')
    const Input =document.querySelector('#txt-Event');

    BtnBack.addEventListener('click',()=>{
        navigation--;
        //console.log(navigation)
        LoadCalander();
    })
    BtnRight.addEventListener('click',()=>{
        navigation++;
        //console.log(navigation)
        LoadCalander();
    })

    const CloseButtons = document.querySelectorAll('.btn-close')
    //console.log(CloseButtons)
    CloseButtons.forEach((btn)=> {
        btn.addEventListener('click',closeModal)
    });

    BtnDelete.addEventListener('click', function (){
        events = events.filter((e)=>e.date !== clicked);
        console.log(events)
        localStorage.setItem("event",JSON.stringify(events));
        closeModal()
        LoadCalander();
    })

    BtnSave.addEventListener("click", function () {
       if(Input.value){
         Input.classList.remove("error");
         events.push({
            date:clicked,
            title:Input.value.trim(),
         });
         Input.value=""
         localStorage.setItem("event",JSON.stringify(events));
         closeModal()
       }else{
        Input.classList.add("error");
       }
    });
}

const Model=document.querySelector('.modal');
const ViewForm = document.querySelector('.view-Event');
const AddEvent = document.querySelector('.add-Event');
function ShowModel(dateTxt){
    clicked = dateTxt;
    const EventofTheMonth = events.find((e)=> e.date == dateTxt);

    if(EventofTheMonth){
        document.querySelector('#event-txt').innerText = EventofTheMonth.title;
        ViewForm.style.display="block";
    }else{
        AddEvent.style.display="block";
    }
   Model.style.display='block'

}

function closeModal(){
    Model.style.display="none";
    ViewForm.style.display="none";
    AddEvent.style.display="none";
    clicked=null;
    LoadCalander();
}

Buttons();
LoadCalander();


/*
[{"date":"22-09-2023","tittle":"project"}]

*/