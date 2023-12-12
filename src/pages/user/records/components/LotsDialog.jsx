import { Chip, Dialog, DialogContent, DialogTitle, Slide, Table, TableContainer } from "@mui/material";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import GenericTableHead from "../../../../components/utils/GenericTableHead";
import LotsTableBody from "../sections/farmInformation/pages/lots/components/LotsTableBody";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const headLabel = [
{ id: 'name',  alignRight: false },
{ id: 'location', alignRight: false },
{ id: 'surface', alignRight: false },
{ id: 'characteristics', alignRight: false },
{ id: 'notes', alignRight: false },
];

const LotsDialog = ({lots,openDialog, setOpenDialog,handleClose, currentFarm}) => {
    const {t} = useTranslation('records');

    return (
        <>
        <Chip label={lots.length > 1 ? lots.reduce((a,b)=> `${a.name} - ${b.name}`) : lots[0].name} onClick={() => setOpenDialog(true)} />
        <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
            style: { maxWidth: '95%', width: 'auto' }
            }}
        >
            <DialogTitle>Lots Info</DialogTitle>
            <DialogContent>
                <TableContainer sx={{ minWidth: 600, my: 1, p: 0 }}>
                    <Table stickyHeader>
                        <GenericTableHead t={t} headLabel={headLabel} translateGroup='lotsRecordsInputs.' />
                        <LotsTableBody readOnly={true} lots={lots} currentFarm={currentFarm} page={0} rowsPerPage={lots.length}/>
                    </Table>
            </TableContainer>
            </DialogContent>
        </Dialog>
            
        </>
    )
}

LotsDialog.propTypes = {
    lots: PropTypes.array,
    openDialog: PropTypes.any,
    handleClose: PropTypes.func,
    setOpenDialog: PropTypes.func,
};

export default LotsDialog;