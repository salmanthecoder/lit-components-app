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
        this.todos = [{
                 task: "One",
                complete: false
        }];
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
    <vaadin-text-field
    placeholder="Task"
    value="${this.task}" 
    @change="${this.updateTask}"> 
  </vaadin-text-field>

        <vaadin-button
        theme="primary"
        @click="${this.addTodo}"
        
        >Add Todo</vaadin-button>
        </div>
        <vaadin-radio-group
  class="visibility-filters"
  value="${this.filter}"
  @value-changed="${this.filterChanged}"> 

  ${Object.values(VisibilityFilters).map( 
    filter => html`
      <vaadin-radio-button value="${filter}">
        ${filter}
      </vaadin-radio-button>`
  )}
</vaadin-radio-group>
<vaadin-button
  @click="${this.clearCompleted}"> 
    Clear completed
</vaadin-button>
        <p> todo-view</p>
        <div class="">
  ${this.applyFilter(this.todos).map(
      todo => html` 
        <div class="todo-item">
          <vaadin-checkbox
            ?checked="${todo.complete}" 
            @change="${ e => this.updateTodoStatus(todo, e.target.checked)}"> 
            ${todo.task}
          </vaadin-checkbox>
        </div>
      `
    )
  }
  Salman
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

    updateTodoStatus(updatedTodo, complete) {
        this.todos = this.todos.map(todo =>
            updatedTodo === todo ? {...updatedTodo , complete} :todo

        );
    }
    filterChanged(e) { 
        this.filter = e.target.value;
      }
    
      clearCompleted() { 
        this.todos = this.todos.filter(todo => !todo.complete);
      }
    
      applyFilter(todos) { 
        switch (this.filter) {
          case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.complete);
          case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.complete);
          default:
            return todos;
        }
      }
}

customElements.define('todo-view', TodoView);