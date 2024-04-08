
export const convertFireStorageUrl = (parseUrl) => {
    return parseUrl.url + "&token=" + parseUrl.token;
}