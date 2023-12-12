import { useSelector } from 'react-redux';

import AddEditAgrochemical from './components/AddEditAgrochemical';
import AgrochemicalTableBody from './components/AgrochemicalTableBody';
// utils
import { TableBody, TableCell, TableRow } from '@mui/material';
import SearchNotFound from '../../../../../../../components/utils/SearchNotFound';
import RecordsLayoutSearch from '../../../../components/RecordsLayoutSearch';
import { resetFilteredAgrochemical, setFilteredAgrochemical } from '../../../../../../../redux/slices/records';
import useRecordsWithSearch from '../../../../hooks/useRecordsWithSearch';
import { getAgrochemical } from '../../../../utils/getAgrochemical';

import { useTranslation } from 'react-i18next';

const headLabel = [
    { id: 'purchaseDate', label: 'Fecha de compra', alignRight: false },
    { id: 'brand', label: 'Marca', alignRight: false },
    { id: 'volume', label: 'Volumen', alignRight: false },
    { id: 'unit', label: 'Unidad', alignRight: false },
    { id: 'activeIngredient', label: 'Ingrediente Activo', alignRight: false },
    { id: 'expirationDate', label: 'Fecha de vencimiento', alignRight: false },
    { id: 'moreMenu', label: '', alignRight: false },
  ];
  
  export default function Agrochemical() {
    const { t } = useTranslation('records');

    const bcLinks = [
      { name: t('links.home'), href: '/dashboard/main' },
      { name: t('links.historicalRecord'), href: '/dashboard/main/records' },
      { name: t('links.agriculturalProd'), href: '/dashboard/main/records/production' },
      { name: t('links.agrochemicals'), href: '/dashboard/main/records/production/agrochemical' },
    ];

    const { agrochemical, currentFarm } = useSelector(state => state.recordsSlice);
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
      getters: [getAgrochemical],
      data: agrochemical.data,
      filteredData: agrochemical.filteredData,
      searchFilter: 'brand',
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
        data={agrochemical.data}
        handleFilter={setFilteredAgrochemical} // funcion para manejar el filtrado de la tabla
        filterChipLabels={agrochemical.filter} // aqui poner un objeto que tenga esta estructura {name:'string' value:'string'} esto indica que filtro se esta aplicando
        handleResetFilter={resetFilteredAgrochemical} // funcion tipo action que viene del store para eliminar el filtro aplicado
        emptyCondicion={Boolean(!agrochemical.data.length)} // condicion para mostrar en caso de que este la tabla vacia
        fullCondicion={Boolean(agrochemical.data.length)} // condicion para mostrar en caso de que se tenga datos
        paginationCount={agrochemical.data.length} // para el paginado de la tabla
        searchPlaceholder={`${t('recordsCommon.searchBy')} ${t('recordsCommon.brand')}`} // placeHolder que tendra el input del buscador
        headTranslate="agrochemicalRecordsInputs." // string que identifica que grupo dentro de records usara el i18 para las traducciones
        pageTitle={t('titles.agrochemicals')} // title que viene en head del html
        GTLabels={{ buttonLabel: t('buttons.addAgrochemical'), bcTitle: `${t('titles.agrochemicals')} - ${currentFarm.name}`}} // labels para el toolbar
        bcLinks={bcLinks} // array de links que consumira Los breadcums
        headLabel={headLabel} // strings que tendran el head de la tabla de contenido, esta ligado al translategroup
        filterCells={['brand', 'unit']} // introducir array de los ids de las colunmas que contendran la funcion de filtrado
        //disableOptions={[]} // array de las columnas que no tendran la opcion de ordenamiento
        addEditComponent={<AddEditAgrochemical edit={false} open={open} onClose={handleClose} />} // componente que contiene el formulario para agregar nuevas filas
      >
        <AgrochemicalTableBody fRecords={filtered} page={page} rowsPerPage={rowsPerPage} emptyRows={emptyRows} />
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
  