function sleep(timeout: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Resolved");
        }, timeout);
    })
}

export default sleep;