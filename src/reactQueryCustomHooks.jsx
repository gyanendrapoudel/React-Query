import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import customFetch from "./utils"
import { toast } from "react-toastify"

export const useFetchTasks = ()=>{
 const { data, isLoading, isError, error } = useQuery({
   queryKey: ['tasks'],
   queryFn: () => customFetch.get('/'),
 })
 return {isLoading, isError, data}
}

export const useCreateTask =()=>{
    const queryClient = useQueryClient()
    const { mutate: createTask, isLoading } = useMutation({
      mutationFn: (taskTitle) => customFetch.post('/', { title: taskTitle }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
        toast.success('task added')
        
      },
      onError: (error) => {
        toast.error(error.response.data.msg)
      },
    })
    return {createTask,isLoading}

}
export const useEditTask = ()=>{
    const queryClient = useQueryClient();
    const { mutate: editTask } = useMutation({
    mutationFn: ({taskId,isDone}) => customFetch.patch(`/${taskId}`, { isDone }),
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
        toast.success(data.data.msg)
    },
    onError: (error) => {
        toast.error(error.response.data)
    },
    })
    return {editTask};
}
export const useDeleteTask = ()=>{
     const queryClient = useQueryClient()
     const { mutate: deleteTask, isLoading } = useMutation({
       mutationFn: (id) => customFetch.delete(`/${id}`),
       onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['tasks'] })
         toast.success('task deleted')
       },
     })
     return {deleteTask, isLoading}

}
