import { useSelector } from 'react-redux';

import AddEditPerformance from './components/AddEditPerformance';
import PerformanceTableBody from './components/PerformanceTableBody';
// utils
import { TableBody, TableCell, TableRow } from '@mui/material';
import SearchNotFound from '../../../../../../../components/utils/SearchNotFound';
import RecordsLayoutSearch from '../../../../components/RecordsLayoutSearch';
import { resetFilteredPerformance, setFilteredPerformance } from '../../../../../../../redux/slices/records';
import useRecordsWithSearch from '../../../../hooks/useRecordsWithSearch';
import { getPerformance } from '../../../../utils/getPerformance';

import { useTranslation } from 'react-i18next';

const headLabel = [
  { id: 'lot', label: 'lot', alignRight: false },
  { id: 'estimatedYield', label: 'estimateYield', alignRight: false },
  { id: 'year', label: 'year', alignRight: false },
  { id: 'harvestDate', label: 'harvestDate', alignRight: false },
  { id: 'cultivatedSpecies', label: 'cultivatedSpecies', alignRight: false },
  { id: 'finalYield', label: 'finalYield', alignRight: false },
  { id: 'productDestiny', label: 'productDestiny', alignRight: false },
  { id: 'moreMenu', label: '', alignRight: false },
];


export default function Performance() {

  const {t} = useTranslation('records')

  const bcLinks = [
    { name: t('links.home'), href: '/dashboard/main' },
    { name: t('links.historicalRecord'), href: '/dashboard/main/records' },
    { name: t('links.accounting'), href: '/dashboard/main/records/accounting' },
    { name: t('links.performance'), href: '/dashboard/main/records/page/performance' },
  ];


  const { performance, currentFarm } = useSelector(state => state.recordsSlice);
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
    getters: [getPerformance],
    data: performance.data,
    filteredData: performance.filteredData,
    searchFilter: 'cultivatedSpecies',
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
      data={performance.data}
      handleFilter={setFilteredPerformance} // funcion para manejar el filtrado de la tabla
      filterChipLabels={performance.filter} // aqui poner un objeto que tenga esta estructura {name:'string' value:'string'} esto indica que filtro se esta aplicando
      handleResetFilter={resetFilteredPerformance} // funcion tipo action que viene del store para eliminar el filtro aplicado
      emptyCondicion={Boolean(!performance.data.length)} // condicion para mostrar en caso de que este la tabla vacia
      fullCondicion={Boolean(performance.data.length)} // condicion para mostrar en caso de que se tenga datos
      paginationCount={performance.data.length} // para el paginado de la tabla
      searchPlaceholder={`${t('recordsCommon.searchBy')} ${t('forms.cultivatedSpecies')}`} // placeHolder que tendra el input del buscador
      headTranslate="perfoRecordsInputs." // string que identifica que grupo dentro de records usara el i18 para las traducciones
      pageTitle={t('titles.performance')} // title que viene en head del html
      GTLabels={{ buttonLabel: t('buttons.addPerfo'), bcTitle: `${t('titles.performance')} - ${currentFarm.name}` }} // labels para el toolbar
      bcLinks={bcLinks} // array de links que consumira Los breadcums
      headLabel={headLabel} // strings que tendran el head de la tabla de contenido, esta ligado al translategroup
      filterCells={['year']} // introducir array de los ids de las colunmas que contendran la funcion de filtrado
      disableOptions={['lot']} // array de las columnas que no tendran la opcion de ordenamiento
      addEditComponent={<AddEditPerformance edit={false} open={open} onClose={handleClose} />} // componente que contiene el formulario para agregar nuevas filas
    >
      <PerformanceTableBody fRecords={filtered} page={page} rowsPerPage={rowsPerPage} emptyRows={emptyRows} />
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