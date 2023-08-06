const ra = '11201811861' // TODO: incluir seu RA
const host = 'https://todo-server-spa-ozyq2qhxqq-rj.a.run.app/api'

/**
 * Domain Object and Data Transfer Object.
 */
export interface ToDoItem {
    id: number
    description: string
    tags?: string[]
    deadline?: string
}

/**
 * A DAO for ToDoItem's.
 */
export class ToDoItemDAO {
    /**
     * Validate an item.
     *
     * @param {ToDoItem} item the item
     * @return {boolean} true if the item is valid, false otherwise
     */
    private isItemValid(item: ToDoItem) {
        return item.description.length > 0
    }

    /**
     * List all items.
     *
     * @return {Promise<ToDoItem[]>} the items as a Promise
     */
    async listAll(): Promise<ToDoItem[]> {
        try {
            const response = await fetch(`${host}/${ra}/list`)

            if (response.ok) {
                return (await response.json()).items as ToDoItem[]
            }
            console.error('Server status: ' +
                JSON.stringify(await response.json()))
            throw new Error('Server-side error. Failed to list')
        } catch (error) {
            console.error('Failed to list elements')
            throw error
        }
    }

    /**
     * Insert an item.
     *
     * @param {ToDoItem} item the item
     * @return {boolean} a promise for true, if the operation
     *  was successfull, false otherwise
     */
    async insert(item: ToDoItem): Promise<boolean> {
        try {
            const response = await fetch(`${host}/${ra}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            })
            if (response.ok) {
                return true
            }
            console.error('Server-side error. Failed to insert.')
            console.error('Server status: ' +
                JSON.stringify(await response.json()))

            return false
        } catch (error) {
            console.error('Failed to insert element')

            throw error
        }
    }
    /**
     * Remove an item by ID.
     *
     * @param {number} id the ID of the item to be removed
     * @return {Promise<boolean>} a promise for true, if the operation was successful, false otherwise
     */
    async removeById(id: number): Promise<boolean> {
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
        } catch (error) {
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
    async update(item: ToDoItem): Promise<boolean> {
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
        } catch (error) {
            console.error('Failed to update element');

            throw error;
        }
    }
}
