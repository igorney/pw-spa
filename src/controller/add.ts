import { addView, notificationView } from '../view/components'
import { dao, refreshActiveView } from './main'

/**
 * Configure the AddView.
 */
export function initAddView() {
    const modalTitleEl = addView.container?.querySelector('.modal-title') as HTMLElement
    addView.form?.addEventListener('submit', async function (ev) {
        if (modalTitleEl.textContent == 'Add item') {
            ev.preventDefault()
            addView.disable()
            await handleAdd()
            addView.enable()
        }
    })
}

/**
 * Handle the click event in the AddView.
 */
async function handleAdd() {
    const newItem = addView.parse()

    try {
        const status = await dao.insert(newItem)

        if (status) {
            notificationView.success('ToDo item inserted')
            refreshActiveView()
        } else {
            notificationView.error('Failed to insert ToDo item')
        }
    } catch (error) {
        console.error('Failed to process add operation')
        notificationView.error('Failed to insert ToDo item')
    }
    addView.dismiss()
}
