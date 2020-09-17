const dataController = (() => {

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
        addLink: '.item-info',
        linkName: '.link-name-input',
        linkURL: '.url-input',
        submitLink: '.submit-link'
    };

    const userObject = {

    }

    return {
        returnDomElements: () => {
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

        linkInput: () => {
            return {
                linkName: document.querySelector(DOMElements.linkName).value,
                linkURL: document.querySelector(DOMElements.linkURL).value,
            }
        },

        disableSubmitButton: () => {
            document.querySelector(DOMElements.submitLink).setAttribute('disabled');
        }
    }
})();


const mainController = ((dataCtrl, UICtrl) => {

    const domElements = UICtrl.returnDomElements();

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
        document.querySelector(domElements.newLink).addEventListener('click', addNewLink);

        //Create new link
        document.querySelector(domElements.submitLink).addEventListener('click', createNewLink)
    };

    //Username Function
    const addUserName = event => {
        if (event.key === 'Enter') {
            const userNameObject = {
                name: document.querySelector(domElements.username).value
            };
            if (userNameObject.name) {
                const userName = userNameObject.name;
                //3. Display username on the UI
                UICtrl.displayUserName(userName);
            };
        };
    };

    //User focus function
    const addUserFocus = event => {
        if (event.key === "Enter") {
            const userFocusObject = {
                focus: document.querySelector(domElements.userfocus).value
            };
            if (userFocusObject.focus) {
                const userFocus = userFocusObject.focus;
                //3. Display username on the UI
                UICtrl.displayUserFocus(userFocus);
            };
        };
    };

    //Complete user focus
    const completeUserFocus = () => {
        UICtrl.completeFocus();
    };

    //Delete user focus
    const deleteFocus = () => {
        UICtrl.eraseFocus();
    }

    const addNewFocus = () => {
        UICtrl.addFocus();
    };

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
        const linkInformation = UICtrl.linkInput();
        console.log(linkInformation);

        //Display Link box


        // openLinkBox();
    };

    //Listen For Todo Button
    document.querySelector(domElements.todoButton).addEventListener('click', () => {
        //Display Todo Container
        document.querySelector(domElements.todoContainer).classList.toggle('show');
        document.querySelector(domElements.todoContainer).classList.toggle('no-show');

    });

    return {
        init: () => {
            return initFunction();
        }
    }
})(dataController, UIController);


mainController.init();