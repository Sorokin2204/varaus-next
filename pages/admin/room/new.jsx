import Accordion from '../../../components/common/Accordion/Accordion';
import CardToggle from '../../../components/common/CardToggle/CardToggle';
import Select from '../../../components/common/Select/Select';
import Textarea from '../../../components/common/Textarea/Textarea';
import TextInput from '../../../components/common/TextInput/TextInput';
import UploadFile from '../../../components/common/UploadFile/UploadFile';
import AccordionAllSpecs from '../../../components/pages/upload/AccordionAllSpecs/AccordionAllSpecs';
import AccordionCommon from '../../../components/pages/upload/AccordionCommon/AccordionCommon';
import TabAllPhotos from '../../../components/pages/upload/TabAllPhotos/TabAllPhotos';
import AccordionFeatures from '../../../components/pages/upload/AccordionFeatures/AccordionFeatures';
import AccordionInfographic from '../../../components/pages/upload/AccordionInfographic/AccordionInfographic';
import AccordionLinks from '../../../components/pages/upload/AccordionLinks/AccordionLinks';
import AccordionManufactures from '../../../components/pages/upload/AccordionManufactures/AccordionManufactures';
import AccordionPhotoVideo from '../../../components/pages/upload/AccordionPhotoVideo/AccordionPhotoVideo';
import AccordionPromotion from '../../../components/pages/upload/AccordionPromotion/AccordionPromotion';
import AddEditRoom from '../../../components/pages/room/AddEditRoom';
const Update = () => {
  const occupancyOptions = [
    { value: 'one-adults', label: 'Один взрослый' },
    { value: 'two-adults-kid', label: 'Один взрослый + один ребёнок' },
    { value: 'two-adults', label: 'Два взрослых' },
    { value: 'two-adults-kid', label: 'Два взрослых + один ребёнок' },
  ];
  const roomsCountOptions = [
    { value: 'one-double-bed', label: 'Двуспальная кровать' },
    { value: 'two-double-bed', label: 'Две двуспальных кровать' },
    { value: 'two-double-bed-kids', label: 'Две односпальных кровать +  детская кровать' },
    { value: 'three-double-bed', label: 'Три односпальных кровать' },
  ];
  const countryOptions = [
    { value: 'argentina', label: 'Аргентина' },
    { value: 'belgium', label: 'Бельгия' },
    { value: 'egypt', label: 'Египет' },
    { value: 'germany', label: 'Германия' },
    { value: 'mexico', label: 'Мексика' },
    { value: 'latvia', label: 'Латвия' },
  ];
  const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ];

  return (
    <>
      <AddEditRoom />
    </>
  );
};
export default Update;
