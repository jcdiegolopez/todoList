'use client'

import {useState} from 'react';
import {ejemploTasks} from '@/app/lib/predata';
import Task from '@/app/ui/Task';

export default function Page() {
  const [tasks, setTasks] = useState(ejemploTasks);

  const setDone = (id) => {
    setTasks(p => 
      p.map(task =>  
        task.id === id ? {...task,estado:'Done'}: task )
    
    );
  }

  const changeStateTask = (id) => {
    setTasks(p => 
      p.map(task =>  
        task.id === id ? {...task,estado:task.estado === 'In Progress'? 'Todo': 'In Progress'}: task )
    
    );
  }

  const setEditable = (id) => {
    setTasks(p => 
      p.map(task =>  
        task.id === id ? {...task,edit:!task.edit}: task )
    );
  }

  const setNewInfo= (id, newTitle, newDescription) => {
    setTasks(p => 
      p.map(task =>  
        task.id === id ? {...task,titulo: newTitle, descripcion: newDescription,edit:!task.edit}: task )
    );
  }

  return (
    <main className="flex min-h-screen justify-center p-10 bg-slate-200 text-black">
      <div className="flex flex-col items-center w-[80vw] lg:w-[40vw] md:w-[60vw] p-10 bg-stone-950 rounded-lg">
        <h1 className="text-3xl md:text-4xl font-black flex space-x-2"><div className="text-white">TODO</div><div className="text-sky-500">LIST</div></h1>
        <div className="m-8 md:m-16 w-[100%] text-slate-100 flex flex-col">
          {tasks.map(task => task.estado!='Done' && <Task setDone={setDone} changeState={changeStateTask} setEditable={setEditable} setNewInfo={setNewInfo} key={task.id} task={task}/>)}
          
        </div>
      </div>
    </main>
  );
}
