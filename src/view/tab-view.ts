import {View} from './view'
import {ToDoItem} from '../model'
import {NElement} from './utils'

/**
 * A View that renders a Tab.
 */
export abstract class TabView implements View {
    tabEl: NElement
    contentEl: NElement

    /**
     * The constructor.
     *
     * @param {NElement} tabEl the tab element
     * @param {NElement} contentEl the content element
     */
    constructor(tabEl: NElement, contentEl: NElement) {
        this.tabEl = tabEl
        this.contentEl = contentEl
    }

    protected abstract compare(a: ToDoItem, b: ToDoItem): number

    abstract render(items: ToDoItem[]): void

    /**
     * Clear the tab container.
     */
    protected clearContainer() {
        while (this.contentEl?.lastChild) {
            this.contentEl.removeChild(this.contentEl.lastChild)
        }
    }

    /**
     * Render a list of items.
     *
     * @param {ToDoItem[]} items the items
     * @param {NElement} container the container
     * @param {boolean} withTags whether it has tags, or not
     */
    protected buildItemList(items: ToDoItem[], container: NElement,
        withTags: boolean) {
        for (const item of items) {
            const template = document.getElementById(
                'list-item-template') as HTMLTemplateElement
            const clone = template.content.cloneNode(true) as DocumentFragment
            const listItem = clone.querySelector('.list-group-item')
            const description = clone.querySelector('.list-item-desc')
            const badgeContainer = clone.querySelector('.badge-container')
            const deadline = clone.querySelector('.list-item-deadline')

            listItem?.querySelector('.form-check-input')
                ?.setAttribute('list-item-id', item.id.toString())
            if (description) {
                description.textContent = item.description
            }

            const badgeTemplate = clone.querySelector('.list-item-badge')

            if (withTags && item.tags && item.tags.length > 0) {
                for (const tag of item.tags) {
                    const newBadge = badgeTemplate?.cloneNode() as Element

                    newBadge.textContent = tag
                    badgeContainer?.append(newBadge)
                }
            }
            badgeTemplate?.parentElement?.removeChild(badgeTemplate)
            if (deadline?.textContent) {
                const date = Date.parse(item?.deadline || '')

                deadline.textContent = (date) ?
                    new Date(date).toUTCString().slice(0, 16) : ''
            }
            if (listItem) {
                container?.append(listItem)
            }
        }
    }

    /**
     * Check whether this view is active.
     *
     * @return {boolean} true if it is active, false otherwise
     */
    isActive(): boolean {
        return this.tabEl?.classList.contains('active') || false
    }
}
