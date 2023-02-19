import Domain from '@canaan_run/canaan';

export const user = new Domain('user');
export const projects = new Domain('projects');

export const updateProjects = projects.createCommand({
    name: 'updateProjects',
    description: 'this command will update the projects',
    isPublic: true,
    path: 'projects'
});

export const getProjects = projects.createQuery({
    name: 'getProjects',
    description: 'this query gets projects',
    isPublic: true,
    path: 'projects',
    defaultValue: [],
});

export const updateProjectBalance = projects.createCommand({
    name: 'updateBalance',
    description: 'this command will update the projects balance',
    isPublic: true,
    path: 'balance',
});

export const getBalance = projects.createQuery({
    name: 'getBalance',
    description: 'this query gets balance',
    isPublic: true,
    path: 'balance',
});

export const updateSelected = projects.createCommand({
    name: 'updateSelected',
    description: 'this command will update the selected projects',
    isPublic: true,
    path: 'selected',
});

export const getSelected = projects.createQuery({
    name: 'getSelected',
    description: 'this query gets selected project',
    isPublic: true,
    path: 'balance',
});


export const updateUserInfo = user.createCommand({
    name: 'setUserInfo',
    description: 'This command will update the user info',
    isPublic: true,
    path: 'info',
    defaultValue: {},
});

export const getUserInfo = user.createQuery({
    name: 'userInfo',
    description: 'this query gets user info',
    path: 'info',
    isPublic: true,
});

export const addEntry = projects.createCommand({
    name: 'addEntry',
    description: 'This command will add entry',
    isPublic: true,
    path: 'entries[]',
});

export const getEntries = projects.createQuery({
    name: 'getEntries',
    description: 'this query gets entries',
    path: 'entries',
    isPublic: true,
});