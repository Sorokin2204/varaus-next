import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { createRoom } from '../../../redux/actions/room/createRoom';
import Accordion from '../../common/Accordion/Accordion';
import CardToggle from '../../common/CardToggle/CardToggle';
import Loading from '../../common/Loading/Loading';
import Select from '../../common/Select/Select';
import Textarea from '../../common/Textarea/Textarea';
import TextInput from '../../common/TextInput/TextInput';
import UploadFile from '../../common/UploadFile/UploadFile';
import AccordionAllSpecs from '../upload/AccordionAllSpecs/AccordionAllSpecs';
import AccordionCommon from '../upload/AccordionCommon/AccordionCommon';
import AccordionFeatures from '../upload/AccordionFeatures/AccordionFeatures';
import AccordionInfographic from '../upload/AccordionInfographic/AccordionInfographic';
import AccordionLinks from '../upload/AccordionLinks/AccordionLinks';
import AccordionManufactures from '../upload/AccordionManufactures/AccordionManufactures';
import AccordionPhotoVideo from '../upload/AccordionPhotoVideo/AccordionPhotoVideo';
import AccordionPromotion from '../upload/AccordionPromotion/AccordionPromotion';
import TabAllPhotos from '../upload/TabAllPhotos/TabAllPhotos';
import { resetCreateRoom, resetGetRoom, resetUpdateRoom } from '../../../redux/slices/roomSlice';
import { updateRoom } from '../../../redux/actions/room/updateRoom';
import axios from 'axios';
export const occupancyOptions = [
  { value: 'one-adults', label: 'Один взрослый' },
  { value: 'two-adults-kid', label: 'Один взрослый + один ребёнок' },
  { value: 'two-adults', label: 'Два взрослых' },
  { value: 'two-adults-kid', label: 'Два взрослых + один ребёнок' },
];
export const roomsCountOptions = [
  { value: 'one-double-bed', label: 'Двуспальная кровать' },
  { value: 'two-double-bed', label: 'Две двуспальных кровать' },
  { value: 'two-double-bed-kids', label: 'Две односпальных кровать +  детская кровать' },
  { value: 'three-double-bed', label: 'Три односпальных кровать' },
];
export const countryOptions = [
  { value: 'argentina', label: 'Аргентина' },
  { value: 'belgium', label: 'Бельгия' },
  { value: 'egypt', label: 'Египет' },
  { value: 'germany', label: 'Германия' },
  { value: 'mexico', label: 'Мексика' },
  { value: 'latvia', label: 'Латвия' },
];
const AddEditRoom = ({ value }) => {
  let defaultValues = {
    name: '',
    slug: '',
    price: '',
    country: '',
    quantityBeds: '',
    quantityPeoples: '',
    area: '',
    shortDesc: '',
    fullDesc: '',
  };

  const dispatch = useDispatch();
  const [saved, setSaved] = useState(false);
  const [uploadPrev, setUploadPrev] = useState();
  const [uploadUrlPrev, setUploadUrlPrev] = useState();
  const [uploadBanner, setUploadBanner] = useState();
  const [uploadUrlBanner, setUploadUrlBanner] = useState();
  const [commonLoading, setCommonLoading] = useState(false);
  console.log(uploadPrev);
  const {
    createRoom: { data, loading },
    updateRoom: { data: dataUpdate, loading: loadingUpdate },
  } = useSelector((state) => state.room);
  const userForm = useForm({ defaultValues });
  const onSubmit = async (dataa) => {
    if (uploadPrev && uploadBanner) {
      setCommonLoading(true);
      if (value) {
        let imgPrev;
        let imgBanner;
        if (typeof uploadPrev === 'string') {
          imgPrev = uploadPrev.substring(uploadPrev.lastIndexOf('/') + 1);
        } else {
          imgPrev = await uploadImage(uploadPrev);
        }
        if (typeof uploadBanner === 'string') {
          imgBanner = uploadBanner.substring(uploadBanner.lastIndexOf('/') + 1);
        } else {
          imgBanner = await uploadImage(uploadBanner);
        }
        dispatch(updateRoom({ ...dataa, id: value?.ID, imgPrev, imgBanner }));
      } else {
        const imgPrev = await uploadImage(uploadPrev);
        const imgBanner = await uploadImage(uploadBanner);
        dispatch(createRoom({ ...dataa, imgPrev, imgBanner }));
      }
    }
  };

  const uploadImage = async (data) => {
    const body = new FormData();
    body.append('file', data);
    const response = await axios.post('/api/file', body);
    return response.data.file;
  };

  useEffect(() => {
    if (dataUpdate) {
      setSaved(true);
      setCommonLoading(false);
      setTimeout(() => {
        Router.push('/admin/rooms');
      }, 1000);
    }
  }, [dataUpdate]);
  useEffect(() => {
    if (data) {
      setSaved(true);
      setTimeout(() => {
        Router.push('/admin/rooms');
      }, 1000);
    }
  }, [data]);
  useEffect(() => {
    return () => {
      dispatch(resetCreateRoom());
      dispatch(resetUpdateRoom());
      dispatch(resetGetRoom());
    };
  }, []);
  const findInList = (value, list) => {
    return list?.find((item) => item?.value == value);
  };
  useEffect(() => {
    if (value) {
      userForm.setValue('name', value?.NAME);
      userForm.setValue('slug', value?.SLUG);
      userForm.setValue('price', value?.PRICE);
      userForm.setValue('country', findInList(value?.COUNTRY, countryOptions));
      userForm.setValue('quantityBeds', findInList(value?.COUNT_BEDS, roomsCountOptions));
      userForm.setValue('quantityPeoples', findInList(value?.COUNT_CUSTOMER, occupancyOptions));
      userForm.setValue('area', value?.AREA);
      userForm.setValue('shortDesc', value?.SHORT_DESC);
      userForm.setValue('fullDesc', value?.FULL_DESC);
      setUploadPrev(`http://localhost:3000/${value?.IMG_PREV}`);
      setUploadUrlPrev(`http://localhost:3000/${value?.IMG_PREV}`);
      setUploadBanner(`http://localhost:3000/${value?.IMG_BANNER}`);
      setUploadUrlBanner(`http://localhost:3000/${value?.IMG_BANNER}`);
    }
  }, [value]);

  return (
    <>
      <div class="card mb-3">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-lg text-capitalize fw-normal">
            {/* <i class="header-icon lnr-pencil me-3 text-muted opacity-6"></i> */}
            Редактирование комнаты
          </div>
          <div class="btn-actions-pane-right actions-icon-btn" style={{ display: 'flex' }}>
            <button
              class=" me-2 btn-icon btn btn-primary"
              onClick={() => {
                Router.push('/admin/rooms');
              }}>
              <i class="lnr-arrow-left btn-icon-wrapper"></i>Назад
            </button>
            {saved ? (
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '37px', background: 'rgba(58, 196, 125,1)', border: '1px solid transparent ', color: '#fff' }} class="me-2 btn-icon btn btn-primary">
                {<img src={'/success-icon-green.svg'} style={{ marginRight: '8px' }} />}
                Сохранено
              </button>
            ) : (
              <button onClick={userForm.handleSubmit(onSubmit)} class=" me-2 btn-icon btn btn-primary">
                <i class="pe-7s-diskette btn-icon-wrapper"></i>Сохранить
              </button>
            )}
          </div>
        </div>
        <div class="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <p>
              <UploadFile label="Превью комнаты" uploadFile={uploadPrev} setUploadFile={setUploadPrev} previewUrl={uploadUrlPrev} setPreviewUrl={setUploadUrlPrev} />
            </p>
            <p>
              <UploadFile uploadFile={uploadBanner} setUploadFile={setUploadBanner} previewUrl={uploadUrlBanner} setPreviewUrl={setUploadUrlBanner} label="Главный баннер комнаты" />
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '8px' }}>
            <TextInput name="name" form={userForm} label="Название" rules={{ required: true }} />
            <TextInput name="slug" form={userForm} label="Слаг" rules={{ required: true }} />
            <TextInput name="price" type="number" form={userForm} label="Цена" rules={{ required: true }} />
          </div>
          <Select form={userForm} name="country" options={countryOptions} label={'Выберите страну'} />

          <Select form={userForm} name="quantityBeds" options={roomsCountOptions} label={'Выберите кол-во кроватей'} />
          <Select form={userForm} name="quantityPeoples" options={occupancyOptions} label={'Выберите размещение'} />
          {/* <Select placeholder={''} options={countryOptions} creatable label={'Выберите страну'} />
          <Select placeholder={''} options={roomsCountOptions} creatable label={'Выберите кол-во кроватей'} />
          <Select placeholder={''} options={occupancyOptions} creatable label={'Выберите размещение'} /> */}

          <TextInput name="area" type="number" form={userForm} label="Площадь комнаты, кв.м" rules={{ required: true }} />
          <Textarea label={'Краткое описание'} form={userForm} name="shortDesc" rules={{ required: true }} />
          <Textarea label={'Полное описание'} form={userForm} name="fullDesc" rules={{ required: true }} />
          <TabAllPhotos />
        </div>
        {(loading || loadingUpdate || commonLoading) && <Loading />}
      </div>
    </>
  );
};
export default AddEditRoom;
