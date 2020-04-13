const app = {
    state: {
        theme: 'default',
        views: [],
    },
    mutations: {
        ADD_VIEWS: (state, view) => {
            if (state.views.includes(view)) return
            state.views.push(view)
        },
        DEL_VIEWS: (state, view) => {
            const index = state.views.indexOf(view)
            state.views.splice(index, 1)
        },
    },
    actions: {
        addViews: ({ commit }, view) => {
            commit('ADD_VIEWS', view)
        },
        delViews: ({ commit }, view) => {
            commit('DEL_VIEWS', view)
        },
        VIEWS_ACTIONS: ({commit},data) => {
            // return new Promise((resolve, reject) => {
            return new Promise((resolve) => {
                commit('ADD_VIEWS',data.isShowInfo);
                commit('DEL_VIEWS',data.info);
                resolve();
            })
        }
    }
};

export default app;
