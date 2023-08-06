import { ActionButtonView } from './action-button-view'
import { AddView } from './add-view'
import { EditView } from './edit-view'
import { RemoveView } from './remove-view'
import { ListView } from './listview'
import { NewestView } from './newest-view'
import { NotificationView } from './notification-view'
import { OldestView } from './oldest-view'
import { TabView } from './tab-view'
import { TagsView } from './tags-view'

export type DynamicView = ListView | TabView

export const newestView = new NewestView()
export const oldestView = new OldestView()
export const tagsView = new TagsView()
export const addView = new AddView()
export const editView = new EditView()
export const removeView = new RemoveView()
export const addBtnView = new ActionButtonView(
    document.querySelector('#btn-add'))
export const removeBtnView = new ActionButtonView(
    document.querySelector('#btn-remove'))
export const editBtnView = new ActionButtonView(
    document.querySelector('#btn-edit'))
export const notificationView = new NotificationView()
export const dynamicViews = [newestView, oldestView, tagsView]
