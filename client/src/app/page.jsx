'use client'

import { useState, useEffect } from 'react';
import { ejemploTasks } from '@/app/lib/predata';
import Task from '@/app/ui/Task';
import SearchBar from '@/app/ui/SearchBar';
import axios from "axios";

const API_URL = 'http://localhost:3003';

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/tasks');
        setTasks(response.data);
        applyFilter(response.data, selectedFilter);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, [selectedFilter, tasks]);

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

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const addTask = async () => {
    const date = new Date();
    const newTask = {
      titulo: '',
      descripcion: '',
      fechaEntrega: date.toISOString().split('T')[0],
      estado: 'Todo',
      edit: true,
    };

    try {
      const response = await axios.post('http://localhost:3003/tasks', newTask);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };


  const setDone = async (id) => {
    try {
      
      const response = await axios.put(`http://localhost:3003/tasks/${id}/done`);

    } catch (error) {
      console.error('Error updating task state:', error);
    }
  };

  const changeStateTask = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3003/tasks/${id}/state`);
    } catch (error) {
      console.error('Error updating task state:', error);
    }
  };

  const setEditable = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3003/tasks/${id}/editable`);
    } catch (error) {
      console.error('Error updating task editable state:', error);
    }
  };

  const setNewInfo = async (id, newTitle, newDescription, newDate) => {
    try {
      const response = await axios.put(`http://localhost:3003/tasks/${id}`, {
        titulo: newTitle,
        descripcion: newDescription,
        fechaEntrega: newDate,
        edit: false,
      });

    } catch (error) {
      console.error('Error updating task info:', error);
    }
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
          {filteredTasks.map((task) => task.estado !== 'Done' && <Task setDone={setDone} changeState={changeStateTask} setEditable={setEditable} setNewInfo={setNewInfo} key={task._id} task={task} />)}
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
