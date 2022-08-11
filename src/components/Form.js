import { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import {
  getDistricts,
  getProvinces,
  getRegencies,
  getVillages,
} from '../api/fetchData';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

function Form() {
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    nomorKK: '',
    fotoKTP: '',
    fotoKK: '',
    umur: '',
    gender: '',
    provinsi: '',
    kabKota: '',
    kecamatan: '',
    kelDesa: '',
    alamat: '',
    rt: '',
    rw: '',
    penghasilanSebelumCovid: '',
    penghasilanSesudahCovid: '',
    alasan: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((oldForm) => {
      return {
        ...oldForm,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  const { data: provinces } = useQuery(['province'], getProvinces);

  const { data: regencies, isSuccess: regencySuccess } = useQuery(
    ['regencies', formData.provinsi],
    () => getRegencies(formData.provinsi.id),
    { enabled: formData.provinsi !== '' }
  );

  const { data: districts, isSuccess: districtSuccess } = useQuery(
    ['districs', formData.kabKota],
    () => getDistricts(formData.kabKota.id),
    { enabled: formData.kabKota !== '' }
  );

  const { data: villages, isSuccess: villageSuccess } = useQuery(
    ['villages', formData.kecamatan],
    () => getVillages(formData.kecamatan.id),
    { enabled: formData.kecamatan !== '' }
  );

  return (
    <FormContainer onSubmit={handleSubmit}>
      <label htmlFor='nama'>Nama</label>
      <input
        type='text'
        name='nama'
        id='nama'
        onChange={handleChange}
        value={formData.nama}
      />
      <label htmlFor='nik'>NIK</label>
      <input
        type='number'
        name='nik'
        id='nik'
        onChange={handleChange}
        value={formData.nik}
      />
      <label htmlFor='nomorKK'>Nomor Kartu Keluarga</label>
      <input
        type='number'
        name='nomorKK'
        id='nomorKK'
        onChange={handleChange}
        value={formData.nomorKK}
      />
      <label htmlFor='fotoKTP'>Foto KTP</label>
      <input
        type='file'
        name='fotoKTP'
        id='fotoKTP'
        onChange={handleChange}
        value={formData.fotoKTP}
      />
      <label htmlFor='fotoKK'>Foto Kartu Keluarga</label>
      <input
        type='file'
        name='fotoKK'
        id='fotoKK'
        onChange={handleChange}
        value={formData.fotoKK}
      />
      <label htmlFor='umur'>Umur</label>
      <input
        type='number'
        name='umur'
        id='umur'
        onChange={handleChange}
        value={formData.umur}
      />
      <fieldset>
        <legend>Jenis Kelamin</legend>

        <input
          type='radio'
          name='gender'
          id='male'
          value='male'
          onChange={handleChange}
          checked={formData.gender === 'male'}
        />
        <label htmlFor='male'>Pria</label>
        <input
          type='radio'
          name='gender'
          id='female'
          value='female'
          onChange={handleChange}
          checked={formData.gender === 'female'}
        />
        <label htmlFor='female'>Wanita</label>
      </fieldset>

      <Select
        name='provinsi'
        options={provinces}
        onChange={(selectedProvince) =>
          setFormData((oldForm) => ({
            ...oldForm,
            provinsi: selectedProvince,
          }))
        }
      />
      <Select
        name='kabKota'
        options={regencies}
        onChange={(selectedRegency) =>
          setFormData((oldForm) => ({
            ...oldForm,
            kabKota: selectedRegency,
          }))
        }
        isDisabled={regencySuccess ? false : true}
      />
      <Select
        name='kecamatan'
        options={districts}
        onChange={(selectedDistrict) =>
          setFormData((oldForm) => ({
            ...oldForm,
            kecamatan: selectedDistrict,
          }))
        }
        isDisabled={districtSuccess ? false : true}
      />
      <Select
        name='kelDesa'
        options={villages}
        onChange={(selectedVillage) =>
          setFormData((oldForm) => ({
            ...oldForm,
            kelDesa: selectedVillage,
          }))
        }
        isDisabled={villageSuccess ? false : true}
      />
      <label htmlFor='alamat'>Alamat</label>
      <input
        type='text'
        name='alamat'
        id='alamat'
        onChange={handleChange}
        value={formData.alamat}
      />
      <label htmlFor='rt'>RT</label>
      <input
        type='text'
        name='rt'
        id='rt'
        onChange={handleChange}
        value={formData.rt}
      />
      <label htmlFor='rw'>RW</label>
      <input
        type='text'
        name='rw'
        id='rw'
        onChange={handleChange}
        value={formData.rw}
      />
      <label htmlFor='penghasilanSebelumCovid'>Penghasilan Sebelum Covid</label>
      <input
        type='number'
        name='penghasilanSebelumCovid'
        id='penghasilanSebelumCovid'
        onChange={handleChange}
        value={formData.penghasilanSebelumCovid}
      />
      <label htmlFor='penghasilanSesudahCovid'>Penghasilan Sesudah Covid</label>
      <input
        type='number'
        name='penghasilanSesudahCovid'
        id='penghasilanSesudahCovid'
        onChange={handleChange}
        value={formData.penghasilanSesudahCovid}
      />

      <fieldset>
        <legend>Alasan membutuhkan bantuan</legend>
        <input
          type='radio'
          name='alasan'
          id='Kehilangan pekerjaan'
          value='Kehilangan pekerjaan'
          onChange={handleChange}
          checked={formData.alasan === 'Kehilangan pekerjaan'}
        />
        <label htmlFor='Kehilangan pekerjaan'>Kehilangan pekerjaan</label>
        <input
          type='radio'
          name='alasan'
          id='Kepala keluarga terdampak atau korban Covid-19'
          value='Kepala keluarga terdampak atau korban Covid-19'
          onChange={handleChange}
          checked={
            formData.alasan === 'Kepala keluarga terdampak atau korban Covid-19'
          }
        />
        <label htmlFor='Kepala keluarga terdampak atau korban Covid-19'>
          Kepala keluarga terdampak atau korban Covid-19
        </label>
        <input
          type='radio'
          name='alasan'
          id='Tergolong fakir/miskin semenjak sebelum Covid-19'
          value='Tergolong fakir/miskin semenjak sebelum Covid-19'
          onChange={handleChange}
          checked={
            formData.alasan ===
            'Tergolong fakir/miskin semenjak sebelum Covid-19'
          }
        />
        <label htmlFor='Tergolong fakir/miskin semenjak sebelum Covid-19'>
          Tergolong fakir/miskin semenjak sebelum Covid-19
        </label>
      </fieldset>

      <button>Verifikasi</button>
    </FormContainer>
  );
}

export default Form;
