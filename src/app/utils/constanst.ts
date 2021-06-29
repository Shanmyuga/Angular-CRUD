const HOST = 'http://localhost:3000';

export const CONSTANST = {
    permissions: {},
    routes: {
        authorization: {
            login: HOST + '/api/auth/login',
            logout: HOST + '/api/auth/logout'
        },
        client: {
            list: HOST + '/api/client',
            delete: HOST + '/api/client/delete/:id',
            save: HOST + '/api/client/save',
            get: HOST + '/api/client/:id'
        },

      epic: {
        list: HOST + '/api/epic/all',
        delete: HOST + '/api/epic/delete/:id',
        save: HOST + '/api/epic/save',
        saveCustom: HOST + '/api/epic/saveCustom',
        saveAll: HOST + '/api/epic/saveAll',
        get: HOST + '/api/epic/find/:id',
        dept: HOST + '/api/epic/dept/all',
        epicDept: HOST + '/api/epic/dept/epic',
        epicTasks: HOST + '/api/epic/epic/tasks',
        workorder: HOST + '/api/epic/workorder/all'
      },

      backlog: {
        list: HOST + '/api/backlog/all',
        delete: HOST + '/api/backlog/delete/:id',
        save: HOST + '/api/backlog/save',
        saveSprint: HOST + '/api/backlog/saveSprint',
        get: HOST + '/api/backlog/find/:id',
        deptSprint: HOST + '/api/backlog/dept/sprint'

      },

      sprint: {
        list: HOST + '/api/sprint/all',
        delete: HOST + '/api/sprint/delete/:id',
        save: HOST + '/api/sprint/save',
        updateSprintToBackLog: HOST + '/api/sprint/updateBkLog',
        closeStory : HOST + '/api/sprint/closeStory',
        saveSprint: HOST + '/api/sprint/saveSprint',
        get: HOST + '/api/sprint/find/:id',
        deptSprint: HOST + '/api/sprint/dept/sprint',
        sprintData: HOST + '/api/sprint/name/all',
        users:  HOST + '/api/sprint/users/all'


      },
        user: {
          pmroleCheck: HOST + '/api/user/role/pmrolecheck'


        }
    },
    lang: {},
    session: {},
    parameters: {}
};
