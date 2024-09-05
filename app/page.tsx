import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl mb-7 font-bold ">샘플</h1>
      <div className="flex flex-col gap-4 ">
        <Link href={'/pingpong'}>
          <div>핑퐁 게임</div>
        </Link>
        <Link href={'/ruler'}>
          <div>30CM자</div>
        </Link>
        <Link href={'/status_of_water'}>
          <div>물의상태</div>
        </Link>
        <Link href={'/naruto'}>
          <div>나루토점프</div>
        </Link>
        {/* <Link href={'/puzzle'}>
          <div>퍼즐</div>
        </Link> */}
      </div>
    </div>
  );
};

export default page;
