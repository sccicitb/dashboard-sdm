module.exports = {
    apps: [
        {
            name: 'sccic-internal-dashboard-8081',
            script: 'serve',
            args: '-s build -l 8081'
        },
    ]
};