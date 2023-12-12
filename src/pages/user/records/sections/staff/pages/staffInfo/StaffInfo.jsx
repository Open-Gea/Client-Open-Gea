import { useSelector } from 'react-redux';

import AddEditStaffInfo from './components/AddEditStaffInfo';
import StaffInfoTableBody from './components/StaffInfoTableBody';
// utils
import { getStaff } from '../../../../utils/getStaff';
import { TableBody, TableCell, TableRow } from '@mui/material';
import SearchNotFound from '../../../../../../../components/utils/SearchNotFound';
import RecordsLayoutSearch from '../../../../components/RecordsLayoutSearch';
import { resetFilteredStaff, setFilteredStaff } from '../../../../../../../redux/slices/records';
import useRecordsWithSearch from '../../../../hooks/useRecordsWithSearch';

import {useTranslation} from 'react-i18next'

const headLabel = [
  { id: 'lastName', label: 'Apellido', alignRight: false },
  { id: 'firstName', label: 'Nombre', alignRight: false },
  { id: 'area', label: 'Area', alignRight: false },
  { id: 'contractType', label: 'Tipo de contrato', alignRight: false },
  {id: 'files', label: 'Documentos', alignRight: false},
  { id: 'moreMenu', label: '', alignRight: false },
];


export default function StaffInfo() {

  const { t } = useTranslation('records');

  const bcLinks = [
    { name: t('links.home'), href: '/dashboard/main' },
    { name: t('links.historicalRecord'), href: '/dashboard/main/records' },
    { name: t('links.staff'), href: '/dashboard/main/records/staff' },
    { name: t('links.staffData'), href: '/dashboard/main/records/staff/staffInfo' },
  ];

  const { staffInfo, currentFarm } = useSelector(state => state.recordsSlice);
  const {
    open,
    page,
    rowsPerPage,
    filtered,
    emptyRows,
    searchName,
    order,
    orderBy,
    isNotFound,
    handleChangeRowsPerPage,
    handleClose,
    handleOpen,
    onPageChange,
    handleRequestSort,
    handleSearchChange,
  } = useRecordsWithSearch({
    getters: [getStaff],
    data: staffInfo.data,
    filteredData: staffInfo.filteredData,
    searchFilter: 'firstName',
  });

  return (
    <RecordsLayoutSearch
      // viene del custom hook
      searchValue={searchName} // estado que se crea en el useRecords
      handleSearchChange={handleSearchChange} // funcion para la busqueda que viene el useRecords
      page={page} // pagia ligado al paginado de la table viene del useRecords
      rowsPerPage={rowsPerPage} // para el paginado de la tabla
      handleChangeRowsPerPage={handleChangeRowsPerPage} // 'para el paginado de la tabla
      onPageChange={onPageChange} // para el paginado de la tabla
      handleOpen={handleOpen} // estado boleano para abrir el modal del formulario
      handleRequestSort={handleRequestSort} // funcion para el ordenamiento de la tabla, viene del useRecords
      order={order} // estado para manejar el ordenado de la tabla viene del useRecords
      orderBy={orderBy} // estado para manejar el ordenado de la tabla viene del useRecords
      // lo que debes editar de acuero al componente
      searchInput={true}
      data={staffInfo.data}
      handleFilter={setFilteredStaff} // funcion para manejar el filtrado de la tabla
      filterChipLabels={staffInfo.filter} // aqui poner un objeto que tenga esta estructura {name:'string' value:'string'} esto indica que filtro se esta aplicando
      handleResetFilter={resetFilteredStaff} // funcion tipo action que viene del store para eliminar el filtro aplicado
      emptyCondicion={Boolean(!staffInfo.data.length)} // condicion para mostrar en caso de que este la tabla vacia
      fullCondicion={Boolean(staffInfo.data.length)} // condicion para mostrar en caso de que se tenga datos
      paginationCount={staffInfo.data.length} // para el paginado de la tabla
      searchPlaceholder={`${t('recordsCommon.searchBy')} ${t('forms.name')}`} // placeHolder que tendra el input del buscador
      headTranslate="staffInfoRecordsInputs." // string que identifica que grupo dentro de records usara el i18 para las traducciones
      pageTitle={t('titles.staffData')} // title que viene en head del html
      GTLabels={{ buttonLabel: t('buttons.addStaff'), bcTitle: `${t('titles.staffData')} - ${currentFarm.name}` }} // labels para el toolbar
      bcLinks={bcLinks} // array de links que consumira Los breadcums
      headLabel={headLabel} // strings que tendran el head de la tabla de contenido, esta ligado al translategroup
      filterCells={['contractType', 'firstName']} // introducir array de los ids de las colunmas que contendran la funcion de filtrado
      disableOptions={['files']} // array de las columnas que no tendran la opcion de ordenamiento
      addEditComponent={<AddEditStaffInfo edit={false} open={open} onClose={handleClose} />} // componente que contiene el formulario para agregar nuevas filas
    >
      <StaffInfoTableBody fRecords={filtered} page={page} rowsPerPage={rowsPerPage} emptyRows={emptyRows} />
      {isNotFound ? (
        <TableBody>
          <TableRow>
            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
              <SearchNotFound searchQuery={searchName} />
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <></>
      )}
    </RecordsLayoutSearch>
  );
}
