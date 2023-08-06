import {TabView} from './tab-view'
import {ToDoItem} from '../model'
import {descComparator} from './utils'

/**
 * List the elements grouped by tags.
 */
interface TagGroups {
    [key: string]: ToDoItem[]
}
const NOTAG = 'untagged'

/**
 * A tab view that shows items grouped by tags.
 */
export class TagsView extends TabView {
    /**
     * The constructor.
     */
    constructor() {
        super(
            document.querySelector('#tags-tab'),
            document.querySelector('#tags-content'),
        )
    }

    /**
     * Compare two items.
     *
     * @param {ToDoItem} a the first item
     * @param {ToDoItem} b the second item
     * @return {numer} 1, -1, 0 according to JS comparison rules
     */
    protected compare(a: ToDoItem, b: ToDoItem): number {
        return descComparator(a, b)
    }

    /**
     * Group items by tag.
     *
     * @param {ToDoItem[]} items the items
     * @return {TagGroups} the grouped tags
     */
    private groupByTags(items: ToDoItem[]): TagGroups {
        const groups: TagGroups = {}

        for (const item of items) {
            if (item.tags && item.tags.length < 1) {
                if (NOTAG in groups) {
                    groups[NOTAG].push(item)
                } else {
                    groups[NOTAG] = [item]
                }
            }
            for (const tag of item.tags || []) {
                if (tag in groups) {
                    groups[tag].push(item)
                } else {
                    groups[tag] = [item]
                }
            }
        }

        for (const tag in groups) {
            if (tag in Object.keys(groups)) {
                groups[tag].sort(this.compare)
            }
        }

        return groups
    }

    /**
     * Render the tab.
     *
     * @param {ToDoItem[]} items the items
     */
    render(items: ToDoItem[]): void {
        const groups = this.groupByTags(items)
        const sortedTags = Object.keys(groups).sort()
        const groupTemplate = document.querySelector(
            '#tag-list-item-template') as HTMLTemplateElement

        this.clearContainer()
        for (const tag of sortedTags) {
            const groupClone = groupTemplate.content
                .cloneNode(true) as DocumentFragment
            const groupItem = groupClone.querySelector('.list-group-item')
            const tagLabel = groupItem?.querySelector('.badge')

            if (tagLabel) {
                tagLabel.textContent = tag
            }
            this.buildItemList(groups[tag],
                groupClone.querySelector('.list-group'), false)
            if (groupItem) {
                this.contentEl?.append(groupItem)
            }
        }
    }
}
