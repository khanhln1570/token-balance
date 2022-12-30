module.exports = {
    apps: [{
        name: "nft-finder",
        script: "npm",
        args: "run start",
        cwd: "/home/khanhln/nftFinder/token-balance",
        watch: ["server", "client"],
        // Delay between restart
        watch_delay: 1000,
        ignore_watch: ["node_modules", "client/img"],
        watch_options: {
            "followSymlinks": false
        },
        env: {
            "NODE_ENV": "development"
        },
    }]
}