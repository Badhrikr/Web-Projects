function replaceBoldWithCustomStyles(text: string, className: string, replaceTag: string, newTag: string = replaceTag) {
    let newMessage = text.replace(new RegExp(`<${replaceTag}>`, "g"), `<${newTag} class="${className}">`);
    newMessage = newMessage.replace(new RegExp(`</${replaceTag}>`, "g"), `</${newTag}>`);
    return newMessage;
}

export default replaceBoldWithCustomStyles;