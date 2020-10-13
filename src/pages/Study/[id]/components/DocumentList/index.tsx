import React from 'react'
import OneDocument from '../OneDocument'
import { singleDocument } from '@/type/singleDocument'

interface Iprops {
    documentList: singleDocument[]
}

export default function DocumentList(props: Iprops) {
    const list = props.documentList.map((ele, index) => {
        return ( <div key={index}>
            <OneDocument name={ele.name} src={ele.src}/>
        </div> )
    })
    return (
        <>
            {list}
        </>
    )
}
