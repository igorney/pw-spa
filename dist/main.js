/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller/add.ts":
/*!*******************************!*\
  !*** ./src/controller/add.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initAddView = void 0;
const components_1 = __webpack_require__(/*! ../view/components */ "./src/view/components.ts");
const main_1 = __webpack_require__(/*! ./main */ "./src/controller/main.ts");
/**
 * Configure the AddView.
 */
function initAddView() {
    var _a, _b;
    const modalTitleEl = (_a = components_1.addView.container) === null || _a === void 0 ? void 0 : _a.querySelector('.modal-title');
    (_b = components_1.addView.form) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', async function (ev) {
        if (modalTitleEl.textContent == 'Add item') {
            ev.preventDefault();
            components_1.addView.disable();
            await handleAdd();
            components_1.addView.enable();
        }
    });
}
exports.initAddView = initAddView;
/**
 * Handle the click event in the AddView.
 */
async function handleAdd() {
    const newItem = components_1.addView.parse();
    try {
        const status = await main_1.dao.insert(newItem);
        if (status) {
            components_1.notificationView.success('ToDo item inserted');
            (0, main_1.refreshActiveView)();
        }
        else {
            components_1.notificationView.error('Failed to insert ToDo item');
        }
    }
    catch (error) {
        console.error('Failed to process add operation');
        components_1.notificationView.error('Failed to insert ToDo item');
    }
    components_1.addView.dismiss();
}


/***/ }),

/***/ "./src/controller/edit.ts":
/*!********************************!*\
  !*** ./src/controller/edit.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initEditView = void 0;
const components_1 = __webpack_require__(/*! ../view/components */ "./src/view/components.ts");
const main_1 = __webpack_require__(/*! ./main */ "./src/controller/main.ts");
/**
 * Configure the editView.
 */
function initEditView() {
    var _a, _b;
    const modalTitleEl = (_a = components_1.editView.container) === null || _a === void 0 ? void 0 : _a.querySelector('.modal-title');
    (_b = components_1.editView.form) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', async function (ev) {
        if (modalTitleEl.textContent == 'Edit item') {
            ev.preventDefault();
            components_1.editView.disable();
            await handleUpdate();
            components_1.editView.enable();
        }
    });
}
exports.initEditView = initEditView;
/**
 * Handle the click event in the editView.
 */
async function handleUpdate() {
    const newItem = components_1.editView.parse();
    try {
        const status = await main_1.dao.update(newItem);
        if (status) {
            components_1.notificationView.success('ToDo item updated!');
            (0, main_1.refreshActiveView)();
        }
        else {
            components_1.notificationView.error('Failed to insert ToDo item');
        }
    }
    catch (error) {
        console.error('Failed to process add operation');
        components_1.notificationView.error('Failed to insert ToDo item');
    }
    components_1.editView.dismiss();
}


/***/ }),

/***/ "./src/controller/main.ts":
/*!********************************!*\
  !*** ./src/controller/main.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.start = exports.refreshActiveView = exports.dao = void 0;
const model_1 = __webpack_require__(/*! ../model */ "./src/model.ts");
const components_1 = __webpack_require__(/*! ../view/components */ "./src/view/components.ts");
const add_1 = __webpack_require__(/*! ./add */ "./src/controller/add.ts");
const edit_1 = __webpack_require__(/*! ./edit */ "./src/controller/edit.ts");
exports.dao = new model_1.ToDoItemDAO();
const getActiveView = () => components_1.dynamicViews.filter((v) => v.isActive())[0];
/**
 * Add event listeners in all dynamic views.
 */
function initDynamicViews() {
    components_1.dynamicViews.forEach((view) => {
        var _a;
        return (_a = view.tabEl) === null || _a === void 0 ? void 0 : _a.addEventListener('show.bs.tab', refreshActiveView);
    });
}
/**
 * Refresh the active dynamic view.
 */
function refreshActiveView() {
    exports.dao.listAll()
        .then((items) => getActiveView().render(items))
        .catch((error) => {
        components_1.notificationView.error('Failed to load data from the server');
        console.error(error);
    });
}
exports.refreshActiveView = refreshActiveView;
/**
 * Add event listeners to the toolbar buttons.
 */
function initToolbar() {
    var _a, _b, _c;
    (_a = components_1.addBtnView.container) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => components_1.addView.render());
    (_b = components_1.removeBtnView.container) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => handleRemove());
    (_c = components_1.editBtnView.container) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => handleEdit());
}
/**
 * Start the controller.
 */
function start() {
    initToolbar();
    initDynamicViews();
    (0, add_1.initAddView)();
    (0, edit_1.initEditView)();
    refreshActiveView();
}
exports.start = start;
/**
 * Handle the click event in the RemoveView.
 */
async function handleRemove() {
    try {
        const listItemsSelected = components_1.removeView.removeSelectedItems();
        listItemsSelected.forEach(item => {
            exports.dao.removeById(item.id);
        });
        components_1.notificationView.success('ToDo item(s) removed successfully!');
        refreshActiveView();
    }
    catch (error) {
        console.error('Failed to remove items');
        components_1.notificationView.error('Failed to remove ToDo items');
    }
}
/**
 * Handle the click event in the EditView.
 */
async function handleEdit() {
    try {
        const selectedItems = components_1.editView.getSelectedItems(); // Get the selected items
        if (selectedItems.length === 1) {
            // If only one item is selected, show the edit modal with the selected item's data
            const selectedItem = selectedItems[0];
            components_1.editView.render(selectedItem);
        }
        else {
            components_1.notificationView.error('Please select one item to edit.');
        }
    }
    catch (error) {
        console.error('Failed to edit item');
        components_1.notificationView.error('Failed to edit ToDo item');
    }
}


/***/ }),

/***/ "./src/model.ts":
/*!**********************!*\
  !*** ./src/model.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ToDoItemDAO = void 0;
const ra = '11201811861'; // TODO: incluir seu RA
const host = 'https://todo-server-spa-ozyq2qhxqq-rj.a.run.app/api';
/**
 * A DAO for ToDoItem's.
 */
class ToDoItemDAO {
    /**
     * Validate an item.
     *
     * @param {ToDoItem} item the item
     * @return {boolean} true if the item is valid, false otherwise
     */
    isItemValid(item) {
        return item.description.length > 0;
    }
    /**
     * List all items.
     *
     * @return {Promise<ToDoItem[]>} the items as a Promise
     */
    async listAll() {
        try {
            const response = await fetch(`${host}/${ra}/list`);
            if (response.ok) {
                return (await response.json()).items;
            }
            console.error('Server status: ' +
                JSON.stringify(await response.json()));
            throw new Error('Server-side error. Failed to list');
        }
        catch (error) {
            console.error('Failed to list elements');
            throw error;
        }
    }
    /**
     * Insert an item.
     *
     * @param {ToDoItem} item the item
     * @return {boolean} a promise for true, if the operation
     *  was successfull, false otherwise
     */
    async insert(item) {
        try {
            const response = await fetch(`${host}/${ra}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            if (response.ok) {
                return true;
            }
            console.error('Server-side error. Failed to insert.');
            console.error('Server status: ' +
                JSON.stringify(await response.json()));
            return false;
        }
        catch (error) {
            console.error('Failed to insert element');
            throw error;
        }
    }
    /**
     * Remove an item by ID.
     *
     * @param {number} id the ID of the item to be removed
     * @return {Promise<boolean>} a promise for true, if the operation was successful, false otherwise
     */
    async removeById(id) {
        try {
            const response = await fetch(`${host}/${ra}/remove/${id}`, {
                method: 'GET',
            });
            if (response.ok) {
                return true;
            }
            console.error('Server-side error. Failed to remove.');
            console.error('Server status: ' + JSON.stringify(await response.json()));
            return false;
        }
        catch (error) {
            console.error('Failed to remove element');
            throw error;
        }
    }
    /**
     * Update an item.
     *
     * @param {ToDoItem} item the updated item
     * @return {Promise<boolean>} a promise for true, if the operation was successful, false otherwise
     */
    async update(item) {
        if (!this.isItemValid(item)) {
            console.error('Invalid item. Description cannot be empty');
            return false;
        }
        try {
            const response = await fetch(`${host}/${ra}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            if (response.ok) {
                return true;
            }
            console.error('Server-side error. Failed to update.');
            console.error('Server status: ' + JSON.stringify(await response.json()));
            return false;
        }
        catch (error) {
            console.error('Failed to update element');
            throw error;
        }
    }
}
exports.ToDoItemDAO = ToDoItemDAO;


/***/ }),

/***/ "./src/view/action-button-view.ts":
/*!****************************************!*\
  !*** ./src/view/action-button-view.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActionButtonView = void 0;
/**
 * A view modeling a button from the toolbar.
 */
class ActionButtonView {
    /**
     * Build a button.
     *
     * @param {NElement} container the button container
     */
    constructor(container) {
        this.container = container;
    }
    /**
     * Do nothing.
     *
     * @param {unknown} args the args
     */
    render(args) {
        args;
    }
    /**
     * Enable the button.
     */
    enable() {
        var _a;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.classList.remove('disabled');
    }
    /**
     * Disable the button.
     */
    disable() {
        var _a;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.classList.add('disabled');
    }
}
exports.ActionButtonView = ActionButtonView;


/***/ }),

/***/ "./src/view/add-view.ts":
/*!******************************!*\
  !*** ./src/view/add-view.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddView = void 0;
/**
 * A view holding the modal dialog form.
 */
class AddView {
    /**
     * The constructor.
     */
    constructor() {
        var _a, _b;
        this.container = document.querySelector('#form-modal');
        this.modalRef = new bootstrap.Modal(this.container);
        this.form = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector('#item-form');
        (_b = this.container) === null || _b === void 0 ? void 0 : _b.addEventListener('hidden.bs.modal', () => this.form.reset());
    }
    /**
     * Parse a form as ToDoItem.
     *
     * @return {ToDoItem} the TodoItem
     */
    parse() {
        var _a, _b, _c;
        const idEl = this.form.querySelector('#id');
        const descriptionEl = (_a = this.form) === null || _a === void 0 ? void 0 : _a.querySelector('#description');
        const tagsEl = (_b = this.form) === null || _b === void 0 ? void 0 : _b.querySelector('#tags');
        const deadlineEl = (_c = this.form) === null || _c === void 0 ? void 0 : _c.querySelector('#deadline');
        const newItem = {
            id: 0,
            description: descriptionEl.value,
        };
        newItem.id = parseInt(idEl.getAttribute('value') || '');
        newItem.tags = tagsEl === null || tagsEl === void 0 ? void 0 : tagsEl.value.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
        newItem.deadline = (deadlineEl === null || deadlineEl === void 0 ? void 0 : deadlineEl.value) || '';
        return newItem;
    }
    /**
     * Render the modal.
     */
    render() {
        var _a;
        const modalTitleEl = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector('.modal-title');
        if (modalTitleEl === null || modalTitleEl === void 0 ? void 0 : modalTitleEl.textContent) {
            modalTitleEl.textContent = 'Add item';
        }
        this.modalRef.show();
    }
    /**
     * Disable all fields in the form.
     */
    disable() {
        var _a;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.item-form-field').forEach((field) => field.setAttribute('disabled', ''));
    }
    /**
     * Enable all fields in the form.
     */
    enable() {
        var _a;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.item-form-field').forEach((field) => field.removeAttribute('disabled'));
    }
    /**
     * Dismiss the modal.
     */
    dismiss() {
        this.modalRef.hide();
    }
}
exports.AddView = AddView;


/***/ }),

/***/ "./src/view/components.ts":
/*!********************************!*\
  !*** ./src/view/components.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dynamicViews = exports.notificationView = exports.editBtnView = exports.removeBtnView = exports.addBtnView = exports.removeView = exports.editView = exports.addView = exports.tagsView = exports.oldestView = exports.newestView = void 0;
const action_button_view_1 = __webpack_require__(/*! ./action-button-view */ "./src/view/action-button-view.ts");
const add_view_1 = __webpack_require__(/*! ./add-view */ "./src/view/add-view.ts");
const edit_view_1 = __webpack_require__(/*! ./edit-view */ "./src/view/edit-view.ts");
const remove_view_1 = __webpack_require__(/*! ./remove-view */ "./src/view/remove-view.ts");
const newest_view_1 = __webpack_require__(/*! ./newest-view */ "./src/view/newest-view.ts");
const notification_view_1 = __webpack_require__(/*! ./notification-view */ "./src/view/notification-view.ts");
const oldest_view_1 = __webpack_require__(/*! ./oldest-view */ "./src/view/oldest-view.ts");
const tags_view_1 = __webpack_require__(/*! ./tags-view */ "./src/view/tags-view.ts");
exports.newestView = new newest_view_1.NewestView();
exports.oldestView = new oldest_view_1.OldestView();
exports.tagsView = new tags_view_1.TagsView();
exports.addView = new add_view_1.AddView();
exports.editView = new edit_view_1.EditView();
exports.removeView = new remove_view_1.RemoveView();
exports.addBtnView = new action_button_view_1.ActionButtonView(document.querySelector('#btn-add'));
exports.removeBtnView = new action_button_view_1.ActionButtonView(document.querySelector('#btn-remove'));
exports.editBtnView = new action_button_view_1.ActionButtonView(document.querySelector('#btn-edit'));
exports.notificationView = new notification_view_1.NotificationView();
exports.dynamicViews = [exports.newestView, exports.oldestView, exports.tagsView];


/***/ }),

/***/ "./src/view/edit-view.ts":
/*!*******************************!*\
  !*** ./src/view/edit-view.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EditView = void 0;
/**
 * A view holding the edit modal dialog form.
 */
class EditView {
    /**
     * The constructor.
     */
    constructor() {
        var _a, _b;
        this.container = document.querySelector('#form-modal');
        this.modalRef = new bootstrap.Modal(this.container);
        this.form = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector('#item-form');
        (_b = this.container) === null || _b === void 0 ? void 0 : _b.addEventListener('hidden.bs.modal', () => this.form.reset());
    }
    /**
     * Parse a form as ToDoItem.
     *
     * @return {ToDoItem} the TodoItem
     */
    parse() {
        var _a, _b, _c;
        const idEl = this.form.querySelector('#id');
        const descriptionEl = (_a = this.form) === null || _a === void 0 ? void 0 : _a.querySelector('#description');
        const tagsEl = (_b = this.form) === null || _b === void 0 ? void 0 : _b.querySelector('#tags');
        const deadlineEl = (_c = this.form) === null || _c === void 0 ? void 0 : _c.querySelector('#deadline');
        const newItem = {
            id: idEl.value ? parseInt(idEl.value) : 0,
            description: descriptionEl.value,
        };
        newItem.id = parseInt(idEl.getAttribute('value') || '');
        newItem.tags = tagsEl === null || tagsEl === void 0 ? void 0 : tagsEl.value.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
        newItem.deadline = (deadlineEl === null || deadlineEl === void 0 ? void 0 : deadlineEl.value) || '';
        return newItem;
    }
    /**
     * Render the edit modal.
     * @param {ToDoItem} item - The item to be edited.
     */
    render(item) {
        var _a;
        const modalTitleEl = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector('.modal-title');
        if (modalTitleEl === null || modalTitleEl === void 0 ? void 0 : modalTitleEl.textContent) {
            modalTitleEl.textContent = 'Edit item';
        }
        // Fill the form fields with the data of the selected item for editing
        const idEl = this.form.querySelector('#id');
        const descriptionEl = this.form.querySelector('#description');
        const tagsEl = this.form.querySelector('#tags');
        const deadlineEl = this.form.querySelector('#deadline');
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
        var _a;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.item-form-field').forEach((field) => field.setAttribute('disabled', ''));
    }
    /**
     * Enable all fields in the form.
     */
    enable() {
        var _a;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.item-form-field').forEach((field) => field.removeAttribute('disabled'));
    }
    /**
     * Dismiss the modal.
     */
    dismiss() {
        this.modalRef.hide();
    }
    /**
   * Get the selected items from the list.
   *
   * @returns {ToDoItem[]} An array of selected ToDoItems.
   */
    getSelectedItems() {
        const selectedItems = [];
        const selectedCheckboxes = document.querySelectorAll('input[name="item-check"]:checked');
        selectedCheckboxes.forEach((checkbox) => {
            const listItem = checkbox.closest('.list-group-item');
            const idEl = checkbox.getAttribute('list-item-id');
            const descriptionEl = listItem === null || listItem === void 0 ? void 0 : listItem.querySelector('.list-item-desc');
            const tagsContainer = listItem === null || listItem === void 0 ? void 0 : listItem.querySelector('.badge-container');
            const tags = tagsContainer ? Array.from(tagsContainer.querySelectorAll('.list-item-badge')) : [];
            const deadlineEl = listItem === null || listItem === void 0 ? void 0 : listItem.querySelector('.list-item-deadline');
            const id = idEl ? parseInt(idEl) : 0;
            const description = descriptionEl.textContent || '';
            const tagList = tags.map((tag) => tag.textContent || '').filter((tag) => tag.trim() !== '');
            const deadline = deadlineEl.textContent || '';
            const item = {
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
exports.EditView = EditView;


/***/ }),

/***/ "./src/view/listview.ts":
/*!******************************!*\
  !*** ./src/view/listview.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListView = void 0;
const tab_view_1 = __webpack_require__(/*! ./tab-view */ "./src/view/tab-view.ts");
/**
 * Abstract class representing any list view.
 */
class ListView extends tab_view_1.TabView {
    /**
     * The constructor.
     *
     * @param {NElement} tabEl the tab element
     * @param {NElement} contentEl the content element
     */
    constructor(tabEl, contentEl) {
        super(tabEl, contentEl);
    }
    /**
     * Render the list view.
     *
     * @param {ToDoItem[]} items the items
     */
    render(items) {
        items.sort(this.compare);
        this.clearContainer();
        this.buildItemList(items, this.contentEl, true);
    }
}
exports.ListView = ListView;


/***/ }),

/***/ "./src/view/newest-view.ts":
/*!*********************************!*\
  !*** ./src/view/newest-view.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewestView = void 0;
const listview_1 = __webpack_require__(/*! ./listview */ "./src/view/listview.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/view/utils.ts");
/**
 * List the items in date-descending order
 */
class NewestView extends listview_1.ListView {
    /**
     * The constructor.
     */
    constructor() {
        super(document.querySelector('#newest-tab'), document.querySelector('#newest-content'));
    }
    /**
     * Compare two ToDoItem's.
     *
     * @param {ToDoItem} a the first item
     * @param {ToDoItem} b the second item
     * @return {number} -1, 1 or 0 according to JS comparison rules
     */
    compare(a, b) {
        return (0, utils_1.descComparator)(a, b);
    }
}
exports.NewestView = NewestView;


/***/ }),

/***/ "./src/view/notification-view.ts":
/*!***************************************!*\
  !*** ./src/view/notification-view.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationView = void 0;
var ToastStyle;
(function (ToastStyle) {
    ToastStyle["success"] = "bg-success";
    ToastStyle["error"] = "bg-danger";
    ToastStyle["info"] = "bg-primary";
})(ToastStyle || (ToastStyle = {}));
/**
 * A View representing a notification.
 */
class NotificationView {
    /**
     * The constructor.
     */
    constructor() {
        this.toastElement = document.querySelector('#toast');
        this.toast = new bootstrap.Toast(this.toastElement);
        this.setStyle(ToastStyle.success);
    }
    /**
     * Set the notification style.
     *
     * @param {ToastStyle} style the style
     */
    setStyle(style) {
        var _a, _b, _c, _d;
        (_a = this.toastElement) === null || _a === void 0 ? void 0 : _a.classList.remove(ToastStyle.error);
        (_b = this.toastElement) === null || _b === void 0 ? void 0 : _b.classList.remove(ToastStyle.info);
        (_c = this.toastElement) === null || _c === void 0 ? void 0 : _c.classList.remove(ToastStyle.success);
        (_d = this.toastElement) === null || _d === void 0 ? void 0 : _d.classList.add(style);
    }
    /**
     * Render the noficiation.
     *
     * @param {string} message the message
     */
    render(message) {
        var _a;
        const messageNode = (_a = this.toastElement) === null || _a === void 0 ? void 0 : _a.querySelector('.toast-body');
        if (messageNode) {
            messageNode.textContent = message;
            this.toast.show();
        }
    }
    /**
     * Notify a success message.
     *
     * @param {string} message the message
     */
    success(message) {
        this.setStyle(ToastStyle.success);
        this.render(message);
    }
    /**
     * Notify an error message.
     *
     * @param {string} message the message
     */
    error(message) {
        this.setStyle(ToastStyle.error);
        this.render(message);
    }
    /**
     * Notify an info message.
     *
     * @param {string} message the message
     */
    info(message) {
        this.setStyle(ToastStyle.info);
        this.render(message);
    }
}
exports.NotificationView = NotificationView;


/***/ }),

/***/ "./src/view/oldest-view.ts":
/*!*********************************!*\
  !*** ./src/view/oldest-view.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OldestView = void 0;
const listview_1 = __webpack_require__(/*! ./listview */ "./src/view/listview.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/view/utils.ts");
/**
 * List the items in date-ascending order
 */
class OldestView extends listview_1.ListView {
    /**
     * The constructor.
     */
    constructor() {
        super(document.querySelector('#oldest-tab'), document.querySelector('#oldest-content'));
    }
    /**
     * Compare two items.
     *
     * @param {ToDoItem} a the first item
     * @param {ToDoItem} b the second item
     * @return {number} -1, 0, 1 according to JS rules
     */
    compare(a, b) {
        return (0, utils_1.ascComparator)(a, b);
    }
}
exports.OldestView = OldestView;


/***/ }),

/***/ "./src/view/remove-view.ts":
/*!*********************************!*\
  !*** ./src/view/remove-view.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveView = void 0;
/**
 * A View representing the remove view.
 */
class RemoveView {
    /**
     * The constructor.
     */
    constructor() {
        var _a, _b;
        this.container = document.querySelector('#form-modal');
        this.form = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector('#item-form');
        (_b = this.container) === null || _b === void 0 ? void 0 : _b.addEventListener('hidden.bs.modal', () => this.form.reset());
    }
    render(args) {
        throw new Error('Method not implemented.');
    }
    /**
     * Remove selected items from the list.
     */
    removeSelectedItems() {
        const selectedItems = [];
        const selectedCheckboxes = document.querySelectorAll('input[name="item-check"]:checked');
        selectedCheckboxes.forEach(checkbox => {
            const listItem = checkbox.closest('.list-group-item');
            const idEl = checkbox.getAttribute('list-item-id');
            const descriptionEl = listItem === null || listItem === void 0 ? void 0 : listItem.querySelector('.list-item-desc');
            const tagsContainer = listItem === null || listItem === void 0 ? void 0 : listItem.querySelector('.badge-container');
            const tags = tagsContainer ? Array.from(tagsContainer.querySelectorAll('.list-item-badge')) : [];
            const deadlineEl = listItem === null || listItem === void 0 ? void 0 : listItem.querySelector('.list-item-deadline');
            const id = idEl ? parseInt(idEl) : 0;
            const description = descriptionEl.textContent || '';
            const tagList = tags.map(tag => tag.textContent || '').filter(tag => tag.trim() !== '');
            const deadline = deadlineEl.textContent || '';
            const item = {
                id: id,
                description: description,
                tags: tagList,
                deadline: deadline
            };
            selectedItems.push(item);
            listItem === null || listItem === void 0 ? void 0 : listItem.remove();
        });
        return selectedItems;
    }
    /**
     * Disable all fields in the remove form.
     */
    disable() {
        var _a;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.remove-form-field').forEach((field) => field.setAttribute('disabled', ''));
    }
    /**
     * Enable all fields in the remove form.
     */
    enable() {
        var _a;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.remove-form-field').forEach((field) => field.removeAttribute('disabled'));
    }
    /**
     * Dismiss the remove modal.
     */
    dismiss() {
        // You may choose to do additional actions here, if needed.
        this.form.reset();
    }
}
exports.RemoveView = RemoveView;


/***/ }),

/***/ "./src/view/tab-view.ts":
/*!******************************!*\
  !*** ./src/view/tab-view.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TabView = void 0;
/**
 * A View that renders a Tab.
 */
class TabView {
    /**
     * The constructor.
     *
     * @param {NElement} tabEl the tab element
     * @param {NElement} contentEl the content element
     */
    constructor(tabEl, contentEl) {
        this.tabEl = tabEl;
        this.contentEl = contentEl;
    }
    /**
     * Clear the tab container.
     */
    clearContainer() {
        var _a;
        while ((_a = this.contentEl) === null || _a === void 0 ? void 0 : _a.lastChild) {
            this.contentEl.removeChild(this.contentEl.lastChild);
        }
    }
    /**
     * Render a list of items.
     *
     * @param {ToDoItem[]} items the items
     * @param {NElement} container the container
     * @param {boolean} withTags whether it has tags, or not
     */
    buildItemList(items, container, withTags) {
        var _a, _b;
        for (const item of items) {
            const template = document.getElementById('list-item-template');
            const clone = template.content.cloneNode(true);
            const listItem = clone.querySelector('.list-group-item');
            const description = clone.querySelector('.list-item-desc');
            const badgeContainer = clone.querySelector('.badge-container');
            const deadline = clone.querySelector('.list-item-deadline');
            (_a = listItem === null || listItem === void 0 ? void 0 : listItem.querySelector('.form-check-input')) === null || _a === void 0 ? void 0 : _a.setAttribute('list-item-id', item.id.toString());
            if (description) {
                description.textContent = item.description;
            }
            const badgeTemplate = clone.querySelector('.list-item-badge');
            if (withTags && item.tags && item.tags.length > 0) {
                for (const tag of item.tags) {
                    const newBadge = badgeTemplate === null || badgeTemplate === void 0 ? void 0 : badgeTemplate.cloneNode();
                    newBadge.textContent = tag;
                    badgeContainer === null || badgeContainer === void 0 ? void 0 : badgeContainer.append(newBadge);
                }
            }
            (_b = badgeTemplate === null || badgeTemplate === void 0 ? void 0 : badgeTemplate.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(badgeTemplate);
            if (deadline === null || deadline === void 0 ? void 0 : deadline.textContent) {
                const date = Date.parse((item === null || item === void 0 ? void 0 : item.deadline) || '');
                deadline.textContent = (date) ?
                    new Date(date).toUTCString().slice(0, 16) : '';
            }
            if (listItem) {
                container === null || container === void 0 ? void 0 : container.append(listItem);
            }
        }
    }
    /**
     * Check whether this view is active.
     *
     * @return {boolean} true if it is active, false otherwise
     */
    isActive() {
        var _a;
        return ((_a = this.tabEl) === null || _a === void 0 ? void 0 : _a.classList.contains('active')) || false;
    }
}
exports.TabView = TabView;


/***/ }),

/***/ "./src/view/tags-view.ts":
/*!*******************************!*\
  !*** ./src/view/tags-view.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TagsView = void 0;
const tab_view_1 = __webpack_require__(/*! ./tab-view */ "./src/view/tab-view.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/view/utils.ts");
const NOTAG = 'untagged';
/**
 * A tab view that shows items grouped by tags.
 */
class TagsView extends tab_view_1.TabView {
    /**
     * The constructor.
     */
    constructor() {
        super(document.querySelector('#tags-tab'), document.querySelector('#tags-content'));
    }
    /**
     * Compare two items.
     *
     * @param {ToDoItem} a the first item
     * @param {ToDoItem} b the second item
     * @return {numer} 1, -1, 0 according to JS comparison rules
     */
    compare(a, b) {
        return (0, utils_1.descComparator)(a, b);
    }
    /**
     * Group items by tag.
     *
     * @param {ToDoItem[]} items the items
     * @return {TagGroups} the grouped tags
     */
    groupByTags(items) {
        const groups = {};
        for (const item of items) {
            if (item.tags && item.tags.length < 1) {
                if (NOTAG in groups) {
                    groups[NOTAG].push(item);
                }
                else {
                    groups[NOTAG] = [item];
                }
            }
            for (const tag of item.tags || []) {
                if (tag in groups) {
                    groups[tag].push(item);
                }
                else {
                    groups[tag] = [item];
                }
            }
        }
        for (const tag in groups) {
            if (tag in Object.keys(groups)) {
                groups[tag].sort(this.compare);
            }
        }
        return groups;
    }
    /**
     * Render the tab.
     *
     * @param {ToDoItem[]} items the items
     */
    render(items) {
        var _a;
        const groups = this.groupByTags(items);
        const sortedTags = Object.keys(groups).sort();
        const groupTemplate = document.querySelector('#tag-list-item-template');
        this.clearContainer();
        for (const tag of sortedTags) {
            const groupClone = groupTemplate.content
                .cloneNode(true);
            const groupItem = groupClone.querySelector('.list-group-item');
            const tagLabel = groupItem === null || groupItem === void 0 ? void 0 : groupItem.querySelector('.badge');
            if (tagLabel) {
                tagLabel.textContent = tag;
            }
            this.buildItemList(groups[tag], groupClone.querySelector('.list-group'), false);
            if (groupItem) {
                (_a = this.contentEl) === null || _a === void 0 ? void 0 : _a.append(groupItem);
            }
        }
    }
}
exports.TagsView = TagsView;


/***/ }),

/***/ "./src/view/utils.ts":
/*!***************************!*\
  !*** ./src/view/utils.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.descComparator = exports.ascComparator = void 0;
/**
 * Criteria for ascending date order
 * Dateless elements are pushed to the bottom
 * @param {ToDoItem} a an item
 * @param {ToDoItem} b an item
 * @return {number} values expected by comparable
 */
function ascComparator(a, b) {
    const dateA = Date.parse((a === null || a === void 0 ? void 0 : a.deadline) || '');
    const dateB = Date.parse((b === null || b === void 0 ? void 0 : b.deadline) || '');
    /**
     * a < b -> -1
     * a > b -> 1
     * a = b -> 0
     */
    if (dateA && dateB) {
        if (dateA < dateB) {
            return -1;
        }
        else if (dateA > dateB) {
            return 1;
        }
        return 0;
    }
    else if (!dateA && dateB) {
        return 1;
    }
    else if (dateA && !dateB) {
        return -1;
    }
    return 0;
}
exports.ascComparator = ascComparator;
/**
 * Criteria for descending date order
 * Dateless elements are pushed to the bottom.
 *
 * @param {ToDoItem} a an item
 * @param {ToDoItem} b an item
 * @return {number} values expected by comparable
 */
function descComparator(a, b) {
    const dateA = Date.parse((a === null || a === void 0 ? void 0 : a.deadline) || '');
    const dateB = Date.parse((b === null || b === void 0 ? void 0 : b.deadline) || '');
    if (dateA && dateB) {
        if (dateA < dateB) {
            return 1;
        }
        else if (dateA > dateB) {
            return -1;
        }
        return 0;
    }
    else if (!dateA && dateB) {
        return 1;
    }
    else if (dateA && !dateB) {
        return -1;
    }
    return 0;
}
exports.descComparator = descComparator;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const main_1 = __webpack_require__(/*! ./controller/main */ "./src/controller/main.ts");
(0, main_1.start)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCOzs7Ozs7O1VDaEV0QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWUsbUJBQU8sQ0FBQyxtREFBbUI7QUFDMUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWNsaWVudC8uL3NyYy9jb250cm9sbGVyL2FkZC50cyIsIndlYnBhY2s6Ly90b2RvLWNsaWVudC8uL3NyYy9jb250cm9sbGVyL2VkaXQudHMiLCJ3ZWJwYWNrOi8vdG9kby1jbGllbnQvLi9zcmMvY29udHJvbGxlci9tYWluLnRzIiwid2VicGFjazovL3RvZG8tY2xpZW50Ly4vc3JjL21vZGVsLnRzIiwid2VicGFjazovL3RvZG8tY2xpZW50Ly4vc3JjL3ZpZXcvYWN0aW9uLWJ1dHRvbi12aWV3LnRzIiwid2VicGFjazovL3RvZG8tY2xpZW50Ly4vc3JjL3ZpZXcvYWRkLXZpZXcudHMiLCJ3ZWJwYWNrOi8vdG9kby1jbGllbnQvLi9zcmMvdmlldy9jb21wb25lbnRzLnRzIiwid2VicGFjazovL3RvZG8tY2xpZW50Ly4vc3JjL3ZpZXcvZWRpdC12aWV3LnRzIiwid2VicGFjazovL3RvZG8tY2xpZW50Ly4vc3JjL3ZpZXcvbGlzdHZpZXcudHMiLCJ3ZWJwYWNrOi8vdG9kby1jbGllbnQvLi9zcmMvdmlldy9uZXdlc3Qtdmlldy50cyIsIndlYnBhY2s6Ly90b2RvLWNsaWVudC8uL3NyYy92aWV3L25vdGlmaWNhdGlvbi12aWV3LnRzIiwid2VicGFjazovL3RvZG8tY2xpZW50Ly4vc3JjL3ZpZXcvb2xkZXN0LXZpZXcudHMiLCJ3ZWJwYWNrOi8vdG9kby1jbGllbnQvLi9zcmMvdmlldy9yZW1vdmUtdmlldy50cyIsIndlYnBhY2s6Ly90b2RvLWNsaWVudC8uL3NyYy92aWV3L3RhYi12aWV3LnRzIiwid2VicGFjazovL3RvZG8tY2xpZW50Ly4vc3JjL3ZpZXcvdGFncy12aWV3LnRzIiwid2VicGFjazovL3RvZG8tY2xpZW50Ly4vc3JjL3ZpZXcvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vdG9kby1jbGllbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1jbGllbnQvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0QWRkVmlldyA9IHZvaWQgMDtcbmNvbnN0IGNvbXBvbmVudHNfMSA9IHJlcXVpcmUoXCIuLi92aWV3L2NvbXBvbmVudHNcIik7XG5jb25zdCBtYWluXzEgPSByZXF1aXJlKFwiLi9tYWluXCIpO1xuLyoqXG4gKiBDb25maWd1cmUgdGhlIEFkZFZpZXcuXG4gKi9cbmZ1bmN0aW9uIGluaXRBZGRWaWV3KCkge1xuICAgIHZhciBfYSwgX2I7XG4gICAgY29uc3QgbW9kYWxUaXRsZUVsID0gKF9hID0gY29tcG9uZW50c18xLmFkZFZpZXcuY29udGFpbmVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnlTZWxlY3RvcignLm1vZGFsLXRpdGxlJyk7XG4gICAgKF9iID0gY29tcG9uZW50c18xLmFkZFZpZXcuZm9ybSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFzeW5jIGZ1bmN0aW9uIChldikge1xuICAgICAgICBpZiAobW9kYWxUaXRsZUVsLnRleHRDb250ZW50ID09ICdBZGQgaXRlbScpIHtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb21wb25lbnRzXzEuYWRkVmlldy5kaXNhYmxlKCk7XG4gICAgICAgICAgICBhd2FpdCBoYW5kbGVBZGQoKTtcbiAgICAgICAgICAgIGNvbXBvbmVudHNfMS5hZGRWaWV3LmVuYWJsZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmluaXRBZGRWaWV3ID0gaW5pdEFkZFZpZXc7XG4vKipcbiAqIEhhbmRsZSB0aGUgY2xpY2sgZXZlbnQgaW4gdGhlIEFkZFZpZXcuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUFkZCgpIHtcbiAgICBjb25zdCBuZXdJdGVtID0gY29tcG9uZW50c18xLmFkZFZpZXcucGFyc2UoKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBzdGF0dXMgPSBhd2FpdCBtYWluXzEuZGFvLmluc2VydChuZXdJdGVtKTtcbiAgICAgICAgaWYgKHN0YXR1cykge1xuICAgICAgICAgICAgY29tcG9uZW50c18xLm5vdGlmaWNhdGlvblZpZXcuc3VjY2VzcygnVG9EbyBpdGVtIGluc2VydGVkJyk7XG4gICAgICAgICAgICAoMCwgbWFpbl8xLnJlZnJlc2hBY3RpdmVWaWV3KSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29tcG9uZW50c18xLm5vdGlmaWNhdGlvblZpZXcuZXJyb3IoJ0ZhaWxlZCB0byBpbnNlcnQgVG9EbyBpdGVtJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBwcm9jZXNzIGFkZCBvcGVyYXRpb24nKTtcbiAgICAgICAgY29tcG9uZW50c18xLm5vdGlmaWNhdGlvblZpZXcuZXJyb3IoJ0ZhaWxlZCB0byBpbnNlcnQgVG9EbyBpdGVtJyk7XG4gICAgfVxuICAgIGNvbXBvbmVudHNfMS5hZGRWaWV3LmRpc21pc3MoKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0RWRpdFZpZXcgPSB2b2lkIDA7XG5jb25zdCBjb21wb25lbnRzXzEgPSByZXF1aXJlKFwiLi4vdmlldy9jb21wb25lbnRzXCIpO1xuY29uc3QgbWFpbl8xID0gcmVxdWlyZShcIi4vbWFpblwiKTtcbi8qKlxuICogQ29uZmlndXJlIHRoZSBlZGl0Vmlldy5cbiAqL1xuZnVuY3Rpb24gaW5pdEVkaXRWaWV3KCkge1xuICAgIHZhciBfYSwgX2I7XG4gICAgY29uc3QgbW9kYWxUaXRsZUVsID0gKF9hID0gY29tcG9uZW50c18xLmVkaXRWaWV3LmNvbnRhaW5lcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10aXRsZScpO1xuICAgIChfYiA9IGNvbXBvbmVudHNfMS5lZGl0Vmlldy5mb3JtKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgIGlmIChtb2RhbFRpdGxlRWwudGV4dENvbnRlbnQgPT0gJ0VkaXQgaXRlbScpIHtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb21wb25lbnRzXzEuZWRpdFZpZXcuZGlzYWJsZSgpO1xuICAgICAgICAgICAgYXdhaXQgaGFuZGxlVXBkYXRlKCk7XG4gICAgICAgICAgICBjb21wb25lbnRzXzEuZWRpdFZpZXcuZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuaW5pdEVkaXRWaWV3ID0gaW5pdEVkaXRWaWV3O1xuLyoqXG4gKiBIYW5kbGUgdGhlIGNsaWNrIGV2ZW50IGluIHRoZSBlZGl0Vmlldy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gaGFuZGxlVXBkYXRlKCkge1xuICAgIGNvbnN0IG5ld0l0ZW0gPSBjb21wb25lbnRzXzEuZWRpdFZpZXcucGFyc2UoKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBzdGF0dXMgPSBhd2FpdCBtYWluXzEuZGFvLnVwZGF0ZShuZXdJdGVtKTtcbiAgICAgICAgaWYgKHN0YXR1cykge1xuICAgICAgICAgICAgY29tcG9uZW50c18xLm5vdGlmaWNhdGlvblZpZXcuc3VjY2VzcygnVG9EbyBpdGVtIHVwZGF0ZWQhJyk7XG4gICAgICAgICAgICAoMCwgbWFpbl8xLnJlZnJlc2hBY3RpdmVWaWV3KSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29tcG9uZW50c18xLm5vdGlmaWNhdGlvblZpZXcuZXJyb3IoJ0ZhaWxlZCB0byBpbnNlcnQgVG9EbyBpdGVtJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBwcm9jZXNzIGFkZCBvcGVyYXRpb24nKTtcbiAgICAgICAgY29tcG9uZW50c18xLm5vdGlmaWNhdGlvblZpZXcuZXJyb3IoJ0ZhaWxlZCB0byBpbnNlcnQgVG9EbyBpdGVtJyk7XG4gICAgfVxuICAgIGNvbXBvbmVudHNfMS5lZGl0Vmlldy5kaXNtaXNzKCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3RhcnQgPSBleHBvcnRzLnJlZnJlc2hBY3RpdmVWaWV3ID0gZXhwb3J0cy5kYW8gPSB2b2lkIDA7XG5jb25zdCBtb2RlbF8xID0gcmVxdWlyZShcIi4uL21vZGVsXCIpO1xuY29uc3QgY29tcG9uZW50c18xID0gcmVxdWlyZShcIi4uL3ZpZXcvY29tcG9uZW50c1wiKTtcbmNvbnN0IGFkZF8xID0gcmVxdWlyZShcIi4vYWRkXCIpO1xuY29uc3QgZWRpdF8xID0gcmVxdWlyZShcIi4vZWRpdFwiKTtcbmV4cG9ydHMuZGFvID0gbmV3IG1vZGVsXzEuVG9Eb0l0ZW1EQU8oKTtcbmNvbnN0IGdldEFjdGl2ZVZpZXcgPSAoKSA9PiBjb21wb25lbnRzXzEuZHluYW1pY1ZpZXdzLmZpbHRlcigodikgPT4gdi5pc0FjdGl2ZSgpKVswXTtcbi8qKlxuICogQWRkIGV2ZW50IGxpc3RlbmVycyBpbiBhbGwgZHluYW1pYyB2aWV3cy5cbiAqL1xuZnVuY3Rpb24gaW5pdER5bmFtaWNWaWV3cygpIHtcbiAgICBjb21wb25lbnRzXzEuZHluYW1pY1ZpZXdzLmZvckVhY2goKHZpZXcpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKF9hID0gdmlldy50YWJFbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFkZEV2ZW50TGlzdGVuZXIoJ3Nob3cuYnMudGFiJywgcmVmcmVzaEFjdGl2ZVZpZXcpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBSZWZyZXNoIHRoZSBhY3RpdmUgZHluYW1pYyB2aWV3LlxuICovXG5mdW5jdGlvbiByZWZyZXNoQWN0aXZlVmlldygpIHtcbiAgICBleHBvcnRzLmRhby5saXN0QWxsKClcbiAgICAgICAgLnRoZW4oKGl0ZW1zKSA9PiBnZXRBY3RpdmVWaWV3KCkucmVuZGVyKGl0ZW1zKSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb21wb25lbnRzXzEubm90aWZpY2F0aW9uVmlldy5lcnJvcignRmFpbGVkIHRvIGxvYWQgZGF0YSBmcm9tIHRoZSBzZXJ2ZXInKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSk7XG59XG5leHBvcnRzLnJlZnJlc2hBY3RpdmVWaWV3ID0gcmVmcmVzaEFjdGl2ZVZpZXc7XG4vKipcbiAqIEFkZCBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHRvb2xiYXIgYnV0dG9ucy5cbiAqL1xuZnVuY3Rpb24gaW5pdFRvb2xiYXIoKSB7XG4gICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgKF9hID0gY29tcG9uZW50c18xLmFkZEJ0blZpZXcuY29udGFpbmVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjb21wb25lbnRzXzEuYWRkVmlldy5yZW5kZXIoKSk7XG4gICAgKF9iID0gY29tcG9uZW50c18xLnJlbW92ZUJ0blZpZXcuY29udGFpbmVyKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBoYW5kbGVSZW1vdmUoKSk7XG4gICAgKF9jID0gY29tcG9uZW50c18xLmVkaXRCdG5WaWV3LmNvbnRhaW5lcikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gaGFuZGxlRWRpdCgpKTtcbn1cbi8qKlxuICogU3RhcnQgdGhlIGNvbnRyb2xsZXIuXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIGluaXRUb29sYmFyKCk7XG4gICAgaW5pdER5bmFtaWNWaWV3cygpO1xuICAgICgwLCBhZGRfMS5pbml0QWRkVmlldykoKTtcbiAgICAoMCwgZWRpdF8xLmluaXRFZGl0VmlldykoKTtcbiAgICByZWZyZXNoQWN0aXZlVmlldygpO1xufVxuZXhwb3J0cy5zdGFydCA9IHN0YXJ0O1xuLyoqXG4gKiBIYW5kbGUgdGhlIGNsaWNrIGV2ZW50IGluIHRoZSBSZW1vdmVWaWV3LlxuICovXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVSZW1vdmUoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW1zU2VsZWN0ZWQgPSBjb21wb25lbnRzXzEucmVtb3ZlVmlldy5yZW1vdmVTZWxlY3RlZEl0ZW1zKCk7XG4gICAgICAgIGxpc3RJdGVtc1NlbGVjdGVkLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBleHBvcnRzLmRhby5yZW1vdmVCeUlkKGl0ZW0uaWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29tcG9uZW50c18xLm5vdGlmaWNhdGlvblZpZXcuc3VjY2VzcygnVG9EbyBpdGVtKHMpIHJlbW92ZWQgc3VjY2Vzc2Z1bGx5IScpO1xuICAgICAgICByZWZyZXNoQWN0aXZlVmlldygpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHJlbW92ZSBpdGVtcycpO1xuICAgICAgICBjb21wb25lbnRzXzEubm90aWZpY2F0aW9uVmlldy5lcnJvcignRmFpbGVkIHRvIHJlbW92ZSBUb0RvIGl0ZW1zJyk7XG4gICAgfVxufVxuLyoqXG4gKiBIYW5kbGUgdGhlIGNsaWNrIGV2ZW50IGluIHRoZSBFZGl0Vmlldy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gaGFuZGxlRWRpdCgpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gY29tcG9uZW50c18xLmVkaXRWaWV3LmdldFNlbGVjdGVkSXRlbXMoKTsgLy8gR2V0IHRoZSBzZWxlY3RlZCBpdGVtc1xuICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIC8vIElmIG9ubHkgb25lIGl0ZW0gaXMgc2VsZWN0ZWQsIHNob3cgdGhlIGVkaXQgbW9kYWwgd2l0aCB0aGUgc2VsZWN0ZWQgaXRlbSdzIGRhdGFcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHNlbGVjdGVkSXRlbXNbMF07XG4gICAgICAgICAgICBjb21wb25lbnRzXzEuZWRpdFZpZXcucmVuZGVyKHNlbGVjdGVkSXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb21wb25lbnRzXzEubm90aWZpY2F0aW9uVmlldy5lcnJvcignUGxlYXNlIHNlbGVjdCBvbmUgaXRlbSB0byBlZGl0LicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZWRpdCBpdGVtJyk7XG4gICAgICAgIGNvbXBvbmVudHNfMS5ub3RpZmljYXRpb25WaWV3LmVycm9yKCdGYWlsZWQgdG8gZWRpdCBUb0RvIGl0ZW0nKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVG9Eb0l0ZW1EQU8gPSB2b2lkIDA7XG5jb25zdCByYSA9ICcxMTIwMTgxMTg2MSc7IC8vIFRPRE86IGluY2x1aXIgc2V1IFJBXG5jb25zdCBob3N0ID0gJ2h0dHBzOi8vdG9kby1zZXJ2ZXItc3BhLW96eXEycWh4cXEtcmouYS5ydW4uYXBwL2FwaSc7XG4vKipcbiAqIEEgREFPIGZvciBUb0RvSXRlbSdzLlxuICovXG5jbGFzcyBUb0RvSXRlbURBTyB7XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgYW4gaXRlbS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VG9Eb0l0ZW19IGl0ZW0gdGhlIGl0ZW1cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBpdGVtIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBpc0l0ZW1WYWxpZChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtLmRlc2NyaXB0aW9uLmxlbmd0aCA+IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpc3QgYWxsIGl0ZW1zLlxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxUb0RvSXRlbVtdPn0gdGhlIGl0ZW1zIGFzIGEgUHJvbWlzZVxuICAgICAqL1xuICAgIGFzeW5jIGxpc3RBbGwoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke2hvc3R9LyR7cmF9L2xpc3RgKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHJldHVybiAoYXdhaXQgcmVzcG9uc2UuanNvbigpKS5pdGVtcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NlcnZlciBzdGF0dXM6ICcgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGF3YWl0IHJlc3BvbnNlLmpzb24oKSkpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZXJ2ZXItc2lkZSBlcnJvci4gRmFpbGVkIHRvIGxpc3QnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBsaXN0IGVsZW1lbnRzJyk7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnQgYW4gaXRlbS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VG9Eb0l0ZW19IGl0ZW0gdGhlIGl0ZW1cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBhIHByb21pc2UgZm9yIHRydWUsIGlmIHRoZSBvcGVyYXRpb25cbiAgICAgKiAgd2FzIHN1Y2Nlc3NmdWxsLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBhc3luYyBpbnNlcnQoaXRlbSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtob3N0fS8ke3JhfS9hZGRgLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignU2VydmVyLXNpZGUgZXJyb3IuIEZhaWxlZCB0byBpbnNlcnQuJyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdTZXJ2ZXIgc3RhdHVzOiAnICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShhd2FpdCByZXNwb25zZS5qc29uKCkpKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBpbnNlcnQgZWxlbWVudCcpO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFuIGl0ZW0gYnkgSUQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaWQgdGhlIElEIG9mIHRoZSBpdGVtIHRvIGJlIHJlbW92ZWRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPGJvb2xlYW4+fSBhIHByb21pc2UgZm9yIHRydWUsIGlmIHRoZSBvcGVyYXRpb24gd2FzIHN1Y2Nlc3NmdWwsIGZhbHNlIG90aGVyd2lzZVxuICAgICAqL1xuICAgIGFzeW5jIHJlbW92ZUJ5SWQoaWQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7aG9zdH0vJHtyYX0vcmVtb3ZlLyR7aWR9YCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignU2VydmVyLXNpZGUgZXJyb3IuIEZhaWxlZCB0byByZW1vdmUuJyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdTZXJ2ZXIgc3RhdHVzOiAnICsgSlNPTi5zdHJpbmdpZnkoYXdhaXQgcmVzcG9uc2UuanNvbigpKSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gcmVtb3ZlIGVsZW1lbnQnKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhbiBpdGVtLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtUb0RvSXRlbX0gaXRlbSB0aGUgdXBkYXRlZCBpdGVtXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxib29sZWFuPn0gYSBwcm9taXNlIGZvciB0cnVlLCBpZiB0aGUgb3BlcmF0aW9uIHdhcyBzdWNjZXNzZnVsLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGUoaXRlbSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJdGVtVmFsaWQoaXRlbSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ludmFsaWQgaXRlbS4gRGVzY3JpcHRpb24gY2Fubm90IGJlIGVtcHR5Jyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7aG9zdH0vJHtyYX0vdXBkYXRlYCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NlcnZlci1zaWRlIGVycm9yLiBGYWlsZWQgdG8gdXBkYXRlLicpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignU2VydmVyIHN0YXR1czogJyArIEpTT04uc3RyaW5naWZ5KGF3YWl0IHJlc3BvbnNlLmpzb24oKSkpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHVwZGF0ZSBlbGVtZW50Jyk7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuVG9Eb0l0ZW1EQU8gPSBUb0RvSXRlbURBTztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BY3Rpb25CdXR0b25WaWV3ID0gdm9pZCAwO1xuLyoqXG4gKiBBIHZpZXcgbW9kZWxpbmcgYSBidXR0b24gZnJvbSB0aGUgdG9vbGJhci5cbiAqL1xuY2xhc3MgQWN0aW9uQnV0dG9uVmlldyB7XG4gICAgLyoqXG4gICAgICogQnVpbGQgYSBidXR0b24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05FbGVtZW50fSBjb250YWluZXIgdGhlIGJ1dHRvbiBjb250YWluZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERvIG5vdGhpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3Vua25vd259IGFyZ3MgdGhlIGFyZ3NcbiAgICAgKi9cbiAgICByZW5kZXIoYXJncykge1xuICAgICAgICBhcmdzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbmFibGUgdGhlIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5jb250YWluZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlIHRoZSBidXR0b24uXG4gICAgICovXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAoX2EgPSB0aGlzLmNvbnRhaW5lcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgfVxufVxuZXhwb3J0cy5BY3Rpb25CdXR0b25WaWV3ID0gQWN0aW9uQnV0dG9uVmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BZGRWaWV3ID0gdm9pZCAwO1xuLyoqXG4gKiBBIHZpZXcgaG9sZGluZyB0aGUgbW9kYWwgZGlhbG9nIGZvcm0uXG4gKi9cbmNsYXNzIEFkZFZpZXcge1xuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS1tb2RhbCcpO1xuICAgICAgICB0aGlzLm1vZGFsUmVmID0gbmV3IGJvb3RzdHJhcC5Nb2RhbCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuZm9ybSA9IChfYSA9IHRoaXMuY29udGFpbmVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnlTZWxlY3RvcignI2l0ZW0tZm9ybScpO1xuICAgICAgICAoX2IgPSB0aGlzLmNvbnRhaW5lcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFkZEV2ZW50TGlzdGVuZXIoJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHRoaXMuZm9ybS5yZXNldCgpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGFyc2UgYSBmb3JtIGFzIFRvRG9JdGVtLlxuICAgICAqXG4gICAgICogQHJldHVybiB7VG9Eb0l0ZW19IHRoZSBUb2RvSXRlbVxuICAgICAqL1xuICAgIHBhcnNlKCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgY29uc3QgaWRFbCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCcjaWQnKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb25FbCA9IChfYSA9IHRoaXMuZm9ybSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xuICAgICAgICBjb25zdCB0YWdzRWwgPSAoX2IgPSB0aGlzLmZvcm0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5xdWVyeVNlbGVjdG9yKCcjdGFncycpO1xuICAgICAgICBjb25zdCBkZWFkbGluZUVsID0gKF9jID0gdGhpcy5mb3JtKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucXVlcnlTZWxlY3RvcignI2RlYWRsaW5lJyk7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW0gPSB7XG4gICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbkVsLnZhbHVlLFxuICAgICAgICB9O1xuICAgICAgICBuZXdJdGVtLmlkID0gcGFyc2VJbnQoaWRFbC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgfHwgJycpO1xuICAgICAgICBuZXdJdGVtLnRhZ3MgPSB0YWdzRWwgPT09IG51bGwgfHwgdGFnc0VsID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0YWdzRWwudmFsdWUuc3BsaXQoJywnKS5tYXAoKHMpID0+IHMudHJpbSgpKS5maWx0ZXIoKHMpID0+IHMubGVuZ3RoID4gMCk7XG4gICAgICAgIG5ld0l0ZW0uZGVhZGxpbmUgPSAoZGVhZGxpbmVFbCA9PT0gbnVsbCB8fCBkZWFkbGluZUVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWFkbGluZUVsLnZhbHVlKSB8fCAnJztcbiAgICAgICAgcmV0dXJuIG5ld0l0ZW07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciB0aGUgbW9kYWwuXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IG1vZGFsVGl0bGVFbCA9IChfYSA9IHRoaXMuY29udGFpbmVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnlTZWxlY3RvcignLm1vZGFsLXRpdGxlJyk7XG4gICAgICAgIGlmIChtb2RhbFRpdGxlRWwgPT09IG51bGwgfHwgbW9kYWxUaXRsZUVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2RhbFRpdGxlRWwudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgIG1vZGFsVGl0bGVFbC50ZXh0Q29udGVudCA9ICdBZGQgaXRlbSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2RhbFJlZi5zaG93KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc2FibGUgYWxsIGZpZWxkcyBpbiB0aGUgZm9ybS5cbiAgICAgKi9cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIChfYSA9IHRoaXMuY29udGFpbmVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnlTZWxlY3RvckFsbCgnLml0ZW0tZm9ybS1maWVsZCcpLmZvckVhY2goKGZpZWxkKSA9PiBmaWVsZC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5hYmxlIGFsbCBmaWVsZHMgaW4gdGhlIGZvcm0uXG4gICAgICovXG4gICAgZW5hYmxlKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIChfYSA9IHRoaXMuY29udGFpbmVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnlTZWxlY3RvckFsbCgnLml0ZW0tZm9ybS1maWVsZCcpLmZvckVhY2goKGZpZWxkKSA9PiBmaWVsZC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNtaXNzIHRoZSBtb2RhbC5cbiAgICAgKi9cbiAgICBkaXNtaXNzKCkge1xuICAgICAgICB0aGlzLm1vZGFsUmVmLmhpZGUoKTtcbiAgICB9XG59XG5leHBvcnRzLkFkZFZpZXcgPSBBZGRWaWV3O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmR5bmFtaWNWaWV3cyA9IGV4cG9ydHMubm90aWZpY2F0aW9uVmlldyA9IGV4cG9ydHMuZWRpdEJ0blZpZXcgPSBleHBvcnRzLnJlbW92ZUJ0blZpZXcgPSBleHBvcnRzLmFkZEJ0blZpZXcgPSBleHBvcnRzLnJlbW92ZVZpZXcgPSBleHBvcnRzLmVkaXRWaWV3ID0gZXhwb3J0cy5hZGRWaWV3ID0gZXhwb3J0cy50YWdzVmlldyA9IGV4cG9ydHMub2xkZXN0VmlldyA9IGV4cG9ydHMubmV3ZXN0VmlldyA9IHZvaWQgMDtcbmNvbnN0IGFjdGlvbl9idXR0b25fdmlld18xID0gcmVxdWlyZShcIi4vYWN0aW9uLWJ1dHRvbi12aWV3XCIpO1xuY29uc3QgYWRkX3ZpZXdfMSA9IHJlcXVpcmUoXCIuL2FkZC12aWV3XCIpO1xuY29uc3QgZWRpdF92aWV3XzEgPSByZXF1aXJlKFwiLi9lZGl0LXZpZXdcIik7XG5jb25zdCByZW1vdmVfdmlld18xID0gcmVxdWlyZShcIi4vcmVtb3ZlLXZpZXdcIik7XG5jb25zdCBuZXdlc3Rfdmlld18xID0gcmVxdWlyZShcIi4vbmV3ZXN0LXZpZXdcIik7XG5jb25zdCBub3RpZmljYXRpb25fdmlld18xID0gcmVxdWlyZShcIi4vbm90aWZpY2F0aW9uLXZpZXdcIik7XG5jb25zdCBvbGRlc3Rfdmlld18xID0gcmVxdWlyZShcIi4vb2xkZXN0LXZpZXdcIik7XG5jb25zdCB0YWdzX3ZpZXdfMSA9IHJlcXVpcmUoXCIuL3RhZ3Mtdmlld1wiKTtcbmV4cG9ydHMubmV3ZXN0VmlldyA9IG5ldyBuZXdlc3Rfdmlld18xLk5ld2VzdFZpZXcoKTtcbmV4cG9ydHMub2xkZXN0VmlldyA9IG5ldyBvbGRlc3Rfdmlld18xLk9sZGVzdFZpZXcoKTtcbmV4cG9ydHMudGFnc1ZpZXcgPSBuZXcgdGFnc192aWV3XzEuVGFnc1ZpZXcoKTtcbmV4cG9ydHMuYWRkVmlldyA9IG5ldyBhZGRfdmlld18xLkFkZFZpZXcoKTtcbmV4cG9ydHMuZWRpdFZpZXcgPSBuZXcgZWRpdF92aWV3XzEuRWRpdFZpZXcoKTtcbmV4cG9ydHMucmVtb3ZlVmlldyA9IG5ldyByZW1vdmVfdmlld18xLlJlbW92ZVZpZXcoKTtcbmV4cG9ydHMuYWRkQnRuVmlldyA9IG5ldyBhY3Rpb25fYnV0dG9uX3ZpZXdfMS5BY3Rpb25CdXR0b25WaWV3KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tYWRkJykpO1xuZXhwb3J0cy5yZW1vdmVCdG5WaWV3ID0gbmV3IGFjdGlvbl9idXR0b25fdmlld18xLkFjdGlvbkJ1dHRvblZpZXcoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1yZW1vdmUnKSk7XG5leHBvcnRzLmVkaXRCdG5WaWV3ID0gbmV3IGFjdGlvbl9idXR0b25fdmlld18xLkFjdGlvbkJ1dHRvblZpZXcoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1lZGl0JykpO1xuZXhwb3J0cy5ub3RpZmljYXRpb25WaWV3ID0gbmV3IG5vdGlmaWNhdGlvbl92aWV3XzEuTm90aWZpY2F0aW9uVmlldygpO1xuZXhwb3J0cy5keW5hbWljVmlld3MgPSBbZXhwb3J0cy5uZXdlc3RWaWV3LCBleHBvcnRzLm9sZGVzdFZpZXcsIGV4cG9ydHMudGFnc1ZpZXddO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkVkaXRWaWV3ID0gdm9pZCAwO1xuLyoqXG4gKiBBIHZpZXcgaG9sZGluZyB0aGUgZWRpdCBtb2RhbCBkaWFsb2cgZm9ybS5cbiAqL1xuY2xhc3MgRWRpdFZpZXcge1xuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS1tb2RhbCcpO1xuICAgICAgICB0aGlzLm1vZGFsUmVmID0gbmV3IGJvb3RzdHJhcC5Nb2RhbCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuZm9ybSA9IChfYSA9IHRoaXMuY29udGFpbmVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnlTZWxlY3RvcignI2l0ZW0tZm9ybScpO1xuICAgICAgICAoX2IgPSB0aGlzLmNvbnRhaW5lcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFkZEV2ZW50TGlzdGVuZXIoJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHRoaXMuZm9ybS5yZXNldCgpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGFyc2UgYSBmb3JtIGFzIFRvRG9JdGVtLlxuICAgICAqXG4gICAgICogQHJldHVybiB7VG9Eb0l0ZW19IHRoZSBUb2RvSXRlbVxuICAgICAqL1xuICAgIHBhcnNlKCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgY29uc3QgaWRFbCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCcjaWQnKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb25FbCA9IChfYSA9IHRoaXMuZm9ybSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xuICAgICAgICBjb25zdCB0YWdzRWwgPSAoX2IgPSB0aGlzLmZvcm0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5xdWVyeVNlbGVjdG9yKCcjdGFncycpO1xuICAgICAgICBjb25zdCBkZWFkbGluZUVsID0gKF9jID0gdGhpcy5mb3JtKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucXVlcnlTZWxlY3RvcignI2RlYWRsaW5lJyk7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW0gPSB7XG4gICAgICAgICAgICBpZDogaWRFbC52YWx1ZSA/IHBhcnNlSW50KGlkRWwudmFsdWUpIDogMCxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbkVsLnZhbHVlLFxuICAgICAgICB9O1xuICAgICAgICBuZXdJdGVtLmlkID0gcGFyc2VJbnQoaWRFbC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgfHwgJycpO1xuICAgICAgICBuZXdJdGVtLnRhZ3MgPSB0YWdzRWwgPT09IG51bGwgfHwgdGFnc0VsID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0YWdzRWwudmFsdWUuc3BsaXQoJywnKS5tYXAoKHMpID0+IHMudHJpbSgpKS5maWx0ZXIoKHMpID0+IHMubGVuZ3RoID4gMCk7XG4gICAgICAgIG5ld0l0ZW0uZGVhZGxpbmUgPSAoZGVhZGxpbmVFbCA9PT0gbnVsbCB8fCBkZWFkbGluZUVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWFkbGluZUVsLnZhbHVlKSB8fCAnJztcbiAgICAgICAgcmV0dXJuIG5ld0l0ZW07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciB0aGUgZWRpdCBtb2RhbC5cbiAgICAgKiBAcGFyYW0ge1RvRG9JdGVtfSBpdGVtIC0gVGhlIGl0ZW0gdG8gYmUgZWRpdGVkLlxuICAgICAqL1xuICAgIHJlbmRlcihpdGVtKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgbW9kYWxUaXRsZUVsID0gKF9hID0gdGhpcy5jb250YWluZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGl0bGUnKTtcbiAgICAgICAgaWYgKG1vZGFsVGl0bGVFbCA9PT0gbnVsbCB8fCBtb2RhbFRpdGxlRWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vZGFsVGl0bGVFbC50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgbW9kYWxUaXRsZUVsLnRleHRDb250ZW50ID0gJ0VkaXQgaXRlbSc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRmlsbCB0aGUgZm9ybSBmaWVsZHMgd2l0aCB0aGUgZGF0YSBvZiB0aGUgc2VsZWN0ZWQgaXRlbSBmb3IgZWRpdGluZ1xuICAgICAgICBjb25zdCBpZEVsID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJyNpZCcpO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkVsID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xuICAgICAgICBjb25zdCB0YWdzRWwgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignI3RhZ3MnKTtcbiAgICAgICAgY29uc3QgZGVhZGxpbmVFbCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCcjZGVhZGxpbmUnKTtcbiAgICAgICAgaWRFbC52YWx1ZSA9IGl0ZW0uaWQudG9TdHJpbmcoKTtcbiAgICAgICAgZGVzY3JpcHRpb25FbC52YWx1ZSA9IGl0ZW0uZGVzY3JpcHRpb247XG4gICAgICAgIHRhZ3NFbC52YWx1ZSA9IGl0ZW0udGFncyA/IGl0ZW0udGFncy5qb2luKCcsICcpIDogJyc7XG4gICAgICAgIGRlYWRsaW5lRWwudmFsdWUgPSBpdGVtLmRlYWRsaW5lIHx8ICcnO1xuICAgICAgICB0aGlzLm1vZGFsUmVmLnNob3coKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzYWJsZSBhbGwgZmllbGRzIGluIHRoZSBmb3JtLlxuICAgICAqL1xuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5jb250YWluZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5xdWVyeVNlbGVjdG9yQWxsKCcuaXRlbS1mb3JtLWZpZWxkJykuZm9yRWFjaCgoZmllbGQpID0+IGZpZWxkLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJykpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbmFibGUgYWxsIGZpZWxkcyBpbiB0aGUgZm9ybS5cbiAgICAgKi9cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5jb250YWluZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5xdWVyeVNlbGVjdG9yQWxsKCcuaXRlbS1mb3JtLWZpZWxkJykuZm9yRWFjaCgoZmllbGQpID0+IGZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc21pc3MgdGhlIG1vZGFsLlxuICAgICAqL1xuICAgIGRpc21pc3MoKSB7XG4gICAgICAgIHRoaXMubW9kYWxSZWYuaGlkZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICogR2V0IHRoZSBzZWxlY3RlZCBpdGVtcyBmcm9tIHRoZSBsaXN0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7VG9Eb0l0ZW1bXX0gQW4gYXJyYXkgb2Ygc2VsZWN0ZWQgVG9Eb0l0ZW1zLlxuICAgKi9cbiAgICBnZXRTZWxlY3RlZEl0ZW1zKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQ2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJpdGVtLWNoZWNrXCJdOmNoZWNrZWQnKTtcbiAgICAgICAgc2VsZWN0ZWRDaGVja2JveGVzLmZvckVhY2goKGNoZWNrYm94KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGNoZWNrYm94LmNsb3Nlc3QoJy5saXN0LWdyb3VwLWl0ZW0nKTtcbiAgICAgICAgICAgIGNvbnN0IGlkRWwgPSBjaGVja2JveC5nZXRBdHRyaWJ1dGUoJ2xpc3QtaXRlbS1pZCcpO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb25FbCA9IGxpc3RJdGVtID09PSBudWxsIHx8IGxpc3RJdGVtID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCcubGlzdC1pdGVtLWRlc2MnKTtcbiAgICAgICAgICAgIGNvbnN0IHRhZ3NDb250YWluZXIgPSBsaXN0SXRlbSA9PT0gbnVsbCB8fCBsaXN0SXRlbSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLmJhZGdlLWNvbnRhaW5lcicpO1xuICAgICAgICAgICAgY29uc3QgdGFncyA9IHRhZ3NDb250YWluZXIgPyBBcnJheS5mcm9tKHRhZ3NDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QtaXRlbS1iYWRnZScpKSA6IFtdO1xuICAgICAgICAgICAgY29uc3QgZGVhZGxpbmVFbCA9IGxpc3RJdGVtID09PSBudWxsIHx8IGxpc3RJdGVtID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCcubGlzdC1pdGVtLWRlYWRsaW5lJyk7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGlkRWwgPyBwYXJzZUludChpZEVsKSA6IDA7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uRWwudGV4dENvbnRlbnQgfHwgJyc7XG4gICAgICAgICAgICBjb25zdCB0YWdMaXN0ID0gdGFncy5tYXAoKHRhZykgPT4gdGFnLnRleHRDb250ZW50IHx8ICcnKS5maWx0ZXIoKHRhZykgPT4gdGFnLnRyaW0oKSAhPT0gJycpO1xuICAgICAgICAgICAgY29uc3QgZGVhZGxpbmUgPSBkZWFkbGluZUVsLnRleHRDb250ZW50IHx8ICcnO1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIHRhZ3M6IHRhZ0xpc3QsXG4gICAgICAgICAgICAgICAgZGVhZGxpbmU6IGRlYWRsaW5lLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZEl0ZW1zO1xuICAgIH1cbn1cbmV4cG9ydHMuRWRpdFZpZXcgPSBFZGl0VmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5MaXN0VmlldyA9IHZvaWQgMDtcbmNvbnN0IHRhYl92aWV3XzEgPSByZXF1aXJlKFwiLi90YWItdmlld1wiKTtcbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgcmVwcmVzZW50aW5nIGFueSBsaXN0IHZpZXcuXG4gKi9cbmNsYXNzIExpc3RWaWV3IGV4dGVuZHMgdGFiX3ZpZXdfMS5UYWJWaWV3IHtcbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05FbGVtZW50fSB0YWJFbCB0aGUgdGFiIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge05FbGVtZW50fSBjb250ZW50RWwgdGhlIGNvbnRlbnQgZWxlbWVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRhYkVsLCBjb250ZW50RWwpIHtcbiAgICAgICAgc3VwZXIodGFiRWwsIGNvbnRlbnRFbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciB0aGUgbGlzdCB2aWV3LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtUb0RvSXRlbVtdfSBpdGVtcyB0aGUgaXRlbXNcbiAgICAgKi9cbiAgICByZW5kZXIoaXRlbXMpIHtcbiAgICAgICAgaXRlbXMuc29ydCh0aGlzLmNvbXBhcmUpO1xuICAgICAgICB0aGlzLmNsZWFyQ29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMuYnVpbGRJdGVtTGlzdChpdGVtcywgdGhpcy5jb250ZW50RWwsIHRydWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuTGlzdFZpZXcgPSBMaXN0VmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5OZXdlc3RWaWV3ID0gdm9pZCAwO1xuY29uc3QgbGlzdHZpZXdfMSA9IHJlcXVpcmUoXCIuL2xpc3R2aWV3XCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuLyoqXG4gKiBMaXN0IHRoZSBpdGVtcyBpbiBkYXRlLWRlc2NlbmRpbmcgb3JkZXJcbiAqL1xuY2xhc3MgTmV3ZXN0VmlldyBleHRlbmRzIGxpc3R2aWV3XzEuTGlzdFZpZXcge1xuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld2VzdC10YWInKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld2VzdC1jb250ZW50JykpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wYXJlIHR3byBUb0RvSXRlbSdzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtUb0RvSXRlbX0gYSB0aGUgZmlyc3QgaXRlbVxuICAgICAqIEBwYXJhbSB7VG9Eb0l0ZW19IGIgdGhlIHNlY29uZCBpdGVtXG4gICAgICogQHJldHVybiB7bnVtYmVyfSAtMSwgMSBvciAwIGFjY29yZGluZyB0byBKUyBjb21wYXJpc29uIHJ1bGVzXG4gICAgICovXG4gICAgY29tcGFyZShhLCBiKSB7XG4gICAgICAgIHJldHVybiAoMCwgdXRpbHNfMS5kZXNjQ29tcGFyYXRvcikoYSwgYik7XG4gICAgfVxufVxuZXhwb3J0cy5OZXdlc3RWaWV3ID0gTmV3ZXN0VmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Ob3RpZmljYXRpb25WaWV3ID0gdm9pZCAwO1xudmFyIFRvYXN0U3R5bGU7XG4oZnVuY3Rpb24gKFRvYXN0U3R5bGUpIHtcbiAgICBUb2FzdFN0eWxlW1wic3VjY2Vzc1wiXSA9IFwiYmctc3VjY2Vzc1wiO1xuICAgIFRvYXN0U3R5bGVbXCJlcnJvclwiXSA9IFwiYmctZGFuZ2VyXCI7XG4gICAgVG9hc3RTdHlsZVtcImluZm9cIl0gPSBcImJnLXByaW1hcnlcIjtcbn0pKFRvYXN0U3R5bGUgfHwgKFRvYXN0U3R5bGUgPSB7fSkpO1xuLyoqXG4gKiBBIFZpZXcgcmVwcmVzZW50aW5nIGEgbm90aWZpY2F0aW9uLlxuICovXG5jbGFzcyBOb3RpZmljYXRpb25WaWV3IHtcbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudG9hc3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvYXN0Jyk7XG4gICAgICAgIHRoaXMudG9hc3QgPSBuZXcgYm9vdHN0cmFwLlRvYXN0KHRoaXMudG9hc3RFbGVtZW50KTtcbiAgICAgICAgdGhpcy5zZXRTdHlsZShUb2FzdFN0eWxlLnN1Y2Nlc3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIG5vdGlmaWNhdGlvbiBzdHlsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VG9hc3RTdHlsZX0gc3R5bGUgdGhlIHN0eWxlXG4gICAgICovXG4gICAgc2V0U3R5bGUoc3R5bGUpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICAoX2EgPSB0aGlzLnRvYXN0RWxlbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsYXNzTGlzdC5yZW1vdmUoVG9hc3RTdHlsZS5lcnJvcik7XG4gICAgICAgIChfYiA9IHRoaXMudG9hc3RFbGVtZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2xhc3NMaXN0LnJlbW92ZShUb2FzdFN0eWxlLmluZm8pO1xuICAgICAgICAoX2MgPSB0aGlzLnRvYXN0RWxlbWVudCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmNsYXNzTGlzdC5yZW1vdmUoVG9hc3RTdHlsZS5zdWNjZXNzKTtcbiAgICAgICAgKF9kID0gdGhpcy50b2FzdEVsZW1lbnQpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5jbGFzc0xpc3QuYWRkKHN0eWxlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHRoZSBub2ZpY2lhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIHRoZSBtZXNzYWdlXG4gICAgICovXG4gICAgcmVuZGVyKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBtZXNzYWdlTm9kZSA9IChfYSA9IHRoaXMudG9hc3RFbGVtZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnlTZWxlY3RvcignLnRvYXN0LWJvZHknKTtcbiAgICAgICAgaWYgKG1lc3NhZ2VOb2RlKSB7XG4gICAgICAgICAgICBtZXNzYWdlTm9kZS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB0aGlzLnRvYXN0LnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBOb3RpZnkgYSBzdWNjZXNzIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSB0aGUgbWVzc2FnZVxuICAgICAqL1xuICAgIHN1Y2Nlc3MobWVzc2FnZSkge1xuICAgICAgICB0aGlzLnNldFN0eWxlKFRvYXN0U3R5bGUuc3VjY2Vzcyk7XG4gICAgICAgIHRoaXMucmVuZGVyKG1lc3NhZ2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBOb3RpZnkgYW4gZXJyb3IgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIHRoZSBtZXNzYWdlXG4gICAgICovXG4gICAgZXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLnNldFN0eWxlKFRvYXN0U3R5bGUuZXJyb3IpO1xuICAgICAgICB0aGlzLnJlbmRlcihtZXNzYWdlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTm90aWZ5IGFuIGluZm8gbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIHRoZSBtZXNzYWdlXG4gICAgICovXG4gICAgaW5mbyhtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUoVG9hc3RTdHlsZS5pbmZvKTtcbiAgICAgICAgdGhpcy5yZW5kZXIobWVzc2FnZSk7XG4gICAgfVxufVxuZXhwb3J0cy5Ob3RpZmljYXRpb25WaWV3ID0gTm90aWZpY2F0aW9uVmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5PbGRlc3RWaWV3ID0gdm9pZCAwO1xuY29uc3QgbGlzdHZpZXdfMSA9IHJlcXVpcmUoXCIuL2xpc3R2aWV3XCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuLyoqXG4gKiBMaXN0IHRoZSBpdGVtcyBpbiBkYXRlLWFzY2VuZGluZyBvcmRlclxuICovXG5jbGFzcyBPbGRlc3RWaWV3IGV4dGVuZHMgbGlzdHZpZXdfMS5MaXN0VmlldyB7XG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb2xkZXN0LXRhYicpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb2xkZXN0LWNvbnRlbnQnKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXBhcmUgdHdvIGl0ZW1zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtUb0RvSXRlbX0gYSB0aGUgZmlyc3QgaXRlbVxuICAgICAqIEBwYXJhbSB7VG9Eb0l0ZW19IGIgdGhlIHNlY29uZCBpdGVtXG4gICAgICogQHJldHVybiB7bnVtYmVyfSAtMSwgMCwgMSBhY2NvcmRpbmcgdG8gSlMgcnVsZXNcbiAgICAgKi9cbiAgICBjb21wYXJlKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuICgwLCB1dGlsc18xLmFzY0NvbXBhcmF0b3IpKGEsIGIpO1xuICAgIH1cbn1cbmV4cG9ydHMuT2xkZXN0VmlldyA9IE9sZGVzdFZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUmVtb3ZlVmlldyA9IHZvaWQgMDtcbi8qKlxuICogQSBWaWV3IHJlcHJlc2VudGluZyB0aGUgcmVtb3ZlIHZpZXcuXG4gKi9cbmNsYXNzIFJlbW92ZVZpZXcge1xuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS1tb2RhbCcpO1xuICAgICAgICB0aGlzLmZvcm0gPSAoX2EgPSB0aGlzLmNvbnRhaW5lcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoJyNpdGVtLWZvcm0nKTtcbiAgICAgICAgKF9iID0gdGhpcy5jb250YWluZXIpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hZGRFdmVudExpc3RlbmVyKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB0aGlzLmZvcm0ucmVzZXQoKSk7XG4gICAgfVxuICAgIHJlbmRlcihhcmdzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHNlbGVjdGVkIGl0ZW1zIGZyb20gdGhlIGxpc3QuXG4gICAgICovXG4gICAgcmVtb3ZlU2VsZWN0ZWRJdGVtcygpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICBjb25zdCBzZWxlY3RlZENoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwiaXRlbS1jaGVja1wiXTpjaGVja2VkJyk7XG4gICAgICAgIHNlbGVjdGVkQ2hlY2tib3hlcy5mb3JFYWNoKGNoZWNrYm94ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtID0gY2hlY2tib3guY2xvc2VzdCgnLmxpc3QtZ3JvdXAtaXRlbScpO1xuICAgICAgICAgICAgY29uc3QgaWRFbCA9IGNoZWNrYm94LmdldEF0dHJpYnV0ZSgnbGlzdC1pdGVtLWlkJyk7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkVsID0gbGlzdEl0ZW0gPT09IG51bGwgfHwgbGlzdEl0ZW0gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LWl0ZW0tZGVzYycpO1xuICAgICAgICAgICAgY29uc3QgdGFnc0NvbnRhaW5lciA9IGxpc3RJdGVtID09PSBudWxsIHx8IGxpc3RJdGVtID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCcuYmFkZ2UtY29udGFpbmVyJyk7XG4gICAgICAgICAgICBjb25zdCB0YWdzID0gdGFnc0NvbnRhaW5lciA/IEFycmF5LmZyb20odGFnc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdC1pdGVtLWJhZGdlJykpIDogW107XG4gICAgICAgICAgICBjb25zdCBkZWFkbGluZUVsID0gbGlzdEl0ZW0gPT09IG51bGwgfHwgbGlzdEl0ZW0gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LWl0ZW0tZGVhZGxpbmUnKTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gaWRFbCA/IHBhcnNlSW50KGlkRWwpIDogMDtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25FbC50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgICAgIGNvbnN0IHRhZ0xpc3QgPSB0YWdzLm1hcCh0YWcgPT4gdGFnLnRleHRDb250ZW50IHx8ICcnKS5maWx0ZXIodGFnID0+IHRhZy50cmltKCkgIT09ICcnKTtcbiAgICAgICAgICAgIGNvbnN0IGRlYWRsaW5lID0gZGVhZGxpbmVFbC50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICB0YWdzOiB0YWdMaXN0LFxuICAgICAgICAgICAgICAgIGRlYWRsaW5lOiBkZWFkbGluZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIGxpc3RJdGVtID09PSBudWxsIHx8IGxpc3RJdGVtID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsaXN0SXRlbS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZEl0ZW1zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlIGFsbCBmaWVsZHMgaW4gdGhlIHJlbW92ZSBmb3JtLlxuICAgICAqL1xuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5jb250YWluZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5xdWVyeVNlbGVjdG9yQWxsKCcucmVtb3ZlLWZvcm0tZmllbGQnKS5mb3JFYWNoKChmaWVsZCkgPT4gZmllbGQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuYWJsZSBhbGwgZmllbGRzIGluIHRoZSByZW1vdmUgZm9ybS5cbiAgICAgKi9cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5jb250YWluZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5xdWVyeVNlbGVjdG9yQWxsKCcucmVtb3ZlLWZvcm0tZmllbGQnKS5mb3JFYWNoKChmaWVsZCkgPT4gZmllbGQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzbWlzcyB0aGUgcmVtb3ZlIG1vZGFsLlxuICAgICAqL1xuICAgIGRpc21pc3MoKSB7XG4gICAgICAgIC8vIFlvdSBtYXkgY2hvb3NlIHRvIGRvIGFkZGl0aW9uYWwgYWN0aW9ucyBoZXJlLCBpZiBuZWVkZWQuXG4gICAgICAgIHRoaXMuZm9ybS5yZXNldCgpO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVtb3ZlVmlldyA9IFJlbW92ZVZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGFiVmlldyA9IHZvaWQgMDtcbi8qKlxuICogQSBWaWV3IHRoYXQgcmVuZGVycyBhIFRhYi5cbiAqL1xuY2xhc3MgVGFiVmlldyB7XG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtORWxlbWVudH0gdGFiRWwgdGhlIHRhYiBlbGVtZW50XG4gICAgICogQHBhcmFtIHtORWxlbWVudH0gY29udGVudEVsIHRoZSBjb250ZW50IGVsZW1lbnRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0YWJFbCwgY29udGVudEVsKSB7XG4gICAgICAgIHRoaXMudGFiRWwgPSB0YWJFbDtcbiAgICAgICAgdGhpcy5jb250ZW50RWwgPSBjb250ZW50RWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFyIHRoZSB0YWIgY29udGFpbmVyLlxuICAgICAqL1xuICAgIGNsZWFyQ29udGFpbmVyKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHdoaWxlICgoX2EgPSB0aGlzLmNvbnRlbnRFbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxhc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50RWwucmVtb3ZlQ2hpbGQodGhpcy5jb250ZW50RWwubGFzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgYSBsaXN0IG9mIGl0ZW1zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtUb0RvSXRlbVtdfSBpdGVtcyB0aGUgaXRlbXNcbiAgICAgKiBAcGFyYW0ge05FbGVtZW50fSBjb250YWluZXIgdGhlIGNvbnRhaW5lclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gd2l0aFRhZ3Mgd2hldGhlciBpdCBoYXMgdGFncywgb3Igbm90XG4gICAgICovXG4gICAgYnVpbGRJdGVtTGlzdChpdGVtcywgY29udGFpbmVyLCB3aXRoVGFncykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QtaXRlbS10ZW1wbGF0ZScpO1xuICAgICAgICAgICAgY29uc3QgY2xvbmUgPSB0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtID0gY2xvbmUucXVlcnlTZWxlY3RvcignLmxpc3QtZ3JvdXAtaXRlbScpO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBjbG9uZS5xdWVyeVNlbGVjdG9yKCcubGlzdC1pdGVtLWRlc2MnKTtcbiAgICAgICAgICAgIGNvbnN0IGJhZGdlQ29udGFpbmVyID0gY2xvbmUucXVlcnlTZWxlY3RvcignLmJhZGdlLWNvbnRhaW5lcicpO1xuICAgICAgICAgICAgY29uc3QgZGVhZGxpbmUgPSBjbG9uZS5xdWVyeVNlbGVjdG9yKCcubGlzdC1pdGVtLWRlYWRsaW5lJyk7XG4gICAgICAgICAgICAoX2EgPSBsaXN0SXRlbSA9PT0gbnVsbCB8fCBsaXN0SXRlbSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLmZvcm0tY2hlY2staW5wdXQnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNldEF0dHJpYnV0ZSgnbGlzdC1pdGVtLWlkJywgaXRlbS5pZC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIGlmIChkZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gaXRlbS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGJhZGdlVGVtcGxhdGUgPSBjbG9uZS5xdWVyeVNlbGVjdG9yKCcubGlzdC1pdGVtLWJhZGdlJyk7XG4gICAgICAgICAgICBpZiAod2l0aFRhZ3MgJiYgaXRlbS50YWdzICYmIGl0ZW0udGFncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB0YWcgb2YgaXRlbS50YWdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0JhZGdlID0gYmFkZ2VUZW1wbGF0ZSA9PT0gbnVsbCB8fCBiYWRnZVRlbXBsYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYWRnZVRlbXBsYXRlLmNsb25lTm9kZSgpO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWRnZS50ZXh0Q29udGVudCA9IHRhZztcbiAgICAgICAgICAgICAgICAgICAgYmFkZ2VDb250YWluZXIgPT09IG51bGwgfHwgYmFkZ2VDb250YWluZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhZGdlQ29udGFpbmVyLmFwcGVuZChuZXdCYWRnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKF9iID0gYmFkZ2VUZW1wbGF0ZSA9PT0gbnVsbCB8fCBiYWRnZVRlbXBsYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYWRnZVRlbXBsYXRlLnBhcmVudEVsZW1lbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yZW1vdmVDaGlsZChiYWRnZVRlbXBsYXRlKTtcbiAgICAgICAgICAgIGlmIChkZWFkbGluZSA9PT0gbnVsbCB8fCBkZWFkbGluZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVhZGxpbmUudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gRGF0ZS5wYXJzZSgoaXRlbSA9PT0gbnVsbCB8fCBpdGVtID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpdGVtLmRlYWRsaW5lKSB8fCAnJyk7XG4gICAgICAgICAgICAgICAgZGVhZGxpbmUudGV4dENvbnRlbnQgPSAoZGF0ZSkgP1xuICAgICAgICAgICAgICAgICAgICBuZXcgRGF0ZShkYXRlKS50b1VUQ1N0cmluZygpLnNsaWNlKDAsIDE2KSA6ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpc3RJdGVtKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyID09PSBudWxsIHx8IGNvbnRhaW5lciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGFpbmVyLmFwcGVuZChsaXN0SXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgd2hldGhlciB0aGlzIHZpZXcgaXMgYWN0aXZlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBpdCBpcyBhY3RpdmUsIGZhbHNlIG90aGVyd2lzZVxuICAgICAqL1xuICAgIGlzQWN0aXZlKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoKF9hID0gdGhpcy50YWJFbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHx8IGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydHMuVGFiVmlldyA9IFRhYlZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGFnc1ZpZXcgPSB2b2lkIDA7XG5jb25zdCB0YWJfdmlld18xID0gcmVxdWlyZShcIi4vdGFiLXZpZXdcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5jb25zdCBOT1RBRyA9ICd1bnRhZ2dlZCc7XG4vKipcbiAqIEEgdGFiIHZpZXcgdGhhdCBzaG93cyBpdGVtcyBncm91cGVkIGJ5IHRhZ3MuXG4gKi9cbmNsYXNzIFRhZ3NWaWV3IGV4dGVuZHMgdGFiX3ZpZXdfMS5UYWJWaWV3IHtcbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWdzLXRhYicpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFncy1jb250ZW50JykpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wYXJlIHR3byBpdGVtcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VG9Eb0l0ZW19IGEgdGhlIGZpcnN0IGl0ZW1cbiAgICAgKiBAcGFyYW0ge1RvRG9JdGVtfSBiIHRoZSBzZWNvbmQgaXRlbVxuICAgICAqIEByZXR1cm4ge251bWVyfSAxLCAtMSwgMCBhY2NvcmRpbmcgdG8gSlMgY29tcGFyaXNvbiBydWxlc1xuICAgICAqL1xuICAgIGNvbXBhcmUoYSwgYikge1xuICAgICAgICByZXR1cm4gKDAsIHV0aWxzXzEuZGVzY0NvbXBhcmF0b3IpKGEsIGIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHcm91cCBpdGVtcyBieSB0YWcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1RvRG9JdGVtW119IGl0ZW1zIHRoZSBpdGVtc1xuICAgICAqIEByZXR1cm4ge1RhZ0dyb3Vwc30gdGhlIGdyb3VwZWQgdGFnc1xuICAgICAqL1xuICAgIGdyb3VwQnlUYWdzKGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLnRhZ3MgJiYgaXRlbS50YWdzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoTk9UQUcgaW4gZ3JvdXBzKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3Vwc1tOT1RBR10ucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3Vwc1tOT1RBR10gPSBbaXRlbV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB0YWcgb2YgaXRlbS50YWdzIHx8IFtdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhZyBpbiBncm91cHMpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBzW3RhZ10ucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3Vwc1t0YWddID0gW2l0ZW1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHRhZyBpbiBncm91cHMpIHtcbiAgICAgICAgICAgIGlmICh0YWcgaW4gT2JqZWN0LmtleXMoZ3JvdXBzKSkge1xuICAgICAgICAgICAgICAgIGdyb3Vwc1t0YWddLnNvcnQodGhpcy5jb21wYXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JvdXBzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgdGhlIHRhYi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VG9Eb0l0ZW1bXX0gaXRlbXMgdGhlIGl0ZW1zXG4gICAgICovXG4gICAgcmVuZGVyKGl0ZW1zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gdGhpcy5ncm91cEJ5VGFncyhpdGVtcyk7XG4gICAgICAgIGNvbnN0IHNvcnRlZFRhZ3MgPSBPYmplY3Qua2V5cyhncm91cHMpLnNvcnQoKTtcbiAgICAgICAgY29uc3QgZ3JvdXBUZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWctbGlzdC1pdGVtLXRlbXBsYXRlJyk7XG4gICAgICAgIHRoaXMuY2xlYXJDb250YWluZXIoKTtcbiAgICAgICAgZm9yIChjb25zdCB0YWcgb2Ygc29ydGVkVGFncykge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBDbG9uZSA9IGdyb3VwVGVtcGxhdGUuY29udGVudFxuICAgICAgICAgICAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCBncm91cEl0ZW0gPSBncm91cENsb25lLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LWdyb3VwLWl0ZW0nKTtcbiAgICAgICAgICAgIGNvbnN0IHRhZ0xhYmVsID0gZ3JvdXBJdGVtID09PSBudWxsIHx8IGdyb3VwSXRlbSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZ3JvdXBJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5iYWRnZScpO1xuICAgICAgICAgICAgaWYgKHRhZ0xhYmVsKSB7XG4gICAgICAgICAgICAgICAgdGFnTGFiZWwudGV4dENvbnRlbnQgPSB0YWc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJ1aWxkSXRlbUxpc3QoZ3JvdXBzW3RhZ10sIGdyb3VwQ2xvbmUucXVlcnlTZWxlY3RvcignLmxpc3QtZ3JvdXAnKSwgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKGdyb3VwSXRlbSkge1xuICAgICAgICAgICAgICAgIChfYSA9IHRoaXMuY29udGVudEVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYXBwZW5kKGdyb3VwSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLlRhZ3NWaWV3ID0gVGFnc1ZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVzY0NvbXBhcmF0b3IgPSBleHBvcnRzLmFzY0NvbXBhcmF0b3IgPSB2b2lkIDA7XG4vKipcbiAqIENyaXRlcmlhIGZvciBhc2NlbmRpbmcgZGF0ZSBvcmRlclxuICogRGF0ZWxlc3MgZWxlbWVudHMgYXJlIHB1c2hlZCB0byB0aGUgYm90dG9tXG4gKiBAcGFyYW0ge1RvRG9JdGVtfSBhIGFuIGl0ZW1cbiAqIEBwYXJhbSB7VG9Eb0l0ZW19IGIgYW4gaXRlbVxuICogQHJldHVybiB7bnVtYmVyfSB2YWx1ZXMgZXhwZWN0ZWQgYnkgY29tcGFyYWJsZVxuICovXG5mdW5jdGlvbiBhc2NDb21wYXJhdG9yKGEsIGIpIHtcbiAgICBjb25zdCBkYXRlQSA9IERhdGUucGFyc2UoKGEgPT09IG51bGwgfHwgYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogYS5kZWFkbGluZSkgfHwgJycpO1xuICAgIGNvbnN0IGRhdGVCID0gRGF0ZS5wYXJzZSgoYiA9PT0gbnVsbCB8fCBiID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiLmRlYWRsaW5lKSB8fCAnJyk7XG4gICAgLyoqXG4gICAgICogYSA8IGIgLT4gLTFcbiAgICAgKiBhID4gYiAtPiAxXG4gICAgICogYSA9IGIgLT4gMFxuICAgICAqL1xuICAgIGlmIChkYXRlQSAmJiBkYXRlQikge1xuICAgICAgICBpZiAoZGF0ZUEgPCBkYXRlQikge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRhdGVBID4gZGF0ZUIpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBlbHNlIGlmICghZGF0ZUEgJiYgZGF0ZUIpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRhdGVBICYmICFkYXRlQikge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIHJldHVybiAwO1xufVxuZXhwb3J0cy5hc2NDb21wYXJhdG9yID0gYXNjQ29tcGFyYXRvcjtcbi8qKlxuICogQ3JpdGVyaWEgZm9yIGRlc2NlbmRpbmcgZGF0ZSBvcmRlclxuICogRGF0ZWxlc3MgZWxlbWVudHMgYXJlIHB1c2hlZCB0byB0aGUgYm90dG9tLlxuICpcbiAqIEBwYXJhbSB7VG9Eb0l0ZW19IGEgYW4gaXRlbVxuICogQHBhcmFtIHtUb0RvSXRlbX0gYiBhbiBpdGVtXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHZhbHVlcyBleHBlY3RlZCBieSBjb21wYXJhYmxlXG4gKi9cbmZ1bmN0aW9uIGRlc2NDb21wYXJhdG9yKGEsIGIpIHtcbiAgICBjb25zdCBkYXRlQSA9IERhdGUucGFyc2UoKGEgPT09IG51bGwgfHwgYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogYS5kZWFkbGluZSkgfHwgJycpO1xuICAgIGNvbnN0IGRhdGVCID0gRGF0ZS5wYXJzZSgoYiA9PT0gbnVsbCB8fCBiID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiLmRlYWRsaW5lKSB8fCAnJyk7XG4gICAgaWYgKGRhdGVBICYmIGRhdGVCKSB7XG4gICAgICAgIGlmIChkYXRlQSA8IGRhdGVCKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkYXRlQSA+IGRhdGVCKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFkYXRlQSAmJiBkYXRlQikge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF0ZUEgJiYgIWRhdGVCKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG59XG5leHBvcnRzLmRlc2NDb21wYXJhdG9yID0gZGVzY0NvbXBhcmF0b3I7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBtYWluXzEgPSByZXF1aXJlKFwiLi9jb250cm9sbGVyL21haW5cIik7XG4oMCwgbWFpbl8xLnN0YXJ0KSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9