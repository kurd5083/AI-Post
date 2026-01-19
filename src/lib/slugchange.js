export const slugchange = (name) => {
    return name
        .replaceAll(/[\s:.,()'&]/g, '-')
        .replaceAll(/-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '') 
        .toLowerCase()
}