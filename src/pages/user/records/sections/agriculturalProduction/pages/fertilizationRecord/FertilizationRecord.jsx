import { useSelector } from 'react-redux';

// utils
import { TableBody, TableCell, TableRow } from '@mui/material';
import SearchNotFound from '../../../../../../../components/utils/SearchNotFound';
import RecordsLayoutSearch from '../../../../components/RecordsLayoutSearch';
import useRecordsWithSearch from '../../../../hooks/useRecordsWithSearch';

import { useTranslation } from 'react-i18next';
import { getFertilizations } from '../../../../utils/getFertilizations';
import { resetFilteredFertilizations, setFilteredFertilizations } from '../../../../../../../redux/slices/records';
import FertilizationsTableBody from './components/FertilizationsTableBody';
import AddEditFertilizations from './components/AddEditFertilizations';
//import AddEditFertilizer from './components2/AddEditFertilizer';

const headLabel = [
    { id: 'dateOfUse', label: 'dateOfUse', alignRight: false },
    { id: 'lots', label: 'lots', alignRight: false },
    { id: 'type', label: 'type', alignRight: false },
    { id: 'crop', label: 'crop', alignRight: false },
    { id: 'dosePlant', label: 'dosePlant', alignRight: false },
    { id: 'doseArea', label: 'doseArea', alignRight: false },
    { id: 'responsibleName', label: 'responsibleName', alignRight: false },
    { id: 'details', label: 'details', alignRight: false },
    { id: 'moreMenu', label: '', alignRight: false },
  ];
  
  export default function FertilizationRecords() {
    const { t } = useTranslation('records');

    const bcLinks = [
      { name: t('links.home'), href: '/dashboard/main' },
      { name: t('links.historicalRecord'), href: '/dashboard/main/records' },
      { name: t('links.agriculturalProd'), href: '/dashboard/main/records/production' },
      { name: t('links.fertilizers'), href: '/dashboard/main/records/page/fertilizationRecord' },
    ];

    const { fertilizations, currentFarm } = useSelector(state => state.recordsSlice);
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
      getters: [getFertilizations],
      data: fertilizations.data,
      filteredData: fertilizations.filteredData,
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
        data={fertilizations.data}
        handleFilter={setFilteredFertilizations} // funcion para manejar el filtrado de la tabla
        filterChipLabels={fertilizations.filter} // aqui poner un objeto que tenga esta estructura {name:'string' value:'string'} esto indica que filtro se esta aplicando
        handleResetFilter={resetFilteredFertilizations} // funcion tipo action que viene del store para eliminar el filtro aplicado
        emptyCondicion={Boolean(!fertilizations.data.length)} // condicion para mostrar en caso de que este la tabla vacia
        fullCondicion={Boolean(fertilizations.data.length)} // condicion para mostrar en caso de que se tenga datos
        paginationCount={fertilizations.data.length} // para el paginado de la tabla
        searchPlaceholder={`${t('recordsCommon.searchBy')} ${t('recordsCommon.brand')}`} // placeHolder que tendra el input del buscador
        headTranslate="fertilizationRecordsInputs." // string que identifica que grupo dentro de records usara el i18 para las traducciones
        pageTitle={t('titles.fertilization')} // title que viene en head del html
        GTLabels={{ buttonLabel: t('buttons.addFertilization'), bcTitle: `${t('titles.fertilization')} - ${currentFarm.name}`}} // labels para el toolbar
        bcLinks={bcLinks} // array de links que consumira Los breadcums
        headLabel={headLabel} // strings que tendran el head de la tabla de contenido, esta ligado al translategroup
        filterCells={['crop', 'responsibleName', 'type']} // introducir array de los ids de las colunmas que contendran la funcion de filtrado
        disableOptions={['lots', 'moreInfo', 'details','dateOfUse']} // array de las columnas que no tendran la opcion de ordenamiento
        addEditComponent={<AddEditFertilizations edit={false} open={open} onClose={handleClose} />} // componente que contiene el formulario para agregar nuevas filas
        useLots={true}
        lots={currentFarm.lots}
      >
        {currentFarm.lots.length ? <FertilizationsTableBody fRecords={filtered} page={page} rowsPerPage={rowsPerPage} emptyRows={emptyRows} /> : <></>}
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
  