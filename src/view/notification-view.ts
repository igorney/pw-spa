/* eslint-disable no-unused-vars */
import {NElement} from './utils'
import {View} from './view'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let bootstrap: any


enum ToastStyle {
    success = 'bg-success',
    error = 'bg-danger',
    info = 'bg-primary'
}


/**
 * A View representing a notification.
 */
export class NotificationView implements View {
    private toastElement: NElement
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private toast: any

    /**
     * The constructor.
     */
    constructor() {
        this.toastElement = document.querySelector('#toast')
        this.toast = new bootstrap.Toast(this.toastElement as Element)
        this.setStyle(ToastStyle.success)
    }

    /**
     * Set the notification style.
     *
     * @param {ToastStyle} style the style
     */
    private setStyle(style: ToastStyle) {
        this.toastElement?.classList.remove(ToastStyle.error)
        this.toastElement?.classList.remove(ToastStyle.info)
        this.toastElement?.classList.remove(ToastStyle.success)
        this.toastElement?.classList.add(style)
    }

    /**
     * Render the noficiation.
     *
     * @param {string} message the message
     */
    render(message: string) {
        const messageNode = this.toastElement?.querySelector('.toast-body')

        if (messageNode) {
            messageNode.textContent = message
            this.toast.show()
        }
    }

    /**
     * Notify a success message.
     *
     * @param {string} message the message
     */
    success(message: string) {
        this.setStyle(ToastStyle.success)
        this.render(message)
    }

    /**
     * Notify an error message.
     *
     * @param {string} message the message
     */
    error(message: string) {
        this.setStyle(ToastStyle.error)
        this.render(message)
    }

    /**
     * Notify an info message.
     *
     * @param {string} message the message
     */
    info(message: string) {
        this.setStyle(ToastStyle.info)
        this.render(message)
    }
}
