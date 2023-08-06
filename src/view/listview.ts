import {TabView} from './tab-view'
import {ToDoItem} from '../model'
import {NElement} from './utils'

/**
 * Abstract class representing any list view.
 */
export abstract class ListView extends TabView {
    /**
     * The constructor.
     *
     * @param {NElement} tabEl the tab element
     * @param {NElement} contentEl the content element
     */
    constructor(tabEl: NElement, contentEl: NElement) {
        super(tabEl, contentEl)
    }

    /**
     * Render the list view.
     *
     * @param {ToDoItem[]} items the items
     */
    render(items: ToDoItem[]) {
        items.sort(this.compare)
        this.clearContainer()
        this.buildItemList(items, this.contentEl, true)
    }
}
