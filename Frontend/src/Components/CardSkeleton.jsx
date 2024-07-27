import React from 'react';
import Skeleton from 'react-loading-skeleton';
import '../Css/CardSkeleton.css'
import '../Css/Feed_mobile.css'

export default function CardSkeleton() {
  return (
    <div className='cardskeleton'>
      <div className="imgskele">
        <Skeleton height={250} width="100%" />
      </div>
      <div className="divskele">
        <Skeleton  style={{marginTop : '15px'}}></Skeleton>
        <Skeleton count={1} height={30} />
        <Skeleton count={3} height={20} width="60%"  style={{marginTop : '5px'}} />
      </div>
    </div>
  );
}
