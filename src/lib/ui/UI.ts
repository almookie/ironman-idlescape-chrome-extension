export class UI {
    constructor() {
        // TODO: initialise click handlers here
    }

    public createSidebarMenuCategory(title: string): HTMLDivElement {
        const navDrawerContainer = document.querySelector('.nav-drawer-container');
        const newCategory = document.createElement('div');
        newCategory.classList.add('drawer-category', 'noselect');
        newCategory.innerHTML = `<b>${title}</b>`;
        navDrawerContainer.append(newCategory);

        return newCategory;
    }

    public createSidebarMenuLink(title: string, parent: HTMLDivElement, image?: string): HTMLDivElement {
        const navDrawerContainer = document.querySelector('.nav-drawer-container');
        const newLink = document.createElement('div');
        newLink.classList.add('drawer-item', 'active', 'noselect');

        // TODO: image support
        if(typeof image !== 'undefined') {}

        const newLinkText = document.createElement('div');
        newLinkText.classList.add('drawer-item-left');
        newLinkText.innerText = title;
        newLink.append(newLinkText);
        parent.parentNode.insertBefore(newLink, parent.nextSibling);

        return newLink;
    }
}