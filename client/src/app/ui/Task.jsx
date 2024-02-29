import { format } from 'date-fns';

const Task = ({task}) => {
    const date = new Date(task.fechaEntrega);
    const fechaActual = new Date();
    const fechaFormateada = format(date, 'dd/MM/yyyy')

    return(
        <div className="flex m-1 md:m-3">
            <div className="flex flex-col">
                <div className="flex space-x-1 md:space-x-2">
                    <div className="font-black text-sky-500">{task.id}.</div>
                    <div className="font-semibold uppercase">{task.titulo} </div>
                </div>
                <div className={`${fechaActual>date?'text-red-600':'text-green-500'} text-xs pl-5 md:pl-6 text-red`} >
                    {fechaFormateada} {task.estado}
                </div>
                <div className="pl-5 md:pl-6">
                    {task.descripcion}
                </div>
            </div> 
        </div>
    );
}

export default Task;