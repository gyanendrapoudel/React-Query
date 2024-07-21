import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "./utils";
import { toast } from "react-toastify";

const SingleItem = ({ item }) => {
  const queryClient = useQueryClient()
  const { mutate: editTask } = useMutation({
    mutationFn: (id) => customFetch.patch(`/${id}`, { isDone: item.isDone }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success(data.data.msg)
    },
    onError: (error) => {
      toast.error(error.response.data)
    },
  })
  const {mutate:deleteTask, isLoading}= useMutation({
    mutationFn:(id)=>customFetch.delete(`/${id}`),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['tasks']})
      toast.success("task deleted")
    }

  })
  const handleChange=(id)=>{
   item.isDone=!item.isDone
   editTask(id)   
  }

  const handleDelete = (id)=>{
    deleteTask(id)
  }
  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.isDone}
        onChange={()=>handleChange(item.id)}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className='btn remove-btn'
        type='button'
        disabled={isLoading}
        onClick={() => deleteTask(item.id)}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
