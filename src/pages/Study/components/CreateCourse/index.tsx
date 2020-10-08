import React, { useState } from 'react';
import CourseModal from '../CourseModal';

import { Modal, Button } from 'antd';

export default () => {
  const [modalShow, setModalShow] = useState<boolean>();
  const [modalTitle, setModalTitle] = useState<string>('');
  const [confirmLoading, setConfirmLoading] = useState<boolean>(true);

  return (
    <Modal
      visible={modalShow}
      title={modalTitle}
      confirmLoading={confirmLoading}
    ></Modal>
  );
};
