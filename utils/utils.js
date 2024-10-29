 function TStoDate(ts) {
    let seconds = ts._seconds;
    let nanoseconds = ts._nanoseconds;
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    return date
}

module.exports = {
    TStoDate
}