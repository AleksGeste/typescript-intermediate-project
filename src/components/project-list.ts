import {ProjectItem} from './project-item.js';
import ComponentBase from './base-component.js';
import {DragTarget} from '../models/drag-drop.js';
import {Project, ProjectStatus} from '../models/project.js';
import {autobind} from '../decorators/autobind.js';
import {projectState} from '../state/project-state.js';

// rendering the list of projects
// ProjectList Class
export class ProjectList extends ComponentBase<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedProjects: Project[];

    // constructor with accessor union type
    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            // to allow drag&drop
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }

    @autobind
    dropHandler(event: DragEvent) {
        const prID = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(prID, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.renderProjects();
        });
    }

    // fill with information
    renderContent() {
        this.element.querySelector('ul')!.id = `${this.type}-projects-list`;
        this.element.querySelector('h2')!.textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }

    // render all projects
    private renderProjects() {
        const listEl = document.getElementById(
            `${this.type}-projects-list`
        )! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const prItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, prItem);
        }
    }
}

