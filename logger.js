function log(source, message, severity) {
    const date = new Date();
    switch(severity) {
        case "info":
            console.log(`\x1b[34m[${date.toLocaleTimeString()}][${source}]\x1b[0m ${message}`);
            break;

        case "error":
            console.log(`\x1b[31m[${date.toLocaleTimeString()}][${source}]\x1b[0m ${message}`);
            break;

        default:
            console.log(`[${date.toLocaleTimeString()}][${source}] ${message}`);
            break;
    }
}

module.exports = {
    log
}