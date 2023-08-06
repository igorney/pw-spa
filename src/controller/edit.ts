import { editView, notificationView } from '../view/components'
import { dao, refreshActiveView } from './main'

/**
 * Configure the editView.
 */
export function initEditView() {
    const modalTitleEl = editView.container?.querySelector('.modal-title') as HTMLElement
    editView.form?.addEventListener('submit', async function (ev) {
        if (modalTitleEl.textContent == 'Edit item') {
            ev.preventDefault()
            editView.disable()
            await handleUpdate()
            editView.enable()
        }
    })
}

/**
 * Handle the click event in the editView.
 */
async function handleUpdate() {
    const newItem = editView.parse()

    try {
        const status = await dao.update(newItem)

        if (status) {
            notificationView.success('ToDo item updated!')
            refreshActiveView()
        } else {
            notificationView.error('Failed to insert ToDo item')
        }
    } catch (error) {
        console.error('Failed to process add operation')
        notificationView.error('Failed to insert ToDo item')
    }
    editView.dismiss()
}
