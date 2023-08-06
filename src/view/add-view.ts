import {View} from './view'
import {ToDoItem} from '../model'
import {NElement} from './utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let bootstrap: any

/**
 * A view holding the modal dialog form.
 */
export class AddView implements View {
    container: NElement
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modalRef: any
    form: HTMLFormElement

    /**
     * The constructor.
     */
    constructor() {
        this.container = document.querySelector('#form-modal')
        this.modalRef = new bootstrap.Modal(this.container as Element)
        this.form = this.container
            ?.querySelector('#item-form') as HTMLFormElement

        this.container?.addEventListener('hidden.bs.modal',
            () => this.form.reset())
    }

    /**
     * Parse a form as ToDoItem.
     *
     * @return {ToDoItem} the TodoItem
     */
    parse(): ToDoItem {
        const idEl = this.form.querySelector('#id') as HTMLInputElement
        const descriptionEl = this.form
            ?.querySelector('#description') as HTMLInputElement
        const tagsEl = this.form?.querySelector('#tags') as HTMLInputElement
        const deadlineEl = this.form
            ?.querySelector('#deadline') as HTMLInputElement
        const newItem: ToDoItem = {
            id: 0,
            description: descriptionEl.value,
        }

        newItem.id = parseInt(idEl.getAttribute('value') || '')
        newItem.tags = tagsEl?.value.split(',')
            .map((s) => s.trim()).filter((s) => s.length > 0)
        newItem.deadline = deadlineEl?.value || ''

        return newItem
    }

    /**
     * Render the modal.
     */
    render(): void {
        const modalTitleEl = this.container?.querySelector('.modal-title')

        if (modalTitleEl?.textContent) {
            modalTitleEl.textContent = 'Add item'
        }
        this.modalRef.show()
    }

    /**
     * Disable all fields in the form.
     */
    disable() {
        this.container?.querySelectorAll('.item-form-field')
            .forEach((field) => field.setAttribute('disabled', ''))
    }

    /**
     * Enable all fields in the form.
     */
    enable() {
        this.container?.querySelectorAll('.item-form-field')
            .forEach((field) => field.removeAttribute('disabled'))
    }

    /**
     * Dismiss the modal.
     */
    dismiss(): void {
        this.modalRef.hide()
    }
}
