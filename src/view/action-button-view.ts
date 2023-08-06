import {NElement} from './utils'
import {View} from './view'

/**
 * A view modeling a button from the toolbar.
 */
export class ActionButtonView implements View {
    container: NElement

    /**
     * Build a button.
     *
     * @param {NElement} container the button container
     */
    constructor(container: NElement) {
        this.container = container
    }

    /**
     * Do nothing.
     *
     * @param {unknown} args the args
     */
    render(args: unknown): void {
        args
    }

    /**
     * Enable the button.
     */
    enable(): void {
        this.container?.classList.remove('disabled')
    }

    /**
     * Disable the button.
     */
    disable(): void {
        this.container?.classList.add('disabled')
    }
}
