import { ToDoItem } from '../model';
import { View } from '../view/view';
import { NElement } from './utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let bootstrap: any;

/**
 * A view holding the edit modal dialog form.
 */
export class EditView implements View {
    container: NElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modalRef: any;
    form: HTMLFormElement;

    /**
     * The constructor.
     */
    constructor() {
        this.container = document.querySelector('#form-modal');
        this.modalRef = new bootstrap.Modal(this.container as Element);
        this.form = this.container?.querySelector('#item-form') as HTMLFormElement;

        this.container?.addEventListener('hidden.bs.modal', () => this.form.reset());
    }

    /**
     * Parse a form as ToDoItem.
     *
     * @return {ToDoItem} the TodoItem
     */
    parse(): ToDoItem {
        const idEl = this.form.querySelector('#id') as HTMLInputElement;
        const descriptionEl = this.form
            ?.querySelector('#description') as HTMLInputElement;
        const tagsEl = this.form?.querySelector('#tags') as HTMLInputElement;
        const deadlineEl = this.form
            ?.querySelector('#deadline') as HTMLInputElement;
        const newItem: ToDoItem = {
            id: idEl.value ? parseInt(idEl.value) : 0,
            description: descriptionEl.value,
        };

        newItem.id = parseInt(idEl.getAttribute('value') || '');
        newItem.tags = tagsEl?.value.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
        newItem.deadline = deadlineEl?.value || '';

        return newItem;
    }

    /**
     * Render the edit modal.
     * @param {ToDoItem} item - The item to be edited.
     */
    render(item: ToDoItem): void {
        const modalTitleEl = this.container?.querySelector('.modal-title');

        if (modalTitleEl?.textContent) {
            modalTitleEl.textContent = 'Edit item';
        }

        // Fill the form fields with the data of the selected item for editing
        const idEl = this.form.querySelector('#id') as HTMLInputElement;
        const descriptionEl = this.form.querySelector('#description') as HTMLInputElement;
        const tagsEl = this.form.querySelector('#tags') as HTMLInputElement;
        const deadlineEl = this.form.querySelector('#deadline') as HTMLInputElement;

        idEl.value = item.id.toString();
        descriptionEl.value = item.description;
        tagsEl.value = item.tags ? item.tags.join(', ') : '';
        deadlineEl.value = item.deadline || '';

        this.modalRef.show();
    }

    /**
     * Disable all fields in the form.
     */
    disable() {
        this.container?.querySelectorAll('.item-form-field').forEach((field) => field.setAttribute('disabled', ''));
    }

    /**
     * Enable all fields in the form.
     */
    enable() {
        this.container?.querySelectorAll('.item-form-field').forEach((field) => field.removeAttribute('disabled'));
    }

    /**
     * Dismiss the modal.
     */
    dismiss(): void {
        this.modalRef.hide();
    }

    /**
   * Get the selected items from the list.
   *
   * @returns {ToDoItem[]} An array of selected ToDoItems.
   */
    getSelectedItems(): ToDoItem[] {
        const selectedItems: ToDoItem[] = [];
        const selectedCheckboxes = document.querySelectorAll('input[name="item-check"]:checked');
        selectedCheckboxes.forEach((checkbox) => {
            const listItem = checkbox.closest('.list-group-item');
            const idEl = checkbox.getAttribute('list-item-id')
            const descriptionEl = listItem?.querySelector('.list-item-desc') as HTMLElement;
            const tagsContainer = listItem?.querySelector('.badge-container');
            const tags = tagsContainer ? Array.from(tagsContainer.querySelectorAll('.list-item-badge')) : [];
            const deadlineEl = listItem?.querySelector('.list-item-deadline') as HTMLElement;

            const id = idEl ? parseInt(idEl) : 0;
            const description = descriptionEl.textContent || '';
            const tagList = tags.map((tag) => tag.textContent || '').filter((tag) => tag.trim() !== '');
            const deadline = deadlineEl.textContent || '';
            const item: ToDoItem = {
                id: id,
                description: description,
                tags: tagList,
                deadline: deadline,
            };

            selectedItems.push(item);
        });

        return selectedItems;
    }
}