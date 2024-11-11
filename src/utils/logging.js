const logString = (str, level) => {
    const logLevel = getLogLevel(level);
    console.log(`${logLevel} ${str}`);
}

const getLogLevel = (level) => {
    const appName = "my_todo";
    let logLevel;
    switch (level) {
        case 'error':
            logLevel = 'ERROR';
            break;
        case 'warn':
            logLevel = 'WARN';
            break;
        default:
            logLevel = 'INFO';
    }

    return `[${appName} ${logLevel}]`;
}

export default {
    logString,
    getLogLevel
};