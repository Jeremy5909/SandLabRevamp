export const fireEvent = (name: string) => {
	window.dispatchEvent(new Event(name, { bubbles: true, cancelable: true }))
}

export function on<K extends keyof WindowEventMap>(
	event: K,
	listener: (event: WindowEventMap[K]) => void,
	options?: boolean | AddEventListenerOptions,
): void
export function on(event: string, listener: (event: Event) => void, options?: boolean | AddEventListenerOptions): void
export function on(event: string, listener: (event: Event) => void, options?: boolean | AddEventListenerOptions) {
	addEventListener(event, listener, options)
}
