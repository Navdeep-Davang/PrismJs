'use client';


import dynamic from 'next/dynamic';
// const CodeEditor = dynamic(() => import('@/dir/Components/CodeEditor'), { ssr: false });

const CodePrism = dynamic(() => import("@/dir/Components/CodePrism"), {
  ssr: false,
});

export default function Home() {
 

  return (
    <div className='flex justify-center'>
      <CodePrism/>
    </div>
  );
}
