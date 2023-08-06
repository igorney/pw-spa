import { View } from './view'
import { NElement } from './utils'
import { ToDoItem } from '../model'

/**
 * A View representing the remove view.
 */
export class RemoveView implements View {
    container: NElement
    form: HTMLFormElement

    /**
     * The constructor.
     */
    constructor() {
        this.container = document.querySelector('#form-modal')
        this.form = this.container
            ?.querySelector('#item-form') as HTMLFormElement

        this.container?.addEventListener('hidden.bs.modal',
            () => this.form.reset())
    }
    render(args: any): void {
        throw new Error('Method not implemented.')
    }

    /**
     * Remove selected items from the list.
     */
    removeSelectedItems(): ToDoItem[] {
        const selectedItems: ToDoItem[] = [];
        const selectedCheckboxes = document.querySelectorAll('input[name="item-check"]:checked');
        
        selectedCheckboxes.forEach(checkbox => {
            const listItem = checkbox.closest('.list-group-item');
            const idEl = checkbox.getAttribute('list-item-id');
            const descriptionEl = listItem?.querySelector('.list-item-desc') as HTMLElement;
            const tagsContainer = listItem?.querySelector('.badge-container');
            const tags = tagsContainer ? Array.from(tagsContainer.querySelectorAll('.list-item-badge')) : [];
            const deadlineEl = listItem?.querySelector('.list-item-deadline') as HTMLElement;

            const id = idEl ? parseInt(idEl) : 0;
            const description = descriptionEl.textContent || '';
            const tagList = tags.map(tag => tag.textContent || '').filter(tag => tag.trim() !== '');
            const deadline = deadlineEl.textContent || '';
            const item: ToDoItem = {
                id: id,
                description: description,
                tags: tagList,
                deadline: deadline
            };

            selectedItems.push(item);
            listItem?.remove();
        });
        return selectedItems;
    }

    /**
     * Disable all fields in the remove form.
     */
    disable() {
        this.container?.querySelectorAll('.remove-form-field')
            .forEach((field) => field.setAttribute('disabled', ''))
    }

    /**
     * Enable all fields in the remove form.
     */
    enable() {
        this.container?.querySelectorAll('.remove-form-field')
            .forEach((field) => field.removeAttribute('disabled'))
    }

    /**
     * Dismiss the remove modal.
     */
    dismiss(): void {
        // You may choose to do additional actions here, if needed.
        this.form.reset()
    }
}