import { SelectList } from 'react-native-dropdown-select-list'

const DropDown = (props) => {
  
  const data = [{key : '1', value : 'song'},{key : '2', value : 'rating'}, {key : '3', value : 'artist'}] ;
  //const [selected,setSelected] = useState('Nothing Selected') ;

  return(
    <SelectList 
        setSelected={(val) => props.SortBy(val)} 
        data={data} 
        save="value"
    />
  ) ;

}

export default DropDown ;
