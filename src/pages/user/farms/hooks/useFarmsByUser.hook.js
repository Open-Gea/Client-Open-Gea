import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFarms } from "../utils/getFarms";
import { getValidationError } from "../../../../utils/getValidationError";
import { useSnackbar } from "notistack";

export default function useFarmsByUser(user){
    const { farms , isLoading, error } = useSelector(state => state.farmSlice);
    const [farmId, setFarmId] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getFarms(user.id))
    },[dispatch]);

    useEffect(() => {
        if (!isLoading && error) {
          enqueueSnackbar(getValidationError(error), { variant: 'error' });
        }
      }, [error]);
    
      const handleFarmSelect = event => {
        const value = event.target.value;
        setFarmId(value);
      };

    return {farms, farmId, handleFarmSelect, error, isLoading}
}