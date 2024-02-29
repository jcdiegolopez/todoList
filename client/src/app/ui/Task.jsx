// import { format } from 'date-fns';
// import Image from 'next/image';
// import { XMarkIcon, PencilIcon, ArrowPathIcon } from '@heroicons/react/24/outline';


// const Task = ({task, setDone, changeState}) => {
//     const date = new Date(task.fechaEntrega);
//     const fechaActual = new Date();
//     const fechaFormateada = format(date, 'dd/MM/yyyy')

//     return(
//         <div className="flex m-0.5 md:m-1 bg-stone-900 p-1 md:p-2 rounded-lg">
//             <div className="flex flex-col">
//                 <div className="flex space-x-1 md:space-x-2 ">
//                     <div className='flex text-sky-500'>
//                         <XMarkIcon onClick={() => setDone(task.id)} className="justify-self-end w-4 md:w-5 hover:scale-125 duration-300"/>
//                         <PencilIcon className="justify-self-end w-3 md:w-4 hover:scale-125 duration-300"/>
//                         <ArrowPathIcon onClick={() => changeState(task.id)} className="justify-self-end w-3 md:w-4 hover:scale-125 duration-300"/>
//                     </div>
//                     <div className="font-semibold uppercase text-sm md:text-base">{task.titulo}</div>
                    
//                 </div>
//                 <div className={`${fechaActual>date?'text-red-600':'text-green-500'}  text-xs md:text-sm pl-3 md:pl-4 text-red`} >
//                     {fechaFormateada} {task.estado}
//                 </div>
//                 <div className="pl-3 md:pl-4 text-sm md:text-base">
//                     {task.descripcion}
//                 </div>
//             </div> 
//         </div>
//     );
// }

// export default Task;

import { useState } from 'react';
import { format } from 'date-fns';
import { XMarkIcon, PencilIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const Task = ({ task, setDone, changeState, setEditable, setNewInfo }) => {
  const date = new Date(task.fechaEntrega);
  const fechaActual = new Date();
  const fechaFormateada = format(date, 'dd/MM/yyyy');

  // Estado local para manejar la edición del título y descripción
  const [editedTitle, setEditedTitle] = useState(task.titulo);
  const [editedDescription, setEditedDescription] = useState(task.descripcion);

  
  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };


  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  return (
    <div className="flex m-0.5 md:m-1 bg-stone-900 p-2 rounded-lg w-full">
      <div className="relative overflow-hidden flex flex-col">
        <div className="flex space-x-1 md:space-x-2">
          <div className="flex text-sky-500">
            <XMarkIcon onClick={() => setDone(task.id)} className="justify-self-end w-4 md:w-5 hover:scale-125 duration-300" />
            <PencilIcon onClick={!task.edit? () => setEditable(task.id) : () => setNewInfo(task.id,editedTitle, editedDescription)} className="justify-self-end w-3 md:w-4 hover:scale-125 duration-300" />
            <ArrowPathIcon onClick={() => changeState(task.id)} className="justify-self-end w-3 md:w-4 hover:scale-125 duration-300" />
          </div>
          {task.edit ? (
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              className="font-semibold uppercase text-sm md:text-base border-b-2 border-stone-700 focus:outline-none bg-stone-900 "
            />
          ) : (
            <div className="font-semibold uppercase text-sm md:text-base">{task.titulo}</div>
          )}
        </div>
        <div className={`${fechaActual > date ? 'text-red-600' : 'text-green-500'} text-xs md:text-sm pl-3 md:pl-4 text-red`}>
          {fechaFormateada} {task.estado}
        </div>
        {task.edit ? (
          <textarea
            value={editedDescription}
            onChange={handleDescriptionChange}
            className="pl-3 md:pl-4 text-sm md:text-base focus:outline-none border-b-2 border-stone-700 bg-stone-900 "
          />
        ) : (
          <div className="pl-3 md:pl-4 text-sm md:text-base">{task.descripcion}</div>
        )}
      </div>
    </div>
  );
};

export default Task;
