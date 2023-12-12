import { useSelector } from 'react-redux';

import AddEditSales from './components/AddEditSales';
import SalesTableBody from './components/SalesTableBody';
// utils
import { TableBody, TableCell, TableRow } from '@mui/material';
import SearchNotFound from '../../../../../../../components/utils/SearchNotFound';
import RecordsLayoutSearch from '../../../../components/RecordsLayoutSearch';
import { resetFilteredSales, setFilteredSales } from '../../../../../../../redux/slices/records';
import useRecordsWithSearch from '../../../../hooks/useRecordsWithSearch';
import { getSales } from '../../../../utils/getSales';

import { useTranslation } from 'react-i18next';

const headLabel = [
  { id: 'saleDate', label: 'Fecha de venta', alignRight: false },
  { id: 'revenue', label: 'Ingresos', alignRight: false },
  { id: 'coin', label: 'Moneda', alignRight: false },
  { id: 'productSold', label: 'Producto', alignRight: false },
  { id: 'weightSold', label: 'Peso', alignRight: false },
  { id: 'unitSold', label: 'Unidad', alignRight: false },
  { id: 'buyerName', label: 'Comprador', alignRight: false },
  { id: 'buyerCountry', label: 'Pais', alignRight: false },
  { id: 'moreMenu', label: '', alignRight: false },
];


export default function Sales() {

  const {t} = useTranslation('records')

  const bcLinks = [
    { name: t('links.home'), href: '/dashboard/main' },
    { name: t('links.historicalRecord'), href: '/dashboard/main/records' },
    { name: t('links.accounting'), href: '/dashboard/main/records/accounting' },
    { name: t('links.sales'), href: '/dashboard/main/records/accounting/sales' },
  ];


  const { sales, currentFarm } = useSelector(state => state.recordsSlice);
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
    getters: [getSales],
    data: sales.data,
    filteredData: sales.filteredData,
    searchFilter: 'buyerName',
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
      data={sales.data}
      handleFilter={setFilteredSales} // funcion para manejar el filtrado de la tabla
      filterChipLabels={sales.filter} // aqui poner un objeto que tenga esta estructura {name:'string' value:'string'} esto indica que filtro se esta aplicando
      handleResetFilter={resetFilteredSales} // funcion tipo action que viene del store para eliminar el filtro aplicado
      emptyCondicion={Boolean(!sales.data.length)} // condicion para mostrar en caso de que este la tabla vacia
      fullCondicion={Boolean(sales.data.length)} // condicion para mostrar en caso de que se tenga datos
      paginationCount={sales.data.length} // para el paginado de la tabla
      searchPlaceholder={`${t('recordsCommon.searchBy')} ${t('forms.buyer')}`} // placeHolder que tendra el input del buscador
      headTranslate="salesRecordsInputs." // string que identifica que grupo dentro de records usara el i18 para las traducciones
      pageTitle={t('titles.sales')} // title que viene en head del html
      GTLabels={{ buttonLabel: t('buttons.addSale'), bcTitle: `${t('titles.sales')} - ${currentFarm.name}` }} // labels para el toolbar
      bcLinks={bcLinks} // array de links que consumira Los breadcums
      headLabel={headLabel} // strings que tendran el head de la tabla de contenido, esta ligado al translategroup
      filterCells={['buyerName', 'buyerCountry']} // introducir array de los ids de las colunmas que contendran la funcion de filtrado
      disableOptions={['coin']} // array de las columnas que no tendran la opcion de ordenamiento
      addEditComponent={<AddEditSales edit={false} open={open} onClose={handleClose} />} // componente que contiene el formulario para agregar nuevas filas
    >
      <SalesTableBody fRecords={filtered} page={page} rowsPerPage={rowsPerPage} emptyRows={emptyRows} />
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
