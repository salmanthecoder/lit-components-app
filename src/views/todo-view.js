import { LitElement, html } from 'lit-element';
import { type } from 'os';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';

import '@vaadin/vaadin-radio-button/vaadin-radio-group'


const VisibilityFilters = {
    SHOW_ALL: 'All',
    SHOW_ACTIVE: 'Active',
    SHOW_COMPLETED: 'Completed'
};
class TodoView extends LitElement {
    static getProperties() {
        return {
            todos: { type: Array },
            filter: { type: String },
            task: { type: String }
        }
    }

    constructor() {
        super();
        this.todos = [];
        this.filter = VisibilityFilters.SHOW_ALL;
        this.task = '';
    }
    render() {
        return html`
        <div class="input-Layout" @keyup="${this.shortcutListner}>
        <vaadin-text-field
    placeholder="Task"
    value="${this.task}" 
    @change="${this.updateTask}"> 
    </vaadin-text-field>
     <input type="text" name="lname" placeholder="Task"
     value="${this.task}" 
     @change="${this.updateTask}">

        <vaadin-button
        theme="primary"
        @click="${this.addTodo}"
        
        >Add Todo</vaadin-button>
        </div>
        
        <p> todo-view</p>
        <div>
        Salman
            ${this.todos.map(
            todo => html`
                <div>
                Saifi
                    <vaadin-checkbox ?checked="${todo.complete}"
                    @change="${e => this.updateTodoStatus(todo, e.target.checked)}">
                    ${todo.task}
                    </vaadin-checkbox>
                </div>
                `
        )
            }
        </div>
        `;

    }

    addTodo() {
        debugger;
        if (this.task) {
            this.todos = [...this.todos, {
                task: this.task,
                complete: false
            }];
            this.task = '';
        }
    }

    shortcutListner(e) {
        if (e.key === 'Enter') {
            this.addTodo();
        }
    }

    updateTask(e) {
        this.task = e.target.value;
    }

    updateTodoStatus() {
        this.todos = this.todos.map(todo =>
            updatedTodo === todo ? {...updatedTodo , complete} :todo

        );
    }
}

customElements.define('todo-view', TodoView);