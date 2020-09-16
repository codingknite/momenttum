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
        todoContainer: '.todo-container'
    };

    return {
        returnDomElements: () => {
            return DOMElements;
        }
    }
})();


const mainController = ((dataCtrl, UICtrl) => {

    const domElements = UICtrl.returnDomElements();



    // Listen for user Name
    document.querySelector(domElements.username).addEventListener('keypress', event => {

        if (event.key === 'Enter') {

            // User Input
            const userNameObject = {
                name: document.querySelector(domElements.username).value
            };

            //If user provided name
            if (userNameObject.name) {
                //1. Get Username 
                const userName = userNameObject.name;

                //3. Display username on the UI
                document.querySelector(domElements.greetingAfter).textContent = `Good afternoon, ${userName}.`;

                document.querySelector(domElements.greetingBefore).classList.toggle('no-display');

                document.querySelector(domElements.greetingAfter).classList.toggle('no-display');

                document.querySelector(domElements.greetingAfter).classList.add('display');
            };
        };
    });


    //Listen for Menu Button Click 

    document.querySelector(domElements.menuButton).addEventListener('click', () => {
        document.querySelector(domElements.showPercentage).classList.toggle('show');
        document.querySelector(domElements.showPercentage).classList.toggle('no-show');
    });



    //Listen for user focus input
    document.querySelector(domElements.userfocus).addEventListener('keypress', event => {
        if (event.key === "Enter") {

            //User Input
            const userFocusObject = {
                focus: document.querySelector(domElements.userfocus).value
            };

            if (userFocusObject.focus) {
                //1. Get Focus
                const userFocus = userFocusObject.focus;

                //3. Display username on the UI
                document.querySelector(domElements.focusBefore).classList.add('no-display');

                document.querySelector(domElements.focusAfter).style.display = "flex"

                document.querySelector(domElements.focusGot).textContent = userFocus;
            };
        };
    });


    //Listen for links
    document.querySelector(domElements.linkButton).addEventListener('click', () => {

        //Display Links Box
        document.querySelector(domElements.linkBox).classList.toggle('show');
        document.querySelector(domElements.linkBox).classList.toggle('no-show');

    })

    //Listen For Todo Button
    document.querySelector(domElements.todoButton).addEventListener('click', () => {

        //Display Todo Container
        document.querySelector(domElements.todoContainer).classList.toggle('show');
        document.querySelector(domElements.todoContainer).classList.toggle('no-show');

    })
})(dataController, UIController);


