// Component Base Class
// with Generic types
// abstract because it used only for Inheritance
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T; // HTMLElement os specific version
    element: U; // HTMLElement os specific version

    protected constructor(
        templateId: string,
        hostElementId: string, // where to render
        insertAtStart: boolean, // depends on 'afterbegin' : 'beforeend'
        newElementId?: string
    ) {
        // getting access to elements
        this.templateElement = document.getElementById(
            templateId
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T; // cast from T

        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = importedNode.firstElementChild as U; // cast from U
        if (newElementId) { // check if exist
            this.element.id = newElementId;
        }

        this.attach(insertAtStart);
    }

    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(
            insertAtBeginning ? 'afterbegin' : 'beforeend',
            this.element
        );
    }

    // forcing any class from Component class to have those methods
    abstract configure(): void;

    abstract renderContent(): void;
}

