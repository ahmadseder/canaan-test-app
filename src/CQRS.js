import Domain from "@canaan_run/canaan";

const projectsApp = new Domain('projects'); 
const user = new Domain('user'); 


const updateBalance = projectsApp.createCommand({
    name: 'updateBalance',
    description: 'Update the balance',
    isPublic: true, 
    path: 'balance'
});

const getBalance = projectsApp.createQuery({
    name: 'getBalance', 
    description: 'gets the balance',
    isPublic: true, 
    path: 'balance'
});



const initUser = user.createCommand({
    name: 'initUser',
    description: 'This will initialize the user information', 
    isPublic: false,
    path:'info'
});


const getUserInfo = user.createQuery({
    name: 'getUserInfo',
    description: 'This will get the user information', 
    isPublic: false,
    path:'info',
    defaultValue: {}
});


const initializeProjects = projectsApp.createCommand({
    name: 'initProjects',
    description: 'This command will initialize the projects',
    isPublic: true, 
    path: 'projects'
});

const getProjects = projectsApp.createQuery({
    name: 'getProjects',
    description: 'This command will get the projects',
    isPublic: true, 
    path: 'projects',
    defaultValue: []

})

const selectProject = projectsApp.createCommand({
    name: 'selectProject',
    description: 'This command will set the selected project',
    isPublic: true, 
    path: 'selected'
});


const getSelectedProject = projectsApp.createQuery({
    name: 'getSelectedProject',
    description: 'This command will get the selected project',
    isPublic: true, 
    path: 'selected'
});

const addEntry = projectsApp.createCommand({
    name: 'addEntry',
    description: 'Add new entry ',
    isPublic: true, 
    path: 'entries[]'
});


const getEntries = projectsApp.createQuery({
    name: 'getEntries',
    description: 'Return all the entries', 
    path: 'entries',
    isPublic: true,
})







export {
    initializeProjects, 
    projectsApp,
    selectProject,
    getSelectedProject,
    getProjects,
    addEntry,
    initUser,
    getEntries,
    updateBalance, 
    getBalance,
    getUserInfo
};