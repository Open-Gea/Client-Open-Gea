import { useSelector } from 'react-redux';

// utils
import { getSoils } from '../../../../utils/getSoils';

import SoilsTableBody from './components/SoilsTableBody'
import { useTranslation } from 'react-i18next';
import useRecordsWithSearch from '../../../../hooks/useRecordsWithSearch';
import RecordsLayoutSearch from '../../../../components/RecordsLayoutSearch';
import { resetFilteredSoils, setFilteredSoils } from '../../../../../../../redux/slices/records';
import { TableBody, TableCell, TableRow } from '@mui/material';
import SearchNotFound from '../../../../../../../components/utils/SearchNotFound';
import AddEditSoils from './components/AddEditSoils'

const headLabel = [
  { id: 'year', label: 'Año', alignRight: false },
  { id: 'usage', label: 'Uso', alignRight: false },
  { id: 'lot', label: 'Lote', alignRight: false },
  { id: 'notes', label: 'Notas', alignRight: false },
  { id:'files', label: 'Docs', alignRight:false},
  { id: 'moreMenu', label: '', alignRight: false },
];

export default function Soils() {
  const { soils, currentFarm } = useSelector(state => state.recordsSlice);
  const { t } = useTranslation('records');

  const bcLinks = [
    { name: t('links.home'), href: '/dashboard/main' },
    { name: t('links.historicalRecord'), href: '/dashboard/main/records' },
    { name: t('links.agriculturalProd'), href: '/dashboard/main/records/production' },
    { name: t('links.soilData'), href: '/dashboard/main/records/production/soil' },
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
    getters: [getSoils],
    data: soils.data,
    filteredData: soils.filteredData,
    searchFilter: 'usage',
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
      data={soils.data}
      handleFilter={setFilteredSoils} // funcion para manejar el filtrado de la tabla
      filterChipLabels={soils.filter} // aqui poner un objeto que tenga esta estructura {name:'string' value:'string'} esto indica que filtro se esta aplicando
      handleResetFilter={resetFilteredSoils} // funcion tipo action que viene del store para eliminar el filtro aplicado
      emptyCondicion={Boolean(!soils.data.length)} // condicion para mostrar en caso de que este la tabla vacia
      fullCondicion={Boolean(soils.data.length)} // condicion para mostrar en caso de que se tenga datos
      paginationCount={soils.data.length} // para el paginado de la tabla
      searchPlaceholder={`${t('recordsCommon.searchBy')} ${t('soilsRecordsInputs.usage')}`} // placeHolder que tendra el input del buscador
      headTranslate="soilsRecordsInputs." // string que identifica que grupo dentro de records usara el i18 para las traducciones
      pageTitle={t('titles.soilData')} // title que viene en head del html
      GTLabels={{ buttonLabel: t('buttons.addSoilData'), bcTitle: `${t('titles.soilData')} - ${currentFarm.name}`}} // labels para el toolbar
      bcLinks={bcLinks} // array de links que consumira Los breadcums
      headLabel={headLabel} // strings que tendran el head de la tabla de contenido, esta ligado al translategroup
      filterCells={[]} // introducir array de los ids de las colunmas que contendran la funcion de filtrado
      disableOptions={['notes']} // array de las columnas que no tendran la opcion de ordenamiento
      addEditComponent={<AddEditSoils edit={false} open={open} onClose={handleClose} />} // componente que contiene el formulario para agregar nuevas filas
      useLots={false}
    >
      <SoilsTableBody fRecords={filtered} page={page} rowsPerPage={rowsPerPage} emptyRows={emptyRows} />
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

