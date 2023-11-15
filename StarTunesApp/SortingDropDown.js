import { SelectList } from 'react-native-dropdown-select-list'

const DropDown = (props) => {
  
  const data = [{key : '1', value : 'song'},{key : '2', value : 'rating'}, {key : '3', value : 'artist'}] ;
  //const [selected,setSelected] = useState('Nothing Selected') ;

  return(
    <SelectList 
        //from https://stackoverflow.com/questions/75397306/react-native-react-native-dropdown-select-list-when-dropdown-is-used-it-moves
        dropdownStyles={{
          backgroundColor: 'white',
          position: 'abolute',
          width: '100%'
        }}
        //Sends out value to sort the song list by
        setSelected={(val) => props.SortBy(val)} 
        data={data} 
        save="value"
    />
  ) ;

}

export default DropDown ;