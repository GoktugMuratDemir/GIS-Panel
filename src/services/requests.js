/* eslint-disable import/no-unresolved */

import axios from 'axios';
import { setSession } from 'src/auth/context/jwt/utils';
import { paths } from 'src/routes/paths';

export const BASE_URL = `${process.env.REACT_APP_API_BASEURL}api/`;
const accessToken = localStorage.getItem('accessToken');

const WebServices = {
  get: async (endpoint, params) => {
    try {
      const response = await axios.get(`${BASE_URL + endpoint}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          XApiKey: `TPJDtRG0cP`,
          'ngrok-skip-browser-warning': 'true',
        },
        params,
      });
      return response;
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        setSession(null);
        window.location.href = paths.auth.jwt.login;
      } else if (error.response && error.response.status === 403) {
        window.location.href = '/404';
      }

      // return {
      //   data: {
      //     success: false,
      //     statusCode: 500,
      //     message: 'Başarısız',
      //     detailMessage: 'Başarısız',
      //     data: undefined,
      //   },
      // };

      return error;
    }
  },

  post: async (endpoint, params, isForm) => {
    try {
      const response = await axios.post(`${BASE_URL + endpoint}`, params, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          XApiKey: `TPJDtRG0cP`,
          'Content-Type': isForm ? 'multipart/form-data' : 'application/json',
        },
      });
      return { success: true, response };
    } catch (error) {
      console.error(error);
      return { success: false, response: error?.response?.data?.errors };
    }
  },

  put: async (endpoint, params, isForm) => {
    try {
      const response = await axios.put(`${BASE_URL + endpoint}`, params, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          XApiKey: `TPJDtRG0cP`,
          'Content-Type': isForm ? 'multipart/form-data' : 'application/json',
        },
      });
      return { success: true, response: response.data };
    } catch (error) {
      console.error(error);
      return { success: false, response: error };
    }
  },

  delete: async (endpoint, params) => {
    try {
      const response = await axios.delete(`${`${BASE_URL + endpoint}/${params.Id}`}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          XApiKey: `TPJDtRG0cP`,
        },
      });
      // console.log(response);
      return { success: true, response };
    } catch (error) {
      console.error(error);
      return { success: false, response: error };
    }
  },

  // ** **  MY PROJECT APİ  ** **

  // ** Anlık Konum Bilgisi
  PostLiveAction: (params, isForm) => WebServices.post(`LiveLocation/AddLocation`, params, isForm),

  // ** İşçi apileri
  getAllWorkers: (params) => WebServices.get(`Account/GetAllAccounts`, params),
  getWorkerGetById: (params) => WebServices.get(`Account/GetAccountById/${params.Id}`, params),
  createWorker: (params, isForm) => WebServices.post(`Account/AddAccount`, params, isForm),
  UpdateWorker: (params, isForm) => WebServices.post(`Account/UpdateAccount`, params, isForm),
  DeleteWorker: (params, isForm) => WebServices.post(`Account/RemoveAccount`, params, isForm),

  // ** Tarla Apileri
  getAllFields: (params) => WebServices.get(`Field/GetAllFields`, params),
  getFieldGetById: (params) => WebServices.get(`Field/GetFieldById/${params.Id}`, params),
  createField: (params, isForm) => WebServices.post(`Field/AddField`, params, isForm),
  UpdateField: (params, isForm) => WebServices.put(`Field/UpdateAccount`, params, isForm),
  DeleteField: (params) => WebServices.put(`Field/RemoveField/${params.Id}`),

  // ** İş Tipleri Apileri
  getAllWorkTypes: (params) => WebServices.get(`JobType/GetAll`, params),
  getWorkTypeGetById: (params) => WebServices.get(`JobType/GetJobTypeById/${params.Id}`, params),
  createWorkType: (params, isForm) => WebServices.post(`JobType/AddJobType`, params, isForm),
  UpdateWorkType: (params, isForm) => WebServices.post(`JobType/UpdateJobType`, params, isForm),
  DeleteWorkType: (params) => WebServices.post(`JobType/RemoveJobType`, params),

  // ** İş Programı Apileri
  getAllPrograms: (params) => WebServices.get(`JobAssignment/GetAssignmentsForList`, params),
  getAllProgramsForUser: (params) =>
    WebServices.get(`JobAssignment/GetAssignmentsByAccountId/${params.Id}`),
  getProgramGetById: (params) =>
    WebServices.get(`JobAssignment/GetAssignmentById/${params.Id}`, params),
  createProgram: (params, isForm) => WebServices.post(`JobAssignment/Assign`, params, isForm),
  UpdateProgram: (params, isForm) =>
    WebServices.put(`JobAssignment/UpdateAssignment`, params, isForm),
  DeleteProgram: (params) => WebServices.put(`JobType/DeleteAssignment/${params.Id}`),

  // ** Bildirim
  getNotificationById: (params) =>
    WebServices.get(`Notification/GetNotifications/${params.Id}`, params),
  createNotification: (params) => WebServices.post(`Notification/CreateNotification`, params),
  updateReadNotification: (params) => WebServices.post(`Notification/SetReadNotification`, params),

  // ** Mesajlar
  getMessageById: (params) => WebServices.get(`Message/GetMessages/${params.Id}`, params),
  createMessage: (params) => WebServices.post(`Message/CreateMessage`, params),
  updateReadMessage: (params) => WebServices.post(`Message/SetReadMessage`, params),

  // ** Acil Durrum
  createEmergency: (params) => WebServices.post(`EmergencySituation/AddEmergencySituation`, params),
  getAllEmergency: (params) =>
    WebServices.get(`EmergencySituation/GetAllEmergencySituations`, params),

  // ** Raporlar
  getFilterReport: (params) => WebServices.post(`Report/GetDailyWorkingLocations`, params),
};

export { WebServices };
