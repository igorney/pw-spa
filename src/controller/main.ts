import { ToDoItemDAO } from '../model'
import { addBtnView, removeBtnView, editBtnView, addView, 
    dynamicViews, notificationView, editView, removeView } 
    from '../view/components'
import { initAddView } from './add'
import { initEditView } from './edit'

export const dao = new ToDoItemDAO()

const getActiveView = () => dynamicViews.filter((v) => v.isActive())[0]

/**
 * Add event listeners in all dynamic views.
 */
function initDynamicViews() {
    dynamicViews.forEach(
        (view) => view.tabEl?.addEventListener(
            'show.bs.tab', refreshActiveView))
}

/**
 * Refresh the active dynamic view.
 */
export function refreshActiveView() {
    dao.listAll()
        .then((items) => getActiveView().render(items))
        .catch((error) => {
            notificationView.error('Failed to load data from the server')
            console.error(error)
        })
}

/**
 * Add event listeners to the toolbar buttons.
 */
function initToolbar() {
    addBtnView.container?.addEventListener('click',
        () => addView.render())
    removeBtnView.container?.addEventListener('click', 
        () => handleRemove())
    editBtnView.container?.addEventListener('click', 
        () => handleEdit())
}

/**
 * Start the controller.
 */
export function start() {
    initToolbar()
    initDynamicViews()
    initAddView()
    initEditView()
    refreshActiveView()
}

/**
 * Handle the click event in the RemoveView.
 */
async function handleRemove() {

    try {
        const listItemsSelected = removeView.removeSelectedItems()
        listItemsSelected.forEach(item => {
            dao.removeById(item.id)
        })
        notificationView.success('ToDo item(s) removed successfully!')
        refreshActiveView()
    } catch (error) {
        console.error('Failed to remove items')
        notificationView.error('Failed to remove ToDo items')
    }
}

/**
 * Handle the click event in the EditView.
 */
async function handleEdit() {
    try {
        const selectedItems = editView.getSelectedItems(); // Get the selected items
        if (selectedItems.length === 1) {
            // If only one item is selected, show the edit modal with the selected item's data
            const selectedItem = selectedItems[0];
            editView.render(selectedItem);
        } else {
            notificationView.error('Please select one item to edit.');
        }
    } catch (error) {
        console.error('Failed to edit item');
        notificationView.error('Failed to edit ToDo item');
    }
}
