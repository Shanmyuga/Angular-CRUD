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
        get: HOST + '/api/epic/find/:id',
        dept: HOST + '/api/epic/dept/all',
        epicDept: HOST + '/api/epic/dept/epic',
        workorder: HOST + '/api/epic/workorder/all'
      },

      backlog: {
        list: HOST + '/api/backlog/all',
        delete: HOST + '/api/backlog/delete/:id',
        save: HOST + '/api/backlog/save',
        get: HOST + '/api/backlog/find/:id'

      },
        user: {}
    },
    lang: {},
    session: {},
    parameters: {}
};
