import { useSelector } from 'react-redux';

import AddEditPhyto from './components/AddEditPhyto';
import PhytoTableBody from './components/PhytoTableBody';
// utils
import { TableBody, TableCell, TableRow } from '@mui/material';
import SearchNotFound from '../../../../../../../components/utils/SearchNotFound';
import RecordsLayoutSearch from '../../../../components/RecordsLayoutSearch';
import { resetFilteredPhyto, setFilteredPhyto } from '../../../../../../../redux/slices/records';
import useRecordsWithSearch from '../../../../hooks/useRecordsWithSearch';
import { getPhyto } from '../../../../utils/getPhyto';

import { useTranslation } from 'react-i18next';

const headLabel = [
    { id: 'lots', label: 'lots', alignRight: false },
    { id: 'type', label: 'type', alignRight: false },
    // { id: 'elaborationType', label: 'elaborationType', alignRight: false },
    { id: 'productName', label: 'productName', alignRight: false },
    // { id: 'brand', label: 'brand', alignRight: false },
    // { id: 'activeSubstance', label: 'activeSubstance Activo', alignRight: false },
    // { id: 'phytoClass', label: 'class', alignRight: false },
    // { id: 'toxicologicType', label: 'toxicologicType', alignRight: false },
    { id: 'appDate', label: 'appDate', alignRight: false },
    { id: 'crop', label: 'crop', alignRight: false },
    // { id: 'cropVariety', label: 'cropVariety', alignRight: false },
    // { id: 'pestToCombat', label: 'pestToCombat', alignRight: false },
    // { id: 'dose', label: 'dose', alignRight: false },
    // { id: 'doseUnit', label: 'doseUnit', alignRight: false },
    // { id: 'machineryUsed', label: 'machineryUsed', alignRight: false },
    { id: 'safetyReturnDate', label: 'safetyReturnDate', alignRight: false },   
    // { id: 'gracePeriod', label: 'gracePeriod', alignRight: false },   
    // { id: 'responsibleName', label: 'responsibleNamev', alignRight: false },  
    { id: 'details', label: 'details', alignRight: false },      
    { id: 'moreMenu', label: '', alignRight: false },
  ];
  
  export default function Phyto() {
    const { t } = useTranslation('records');

    const bcLinks = [
      { name: t('links.home'), href: '/dashboard/main' },
      { name: t('links.historicalRecord'), href: '/dashboard/main/records' },
      { name: t('links.agriculturalProd'), href: '/dashboard/main/records/production' },
      { name: t('links.phyto'), href: '/dashboard/main/records/production/phyto' },
    ];

    const { phyto, currentFarm } = useSelector(state => state.recordsSlice);
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
      getters: [getPhyto],
      data: phyto.data,
      filteredData: phyto.filteredData,
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
        data={phyto.data}
        handleFilter={setFilteredPhyto} // funcion para manejar el filtrado de la tabla
        filterChipLabels={phyto.filter} // aqui poner un objeto que tenga esta estructura {name:'string' value:'string'} esto indica que filtro se esta aplicando
        handleResetFilter={resetFilteredPhyto} // funcion tipo action que viene del store para eliminar el filtro aplicado
        emptyCondicion={Boolean(!phyto.data.length)} // condicion para mostrar en caso de que este la tabla vacia
        fullCondicion={Boolean(phyto.data.length)} // condicion para mostrar en caso de que se tenga datos
        paginationCount={phyto.data.length} // para el paginado de la tabla
        searchPlaceholder={`${t('recordsCommon.searchBy')} ${t('recordsCommon.brand')}`} // placeHolder que tendra el input del buscador
        headTranslate="phytoRecordsInputs." // string que identifica que grupo dentro de records usara el i18 para las traducciones
        pageTitle={t('titles.phyto')} // title que viene en head del html
        GTLabels={{ buttonLabel: t('buttons.addPhyto'), bcTitle: `${t('titles.phyto')} - ${currentFarm.name}`}} // labels para el toolbar
        bcLinks={bcLinks} // array de links que consumira Los breadcums
        headLabel={headLabel} // strings que tendran el head de la tabla de contenido, esta ligado al translategroup
        filterCells={['type']} // introducir array de los ids de las colunmas que contendran la funcion de filtrado
        disableOptions={['lots', 'safetyReturnDate', 'details']} // array de las columnas que no tendran la opcion de ordenamiento
        addEditComponent={<AddEditPhyto edit={false} open={open} onClose={handleClose} />} // componente que contiene el formulario para agregar nuevas filas
        useLots={true}
        lots={currentFarm.lots}
      >
        {currentFarm.lots.length ? <PhytoTableBody fRecords={filtered} page={page} rowsPerPage={rowsPerPage} emptyRows={emptyRows} /> : <></>}
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
  