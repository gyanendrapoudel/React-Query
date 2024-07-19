import { useQuery } from '@tanstack/react-query';
import SingleItem from './SingleItem';
import customFetch from './utils';
const Items = ({ items }) => {
  const {data, isLoading} = useQuery({
    queryKey:['tasks'],
    queryFn:()=>customFetch.get("/")
  })
  if(isLoading){
    return <div style={{marginTop:'2rem'}}>...Loading</div>
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
