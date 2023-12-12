import { useSelector } from 'react-redux';

import AddEditRevenuesExpenses from './components/AddEditRevenuesExpenses';
import RevenuesExpensesTableBody from './components/RevenuesExpensesTableBody';
// utils
import { TableBody, TableCell, TableRow } from '@mui/material';
import SearchNotFound from '../../../../../../../components/utils/SearchNotFound';
import RecordsLayoutSearch from '../../../../components/RecordsLayoutSearch';
import { resetFilteredRevenuesExpenses, setFilteredRevenuesExpenses } from '../../../../../../../redux/slices/records';
import useRecordsWithSearch from '../../../../hooks/useRecordsWithSearch';
import { getRevenuesExpenses } from '../../../../utils/getRevenuesExpenses';

import { useTranslation } from 'react-i18next';

const headLabel = [
  { id: 'date', label: 'Fecha', alignRight: false },
  { id: 'type', label: 'Ingreso/Egreso', alignRight: false },
  { id: 'category', label: 'Categoría', alignRight: false },
  { id: 'amount', label: 'Monto', alignRight: false },
  { id: 'coin', label: 'Moneda', alignRight: false },
  { id: 'detail', label: 'Detalle', alignRight: false },
  { id: 'moreMenu', label: '', alignRight: false },
];


export default function RevenuesExpenses() {
  const { revenuesExpenses, currentFarm } = useSelector(state => state.recordsSlice);
  
  const {t} = useTranslation('records')

  const bcLinks = [
    { name: t('links.home'), href: '/dashboard/main' },
    { name: t('links.historicalRecord'), href: '/dashboard/main/records' },
    { name: t('links.accounting'), href: '/dashboard/main/records/accounting' },
    { name: t('links.revenuesExpenses'), href: '/dashboard/main/records/accounting/revenuesExpenses' },
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
    getters: [getRevenuesExpenses],
    data: revenuesExpenses.data,
    filteredData: revenuesExpenses.filteredData,
    searchFilter: 'category',
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
      data={revenuesExpenses.data}
      handleFilter={setFilteredRevenuesExpenses} // funcion para manejar el filtrado de la tabla
      filterChipLabels={revenuesExpenses.filter} // aqui poner un objeto que tenga esta estructura {name:'string' value:'string'} esto indica que filtro se esta aplicando
      handleResetFilter={resetFilteredRevenuesExpenses} // funcion tipo action que viene del store para eliminar el filtro aplicado
      emptyCondicion={Boolean(!revenuesExpenses.data.length)} // condicion para mostrar en caso de que este la tabla vacia
      fullCondicion={Boolean(revenuesExpenses.data.length)} // condicion para mostrar en caso de que se tenga datos
      paginationCount={revenuesExpenses.data.length} // para el paginado de la tabla
      searchPlaceholder={`${t('recordsCommon.searchBy')} ${t('forms.category')}`} // placeHolder que tendra el input del buscador
      headTranslate="revenuesExpensesRecordsInputs." // string que identifica que grupo dentro de records usara el i18 para las traducciones
      pageTitle={t('titles.revenuesExpenses')} // title que viene en head del html
      GTLabels={{ buttonLabel: t('buttons.addRev'), bcTitle: `${t('titles.revenuesExpenses')} - ${currentFarm.name}` }} // labels para el toolbar
      bcLinks={bcLinks} // array de links que consumira Los breadcums
      headLabel={headLabel} // strings que tendran el head de la tabla de contenido, esta ligado al translategroup
      filterCells={['category', 'type']} // introducir array de los ids de las colunmas que contendran la funcion de filtrado
      disableOptions={['detail']} // array de las columnas que no tendran la opcion de ordenamiento
      addEditComponent={<AddEditRevenuesExpenses edit={false} open={open} onClose={handleClose} />} // componente que contiene el formulario para agregar nuevas filas
    >
      <RevenuesExpensesTableBody fRecords={filtered} page={page} rowsPerPage={rowsPerPage} emptyRows={emptyRows} />
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
