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
  gap: 10px;

  input {
    min-height: 30px;
    max-width: 200px;
    border-radius: 5px;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    padding: 5px;
  }

  .gender-container {
    display: flex;
    align-items: center;
  }
  .bantuan-container {
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      align-items: center;
    }
  }
  .select-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .pernyataan-container {
    display: flex;
    align-items: center;
  }
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
    agreement: false,
  });

  /**
   * It returns true if every item in the formData object is not an empty string or if it is not false.
   * @returns a boolean value.
   */
  function formValidation() {
    return Object.values(formData).every((item) => item !== '' && item);
  }

  /**
   * If the form is valid, then wait 1.5 seconds and then alert the user that the data was sent.
   * Otherwise, alert the user that the form is not valid.
   * @param e - the event object
   */
  function handleSubmit(e) {
    e.preventDefault();
    if (formValidation()) {
      setTimeout(() => {
        alert('Data berhasil dikirim!');
      }, 1500);
    } else {
      alert('Pastikan anda telah mengisi semua kolom!');
    }
  }

  /**
   * When the form data changes, update the form data with the new value.
   * @param e - the event object
   */
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((oldForm) => {
      return {
        ...oldForm,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  /* A custom hook that is used to fetch data from an API. */
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
        placeholder='Masukkan Nama Lengkap'
      />
      <label htmlFor='nik'>NIK</label>
      <input
        type='number'
        name='nik'
        id='nik'
        onChange={handleChange}
        value={formData.nik}
        placeholder='Masukkan NIK'
      />
      <label htmlFor='nomorKK'>Nomor Kartu Keluarga</label>
      <input
        type='number'
        name='nomorKK'
        id='nomorKK'
        onChange={handleChange}
        value={formData.nomorKK}
        placeholder='Masukkan Nomor KK'
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
        min={25}
        onChange={handleChange}
        value={formData.umur}
        placeholder='Masukkan umur'
      />
      <fieldset className='gender-container'>
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

      <div className='select-container'>
        <Select
          name='provinsi'
          options={provinces}
          onChange={(selectedProvince) =>
            setFormData((oldForm) => ({
              ...oldForm,
              provinsi: selectedProvince,
            }))
          }
          placeholder='Pilih Provinsi'
          isSearchable={true}
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
          placeholder='Pilih Kota/Kabupaten'
          isSearchable={true}
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
          placeholder='Pilih Kecamatan'
          isSearchable={true}
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
          placeholder='Pilih Desa/Kelurahan'
          isSearchable={true}
        />
      </div>
      <label htmlFor='alamat'>Alamat</label>
      <textarea
        type='text'
        name='alamat'
        id='alamat'
        onChange={handleChange}
        value={formData.alamat}
        maxLength='255'
        placeholder='Masukkan Alamat'
      />
      <label htmlFor='rt'>RT</label>
      <input
        type='text'
        name='rt'
        id='rt'
        onChange={handleChange}
        value={formData.rt}
        placeholder='Masukkan RT'
      />
      <label htmlFor='rw'>RW</label>
      <input
        type='text'
        name='rw'
        id='rw'
        onChange={handleChange}
        value={formData.rw}
        placeholder='Masukkan RW'
      />
      <label htmlFor='penghasilanSebelumCovid'>Penghasilan Sebelum Covid</label>
      <input
        type='number'
        name='penghasilanSebelumCovid'
        id='penghasilanSebelumCovid'
        onChange={handleChange}
        value={formData.penghasilanSebelumCovid}
        placeholder='2000000'
      />
      <label htmlFor='penghasilanSesudahCovid'>Penghasilan Sesudah Covid</label>
      <input
        type='number'
        name='penghasilanSesudahCovid'
        id='penghasilanSesudahCovid'
        onChange={handleChange}
        value={formData.penghasilanSesudahCovid}
        placeholder='1000000'
      />

      <fieldset className='bantuan-container'>
        <legend>Alasan membutuhkan bantuan</legend>
        <div>
          <input
            type='radio'
            name='alasan'
            id='Kehilangan'
            value='Kehilangan pekerjaan'
            onChange={handleChange}
            checked={formData.alasan === 'Kehilangan pekerjaan'}
          />
          <label htmlFor='Kehilangan'>Kehilangan pekerjaan</label>
        </div>
        <div>
          {' '}
          <input
            type='radio'
            name='alasan'
            id='Kepala'
            value='Kepala keluarga terdampak atau korban Covid-19'
            onChange={handleChange}
            checked={
              formData.alasan ===
              'Kepala keluarga terdampak atau korban Covid-19'
            }
          />
          <label htmlFor='Kepala'>
            Kepala keluarga terdampak atau korban Covid-19
          </label>
        </div>
        <div>
          <input
            type='radio'
            name='alasan'
            id='Tergolong'
            value='Tergolong fakir/miskin semenjak sebelum Covid-19'
            onChange={handleChange}
            checked={
              formData.alasan ===
              'Tergolong fakir/miskin semenjak sebelum Covid-19'
            }
          />
          <label htmlFor='Tergolong'>
            Tergolong fakir/miskin semenjak sebelum Covid-19
          </label>
        </div>
      </fieldset>

      <fieldset className='pernyataan-container'>
        <legend>Pernyataan Kepala Daerah</legend>
        <input
          type='checkbox'
          name='agreement'
          id='agreement'
          checked={formData.agreement}
          onChange={handleChange}
        />
        <label htmlFor='agreement'>
          Saya menyatakan bahwa data yang diisikan adalah benar dan siap
          mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data
          tersebut.
        </label>
      </fieldset>
      <button>Verifikasi</button>
    </FormContainer>
  );
}

export default Form;
