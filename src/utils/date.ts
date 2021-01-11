export const transformDate = (dateString: string) => {
    if(!dateString)
        return null;
    const date = new Date(dateString);
    return date.toUTCString();
}