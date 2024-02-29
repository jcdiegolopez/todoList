'use client'

import { useState, useEffect } from 'react';
import { ejemploTasks } from '@/app/lib/predata';
import Task from '@/app/ui/Task';
import SearchBar from '@/app/ui/SearchBar';

export default function Page() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTasks = localStorage.getItem('tasks');
      return storedTasks ? JSON.parse(storedTasks) : ejemploTasks;
    } else {
      return ejemploTasks; 
    }
  });
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [selectedFilter, setSelectedFilter] = useState('All');

  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks)); 
    }
  }, [tasks]);

  const handleSearch = (query) => {
    const filtered = tasks.filter((task) =>
      task.titulo.toLowerCase().includes(query.toLowerCase())
    );
    applyFilter(filtered,selectedFilter);
  };

  const applyFilter = (tasksToFilter, filter) => {
    if (filter === 'All') {
      setFilteredTasks(tasksToFilter);
    } else {
      const filtered = tasksToFilter.filter((task) => task.estado === filter);
      setFilteredTasks(filtered);
    }
  };

  const setDone = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, estado: 'Done' } : task
      );
      applyFilter(updatedTasks,selectedFilter);
      return updatedTasks;
    });
  };

  const changeStateTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id
          ? { ...task, estado: task.estado === 'In Progress' ? 'Todo' : 'In Progress' }
          : task
      );
      applyFilter(updatedTasks,selectedFilter);
      return updatedTasks;
    });
  };

  const setEditable = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, edit: !task.edit } : task
      );
      applyFilter(updatedTasks,selectedFilter);
      return updatedTasks;
    });
  };

  const setNewInfo = (id, newTitle, newDescription, newDate) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id
          ? { ...task, titulo: newTitle, descripcion: newDescription, edit: !task.edit, fechaEntrega: newDate }
          : task
      );
      applyFilter(updatedTasks,selectedFilter);
      return updatedTasks;
    });
  };

  const addTask = () => {
    const date = new Date();
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      titulo: '',
      descripcion: '',
      fechaEntrega: date.toISOString().split('T')[0],
      estado: 'Todo',
      edit: true,
    };

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      applyFilter(updatedTasks,selectedFilter);
      return updatedTasks;
    });
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    applyFilter(tasks, filter);
  };

  return (
    <main className="flex min-h-screen justify-center p-10 bg-slate-200 text-black">
      <div className="flex flex-col items-center w-[80vw] lg:w-[40vw] md:w-[60vw] p-10 bg-stone-950 rounded-lg h-[100%]">
        <h1 className="text-3xl md:text-4xl font-black flex space-x-2">
          <div className="text-white">TODO</div>
          <div className="text-sky-500">LIST</div>
        </h1>

        <div className="m-8 md:m-16 w-[100%] text-slate-100 flex flex-col">
          <SearchBar handleSearch={handleSearch} />
          <div className="flex space-x-3 ">
            <button className={`${selectedFilter === 'All' && 'font-bold'} hover:text-sky-500 duration-300`} onClick={() => handleFilterChange('All')}>All</button>
            <button className={`${selectedFilter === 'In Progress' && 'font-bold'} hover:text-sky-500 duration-300`} onClick={() => handleFilterChange('In Progress')}>In Progress</button>
            <button className={`${selectedFilter === 'Todo' && 'font-bold'} hover:text-sky-500 duration-300`} onClick={() => handleFilterChange('Todo')}>Todo</button>
          </div>
          {filteredTasks.map((task) => task.estado !== 'Done' && <Task setDone={setDone} changeState={changeStateTask} setEditable={setEditable} setNewInfo={setNewInfo} key={task.id} task={task} />)}
          <div
            onClick={addTask}
            className="flex justify-center items-center m-0.5 md:m-1 bg-stone-900 p-2 rounded-lg w-full text-base md:text-xl font-semibold outline-[3px] outline-dotted hover:scale-[1.03] duration-300"
          >
            +
          </div>
        </div>
      </div>
    </main>
  );
}
