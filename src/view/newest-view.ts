import {ToDoItem} from '../model'
import {ListView} from './listview'
import {descComparator} from './utils'

/**
 * List the items in date-descending order
 */
export class NewestView extends ListView {
    /**
     * The constructor.
     */
    constructor() {
        super(
            document.querySelector('#newest-tab'),
            document.querySelector('#newest-content'),
        )
    }

    /**
     * Compare two ToDoItem's.
     *
     * @param {ToDoItem} a the first item
     * @param {ToDoItem} b the second item
     * @return {number} -1, 1 or 0 according to JS comparison rules
     */
    compare(a: ToDoItem, b: ToDoItem): number {
        return descComparator(a, b)
    }
}
