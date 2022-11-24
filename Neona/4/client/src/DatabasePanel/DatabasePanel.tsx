import { FC} from "react"
import { DBType } from "../utils/Dbtypes";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface DatabaseProps{
    handleDbName(name: string) : void;
    handleDbType(name: string) : void;
    databaseDetails : {
        type: string,
        name: string
    };
}


const Database: FC<DatabaseProps> = ({handleDbName, handleDbType, databaseDetails}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent<Element, Event>) => {
        handleDbType((event.target as HTMLInputElement).value);
    };

    return (
        <div>
            <Box sx={{display: 'flex', width: '100%', flexDirection: 'column', mb: 3}}>
                <h3>What database name do you want to connect to?</h3>
                 <TextField id="standard-basic" label="Name" variant="standard" 
                  value={databaseDetails.name}               
                  onChange={(e) => {handleDbName(e.target.value);
                }}/>
            </Box>
           
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">What database name do you want to connect to?</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel 
                        control={<Radio />} 
                        label="Local storage"
                        id={DBType.localdb}
                        name={DBType.localdb}
                        value={DBType.localdb}
                        checked={(databaseDetails.type === DBType.localdb)} 
                        onChange={handleChange} 
                     />
                    <FormControlLabel 
                        control={<Radio />} 
                        label="Indexdb storage" 
                        id={DBType.indexdb}
                        name={DBType.indexdb}
                        value={DBType.indexdb}
                        checked={(databaseDetails.type === DBType.indexdb)} 
                        onChange={handleChange} 
                    />
                    <FormControlLabel 
                        control={<Radio />} 
                        label="Server Storage" 
                        id={DBType.serverdb} 
                        name={DBType.serverdb}
                        value={DBType.serverdb}
                        checked={(databaseDetails.type === DBType.serverdb)} 
                        onChange={handleChange} 
                    />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default Database;
