module.exports = {
    release: {
        options: {
            groupId: "com.macys.ce",
            artifactId: "creativepages",
            version: '<%= buildVersion %>',
            packaging: 'zip',
            auth: {
                username: process.env.NEXUS_USER,
                password: process.env.NEXUS_PASS
            },
            url: process.env.ARTIFACT_NPM_UPLOAD_URL,
            artifact: 'CE.zip'
        }
    }
};