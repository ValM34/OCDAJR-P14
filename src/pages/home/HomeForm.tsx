import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/userSlice";
import { states } from './statesList';

interface HomeModalProps {
  handleOpen: () => void;
}

function HomeForm(props: HomeModalProps) {
    // @Modal
    const { handleOpen } = props;

    const dispatch = useDispatch();
    
    // @Form
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const dateOfBirthRef = useRef<HTMLInputElement>(null);
    const startDateRef = useRef<HTMLInputElement>(null);
    const streetRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const stateRef = useRef<HTMLInputElement>(null);
    const zipCodeRef = useRef<HTMLInputElement>(null);
    const departmentRef = useRef<HTMLInputElement>(null);
  
    // @Form
    const [age, setAge] = useState('');
    const [age2, setAge2] = useState('');
  
    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
    };
  
    const handleChange2 = (event: SelectChangeEvent) => {
      setAge2(event.target.value as string);
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const employee = {
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        dateOfBirth: dateOfBirthRef.current?.value,
        startDate: startDateRef.current?.value,
        street: streetRef.current?.value,
        city: cityRef.current?.value,
        state: stateRef.current?.value,
        zipCode: zipCodeRef.current?.value,
        department: departmentRef.current?.value,
      }
  
  
      dispatch(userSlice.actions.create(employee));
  
      console.log(employee);
      handleOpen();
    };

  return (
    <form onSubmit={handleSubmit} action="#" id="create-employee">
          <div className="personal-info-input-container">
            <TextField inputRef={firstNameRef} sx={{ width: "100%" }} id="first-name" label="First Name" />
          </div>

          <div className="personal-info-input-container">
            <TextField inputRef={lastNameRef} sx={{ width: "100%" }} id="last-name" label="Last Name" />
          </div>

          <div className="personal-info-input-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date of Birth" inputRef={dateOfBirthRef} />
            </LocalizationProvider>
          </div>

          <div className="personal-info-input-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Start date" inputRef={startDateRef} />
            </LocalizationProvider>
          </div>

          <fieldset className="address">
            <legend>Address</legend>
            <div className="personal-info-input-container">
              <TextField inputRef={streetRef} sx={{ width: "100%" }} id="street" label="Street" />
            </div>

            <div className="personal-info-input-container">
              <TextField inputRef={cityRef} sx={{ width: "100%" }} id="city" label="City" />
            </div>
            
            <div className="personal-info-input-container">
            <FormControl fullWidth>
              <InputLabel id="state-label">State</InputLabel>
              <Select
                inputRef={stateRef}
                sx={{ width: "100%" }}
                labelId="state-label"
                id="state"
                value={age}
                label="State"
                onChange={handleChange}
              >
                <MenuItem value={"Ten2"}>Ten</MenuItem>
                <MenuItem value={"Twenty"}>Twenty</MenuItem>
                <MenuItem value={"Thirty"}>Thirty</MenuItem>
                {states.map((state, i) => (
                  <MenuItem key={i} value={state.abbreviation}>{state.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            </div>

            <div className="personal-info-input-container">
              <TextField inputRef={zipCodeRef} sx={{ width: "100%" }} id="zip-code" label="Zip Code" type="number" />
            </div>
          </fieldset>

          <div className="personal-info-input-container">
            <FormControl fullWidth>
              <InputLabel id="department-label">Department</InputLabel>
              <Select
                inputRef={departmentRef}
                sx={{ width: "100%" }}
                labelId="department-label"
                id="department"
                value={age2}
                label="Department"
                onChange={handleChange2}
              >
                <MenuItem value={"Sales"}>Sales</MenuItem>
                <MenuItem value={"Marketing"}>Marketing</MenuItem>
                <MenuItem value={"Engineering"}>Engineering</MenuItem>
                <MenuItem value={"Human Resources"}>Human Resources</MenuItem>
                <MenuItem value={"Legal"}>Legal</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="submit-button-center">
            <Button variant="contained" type="submit">Save</Button>
          </div>

        </form>
  )
}

export default HomeForm;