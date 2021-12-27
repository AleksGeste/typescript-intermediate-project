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

    // get access to value from form
    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }

    // add listener to form (button)
    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }

    // method to add element node to host element
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

//
const prInput = new ProjectInput();
