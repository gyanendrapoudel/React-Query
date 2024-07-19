import { useQuery } from '@tanstack/react-query';
import SingleItem from './SingleItem';
import customFetch from './utils';
const Items = ({ items }) => {
  const {data, isLoading, isError, error} = useQuery({
    queryKey:['tasks'],
    queryFn:()=>customFetch.get("/something")
  })
  if(isLoading){
    return <div style={{ marginTop: '2rem' }}>Loading...</div>
  }
  // react query error
  // if(isError){
  //   return <div style={{ marginTop: '2rem' }}>There was an error...</div>

  // }
  // axios error
  if(error){
    return <div style={{ marginTop: '2rem' }}>{error.message}</div>
  
  }

  return (
    <div className='items'>
      {data.data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
