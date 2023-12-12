import { useSelector } from 'react-redux';

// utils
import { getSowing } from '../../../../utils/getSowing';

import SowingTableBody from './components/SowingTableBody'
import { useTranslation } from 'react-i18next';
import useRecordsWithSearch from '../../../../hooks/useRecordsWithSearch';
import RecordsLayoutSearch from '../../../../components/RecordsLayoutSearch';
import { resetFilteredSowing, setFilteredSowing } from '../../../../../../../redux/slices/records';
import { TableBody, TableCell, TableRow } from '@mui/material';
import SearchNotFound from '../../../../../../../components/utils/SearchNotFound';
import AddEditSowing from './components/AddEditSowing'

const headLabel = [
  { id: 'lot', label: 'lot', alignRight: false },
  { id: 'species', label: 'species', alignRight: false },
  { id: 'varietySown', label: 'varietySown', alignRight: false },
  { id: 'dateOfSowing', label: 'dateOfSowing', alignRight: false },
  { id: 'sowingDensity', label: 'sowingDensity', alignRight: false },
  { id: 'seedsInKg', label: 'seedsInKg', alignRight: false },
  { id: 'sowingOrigin', label: 'sowingOrigin', alignRight: false },
  { id: 'predecessorCrop', label: 'predecessorCrop', alignRight: false },
  { id: 'moreMenu', label: '', alignRight: false },
];

export default function Sowing() {
  const { sowing, currentFarm } = useSelector(state => state.recordsSlice);
  const { t } = useTranslation('records');

  const bcLinks = [
    { name: t('links.home'), href: '/dashboard/main' },
    { name: t('links.historicalRecord'), href: '/dashboard/main/records' },
    { name: t('links.agriculturalProd'), href: '/dashboard/main/records/production' },
    { name: t('links.sowing'), href: '/dashboard/main/records/page/sowing' },
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
    getters: [getSowing],
    data: sowing.data,
    filteredData: sowing.filteredData,
    searchFilter: 'species',
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
      data={sowing.data}
      handleFilter={setFilteredSowing} // funcion para manejar el filtrado de la tabla
      filterChipLabels={sowing.filter} // aqui poner un objeto que tenga esta estructura {name:'string' value:'string'} esto indica que filtro se esta aplicando
      handleResetFilter={resetFilteredSowing} // funcion tipo action que viene del store para eliminar el filtro aplicado
      emptyCondicion={Boolean(!sowing.data.length)} // condicion para mostrar en caso de que este la tabla vacia
      fullCondicion={Boolean(sowing.data.length)} // condicion para mostrar en caso de que se tenga datos
      paginationCount={sowing.data.length} // para el paginado de la tabla
      searchPlaceholder={`${t('recordsCommon.searchBy')} ${t('sowingRecordsInputs.species')}`} // placeHolder que tendra el input del buscador
      headTranslate="sowingRecordsInputs." // string que identifica que grupo dentro de records usara el i18 para las traducciones
      pageTitle={t('titles.sowing')} // title que viene en head del html
      GTLabels={{ buttonLabel: t('buttons.addSowing'), bcTitle: `${t('titles.sowing')} - ${currentFarm.name}`}} // labels para el toolbar
      bcLinks={bcLinks} // array de links que consumira Los breadcums
      headLabel={headLabel} // strings que tendran el head de la tabla de contenido, esta ligado al translategroup
      filterCells={[]} // introducir array de los ids de las colunmas que contendran la funcion de filtrado
      disableOptions={['materialUsed', 'processRegister']} // array de las columnas que no tendran la opcion de ordenamiento
      addEditComponent={<AddEditSowing edit={false} open={open} onClose={handleClose} />} // componente que contiene el formulario para agregar nuevas filas
      useLots={false}
    >
      <SowingTableBody fRecords={filtered} page={page} rowsPerPage={rowsPerPage} emptyRows={emptyRows} />
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





