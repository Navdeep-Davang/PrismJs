'use client';


import dynamic from 'next/dynamic';
// const CodeEditor = dynamic(() => import('@/dir/Components/CodeEditor'), { ssr: false });
import { TextArea } from '@/dir/Components/TextArea';
import TextEditor from '@/dir/Components/TextEditor';

const CodePrism = dynamic(() => import("@/dir/Components/CodePrism"), {
  ssr: false,
});

export default function Home() {
 

  return (
    <div className='flex flex-col justify-center gap-8'>
      <CodePrism/>
      <TextArea/>
      <TextEditor/>
    </div>
  );
}
