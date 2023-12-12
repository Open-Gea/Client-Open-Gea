import { useSelector } from 'react-redux';

// utils
import { getLabors } from '../../../../utils/getLabors';

import LaborsTableBody from './components/LaborsTableBody'
import { useTranslation } from 'react-i18next';
import useRecordsWithSearch from '../../../../hooks/useRecordsWithSearch';
import RecordsLayoutSearch from '../../../../components/RecordsLayoutSearch';
import { resetFilteredLabors, setFilteredLabors } from '../../../../../../../redux/slices/records';
import { TableBody, TableCell, TableRow } from '@mui/material';
import SearchNotFound from '../../../../../../../components/utils/SearchNotFound';
import AddEditLabors from './components/AddEditLabors'

const headLabel = [
  { id: 'dateOfLabor', label: 'Fecha de Elaboración', alignRight: false },
  { id: 'lot', label: 'Nombre', alignRight: false },
  { id: 'crop', label: 'Nombre', alignRight: false },
  { id: 'labor', label: 'Tipo', alignRight: false },
  { id: 'personResponsible', label: 'Encargado', alignRight: false },
  { id: 'notes', label: 'Encargado', alignRight: false },
  { id: 'moreMenu', label: '', alignRight: false },
];


export default function Labors() {
  const { labors, currentFarm } = useSelector(state => state.recordsSlice);
  const { t } = useTranslation('records');

  const bcLinks = [
    { name: t('links.home'), href: '/dashboard/main' },
    { name: t('links.historicalRecord'), href: '/dashboard/main/records' },
    { name: t('links.agriculturalProd'), href: '/dashboard/main/records/production' },
    { name: t('links.labors'), href: '/dashboard/main/records/production/labors' },
  ];
  
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
    getters: [getLabors],
    data: labors.data,
    filteredData: labors.filteredData,
    searchFilter: 'crop',
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
      data={labors.data}
      handleFilter={setFilteredLabors} // funcion para manejar el filtrado de la tabla
      filterChipLabels={labors.filter} // aqui poner un objeto que tenga esta estructura {name:'string' value:'string'} esto indica que filtro se esta aplicando
      handleResetFilter={resetFilteredLabors} // funcion tipo action que viene del store para eliminar el filtro aplicado
      emptyCondicion={Boolean(!labors.data.length)} // condicion para mostrar en caso de que este la tabla vacia
      fullCondicion={Boolean(labors.data.length)} // condicion para mostrar en caso de que se tenga datos
      paginationCount={labors.data.length} // para el paginado de la tabla
      searchPlaceholder={`${t('recordsCommon.searchBy')} ${t('laborsRecordsInputs.crop')}`} // placeHolder que tendra el input del buscador
      headTranslate="laborsRecordsInputs." // string que identifica que grupo dentro de records usara el i18 para las traducciones
      pageTitle={t('titles.labors')} // title que viene en head del html
      GTLabels={{ buttonLabel: t('buttons.addLabor'), bcTitle: `${t('titles.labors')} - ${currentFarm.name}`}} // labels para el toolbar
      bcLinks={bcLinks} // array de links que consumira Los breadcums
      headLabel={headLabel} // strings que tendran el head de la tabla de contenido, esta ligado al translategroup
      filterCells={['crop']} // introducir array de los ids de las colunmas que contendran la funcion de filtrado
      disableOptions={['notes']} // array de las columnas que no tendran la opcion de ordenamiento
      addEditComponent={<AddEditLabors edit={false} open={open} onClose={handleClose} />} // componente que contiene el formulario para agregar nuevas filas
      useLots={false}
    >
      <LaborsTableBody fRecords={filtered} page={page} rowsPerPage={rowsPerPage} emptyRows={emptyRows} />
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
