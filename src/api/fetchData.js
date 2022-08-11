import axios from 'axios';

export const axiosService = axios.create({
  baseURL: 'https://www.emsifa.com/api-wilayah-indonesia/api',
});

export const getProvinces = async () => {
  const res = await axiosService.get('/provinces.json');
  return res.data.map((prov) => {
    return {
      id: prov.id,
      value: prov.name,
      label: prov.name,
    };
  });
};

export const getRegencies = async (provinceId) => {
  const res = await axiosService.get(`/regencies/${provinceId}.json`);
  return res.data.map((reg) => {
    return {
      id: reg.id,
      value: reg.name,
      label: reg.name,
    };
  });
};

export const getDistricts = async (regencyId) => {
  const res = await axiosService.get(`/districts/${regencyId}.json`);
  return res.data.map((district) => {
    return {
      id: district.id,
      value: district.name,
      label: district.name,
    };
  });
};

export const getVillages = async (districtId) => {
  const res = await axiosService.get(`/villages/${districtId}.json`);
  return res.data.map((village) => {
    return {
      id: village.id,
      value: village.name,
      label: village.name,
    };
  });
};
