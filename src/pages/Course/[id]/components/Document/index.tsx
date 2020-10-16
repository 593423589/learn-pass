import React, { useState } from 'react';
import {
  CloseCircleOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileWordOutlined,
  FileUnknownOutlined,
} from '@ant-design/icons';
import { singleDocument } from '@/type';

const getFileIcon = (fileName: string) => {
  const suffixes =
    fileName
      .split('.')
      .pop()
      ?.toLowerCase() || '';

  const WORD_SUFFIXES_LIST = ['doc', 'docx'];
  const PDF_SUFFIXES_LIST = ['ppt', 'pptx', 'pps', 'pot', 'ppa'];
  const PPT_SUFFIXES_LIST = ['pdf'];

  if (WORD_SUFFIXES_LIST.includes(suffixes)) return <FileWordOutlined />;
  if (PDF_SUFFIXES_LIST.includes(suffixes)) return <FilePdfOutlined />;
  if (PPT_SUFFIXES_LIST.includes(suffixes)) return <FilePptOutlined />;
  return <FileUnknownOutlined />;
};

import styles from './index.less';

export default function Document(props: singleDocument) {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <div
        className={styles.document}
        onClick={() => {
          setShow(true);
        }}
      >
        <div className={styles.icon}>{getFileIcon(props.fileName)}</div>
        <div className={styles.info}>
          <span className={styles.name}>{props.name}</span>
          <span className={styles.createTime}>{props.createTime}</span>
        </div>
      </div>
      {show && (
        <div className={styles.fileShow}>
          <iframe
            src={props.url}
            style={{
              width: '100%',
              height: '100%',
              position: 'fixed',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              border: 'none',
              backgroundColor: '#fff',
            }}
          />
          <CloseCircleOutlined
            className={styles.closeIcon}
            onClick={() => {
              setShow(false);
            }}
          />
        </div>
      )}
    </>
  );
}
