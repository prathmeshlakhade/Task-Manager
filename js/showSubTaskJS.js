
function check(c)
{
    localStorage.setItem("taskorSubtask", JSON.stringify(c));

    window.open("./addTaskSubtask.html", "_self");
}

//-------------------------------------------------------------------------------------------------

class ButtonsClicked
{
    // function run after clicking the edit button of subtask
    getediClickedBtnId(id, arr, arrname, i, j)
    {
        let taskEditBtnClicked = [id, arr, arrname, i, j];

        localStorage.setItem("taskEditBtnClicked", JSON.stringify(taskEditBtnClicked));

        check("editSubTask");
    }

    // function run after clicking the delete button of subtask
    getdelClickedBtnId(id, arr, arrname, i, j, elemParent, elemchild)
    {

        const clickedID = (id.substring(0, id.length-3));
        const clickedBTN = id.substring(id.length-3, id.length);

        const sub = [];

        let subindex = 0;
        for(let k = 0 ; k < arr[i].subtask.length ; k++)
        {

            if(k != j)
            {
                sub[subindex++] = arr[i].subtask[k];
            }
        }

        arr[i].subtask = sub;

        localStorage.setItem(arrname, JSON.stringify(arr));

        elemParent.removeChild(elemchild);

    }
}

//-------------------------------------------------------------------------------------------------


function showSubtasks(obj, arr, arrname, i, j)
{
    const mainelem = document.getElementById("domid");
    
    const elem1 = document.createElement("div");
    elem1.classList.add("tasksInprogress", "Tasks");

    const elem2 = document.createElement("div");
    elem2.classList.add("flex1");

    const elem21 = document.createElement("div");
    elem21.classList.add("box1");

    const elem22 = document.createElement("div");
    elem21.classList.add("box2");

    const elem23 = document.createElement("div");
    elem21.classList.add("box3");

    let keys = Object.keys(obj);
    let values = Object.values(obj);

    for(let i = 0 ; i < keys.length ; i++)
    {
        let p = document.createElement("p");
        p.innerHTML = keys[i];
        elem21.appendChild(p);

        p = document.createElement("p");
        p.innerHTML = ":";
        elem22.appendChild(p);

        p = document.createElement("p");
        p.innerHTML = values[i];
        elem23.appendChild(p);
    }

    elem2.appendChild(elem21);
    elem2.appendChild(elem22);
    elem2.appendChild(elem23);

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("editDeleteButtons")

    const btn1 = document.createElement("button");
    btn1.classList.add("btn1", "btn");
    btn1.innerHTML = "EDIT";
    btn1.id = obj.id;

    let buttonsclicked = new ButtonsClicked();

    btn1.addEventListener("click", function(){

        buttonsclicked.getediClickedBtnId(this.id, arr, arrname, i, j);
    });

    const btn2 = document.createElement("button");
    btn2.classList.add("btn2", "btn");
    btn2.innerHTML = "DELETE";
    btn2.id = obj.id + "del";

    btn2.addEventListener("click", function(){

        buttonsclicked.getdelClickedBtnId(this.id, arr, arrname, i, j, mainelem, elem1);
    });

    btnContainer.appendChild(btn1);
    btnContainer.appendChild(btn2);

    elem1.appendChild(elem2);
    elem1.appendChild(btnContainer);

    mainelem.appendChild(elem1);
}

//-------------------------------------------------------------------------------------------------

function showSubtasksOfTask()
{
    let arrname = JSON.parse(localStorage.getItem("ArrayNameForSubtask"));
    let taskid = JSON.parse(localStorage.getItem("subtaskClickedId"));

    let arr = JSON.parse(localStorage.getItem(arrname));

    console.log(`taskid is ${taskid} and type of is ${typeof taskid}`);

    let i , subtaskPresent = false;
    for(i = 0 ; i < arr.length ; i++)
    {
        if(arr[i].id == taskid)
        {
            if(arr[i].subtask != null && arr[i].subtask.length > 0)
            {
                subtaskPresent = true;
            }
            break;
        }
    }

    console.log("presenty of subtask = " , subtaskPresent);
    const elem1 = document.getElementById("box3");

    elem1.childNodes[1].textContent = arr[i].id;
    elem1.childNodes[3].textContent = arr[i].name;
    elem1.childNodes[5].textContent = arr[i].startDate;
    elem1.childNodes[7].textContent = arr[i].endDate;
    elem1.childNodes[9].textContent = arr[i].status;

    if(subtaskPresent)
    {
        // console.log(arr[i], "this is ",  arr[i].subtask[0], arr[i].subtask.length);
        for(let j = 0 ; j < arr[i].subtask.length ; j++)
        {
            showSubtasks(arr[i].subtask[j], arr, arrname, i, j);
        }
    }

}