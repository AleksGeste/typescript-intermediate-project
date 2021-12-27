// Validation logic

// crating interface
interface Validatable {
    value: string | number; // for input
    required?: boolean; // could not exist (optional)
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

// Validation function with object of Validatable
function validate(validatableInput: Validatable) {
    let isValid = true; // if fails we change it to false

    // checking if required option is true
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }

    // if minLength is set here we check it
    if (
        validatableInput.minLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }

    // same with maxLength
    if (
        validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }

    // check for min value for number
    if (
        validatableInput.min != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    // check for max value for number
    if (
        validatableInput.max != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}

// Autobind Decorator
function autobind(
    _: any, // target
    _2: string, // method name
    descriptor: PropertyDescriptor // descriptor
) {
    // access to original method
    const originalMethod = descriptor.value;
    //
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            // we get original method and add bind to it
            // const boundFn = originalMethod.bind(this);
            // return boundFn;
            return originalMethod.bind(this);
        }
    };
    return adjDescriptor;
}

// get access to the templates and render form
class ProjectInput {
    // defined all elements properties with their types
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        // template element which is not null and with type casting
        this.templateElement = document.getElementById(
            'project-input'
        )! as HTMLTemplateElement;

        // element which holds all templates
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        // create node with pointer to template element content
        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );

        // create element to child of the node
        this.element = importedNode.firstElementChild as HTMLFormElement;
        // add css id for better style
        this.element.id = 'user-input';

        // get access to properties with querySelector by ID and with type casting
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        // execute methods
        this.configure();
        this.attach();
    }

    // Union Types
    // method with Tuple type (title, description, number) or void because of validation error
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        // create constants for Validation with type Validatable
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };

        // Validation
        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid input, please try again!');
            return;
        } else {
            // if all good we return our tuple
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
    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        // we get all inputs from user
        const userInput = this.gatherUserInput();
        // checking is it array, because in JS tuple is array
        if (Array.isArray(userInput)) {
            // destructuring
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.clearInputs();
        }
    }

    // add listener to form (button)
    private configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    // method to add element node to host element
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

//
const prInput = new ProjectInput();
