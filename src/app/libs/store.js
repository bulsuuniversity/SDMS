import { create } from 'zustand';
import axios from 'axios';
import { url, headers } from './api';

export const useProfileData = create((set) => ({
  profileData: {
    id: " ",
    idNumber: " ",
    name: " ",
    email: " ",
    phoneNumber: " ",
    address: " ",
    yearLevel: " ",
    profile: "",
    profilePublicId: "",
    college: " ",
  },
  setProfileData: (props) => ({
    profileData: {
      ...prevState,
      props
    }
  })
}));


export const useSelfConsultData = create((set) => ({
  selfConsultData: "",
  getSelfConsultData: async (session) => {
    try {
      const response = await axios.get(`${url}/api/consultSelf/${session}`, { headers });
      set((state) => ({
        selfConsultData: response.data,
      }));

    } catch (err) {
      console.log(err);
    }
  }
}));

export const useReferConsultData = create((set) => ({
  referConsultData: "",
  getReferConsultData: async (session) => {
    try {
      const response = await axios.get(`${url}/api/consultReferral/${session}`, { headers });
      set((state) => ({
        referConsultData: response.data,
      }));

    } catch (err) {
      console.log(err);
    }
  }
}));

export const useReportData = create((set) => ({
  reportData: "",
  getReportData: async (session) => {
    try {
      const response = await axios.get(`${url}/api/studentReport/${session}`, { headers });
      set((state) => ({
        reportData: response.data,
      }));

    } catch (err) {
      console.log(err);
    }
  }
}));