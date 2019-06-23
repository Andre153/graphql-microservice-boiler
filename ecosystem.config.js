module.exports = {
    apps: [{
        name: "investor",
        script: "services/service-investor/dist/server.js",
        instances: 2,
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
    }, {
        name: "investment",
        script: "services/service-investments/dist/server.js",
        instances: 2,
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
    }, {
        name: "main",
        script: "dist/server.js",
        instances: 2,
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
    }
    ],
};



