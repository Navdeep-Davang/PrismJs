'use client';


import dynamic from 'next/dynamic';
const CodeEditor = dynamic(() => import('@/dir/Components/CodeEditor'), { ssr: false });

export default function Home() {
 

  return (
    <div className='flex flex-col justify-center gap-8'>
      <CodeEditor/>     
    </div>
  );
}
