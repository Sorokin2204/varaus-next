import React, { useState } from 'react';
import CopyClipBoard from '../../../common/CopyClipBoard/CopyClipBoard';
import UploadFile from '../../../common/UploadFile/UploadFile';

import styles from './TabVideo.module.scss';
const TabVideo = () => {
  return (
    <>
      <CopyClipBoard title={'Ссылка на наш видеообзор'} link={'https://youtu.be/OZj-RvPfnu0'} disabled />
      <CopyClipBoard title={'Ссылка на наше маркетинговое видео'} link={'https://youtu.be/OZj-RvPfnu0'} disabled />
      <CopyClipBoard title={'Ссылка на чужой видеообзор'} link={'https://youtu.be/OZj-RvPfnu0'} disabled />
      <CopyClipBoard title={'Распаковка и включение. Youtube'} link={'https://youtu.be/OZj-RvPfnu0'} disabled />
      <UploadFile label="Распаковка и включение для WB" />
    </>
  );
};

export default TabVideo;
