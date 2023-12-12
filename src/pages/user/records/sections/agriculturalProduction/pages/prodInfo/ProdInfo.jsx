import { useSelector } from 'react-redux';
import AddEditProdInfo from './components/AddEditProdInfo';
import ProdInfoTableBody from './components/ProdInfoTableBody';
// utils
import { getProdInfo } from '../../../../utils/getProdInfo';
import { useTranslation } from 'react-i18next';
import useRecordsWithSearch from '../../../../hooks/useRecordsWithSearch';
import RecordsLayoutSearch from '../../../../components/RecordsLayoutSearch';
import { resetFilteredProdInfo, setFilteredProdInfo } from '../../../../../../../redux/slices/records';
import { TableBody, TableCell, TableRow } from '@mui/material';


const headLabel = [
  { id: 'dateProdInfo', label: 'dateProdInfo', alignRight: false },
  { id: 'agricultural', label: 'agricultural', alignRight: false },
  { id: 'agriculturalHectares', label: 'agriculturalHectares', alignRight: false },
  { id: 'livestock', label: 'livestock', alignRight: false },
  { id: 'livestockHectares', label: 'livestockHectares', alignRight: false },
  { id: 'moreMenu', label: '', alignRight: false },
 ];


export default function ProdInfo() {
  const { prodInfo, currentFarm } = useSelector(state => state.recordsSlice);
  
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
    getters: [getProdInfo],
    data: prodInfo.data,
    filteredData: prodInfo.filteredData,
    searchFilter: 'dateProdInfo',
  });


  const { t } = useTranslation('records');

  const bcLinks = [
    { name: t('links.home'), href: '/dashboard/main' },
    { name: t('links.historicalRecord'), href: '/dashboard/main/records' },
    { name: t('links.agriculturalProd'), href: '/dashboard/main/records/production' },
    { name: t('links.prodInfo'), href: '/dashboard/main/records/production/productionInfo' },
  ];

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
      searchInput={false}
      data={prodInfo.data}
      handleFilter={setFilteredProdInfo} // funcion para manejar el filtrado de la tabla
      filterChipLabels={prodInfo.filter} // aqui poner un objeto que tenga esta estructura {name:'string' value:'string'} esto indica que filtro se esta aplicando
      handleResetFilter={resetFilteredProdInfo} // funcion tipo action que viene del store para eliminar el filtro aplicado
      emptyCondicion={Boolean(!prodInfo.data.length)} // condicion para mostrar en caso de que este la tabla vacia
      fullCondicion={Boolean(prodInfo.data.length)} // condicion para mostrar en caso de que se tenga datos
      paginationCount={prodInfo.data.length} // para el paginado de la tabla
      searchPlaceholder={`${t('recordsCommon.searchBy')} ${t('prodInfoRecordsInputs.crop')}`} // placeHolder que tendra el input del buscador
      headTranslate="prodInfoRecordsInputs." // string que identifica que grupo dentro de records usara el i18 para las traducciones
      pageTitle={t('titles.prodInfo')} // title que viene en head del html
      GTLabels={{ buttonLabel: t('buttons.addProdInfo'), bcTitle: `${t('titles.prodInfo')} - ${currentFarm.name}`}} // labels para el toolbar
      bcLinks={bcLinks} // array de links que consumira Los breadcums
      headLabel={headLabel} // strings que tendran el head de la tabla de contenido, esta ligado al translategroup
      filterCells={[]} // introducir array de los ids de las colunmas que contendran la funcion de filtrado
      disableOptions={['agricultural','livestock']} // array de las columnas que no tendran la opcion de ordenamiento
      addEditComponent={<AddEditProdInfo edit={false} open={open} onClose={handleClose} />} // componente que contiene el formulario para agregar nuevas filas
      useLots={false}
    >
      <ProdInfoTableBody fRecords={filtered} page={page} rowsPerPage={rowsPerPage} emptyRows={emptyRows} />
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
