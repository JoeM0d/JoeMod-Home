class ProjectApi {
    constructor(pv, username) {
        this.privateCode = pv;
        this.username = username;
    }

    static getProjects() {
        return new Promise((resolve, reject) => {
            const url = `https://projects.penguinmod.site/api/projects/paged?length=100`;
            fetch(url)
                .then((res) => {
                    if (!res.ok) {
                        res.text().then(reject);
                        return;
                    }
                    res.json().then((projects) => {
                        resolve(projects.flat(Infinity));
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        })
    }
    static getUserProjects(user) {
        return new Promise((resolve, reject) => {
            const url = `https://projects.penguinmod.site/api/projects/paged?length=100&user=${user}`;
            fetch(url)
                .then((res) => {
                    if (!res.ok) {
                        res.text().then(reject);
                        return;
                    }
                    res.json().then((projects) => {
                        resolve(projects.flat(Infinity));
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        })
    }

    static getProjectMeta(id) {
        return new Promise((resolve, reject) => {
            const url = `https://projects.penguinmod.site/api/projects/getPublished?id=${id}`;
            fetch(url)
                .then((res) => {
                    if (!res.ok) {
                        res.text().then(reject);
                        return;
                    }
                    res.json().then((project) => {
                        resolve(project);
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        })
    }
    static getProjectRemixes(id) {
        return new Promise((resolve, reject) => {
            const url = `https://projects.penguinmod.site/api/pmWrapper/remixes?id=${id}`;
            fetch(url)
                .then((res) => {
                    if (!res.ok) {
                        res.text().then(reject);
                        return;
                    }
                    res.json().then((projects) => {
                        resolve(projects);
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        })
    }

    setPrivateCode(p) {
        this.privateCode = p;
    }
    setUsername(u) {
        this.username = u;
    }

    getMyProjects() {
        return new Promise((resolve, reject) => {
            const url = `https://projects.penguinmod.site/api/users/getMyProjects?user=${this.username}&code=${this.privateCode}&sorted=true`;
            fetch(url)
                .then((res) => {
                    if (!res.ok) {
                        res.text().then(reject);
                        return;
                    }
                    res.json().then((projects) => {
                        resolve(projects);
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        })
    }
    deleteProject(id) {
        return new Promise((resolve, reject) => {
            fetch(`https://projects.penguinmod.site/api/projects/delete?passcode=${this.privateCode}&approver=${this.username}&id=${id}`).then(res => {
                res.json().then(json => {
                    if (!res.ok) {
                        reject(json.error);
                        return;
                    }
                    resolve();
                }).catch(err => {
                    reject(err);
                })
            }).catch(err => {
                reject(err);
            })
        })
    }
    updateProject(id, newData) {
        newData.id = id;
        newData.requestor = this.username;
        newData.passcode = this.privateCode;
        if (typeof newData.newMeta === "object") {
            newData.newMeta = JSON.stringify(newData.newMeta);
        }
        return new Promise((resolve, reject) => {
            fetch(
                `https://projects.penguinmod.site/api/projects/update`,
                {
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newData),
                    method: "POST"
                }
            ).then(res => {
                res.json().then(json => {
                    if (!res.ok) {
                        reject(json.error);
                        return;
                    }
                    resolve();
                }).catch(err => {
                    reject(err);
                })
            }).catch(err => {
                reject(err);
            })
        })
    }
}
export default ProjectApi;