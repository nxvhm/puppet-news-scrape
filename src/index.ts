let websites: string[] = [];

process.argv.forEach((arg, index) => {
    if (index <= 1) return;

    websites.push(arg);
})
websites.forEach((site, index) => {
    
})