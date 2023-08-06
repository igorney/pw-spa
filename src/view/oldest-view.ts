import {ToDoItem} from '../model'
import {ListView} from './listview'
import {ascComparator as ascComparator} from './utils'

/**
 * List the items in date-ascending order
 */
export class OldestView extends ListView {
    /**
     * The constructor.
     */
    constructor() {
        super(
            document.querySelector('#oldest-tab'),
            document.querySelector('#oldest-content'),
        )
    }

    /**
     * Compare two items.
     *
     * @param {ToDoItem} a the first item
     * @param {ToDoItem} b the second item
     * @return {number} -1, 0, 1 according to JS rules
     */
    compare(a: ToDoItem, b: ToDoItem): number {
        return ascComparator(a, b)
    }
}
