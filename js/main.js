
const taskorSubtask = JSON.parse(localStorage.getItem("taskorSubtask"));
const subtask_idofTask = JSON.parse(localStorage.getItem("subtaskClickedId"));
const ArrayNameForSubtask = JSON.parse(localStorage.getItem("ArrayNameForSubtask"));
const realArrayforSubtask = JSON.parse(localStorage.getItem(ArrayNameForSubtask));
let indexForCheck;

//---------------------------------------------------------------------------------------------------------------------------

// function to check which anchor tag is clicked "add task" or "add subtask"
function check(c)
{

    localStorage.setItem("taskorSubtask", JSON.stringify(c));

    window.open("./addTaskSubtask.html", "_self");
}

//---------------------------------------------------------------------------------------------------------------------------


// function calls when the page is loaded under body element onload = "create()" calls this method
function create(){

    // let taskorSubtask = JSON.parse(localStorage.getItem("taskorSubtask"));
    let changeText = document.querySelector("#h1Main");
    let changeText1 = document.querySelector("#labelId");

    
    if(taskorSubtask === "subtask")
    {
        changeText.textContent = "Add SubTask";
        changeText1.textContent = "For ID:";

        // let subtaskid = JSON.parse(localStorage.getItem("subtaskClickedId"));
        document.getElementById("ID").value = subtask_idofTask;

        document.getElementById("ID").disabled = true;
    }
    else if(taskorSubtask == "editTask")
    {
        let taskEditBtnClicked = JSON.parse(localStorage.getItem("taskEditBtnClicked"));

        changeText.textContent = "Edit Task";

        document.getElementById("ID").value = taskEditBtnClicked[0];

        document.getElementById("ID").disabled = true;
    }
    else if(taskorSubtask == "editSubTask")
    {
        let taskEditBtnClicked = JSON.parse(localStorage.getItem("taskEditBtnClicked"));

        changeText.textContent = "Edit SubTask";

        document.getElementById("ID").value = taskEditBtnClicked[0];

        document.getElementById("ID").disabled = true;
    }
    else
    {
        changeText.textContent = "Add Task";
        changeText1.textContent = "ID:";
    }
}

//---------------------------------------------------------------------------------------------------------------------------

function setForSubtaskEDIT(obj)
{
    let taskEditBtnClicked = JSON.parse(localStorage.getItem("taskEditBtnClicked"));

    let tempindex = 0;
    let temparr = [];
    for(let i = 0 ; i < taskEditBtnClicked[1][(taskEditBtnClicked[3])].subtask.length ; i++)
    {
        if(obj.id != taskEditBtnClicked[1][(taskEditBtnClicked[3])].subtask[i].id)
        {
            temparr[tempindex++] = taskEditBtnClicked[1][(taskEditBtnClicked[3])].subtask[i];
        }
        else
        {
            temparr[tempindex++] = obj;
        }
    }

    taskEditBtnClicked[1][(taskEditBtnClicked[3])].subtask = temparr;

    localStorage.setItem(taskEditBtnClicked[2], JSON.stringify(taskEditBtnClicked[1]));
}

 

//---------------------------------------------------------------------------------------------------------------------------


// function to reset the form if form is not validate
function resetForm()
{
    const formToReset = document.getElementById('formID');
    formToReset.reset();
}

//---------------------------------------------------------------------------------------------------------------------------

class forValidationOfDate{

    // function to get the current date
    getCurrentDate()
    {

        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = yyyy + '-' + mm + '-' + dd;

        return formattedToday;
    }

    // function to set the status field of select element
    selectElement(id, valueToSelect) {    
        let element = document.getElementById(id);
        element.value = valueToSelect;
    }

    // function to validate the date , it calls the current date to get the current date for validating
    validateDate(){

    
        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;
    
        if(taskorSubtask == "task" || taskorSubtask == "editTask")
        {
            let currentDate = this.getCurrentDate();
    
            if(startDate > endDate)
            {
                console.log("startdate is greater than end date");
                
                return false;
            }
            else if(startDate < currentDate && endDate < currentDate)
            {
                document.getElementById("inprogressID").style.display = "none";
        
                this.selectElement('task-status', 'due passed');
            }
            else
            {
                document.getElementById("inprogressID").style.display = "block";
            }
    
            return true;
        }
        else if(taskorSubtask == "editSubTask")
        {
            let taskEditBtnClicked = JSON.parse(localStorage.getItem("taskEditBtnClicked"));
            
            let startDateoftask = taskEditBtnClicked[1][(taskEditBtnClicked[3])].startDate;
            let endDateoftask = taskEditBtnClicked[1][(taskEditBtnClicked[3])].endDate;
    
            if(startDate < startDateoftask || endDate > endDateoftask)
            {
                alert("please make sure that your start and end date is under your main Task start and end date");
                return false;
            }
            else if(startDate > endDate)
            {
                alert("your start date should be early than end date");
                return false;
            }
            return true;
    
        }
        else
        {
            console.log("subtask is pratham");
            
            
            for(indexForCheck = 0 ; indexForCheck < realArrayforSubtask.length ; indexForCheck++)
            {
                if(realArrayforSubtask[indexForCheck].id == subtask_idofTask)
                {
                    break;
                }
            }
    
            if(startDate < realArrayforSubtask[indexForCheck].startDate || endDate > realArrayforSubtask[indexForCheck].endDate)
            {
                alert("please make sure that your start and end date is under your main Task start and end date");
                return false;
            }
            else if(startDate > endDate)
            {
                alert("your start date should be early than end date");
                return false;
            }
            return true;
        }
    
    }
}

//---------------------------------------------------------------------------------------------------------------------------


class EditTask{

    putInDifferentArray(obj, arrayName_forPutObject)
    {
        let realarr = JSON.parse(localStorage.getItem(arrayName_forPutObject));

        if(arrayName_forPutObject === "arrayofCompletedTasks")
        {
            for(let i = 0 ; i < obj.subtask.length ; i++)
            {
                obj.subtask[i].status = "completed";
            }
        }
        
        realarr.push(obj);

        // console.log(realarr);
    
    
        localStorage.setItem(arrayName_forPutObject, JSON.stringify(realarr));
    }
    
    delitemfromArr(realarr, arrname, obj)
    {
        let temp = [];
        let tempindex = 0;

        let retobj = false;
    
        // console.log(realarr, " ", arrname);
        
        for(let i = 0 ; i < realarr.length ; i++)
        {
            //  console.log(realarr[i].id, " ", obj.id);
            if(realarr[i].id != obj.id)
            {
                temp[tempindex++] = realarr[i];
            }
            else if(realarr[i].hasOwnProperty("subtask"))
            {
                retobj = realarr[i].subtask;
            }
        }

        realarr = temp;

        console.log(arrname);
        console.log(realarr);
    
        localStorage.setItem(arrname, JSON.stringify(realarr));

        return retobj;
    
    }

    setForEDIT(obj)
    {
        
        let taskEditBtnClicked = JSON.parse(localStorage.getItem("taskEditBtnClicked"));
    
        let realarr = JSON.parse(localStorage.getItem(taskEditBtnClicked[2]));
        let temp = [];
        let tempindex = 0;
        let tsk = new TaskAddClass();
        if( (obj.status == "in progress") && (taskEditBtnClicked[2] != "arrayofInProgressTasks") )
        {
            
            tsk.setTaskArrIfNotPresent("arrayofInProgressTasks");
            let retobj = this.delitemfromArr(realarr, taskEditBtnClicked[2], obj);

            if(retobj)
            {
                obj.subtask = retobj;
            }

            this.putInDifferentArray(obj, "arrayofInProgressTasks");
            
        }
        else if( (obj.status == "completed") && (taskEditBtnClicked[2] != "arrayofCompletedTasks") )
        {
            tsk.setTaskArrIfNotPresent("arrayofCompletedTasks");
            let retobj = this.delitemfromArr(realarr, taskEditBtnClicked[2], obj);

            if(retobj)
            {
                obj.subtask = retobj;
            }
            this.putInDifferentArray(obj, "arrayofCompletedTasks");
        }
        else if( (obj.status == "due passed") && (taskEditBtnClicked[2] != "arrayofDuePassedTasks") )
        {
            tsk.setTaskArrIfNotPresent("arrayofDuePassedTasks");
            
            let retobj = this.delitemfromArr(realarr, taskEditBtnClicked[2], obj);
            if(retobj)
            {
                obj.subtask = retobj;
            }
            this.putInDifferentArray(obj, "arrayofDuePassedTasks");
        }
        else if( (obj.status == "cancelled") && (taskEditBtnClicked[2] != "arrayofCancelledTasks") )
        {
            tsk.setTaskArrIfNotPresent("arrayofCancelledTasks");
            
            let retobj = this.delitemfromArr(realarr, taskEditBtnClicked[2], obj);

            if(retobj)
            {
                obj.subtask = retobj;
            }
            this.putInDifferentArray(obj, "arrayofCancelledTasks");
        }
        else
        {
            console.log(realarr);
            console.log(taskEditBtnClicked[2]);
            console.log(obj);
            let retobj = this.delitemfromArr(realarr, taskEditBtnClicked[2], obj);
            

            if(retobj)
            {
                obj.subtask = retobj;
            }
            this.putInDifferentArray(obj, taskEditBtnClicked[2]);
        }
    }
}


//---------------------------------------------------------------------------------------------------------------------------


class TaskAddClass{

    //function to set the array of already used ids of mainTask
    setArrOfUsedIds(key)
    {
        if (localStorage.getItem("usedIds") === null) 
        {
            let usedIDS = [];
            localStorage.setItem("usedIds", JSON.stringify(usedIDS));
        }
    }

    //function to check if array is present in the local storage and set array if not present
    setTaskArrIfNotPresent(key){

        if (localStorage.getItem(key) === null) 
        {
            let arr = [];
            localStorage.setItem(key, JSON.stringify(arr));
        }
    }

    setMainTasks(obj, keyName)
    {
        let arr = JSON.parse( localStorage.getItem(keyName) );
                        
        arr.push(obj);

        localStorage.setItem(keyName, JSON.stringify(arr));
    }

}

//---------------------------------------------------------------------------------------------------------------------------

function valDate(){
    let vald = new forValidationOfDate();

    return vald.validateDate();
}

//---------------------------------------------------------------------------------------------------------------------------

// function to validate the whole form before it get submitted
function taskValidateAdd(){

    let id = document.getElementById("ID").value;
    let name = document.getElementById("task-name").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let status = document.getElementById("task-status").value;


    if(valDate())
    {
        // setArrOfUsedIds("usedIds");
        
        // let usedIDS = JSON.parse( localStorage.getItem("usedIds"));

        if( JSON.parse(localStorage.getItem("taskorSubtask") ) === "task" )
        {
            let tsk = new TaskAddClass();
            tsk.setArrOfUsedIds("usedIds");
        
            let usedIDS = JSON.parse( localStorage.getItem("usedIds"));
           
            if(usedIDS.length == 0 || !usedIDS.includes(id))
            {
                usedIDS.push(id);

                localStorage.setItem("usedIds", JSON.stringify(usedIDS));

                const obj = {
                    "id": id,
                    "name":name,
                    "startDate":startDate,
                    "endDate":endDate,
                    "status":status
                }
    
                if(status === "in progress")
                {
                    tsk.setTaskArrIfNotPresent("arrayofInProgressTasks");

                    tsk.setMainTasks(obj, "arrayofInProgressTasks");  
                }
                else if(status === "completed")
                {
                    tsk.setTaskArrIfNotPresent("arrayofCompletedTasks")

                    tsk.setMainTasks(obj, "arrayofCompletedTasks");   
                }
                else if(status === "due passed")
                {
                    tsk.setTaskArrIfNotPresent("arrayofDuePassedTasks")
                
                    tsk.setMainTasks(obj, "arrayofDuePassedTasks");   
                }
                else if(status === "cancelled")
                {
                    tsk.setTaskArrIfNotPresent("arrayofCancelledTasks");

                    tsk.setMainTasks(obj, "arrayofCancelledTasks");  
                }

                return true;
            }
            else
            {
                alert(`Task of id ${id} is already present`)
                return false;
            }    
        }
        else if(JSON.parse(localStorage.getItem("taskorSubtask") ) == "editTask")
        {
            const obj = {
                "id": id,
                "name":name,
                "startDate":startDate,
                "endDate":endDate,
                "status":status
            }

            let editTsk = new EditTask();

            console.log("mad");

            editTsk.setForEDIT(obj);

            return true;
        }
        else if(JSON.parse(localStorage.getItem("taskorSubtask") ) == "editSubTask")
        {
            const obj = {
                "id": id,
                "name":name,
                "startDate":startDate,
                "endDate":endDate,
                "status":status
            }

            setForSubtaskEDIT(obj);
            return true;
        }
        else
        {
            
            if(!realArrayforSubtask[indexForCheck].hasOwnProperty("subtask"))
            { 
                id = id + "." + "0";

                const obj = {
                    "id": id,
                    "name":name,
                    "startDate":startDate,
                    "endDate":endDate,
                    "status":status 
                }
    
                const subtask = [];
    
                subtask.push(obj);
    
                realArrayforSubtask[indexForCheck].subtask = subtask;
            }
            else
            {
                if(realArrayforSubtask[indexForCheck].subtask.length > 0)
                {
                    let len = realArrayforSubtask[indexForCheck].subtask.length;

                    let previd = realArrayforSubtask[indexForCheck].subtask[len-1].id;
                    
                    let subid = "";

                    let passed = false;
                    for(let i = 0 ; i < previd.length ; i++)
                    {
                        if(passed)
                        {
                            subid = ""+ subid + previd[i];
                        }

                        if(previd[i] == ".")
                        {
                            passed = true;
                        }
                    }

                    subid = +subid;
                    subid++;
                    id = id + "." + subid; 

                }
                else
                {
                    id = id + "." + realArrayforSubtask[indexForCheck].subtask.length;
                }
                  

                const obj = {
                    "id": id,
                    "name":name,
                    "startDate":startDate,
                    "endDate":endDate,
                    "status":status 
                }
    
                realArrayforSubtask[indexForCheck].subtask.push(obj);
            }

            localStorage.setItem(ArrayNameForSubtask, JSON.stringify(realArrayforSubtask) );

            resetForm();
            return true;
        }
    }
    resetForm();
    return false;
   
}

//---------------------------------------------------------------------------------------------------------------------------