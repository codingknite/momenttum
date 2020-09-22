import { dataController } from './data-controller.js';
import { UIController } from './UIController.js';


const mainController = ((dataCtrl, UICtrl) => {

    const domElements = UICtrl.getDomElements();

    //Initialisation Function
    const initFunction = () => {
        document.querySelector(domElements.linkBox).classList.add('no-show');
        document.querySelector(domElements.showPercentage).classList.add('no-show');
        document.querySelector(domElements.todoContainer).classList.add('no-show');
        document.querySelector(domElements.completeFocus).classList.add('no-show');
        document.querySelector(domElements.timePercentage).classList.add('no-display');
        document.querySelector(domElements.addLink).classList.add('no-show');
        eventHandler();
    };

    const eventHandler = () => {
        //User Name
        document.querySelector(domElements.username).addEventListener('keypress', addUserName);

        //User Focus 
        document.querySelector(domElements.userfocus).addEventListener('keypress', addUserFocus);


        //Complete Focus 
        document.querySelector(domElements.completeFocus).addEventListener('click', () => {
            UICtrl.completeFocus();
        });

        //Delete Focus
        document.querySelector(domElements.cancelTask).addEventListener('click', () => {
            UICtrl.eraseFocus();
        });

        //Add New Focus 
        document.querySelector(domElements.addNewFocus).addEventListener('click', () => {
            UICtrl.addFocus();
        });

        //Menu Button
        document.querySelector(domElements.menuButton).addEventListener('click', () => {
            document.querySelector(domElements.showPercentage).classList.toggle('show');
            document.querySelector(domElements.showPercentage).classList.toggle('no-show');
        });

        //Percentage
        document.querySelector(domElements.showPercentage).addEventListener('click', percentage);

        //Links
        document.querySelector(domElements.linkButton).addEventListener('click', openLinkBox);

        //Add New Link
        document.querySelector(domElements.newLinkButton).addEventListener('click', addNewLink);

        //Create new link
        document.querySelector(domElements.submitLink).addEventListener('click', createNewLink);

        //Back Button
        document.querySelector(domElements.backButton).addEventListener('click', () => {
            UICtrl.quitNewLinkBox();
        });

        //Listen For Todo Button
        document.querySelector(domElements.todoButton).addEventListener('click', () => {
            const todoArrayLength = dataCtrl.getTodoLength();

            UICtrl.displayTodoBox(todoArrayLength);
        });

        //Add todo Button
        document.querySelector(domElements.addNewTodo).addEventListener('click', () => {
            UICtrl.inputTodo();

        });

        //Add new todo
        document.querySelector(domElements.todoInputField).addEventListener('keypress', addTodo);

        //Delete Todo Items
        document.querySelector(domElements.todoContainer).addEventListener('click', deleteTodoItem);
    };

    //Get the time
    const dateObject = new Date();
    const currentHour = dateObject.getHours();
    let currentMinute = dateObject.getMinutes();

    let partOfDay;

    if (currentHour >= 0 & currentHour < 12) {
        partOfDay = "morning";
    } else if (currentHour >= 12 && currentHour < 17) {
        partOfDay = "afternoon";
    } else {
        partOfDay = "evening";
    };

    //Display time to the UI
    if (currentMinute.length !== 2) {
        currentMinute = String(currentMinute).padStart(2, '0');
        UICtrl.displayTime(currentHour, currentMinute);
    } else
        UICtrl.displayTime(currentHour, currentMinute);

    const percentage = () => {
        //Calculate the percentage
        const HOURS_IN_A_DAY = 24;
        const percentage = Math.round((currentHour / HOURS_IN_A_DAY) * 100);

        //Display percentage
        UICtrl.displayTimeInPercentage(percentage);
    };

    //Username Function
    const addUserName = event => {
        if (event.key === 'Enter') {

            const userNameValue = document.querySelector(domElements.username).value;
            if (userNameValue) {
                const userName = userNameValue;
                //3. Display username on the UI
                UICtrl.displayUserName(userName, partOfDay);
            };
        };
    };

    //User focus function
    const addUserFocus = event => {
        if (event.key === "Enter") {

            const userFocusValue = document.querySelector(domElements.userfocus).value;
            if (userFocusValue) {
                const userFocus = userFocusValue;
                //3. Display username on the UI
                UICtrl.displayUserFocus(userFocus);
            };
        };
    };

    //Links box
    const openLinkBox = () => {

        //Display Link Box
        UICtrl.displayLinkBox();
    }

    //Add new link
    const addNewLink = () => {
        // Display add new link box
        UICtrl.displayNewLinkBox();
    };

    const createNewLink = () => {
        // Get User Input 
        if (UICtrl.linkInput().linkName && UICtrl.linkInput().linkURL) {
            const linkInformation = UICtrl.linkInput();

            //Add Information to a data structure 
            dataCtrl.newLink(linkInformation.linkName, linkInformation.linkURL);

            //Empty Fields
            UICtrl.emptyLinkBoxFields();

            //Return to Link Box
            UICtrl.quitNewLinkBox();

            //Display to the UI
            UICtrl.displayLinkItem(linkInformation.linkURL, linkInformation.linkName);
        };
    };

    const addTodo = event => {

        if (event.key === "Enter") {
            UICtrl.inputTodo();
            //Get User Input
            const userInputTodo = UICtrl.todoInput();

            if (userInputTodo) {
                //Add to data structure 
                dataCtrl.newTodoItem(userInputTodo);

                //Get Item ID
                const todoID = dataCtrl.getItemID(userInputTodo);

                //Display to the UI
                UICtrl.displayTodoItem(userInputTodo, todoID);
            };
        };
    };

    const deleteTodoItem = event => {
        const targetClassList = Array.from(event.target.classList);
        const nodeChildren = Array.from(event.target.parentNode.children);
        const selectorID = event.target.parentNode.id;

        if (targetClassList.includes('remove-task')) {
            const taskToRemove = nodeChildren[2].innerText;

            //Delete Item from data structure
            dataCtrl.deleteTask(taskToRemove);

            //Delete Item from the UI
            UICtrl.deleteTaskFromUI(selectorID)
        } else if (targetClassList.includes('finish-task')) {

            const taskToComplete = nodeChildren[2].innerText;
            //Mark Task Completed
            UICtrl.completeTask(taskToComplete, selectorID);
        };
    };

    return {
        init: () => {
            return initFunction();
        }
    };
})(dataController, UIController);

mainController.init();
