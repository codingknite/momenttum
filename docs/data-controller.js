export const dataController = (() => {


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
            this.description = description;
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
            return todoID;
        },

        getItemID: todo => {
            let ID;
            for (const key in data.allItems.todos) {
                if (data.allItems.todos[key].description === todo) {
                    ID = data.allItems.todos[key].id;
                };
            };

            return ID;
        },

        deleteTask: taskName => {
            let index;
            for (const key in data.allItems.todos) {
                if (data.allItems.todos[key].description === taskName) {
                    index = data.allItems.todos.indexOf(data.allItems.todos[key]);
                };
            };
            data.allItems.todos.splice(index, 1);
        },
        test: () => {
            return data.allItems;
        },

        getTodoLength: () => {
            return data.allItems.todos.length;
        }
    };
})();