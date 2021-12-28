import ComponentBase from './base-component.js';
import * as Validation from '../util/validation.js';
import {autobind as Autobind} from '../decorators/autobind.js';
import {projectState} from '../state/project-state.js';

// get access to the templates and render form
// ProjectInput Class
export class ProjectInput extends ComponentBase<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector(
            '#title'
        ) as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector(
            '#description'
        ) as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector(
            '#people'
        ) as HTMLInputElement;
        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {
    }

    // // Union Types
    // // method with Tuple type (title, description, number) or void because of validation error
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        // create constants for Validation with type Validatable
        const titleValidatable: Validation.Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validation.Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validation.Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };

        // Validation
        if (
            !Validation.validate(titleValidatable) ||
            !Validation.validate(descriptionValidatable) ||
            !Validation.validate(peopleValidatable)
        ) {
            alert('Invalid input, please try again!');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    // clear form after submitted
    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    // get access to value from form
    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        // we get all inputs from user
        const userInput = this.gatherUserInput();
        // checking is it array, because in JS tuple is an array
        if (Array.isArray(userInput)) {
            // destructuring
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            // console.log(title, desc, people);
            this.clearInputs();
        }
    }
}

