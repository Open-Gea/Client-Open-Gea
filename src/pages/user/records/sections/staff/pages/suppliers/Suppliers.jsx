import { useSelector } from 'react-redux';

import AddEditSuppliers from './components/AddEditSuppliers';
import SuppliersTableBody from './components/SuppliersTableBody';
// utils
import { TableBody, TableCell, TableRow } from '@mui/material';
import SearchNotFound from '../../../../../../../components/utils/SearchNotFound';
import RecordsLayoutSearch from '../../../../components/RecordsLayoutSearch';
import { resetFilteredSuppliers, setFilteredSuppliers } from '../../../../../../../redux/slices/records';
import useRecordsWithSearch from '../../../../hooks/useRecordsWithSearch';
import { getSuppliers } from '../../../../utils/getSuppliers';

import { useTranslation } from 'react-i18next';

const headLabel = [
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'phone', label: 'Telefono', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'service', label: 'Servicio', alignRight: false },
    { id: 'state', label: 'Estado', alignRight: false },
    { id: 'moreMenu', label: '', alignRight: false },
  ];
  
  
  export default function Suppliers() {

    const {t} = useTranslation('records')

    const bcLinks = [
      { name: t('links.home'), href: '/dashboard/main' },
      { name: t('links.historicalRecord'), href: '/dashboard/main/records' },
      { name: t('links.staff'), href: '/dashboard/main/records/staff' },
      { name: t('links.suppliers'), href: '/dashboard/main/records/staff/suppliers' },
    ];

    const { suppliers, currentFarm } = useSelector(state => state.recordsSlice);
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
      getters: [getSuppliers],
      data: suppliers.data,
      filteredData: suppliers.filteredData,
      searchFilter: 'name',
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
        data={suppliers.data}
        handleFilter={setFilteredSuppliers} // funcion para manejar el filtrado de la tabla
        filterChipLabels={suppliers.filter} // aqui poner un objeto que tenga esta estructura {name:'string' value:'string'} esto indica que filtro se esta aplicando
        handleResetFilter={resetFilteredSuppliers} // funcion tipo action que viene del store para eliminar el filtro aplicado
        emptyCondicion={Boolean(!suppliers.data.length)} // condicion para mostrar en caso de que este la tabla vacia
        fullCondicion={Boolean(suppliers.data.length)} // condicion para mostrar en caso de que se tenga datos
        paginationCount={suppliers.data.length} // para el paginado de la tabla
        searchPlaceholder={`${t('recordsCommon.searchBy')} ${t('forms.name')}`} // placeHolder que tendra el input del buscador
        headTranslate="suppliersRecordsInputs." // string que identifica que grupo dentro de records usara el i18 para las traducciones
        pageTitle={t('titles.suppliers')} // title que viene en head del html
        GTLabels={{ buttonLabel: t('buttons.addSupplier'), bcTitle: `${t('titles.suppliers')} - ${currentFarm.name}` }} // labels para el toolbar
        bcLinks={bcLinks} // array de links que consumira Los breadcums
        headLabel={headLabel} // strings que tendran el head de la tabla de contenido, esta ligado al translategroup
        filterCells={['service', 'state']} // introducir array de los ids de las colunmas que contendran la funcion de filtrado
        disableOptions={['phone']} // array de las columnas que no tendran la opcion de ordenamiento
        addEditComponent={<AddEditSuppliers edit={false} open={open} onClose={handleClose} />} // componente que contiene el formulario para agregar nuevas filas
      >
        <SuppliersTableBody fRecords={filtered} page={page} rowsPerPage={rowsPerPage} emptyRows={emptyRows} />
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
  