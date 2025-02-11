'use client';


import dynamic from 'next/dynamic';
const MonacoEditor = dynamic(() => import('@/dir/Components/MonacoEditor'), { ssr: false });

export default function Home() {
 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <MonacoEditor/>     
    </div>
  );
}
