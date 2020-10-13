import React, {useState} from 'react'
import { FileTextOutlined } from '@ant-design/icons';
import styles from './index.less'
import { LeftOutlined } from '@ant-design/icons';
import { singleDocument } from '@/type/singleDocument'

export default function OneDocument(props: singleDocument) {
    const [show, setShow] = useState(false);
    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}>
                <FileTextOutlined style={{
                    fontSize: '80px',
                    color: '#2d97b7'
                }}/>
            </div>
            <div className={styles.doc}>
                {props.name}
            </div>
            <div className={styles.online}
                 onClick={() => {
                     setShow(true);
                 }}
            >
                在线预览
            </div>
            {show ? (
                <>
                    <iframe 
                    src={props.src}
                    style={{
                        width: '100%',
                        height: '92%',
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }}
                    ></iframe>
                    <LeftOutlined style={{
                        position: 'fixed',
                        left: '25px',
                        top: '50px',
                        fontSize: '55px',
                        color: '#777'
                    }}
                    onClick={() => {
                        setShow(false);
                    }}
                    />
                </>
            ) : null
            }
        </div>
    )
}
