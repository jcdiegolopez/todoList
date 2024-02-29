import { useState } from 'react';
import { format, parseISO, parseIso } from 'date-fns';
import { XMarkIcon, PencilIcon, ArrowPathIcon, CheckIcon } from '@heroicons/react/24/outline';

const Task = ({ task, setDone, changeState, setEditable, setNewInfo }) => {
  const date = parseISO(task.fechaEntrega);
  const fechaActual = new Date();
  const fechaFormateada = format(date, 'dd/MM/yyyy', { timeZone: 'America/Guatemala' });

  const [editedTitle, setEditedTitle] = useState(task.titulo);
  const [editedDescription, setEditedDescription] = useState(task.descripcion);
  const [editedDate, setEditedDate] = useState(date.toISOString().split('T')[0]);

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleDateChange = (e) => {
    setEditedDate(e.target.value);
  };

  return (
    <div className="flex m-0.5 md:m-1 bg-stone-900 p-2 rounded-lg w-full">
      <div className="relative overflow-hidden flex flex-col">
        <div className="flex space-x-1 md:space-x-2">
          <div className="flex text-sky-500">
            <XMarkIcon onClick={() => setDone(task.id)} className="justify-self-end w-4 md:w-5 hover:scale-125 duration-300" />
            {!task.edit? <PencilIcon onClick={() => setEditable(task.id)} className="justify-self-end w-3 md:w-4 hover:scale-125 duration-300"/>
             : <CheckIcon onClick={() => setNewInfo(task.id, editedTitle, editedDescription, editedDate)} className=" justify-self-end w-3 md:w-4 hover:scale-125 duration-300" /> }
            
            <ArrowPathIcon onClick={() => changeState(task.id)} className="justify-self-end w-3 md:w-4 hover:scale-125 duration-300" />
          </div>
          {task.edit ? (
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              className="font-semibold uppercase text-xs md:text-base border-b-2 border-stone-700 focus:outline-none bg-stone-900"
            />
          ) : (
            <div className="font-semibold uppercase text-xs md:text-base">{task.titulo}</div>
          )}
        </div>
        <div className={`${fechaActual > date ? 'text-red-600' : 'text-green-500'} text-xs md:text-sm pl-3 md:pl-4 text-red`}>
          {task.edit ? (
            <input
              type="date"
              value={editedDate}
              onChange={handleDateChange}
              className="text-xs md:text-sm focus:outline-none border-b-2 border-stone-700 bg-stone-900"
            />
          ) : (
            fechaFormateada
          )}{' '}
          {task.estado}
        </div>
        {task.edit ? (
          <textarea
            value={editedDescription}
            onChange={handleDescriptionChange}
            className="pl-3 md:pl-4 text-xs md:text-base focus:outline-none h-8 border-b-2 border-stone-700 bg-stone-900"
          />
        ) : (
          <div className="pl-3 md:pl-4 text-xs md:text-base">{task.descripcion}</div>
        )}
      </div>
    </div>
  );
};

export default Task;
