import React, { useEffect, useState } from 'react';
import { getDocuments } from '@/server';
import { singleDocument } from '@/type';

import Document from '../Document';

import styles from './index.less';
export default function DocumentList() {
  const [documentList, setDocumentList] = useState<singleDocument[]>([]);
  useEffect(() => {
    getDocuments({
      courseId: 2,
    }).then(({ data }: { data: singleDocument[] }) => {
      setDocumentList(data);
    });
  }, []);

  const list = documentList?.map(ele => {
    return <Document key={ele.id} {...ele} />;
  });
  return (
    <>
      <div className={styles.documentWrapper}>{list}</div>
    </>
  );
}
