import { Box, Chip, MenuItem, Typography } from "@mui/material";
import CircularProgressWithLabel from "../../../../components/circular-progress/CircularProgressWithLabel";
import useResponsive from "../../../../hooks/useResponsive";
import { useState } from "react";
import DialogODS from "./DialogODS";

export default function ODSRow({answersGroup, t, farmId, isLoading}){
    const isDesk = useResponsive('up', 'lg');
    const [open, setOpen] = useState('')

    const {category, desirableCompletedPercentage, minCompletedPercentage, questionsAndAnswers} = answersGroup
    return(
    <Box>
        <MenuItem onClick={()=> setOpen(category.id)} divider={isDesk} sx={{ justifyContent: 'space-between', whiteSpace: 'normal', alignContent: 'center' /* ,border: '1px solid black' */}}>
            <Typography><strong>{category.name}</strong></Typography>
            {isDesk && <Typography maxWidth={'60%'}>{category.description}</Typography>}
            <Box sx={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between', width: '8rem'/* , border: '1px solid black', width: '10rem' */}}>
                <CircularProgressWithLabel value={minCompletedPercentage} title={t('Min')} isLoading={isLoading}/>
                {desirableCompletedPercentage >0 &&<CircularProgressWithLabel value={desirableCompletedPercentage} title={t('Desirable')} isLoading={isLoading}/>}
            </Box>
        </MenuItem>
        {!isDesk &&
        <MenuItem divider sx={{ justifyContent: 'space-between', whiteSpace: 'normal', alignContent: 'center' /* ,border: '1px solid black' */}}>
            <Typography>{category.description}</Typography>
        </MenuItem> 
        }
        <DialogODS open={open} 
        onClose={() => setOpen('')} 
        name={category.name} 
        description={category.description} 
        questionsAndAnswers={questionsAndAnswers} 
        odsId={category.id} 
        t={t}
        rule={category.rule}
        farmId={farmId}
        />
    </Box>
    )
}