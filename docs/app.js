const dataController = (() => {


    class Link {
        constructor(id, linkName, linkAddress) {
            this.id = id;
            this.linkName = linkName;
            this.linkAddress = linkAddress;
        }
    }

    class Todos {
        constructor(id, description) {
            this.id = id;
            this.description;
        }
    }

    const data = {
        allItems: {
            links: [],
            todos: []
        }
    };

    const getID = (type) => {

        // ID = indexOf last element + 1
        let ID;
        if (type === 'links') {
            if (data.allItems.links.length > 0) {
                ID = data.allItems.links[data.allItems.links.length - 1].id + 1;
            } else
                ID = 0;
            return ID;
        } else if (type === 'todos') {
            if (data.allItems.todos.length > 0) {
                ID = data.allItems.todos[data.allItems.todos.length - 1].id + 1;
            } else
                ID = 0;
            return ID;
        }
    };

    return {
        newLink: (linkName, linkURL) => {

            const linkID = getID('links');

            const newLink = new Link(linkID, linkName, linkURL);
            data.allItems.links.push(newLink);
            return newLink;
        },

        newTodoItem: todoDescription => {

            const todoID = getID('todos');

            const newTodo = new Todos(todoID, todoDescription);
            data.allItems.todos.push(newTodo);
            return newTodo;
        },

        removeTask: taskName => {
            for (const key in data.allItems.todos) {

                if (data.allItems.todos[key].description === taskName) {
                    const index = data.allItems.todos[key].id;
                    data.allItems.todos.splice(index, 1);
                };
            };
        },
        test: () => {
            return data.allItems;
        }
    };
})();


const UIController = (() => {

    const DOMElements = {
        username: '.user-name',
        userfocus: '.user-input',
        greetingAfter: '.greeting-after',
        greetingBefore: '.greeting-before',
        focusBefore: '.focus',
        focusAfter: '.after-focus-added',
        focusGot: '.focus-got',
        cancelTaskButton: '.cancel-task',
        timeContainer: '.display-time',
        menuButton: '.more-button',
        showPercentage: '.show-percentage',
        linkButton: '.link-button',
        linkBox: '.box-one',
        todoButton: '.todo-section',
        todoContainer: '.todo-container',
        completeFocus: '.complete-task-icon',
        cancelTask: '.cancel-task',
        addNewFocus: '.add-new-task',
        time: '.time',
        timePercentage: '.time-percentage',
        percentageMessage: '.percentage-message',
        percentageCaption: '.percentage-caption',
        newLink: '.new-item',
        newLinkButton: '.add-new-item',
        addLink: '.item-info',
        linkName: '.link-name-input',
        linkURL: '.url-input',
        submitLink: '.submit-link',
        backButton: '.back-button',
        addNewTodo: '.add-todo-task',
        todoInputField: '.new-todo-task',
        todoInputContainer: '.task-input',
        noTodos: '.no-todos',
        todoTask: '.todo-tasks',
        todoItem: '.todo-task',
        todoToday: '.todo-today',
        todoItemsContainer: '.todo-items',
        removeTaskButton: '.remove-task'
    };

    const userObject = {

    }

    return {
        getDomElements: () => {
            return DOMElements;
        },

        displayUserName: (name) => {
            document.querySelector(DOMElements.greetingAfter).textContent = `Good afternoon, ${name}.`;
            document.querySelector(DOMElements.greetingBefore).classList.toggle('no-display');
            document.querySelector(DOMElements.greetingAfter).classList.toggle('no-display');
            document.querySelector(DOMElements.greetingAfter).classList.add('display');
        },

        displayUserFocus: (focus) => {
            document.querySelector(DOMElements.focusBefore).classList.add('no-display');
            document.querySelector(DOMElements.focusAfter).style.display = "flex"
            document.querySelector(DOMElements.focusGot).textContent = focus;
        },

        completeFocus: () => {
            //Change Icon to finished icon
            document.querySelector(DOMElements.completeFocus).src = "/icons/check.png";
            //Remove Hover effect
            document.querySelector(DOMElements.completeFocus).classList.remove('no-show');
            document.querySelector(DOMElements.completeFocus).classList.add('show');
            //Strikethrough focus
            const focusOfUser = document.querySelector(DOMElements.userfocus).value;
            document.querySelector(DOMElements.focusGot).innerHTML = "<p><s>" + focusOfUser + "</s></p>"
            //Change Delete Icon to plus Icon
            document.querySelector(DOMElements.cancelTask).classList.remove('current-icon');
            document.querySelector(DOMElements.cancelTask).classList.add('hidden-icon');
            document.querySelector(DOMElements.addNewFocus).classList.remove('hidden-icon');
            document.querySelector(DOMElements.addNewFocus).classList.add('current-icon');
            document.querySelector(DOMElements.addNewFocus).style.visibility = "visible";
        },

        eraseFocus: () => {
            document.querySelector(DOMElements.focusBefore).classList.remove('no-display');
            document.querySelector(DOMElements.focusBefore).classList.add('display');
            document.querySelector(DOMElements.focusAfter).style.display = "none";
            //Clear the input field
            document.querySelector(DOMElements.userfocus).value = "";
            document.querySelector(DOMElements.userfocus).focus();
        },

        addFocus: () => {
            document.querySelector(DOMElements.focusBefore).classList.remove('no-display');
            document.querySelector(DOMElements.focusBefore).classList.add('display');
            document.querySelector(DOMElements.focusAfter).style.display = "none";
            //Clear the input field
            document.querySelector(DOMElements.userfocus).value = "";
            document.querySelector(DOMElements.userfocus).focus();
            //Change Back Icons
            document.querySelector(DOMElements.cancelTask).classList.remove('hidden-icon');
            document.querySelector(DOMElements.cancelTask).classList.add('current-icon');
            document.querySelector(DOMElements.addNewFocus).classList.remove('current-icon');
            document.querySelector(DOMElements.addNewFocus).classList.add('hidden-icon');
            document.querySelector(DOMElements.completeFocus).src = "/icons/checkbox.png";
            //Add hover effect again
            document.querySelector(domElements.completeFocus).classList.remove('show');
            document.querySelector(domElements.completeFocus).classList.add('no-show');
        },

        displayTime: (hour, minute) => {
            document.querySelector(DOMElements.time).textContent = `${hour}:${minute}`;
        },

        displayTimeInPercentage: (percentage) => {

            //Hide the normal time
            document.querySelector(DOMElements.time).classList.toggle('no-display');

            //Display Time In Percentage
            document.querySelector(DOMElements.timePercentage).innerHTML = `<div class="time-percentage">${percentage}<span class="percentage">%</span></div>`;
            document.querySelector(DOMElements.timePercentage).classList.toggle('no-display')
            document.querySelector(DOMElements.timePercentage).classList.toggle('display');


            //Change Menu Options 
            if (document.querySelector(DOMElements.time).classList.contains('no-display')) {
                document.querySelector(DOMElements.percentageMessage).textContent = "Normal Clock";
                document.querySelector(DOMElements.percentageCaption).textContent = "Show The Current Time.";
            } else {
                document.querySelector(DOMElements.percentageMessage).textContent = "Percent Clock";
                document.querySelector(DOMElements.percentageCaption).textContent = "See Today's progress as a percentage.";
            }
        },

        displayLinkBox: () => {
            //Display Links Box
            document.querySelector(DOMElements.linkBox).classList.toggle('show');
            document.querySelector(DOMElements.linkBox).classList.toggle('no-show');
        },

        displayNewLinkBox: () => {
            document.querySelector(DOMElements.linkBox).classList.add('no-show');
            document.querySelector(DOMElements.addLink).classList.remove('no-show');
            document.querySelector(DOMElements.addLink).classList.add('show');
        },

        quitNewLinkBox: () => {
            document.querySelector(DOMElements.addLink).classList.remove('show');
            document.querySelector(DOMElements.addLink).classList.add('no-show');
            document.querySelector(DOMElements.linkBox).classList.remove('no-show');
            document.querySelector(DOMElements.linkBox).classList.add('show');
        },

        linkInput: () => {
            return {
                linkName: document.querySelector(DOMElements.linkName).value,
                linkURL: document.querySelector(DOMElements.linkURL).value,
            }
        },

        emptyLinkBoxFields: () => {
            document.querySelector(DOMElements.linkName).value = '';
            document.querySelector(DOMElements.linkURL).value = '';
        },

        displayLinkItem: (link, name) => {
            const html = `<div class="link">
            <svg
              class="link-icon"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
              class="bi bi-link-45deg"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"
              />
              <path
                d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z"
              />
            </svg>
            <p class="link-item">
              <a
                href="http://%link%/"
                target="_blank"
                rel="noopener noreferrer"
                class="the-link"
                >%name%</a
              >
            </p>
          </div>`;

            let newHtml = html.replace('%name%', name);

            if (link.includes('http://')) {
                let newLink = link.replace("http://", '');
                newHtml = newHtml.replace('%link%', newLink);
            } else
                newHtml = newHtml.replace('%link%', link);

            document.querySelector(DOMElements.newLinkButton).insertAdjacentHTML('beforebegin', newHtml);
        },

        displayTodoBox: () => {
            document.querySelector(DOMElements.todoContainer).classList.toggle('show');
            document.querySelector(DOMElements.todoContainer).classList.toggle('no-show');
            document.querySelector(DOMElements.todoInputField).style.visibility = "hidden";
        },

        inputTodo: () => {
            document.querySelector(DOMElements.todoInputField).style.visibility = "visible";
            document.querySelector(DOMElements.todoInputField).focus();
            document.querySelector(DOMElements.noTodos).style.display = "none";
            document.querySelector(DOMElements.todoContainer).style = "min-height: 7em";
        },

        todoInput: () => {
            return {
                todoTask: document.querySelector(DOMElements.todoInputField).value
            }
        },

        displayTodoItem: (todo) => {

            const html = `<div class="todo-tasks">
            <img
              src="/icons/checkbox.png"
              alt="Todo Checkbox"
              class="finish-task"
            />
            <img
              src="/icons/check.png"
              alt="Completed Todo"
              class="finished-task"
            />
            <div class="todo-task">%todoItem%</div>
            <img
              src="/icons/cancel.png"
              alt="Cancel Task"
              class="remove-task"
            />
          </div>`;

            const newHtml = html.replace("%todoItem%", todo);

            document.querySelector(DOMElements.todoInputContainer).insertAdjacentHTML("beforebegin", newHtml);

            document.querySelector(DOMElements.todoTask).style.display = "flex";

            document.querySelector(DOMElements.todoInputField).value = "";
        }
    }
})();


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
        document.querySelector(domElements.completeFocus).addEventListener('click', completeUserFocus);

        //Delete Focus
        document.querySelector(domElements.cancelTask).addEventListener('click', deleteFocus)

        //Add New Focus 
        document.querySelector(domElements.addNewFocus).addEventListener('click', addNewFocus);

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
            UICtrl.displayTodoBox();
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

    //Username Function
    const addUserName = event => {
        if (event.key === 'Enter') {

            const userNameValue = document.querySelector(domElements.username).value;
            if (userNameValue) {
                const userName = userNameObject.name;
                //3. Display username on the UI
                UICtrl.displayUserName(userName);
            };
        };
    };

    //User focus function
    const addUserFocus = event => {
        if (event.key === "Enter") {

            const userFocusValue = document.querySelector(domElements.userfocus).value;
            if (userFocusValue) {
                const userFocus = userFocusObject.focus;
                //3. Display username on the UI
                UICtrl.displayUserFocus(userFocus);
            };
        };
    };

    //Complete user focus
    UICtrl.completeFocus();

    //Delete user focus
    UICtrl.eraseFocus();

    //Add Focus 
    UICtrl.addFocus();

    //Get the time
    const dateObject = new Date();
    const currentHour = dateObject.getHours();
    let currentMinute = dateObject.getMinutes();

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

            if (userInputTodo.todoTask) {
                //Add to data structure 
                dataCtrl.newTodoItem(userInputTodo.todoTask);

                //Display to the UI
                UICtrl.displayTodoItem(userInputTodo.todoTask);
            };
        };
    };

    const deleteTodoItem = event => {


        const targetClassList = Array.from(event.target.classList);

        const nodeChildren = Array.from(event.target.parentNode.children);

        if (targetClassList.includes('remove-task')) {
            const taskToRemove = nodeChildren[2].innerText;

            //Remove Item from data structure
            dataCtrl.removeTask(taskToRemove);

        };
        //if button pressed is delete
        // if (event.target.classList.includes(domElements.removeTaskButton)) {
        //     console.log("YEP, YA FOUND ME")
        // }

        //Delete todo from data structure

        //Dlete todo from UI
    }

    return {
        init: () => {
            return initFunction();
        }
    }
})(dataController, UIController);


mainController.init();