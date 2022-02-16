
export function loadString(key: string): string | null {
    try {
        return window.localStorage.getItem(key)
    } catch {
        return null
    }
}

export function saveString(key: string, value: string): boolean {
    try {
        window.localStorage.setItem(key, value)
        return true
    } catch {
        return false
    }
}

export function load(key: string): any | null {
    try {
        const almostThere = window.localStorage.getItem(key)
        // if (!almostThere) return null;
        return JSON.parse(almostThere ?? '')
    } catch {
        return null
    }
}

export function save(key: string, value: any): boolean {
    try {
        window.localStorage.setItem(key, JSON.stringify(value))
        return true
    } catch {
        return false
    }
}