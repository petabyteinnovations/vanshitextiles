let checklink = (link) => {
    try {
        let url = new URL(link);
        return url.protocol === "https:" && url.hostname === "vanshitextiles.com"
    }
    catch (err) {
        return false
    }
}

module.exports = checklink