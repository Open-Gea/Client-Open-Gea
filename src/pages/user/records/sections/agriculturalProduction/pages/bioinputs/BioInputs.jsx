import { useSelector } from 'react-redux';

//import AddEditBioInputs from './components/AddEditBioInputs';
import BioInputsTableBody from './components/BioInputsTableBody';
// utils
import { TableBody, TableCell, TableRow } from '@mui/material';
import SearchNotFound from '../../../../../../../components/utils/SearchNotFound';
import RecordsLayoutSearch from '../../../../components/RecordsLayoutSearch';
import { resetFilteredBioInputs, setFilteredBioInputs } from '../../../../../../../redux/slices/records';
import useRecordsWithSearch from '../../../../hooks/useRecordsWithSearch';
import { getBioInputs } from '../../../../utils/getBioInputs';

import { useTranslation } from 'react-i18next';
import AddEditBioInputs from './components/AddEditBioInputs';

const headLabel = [
    { id: 'elaborationDate', label: 'elaborationDate', alignRight: false },
    { id: 'expirationDate', label: 'expirationDate', alignRight: false },
    { id: 'name', label: 'name', alignRight: false },
    { id: 'type', label: 'type', alignRight: false },
    { id: 'liquidSolid', label: 'liquidSolid', alignRight: false },
    { id: 'quantityProduced', label: 'quantityProduced', alignRight: false },
    { id: 'productionCost', label: 'productionCost', alignRight: false },
    { id: 'materialUsed', label: 'materialUsed', alignRight: false },
    { id: 'processRegister', label: 'processRegister', alignRight: false },
    { id: 'moreMenu', label: '', alignRight: false },
  
  ];
  
  export default function BioInputs() {
    const { t } = useTranslation('records');

    const bcLinks = [
      { name: t('links.home'), href: '/dashboard/main' },
      { name: t('links.historicalRecord'), href: '/dashboard/main/records' },
      { name: t('links.agriculturalProd'), href: '/dashboard/main/records/production' },
      { name: t('links.bioinputs'), href: '/dashboard/main/records/production/bioinputs' },
    ];

    
    const { bioInputs, currentFarm } = useSelector(state => state.recordsSlice);
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
      getters: [getBioInputs],
      data: bioInputs.data,
      filteredData: bioInputs.filteredData,
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
        data={bioInputs.data}
        handleFilter={setFilteredBioInputs} // funcion para manejar el filtrado de la tabla
        filterChipLabels={bioInputs.filter} // aqui poner un objeto que tenga esta estructura {name:'string' value:'string'} esto indica que filtro se esta aplicando
        handleResetFilter={resetFilteredBioInputs} // funcion tipo action que viene del store para eliminar el filtro aplicado
        emptyCondicion={Boolean(!bioInputs.data.length)} // condicion para mostrar en caso de que este la tabla vacia
        fullCondicion={Boolean(bioInputs.data.length)} // condicion para mostrar en caso de que se tenga datos
        paginationCount={bioInputs.data.length} // para el paginado de la tabla
        searchPlaceholder={`${t('recordsCommon.searchBy')} ${t('bioInputsRecordsInputs.name')}`} // placeHolder que tendra el input del buscador
        headTranslate="bioInputsRecordsInputs." // string que identifica que grupo dentro de records usara el i18 para las traducciones
        pageTitle={t('titles.bioinputs')} // title que viene en head del html
        GTLabels={{ buttonLabel: t('buttons.addBioinput'), bcTitle: `${t('titles.bioinputs')} - ${currentFarm.name}`}} // labels para el toolbar
        bcLinks={bcLinks} // array de links que consumira Los breadcums
        headLabel={headLabel} // strings que tendran el head de la tabla de contenido, esta ligado al translategroup
        filterCells={['type', 'liquidSolid']} // introducir array de los ids de las colunmas que contendran la funcion de filtrado
        disableOptions={['materialUsed', 'processRegister']} // array de las columnas que no tendran la opcion de ordenamiento
        addEditComponent={<AddEditBioInputs edit={false} open={open} onClose={handleClose} />} // componente que contiene el formulario para agregar nuevas filas
        useLots={false}
      >
        <BioInputsTableBody fRecords={filtered} page={page} rowsPerPage={rowsPerPage} emptyRows={emptyRows} />
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
  