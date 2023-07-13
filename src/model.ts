namespace Model {
    const ra = '2123689'
    const host = 'https://todo-server-spa-ozyq2qhxqq-rj.a.run.app/api'
    export interface ToDoItem {
        id: number
        description: string
        tags?: string[]
        deadline?: string
    }
    export class ToDoItemDao {
        async listAll(): Promise<ToDoItem[]> {
            const reponse = await fetch(`${host}/${ra}/list`)
            if (reponse.ok) return (await reponse.json()).items as ToDoItem[]
            console.error('Server status:' + JSON.stringify(await reponse.json()))
            throw new Error('Server-side error: failed to fetch list')
        }
        insert(item: ToDoItem): boolean {
            return false
        }

    }
}
async function mainModel() {
    const dao = new Model.ToDoItemDao()

    const result = await dao.listAll()

    console.log(result)
}
mainModel().then()