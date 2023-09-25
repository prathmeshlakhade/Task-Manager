
// let prathm = 1;

//------------------------------------------------------------------------------------------------------------

// function to check which anchor tag is clicked "add task" or "add subtask"
function check(c)
{

    localStorage.setItem("taskorSubtask", JSON.stringify(c));

    window.open("../HTML files/addTaskSubtask.html", "_self");
}

//------------------------------------------------------------------------------------------------------------


class buttonClicked
{
    clickedDeleteBtn(elemParent, elemchild, id, keyName)
    {
        const clickedID = (id.substring(0, id.length-3));
        const clickedBTN = id.substring(id.length-3, id.length);

        const arr = JSON.parse(localStorage.getItem(keyName));

        if(clickedBTN === "del")
        {
            const deletementarray = [];

            for(let i = 0 ; i < arr.length ; i++)
            {
                if(arr[i].id != clickedID)
                {
                    deletementarray.push(arr[i]);
                }
            }

            localStorage.setItem(keyName, JSON.stringify(deletementarray));

            const usedIds = JSON.parse(localStorage.getItem("usedIds"));
            

            let tempids = [];

            for(let i = 0 ; i < usedIds.length ; i++)
            {
                if(clickedID != usedIds[i])
                {
                    tempids.push(usedIds[i]);
                }
            }

            localStorage.setItem("usedIds", JSON.stringify(tempids));

            elemParent.removeChild(elemchild);
        }
    }

    clickedEditBtn(id, keyName){

        let taskEditBtnClicked = [id, "edi", keyName];
    
        localStorage.setItem("taskEditBtnClicked", JSON.stringify(taskEditBtnClicked));
       
        check("editTask");
    
    }
}

//--------------------------------------------------------------------------------------------------------


class setColorAndShow
{
    setColor(...ids)
    {
        document.getElementById(ids[0]).style = ids[3];
        document.getElementById(ids[1]).style = ids[3];
        document.getElementById(ids[2]).style = ids[3];
    }

    taskShowOnPage(obj, keyName)
    {

        const main = document.getElementById("forDom");

        const elem1 = document.createElement("div");
        elem1.classList.add("tasksInprogress", "Tasks");

        const elem2 = document.createElement("div");
        elem2.classList.add("flex1");

        const elem21 = document.createElement("div");
        elem21.classList.add("box1");

        const elem22 = document.createElement("div");
        elem22.classList.add("box2");


        let keys = Object.keys(obj);

        keys.forEach((keys) => {


            keys = keys.toUpperCase();

            if(keys != "SUBTASK")
            {
                let p = document.createElement("p");
                p.innerHTML = keys;

                elem21.appendChild(p);

                p = document.createElement("p");
                p.innerHTML = ":";

                elem22.appendChild(p);
            }
            
        });

        const elem23 = document.createElement("div");
        elem23.classList.add("box3");

        let values = Object.values(obj);
        
        let i = 0;
        values.forEach((values) => {
            if(i++ <= 4)
            {
                console.log(values)
                values.toUpperCase();

                let p = document.createElement("p");
                p.innerHTML = values;

                elem23.appendChild(p);
            }
            
        });

        elem2.appendChild(elem21);
        elem2.appendChild(elem22);
        elem2.appendChild(elem23);

        const btncontainer = document.createElement("div");
        btncontainer.classList.add("editDeleteButtons");

        

        const btn1 = document.createElement("button");
        btn1.classList.add("btn1", "btn");
        btn1.innerHTML = "EDIT";
        btn1.id = obj.id;

        let buttonclicked = new buttonClicked();

        btn1.addEventListener("click", function(){
            
            buttonclicked.clickedEditBtn(this.id, keyName);
        });

        const btn2 = document.createElement("button");
        btn2.classList.add("btn2", "btn");
        btn2.innerHTML = "DELETE";
        btn2.id = obj.id+"del";

        btn2.addEventListener("click", function(){

            buttonclicked.clickedDeleteBtn(main, elem1, this.id, keyName);
        });

        const btn3 = document.createElement("button");
        btn3.classList.add("btn3", "btn");
        btn3.innerHTML = "SUBTASKS";
        btn3.id = obj.id;

        btn3.addEventListener("click", function(){

            localStorage.setItem("subtaskClickedId", JSON.stringify(this.id));
            localStorage.setItem("ArrayNameForSubtask", JSON.stringify(keyName));
            window.open("../HTML files/showSubTask.html", "_self")
        });

        btncontainer.appendChild(btn1);
        btncontainer.appendChild(btn2);
        btncontainer.appendChild(btn3);

        elem1.appendChild(elem2);
        elem1.appendChild(btncontainer);

        main.appendChild(elem1);

    }

    // function which is called by h2Clicked(first triggerd), this function can call taskshowOnPage to show tasks
    show(keyName)
    {
        const arr = JSON.parse(localStorage.getItem(keyName));

        let clear = document.getElementById("forDom");

        while(document.contains(clear.firstElementChild))
        {
            clear.removeChild(clear.firstElementChild);
        }    

        if(arr.length == 0)
        {
            return;
        }

        for(let i = 0 ; i < arr.length ; i++)
        {
            this.taskShowOnPage(arr[i], keyName);
        }
    }
}

//--------------------------------------------------------------------------------------------------------

// first triggerd function by onclick
function h2Clicked(clickedh2ID)
{
   
    let selfh2color = "color: coral; border-bottom: 5px solid coral;";

    let anotherh2color = "color: #fff; border-bottom: 5px solid #333;";

    document.getElementById(clickedh2ID).style = selfh2color;

    let setcolorandshow = new setColorAndShow();

    if(clickedh2ID == "inprogressh2ID")
    {
        setcolorandshow.setColor("completedh2ID", "duepassedh2ID", "cancelledh2ID", anotherh2color);

        setcolorandshow.show("arrayofInProgressTasks");

    }
    else if(clickedh2ID == "completedh2ID")
    {
        setcolorandshow.setColor("inprogressh2ID", "duepassedh2ID", "cancelledh2ID", anotherh2color);

        setcolorandshow.show("arrayofCompletedTasks");

    }
    else if(clickedh2ID == "duepassedh2ID")
    {
        setcolorandshow.setColor("inprogressh2ID", "completedh2ID", "cancelledh2ID", anotherh2color);

        setcolorandshow.show("arrayofDuePassedTasks");

    }
    else if(clickedh2ID == "cancelledh2ID")
    {
        setcolorandshow.setColor("inprogressh2ID", "completedh2ID", "duepassedh2ID", anotherh2color);
    
        setcolorandshow.show("arrayofCancelledTasks");

    }
}