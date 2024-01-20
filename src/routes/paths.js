// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    home: `${ROOTS.DASHBOARD}/dashboard`,
    games: `${ROOTS.DASHBOARD}/games`,
    forAdmin: `${ROOTS.DASHBOARD}/for-admin-page`,
    profile: `${ROOTS.DASHBOARD}/profile`,

    myWorks: {
      root: `${ROOTS.DASHBOARD}/my-works`,
      add: `${ROOTS.DASHBOARD}/my-works/add`,
      edit: (id) => `${ROOTS.DASHBOARD}/my-works/${id}/edit`,
    },

    fields: {
      root: `${ROOTS.DASHBOARD}/fields`,
      add: `${ROOTS.DASHBOARD}/fields/add`,
      edit: (id) => `${ROOTS.DASHBOARD}/fields/${id}/edit`,
    },

    workers: {
      root: `${ROOTS.DASHBOARD}/workers`,
      add: `${ROOTS.DASHBOARD}/workers/add`,
      edit: (id) => `${ROOTS.DASHBOARD}/workers/${id}/edit`,
    },

    workProgram: {
      root: `${ROOTS.DASHBOARD}/work-program`,
      add: `${ROOTS.DASHBOARD}/work-program/add`,
      edit: (id) => `${ROOTS.DASHBOARD}/work-program/${id}/edit`,
    },

    workTypes: {
      root: `${ROOTS.DASHBOARD}/work-types`,
      add: `${ROOTS.DASHBOARD}/work-types/add`,
      edit: (id) => `${ROOTS.DASHBOARD}/work-types/${id}/edit`,
    },

    allEmergency: {
      root: `${ROOTS.DASHBOARD}/all-emergency`,
    },

    reports: {
      root: `${ROOTS.DASHBOARD}/reports`,
    },

    // group: {
    //   root: `${ROOTS.DASHBOARD}/group`,
    //   five: `${ROOTS.DASHBOARD}/group/five`,
    //   six: `${ROOTS.DASHBOARD}/group/six`,
    // },
  },
};
