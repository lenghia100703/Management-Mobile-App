export const convertDateTime = (str: any) => {
    console.log(str)
    if (str === null) {
        return ""
    } else {
        const dateObject = new Date(str);

        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1;
        const day = dateObject.getDate();
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        const seconds = dateObject.getSeconds();

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
};