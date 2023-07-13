namespace View {
    import ToDoItem = Model.ToDoItem
    export function buildItemList(items: ToDoItem[], container: HTMLElement) {
        for (const item of items) {
            const template = document.getElementById('list-item-template') as HTMLTemplateElement
            const clone = template.content.cloneNode(true) as DocumentFragment

            const listItem = clone.querySelector('.list-group-item')
            const description = clone.querySelector('.list-item-desc')
            const bacthContainer = clone.querySelector('.badge-container')
            const deadline = clone.querySelector('.list-item-deadline')

            //TODO: identify the checkboxes

            if (description) description.textContent = item.description

            //TODO: Other items

            if (listItem) container.append(listItem)

        }
    }
}


async function mainView() {
    const dao = new Model.ToDoItemDao()

    const result = await dao.listAll()

    const container = document.getElementById('newest-content')

    if(container) View.buildItemList(result, container)

}
mainView().then()