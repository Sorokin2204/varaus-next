import React from 'react';
import styles from './AccordionPhotoVideo.module.scss';
import CopyClipBoard from '../../../common/CopyClipBoard/CopyClipBoard';
import Accordion from '../../../common/Accordion/Accordion';
import TabAllPhotos from '../TabAllPhotos/TabAllPhotos';
import Tabs from '../../../common/Tabs/Tabs';
import TabVideo from '../TabVideo/TabVideo';
const AccordionPhotoVideo = () => {
  const photoTabs = [
    { name: 'allPhoto', title: 'Фотографии', content: <TabAllPhotos /> },
    { name: 'noFilterPhoto', title: 'Необработанные фотографии', content: <TabAllPhotos /> },
    { name: 'video', title: 'Видео', content: <TabVideo /> },
  ];
  return (
    <>
      <Accordion title={'Фото и видео'}>
        <Tabs list={photoTabs} />
      </Accordion>
    </>
  );
};

export default AccordionPhotoVideo;
