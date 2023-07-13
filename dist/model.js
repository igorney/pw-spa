"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Model;
(function (Model) {
    const ra = '2123689';
    const host = 'https://todo-server-spa-ozyq2qhxqq-rj.a.run.app/api';
    class ToDoItemDao {
        listAll() {
            return __awaiter(this, void 0, void 0, function* () {
                const reponse = yield fetch(`${host}/${ra}/list`);
                if (reponse.ok)
                    return (yield reponse.json()).items;
                console.error('Server status:' + JSON.stringify(yield reponse.json()));
                throw new Error('Server-side error: failed to fetch list');
            });
        }
        insert(item) {
            return false;
        }
    }
    Model.ToDoItemDao = ToDoItemDao;
})(Model || (Model = {}));
function mainModel() {
    return __awaiter(this, void 0, void 0, function* () {
        const dao = new Model.ToDoItemDao();
        const result = yield dao.listAll();
        console.log(result);
    });
}
mainModel().then();
