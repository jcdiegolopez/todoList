'use client'

import {useState} from 'react';
import {ejemploTasks} from '@/app/lib/predata';
import Task from '@/app/ui/Task';

export default function Page() {
  const [tasks, setTasks] = useState(ejemploTasks); 

  return (
    <main className="flex min-h-screen justify-center p-10 bg-slate-200 text-black">
      <div className="flex flex-col items-center w-[80vw] md:w-[40vw] p-10 bg-stone-950 rounded-lg">
        <h1 className="text-4xl font-black flex space-x-2"><div className="text-white">TODO</div><div className="text-sky-500">LIST</div></h1>
        <div className="m-8 md:m-16 w-[100%] text-slate-100 flex flex-col">
          {tasks.map(task => <Task task={task}/>)}

        </div>
      </div>
    </main>
  );
}
