import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  farms: [],
  currentFarm: {},
  currentLots: [],
  generalInfoForm: {},
  generalInfo: {},
  countries: [
    'Bolivia',
    'Argentina',
    'Costa Rica',
    'Ecuador',
    'Colombia',
    'Chile',
    'Guatemala',
    'México',
    'Belice',
    'El Salvador',
    'Honduras',
  ],
  allLots: [],
  staffInfo: { data: [], filteredData: [], filter: { name: '', value: '' } },
  sales: { data: [], filteredData: [], filter: { name: '', value: '' } },
  agrochemical: {data:[], filteredData:[], filter: {name:'', value:''}},
  suppliers: {data:[], filteredData:[], filter: {name:'', value:''}},
  revenuesExpenses: {data:[], filteredData:[], filter: {name:'', value:''}},
  phyto: {data:[], filteredData:[], filter: {name:'', value:''}},
  fertilizations: {data:[], filteredData:[], filter: {name:'', value:''}},
  bioInputs: {data:[], filteredData:[], filter: {name:'', value:''}},
  labors: { data:[], filteredData:[], filter: {name:'', value:''} },
  soils: { data:[], filteredData:[], filter: {name:'', value:''}  },
  sowing: { data:[], filteredData:[], filter: {name:'', value:''} },
  performance: { data:[], filteredData:[], filter: {name:'', value:''} },
  prodInfo: { data:[], filteredData:[], filter: {name:'', value:''} },
};
const slice = createSlice({
  name: 'recordsSlice',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getFarmsSuccess(state, action) {
      state.isLoading = false;
      state.farms = action.payload;
      state.error = null;
    },
    loadForm(state, action) {
      state.isLoading = false;
      state[action.payload.formName] = action.payload.formData;
    },
    setCurrentLots(state, action) {
      state.currentLots = action.payload;
    },
    setCurrentFarm(state, action) {
      state.currentFarm = action.payload;
    },
    setGeneralInfoEdit(state, action) {
      state.currentFarm.generalInfo.edit = action.payload;
    },
    setLotsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.allLots = action.payload;
    },
    setStaffInfo(state, action) {
      state.isLoading = false;
      state.error = null;
      const staffByFarm = action.payload.data.filter(s => s.farmId.id === state.currentFarm.id);
      state.staffInfo.data = staffByFarm;
      state.staffInfo.filteredData = staffByFarm;
      state.staffInfo.filter = { name: '', value: '' };
    },
    setFilteredStaff(state, action) {
      state.staffInfo.filteredData = action.payload.filtered;
      state.staffInfo.filter = { name: action.payload.param, value: action.payload.paramValue };
    },
    resetFilteredStaff(state) {
      state.staffInfo.filteredData = state.staffInfo.data;
      state.staffInfo.filter = { name: '', value: '' };
    },
    setStaffFilterChip(state, action) {
      state.staffInfo.filter = action.payload;
    },
    setSales(state, action) {
      state.isLoading = false;
      state.error = null;
      const salesByFarm = action.payload.data.filter(s => s.farmId.id === state.currentFarm.id);
      state.sales.data = salesByFarm;
      state.sales.filteredData = salesByFarm;
      state.sales.filter = { name: '', value: '' };
    },
    resetFilteredSales(state) {
      state.sales.filteredData = state.sales.data;
      state.sales.filter = { name: '', value: '' };
    },
    setFilteredSales(state, action) {
      state.sales.filteredData = action.payload.filtered;
      state.sales.filter = { name: action.payload.param, value: action.payload.paramValue };
    },

    setAgrochemical(state, action) {
      state.isLoading = false;
      state.error = null;
      state.agrochemical.data = action.payload.data.filter(a => a.farmId.id === state.currentFarm.id);
      state.agrochemical.filteredData = action.payload.data;
      state.agrochemical.filter = { name: '', value: '' };
    },
    resetFilteredAgrochemical(state) {
      state.agrochemical.filteredData = state.agrochemical.data;
      state.agrochemical.filter = { name: '', value: '' };
    },
    setFilteredAgrochemical(state, action) {
      state.agrochemical.filteredData = action.payload.filtered;
      state.agrochemical.filter = { name: action.payload.param, value: action.payload.paramValue };
    },

    setSuppliers(state, action) {
      state.isLoading = false;
      state.error = null;
      const suppliersByFarm = action.payload.data.filter(s => s.farmId.id === state.currentFarm.id);
      state.suppliers.data = suppliersByFarm;
      state.suppliers.filteredData = suppliersByFarm;
      state.suppliers.filter = { name: '', value: '' };
    },
    resetFilteredSuppliers(state) {
      state.suppliers.filteredData = state.suppliers.data;
      state.suppliers.filter = { name: '', value: '' };
    },
    setFilteredSuppliers(state, action) {
      state.suppliers.filteredData = action.payload.filtered;
      state.suppliers.filter = { name: action.payload.param, value: action.payload.paramValue };
    },

    setRevenuesExpenses(state, action) {
      state.isLoading = false;
      state.error = null;
      const revenuesExpensesByFarm = action.payload.data.filter(r => r.farmId.id === state.currentFarm.id);
      state.revenuesExpenses.data = revenuesExpensesByFarm;
      state.revenuesExpenses.filteredData = revenuesExpensesByFarm;
      state.revenuesExpenses.filter = { name: '', value: '' };
    },
    resetFilteredRevenuesExpenses(state) {
      state.revenuesExpenses.filteredData = state.revenuesExpenses.data;
      state.revenuesExpenses.filter = { name: '', value: '' };
    },
    setFilteredRevenuesExpenses(state, action) {
      state.revenuesExpenses.filteredData = action.payload.filtered;
      state.revenuesExpenses.filter = { name: action.payload.param, value: action.payload.paramValue };
    },
    setPhyto(state, action) {
      state.isLoading = false;
      state.error = null;
      const PhytoByFarm = action.payload.data.filter(r => r.farmId.id === state.currentFarm.id);
      state.phyto.data = PhytoByFarm;
      state.phyto.filteredData = PhytoByFarm;
      state.phyto.filter = { name: '', value: '' };
    },
    resetFilteredPhyto(state) {
      state.phyto.filteredData = state.phyto.data;
      state.phyto.filter = { name: '', value: '' };
    },
    setFilteredPhyto(state, action) {
      state.phyto.filteredData = action.payload.filtered;
      state.phyto.filter = { name: action.payload.param, value: action.payload.paramValue };
    },
    setFertilizations(state, action) {
      state.isLoading = false;
      state.error = null;
      const fertilizationsByFarm = action.payload.data.filter(r => r.farmId.id === state.currentFarm.id);
      state.fertilizations.data = fertilizationsByFarm;
      state.fertilizations.filteredData = fertilizationsByFarm;
      state.fertilizations.filter = { name: '', value: '' };
    },
    resetFilteredFertilizations(state) {
      state.fertilizations.filteredData = state.fertilizations.data;
      state.fertilizations.filter = { name: '', value: '' };
    },
    setFilteredFertilizations(state, action) {
      state.fertilizations.filteredData = action.payload.filtered;
      state.fertilizations.filter = { name: action.payload.param, value: action.payload.paramValue };
    },
    setBioInputs(state, action) {
      state.isLoading = false;
      state.error = null;
      const bioInputsByFarm = action.payload.data.filter(r => r.farmId.id === state.currentFarm.id);
      state.bioInputs.data = bioInputsByFarm;
      state.bioInputs.filteredData = bioInputsByFarm;
      state.bioInputs.filter = { name: '', value: '' };
    },
    resetFilteredBioInputs(state) {
      state.bioInputs.filteredData = state.bioInputs.data;
      state.bioInputs.filter = { name: '', value: '' };
    },
    setFilteredBioInputs(state, action) {
      state.bioInputs.filteredData = action.payload.filtered;
      state.bioInputs.filter = { name: action.payload.param, value: action.payload.paramValue };
    },
    setLabors(state, action) {
      state.isLoading = false;
      state.error = null;
      const laborsByFarm = action.payload.data.filter(r => r.farmId.id === state.currentFarm.id);
      state.labors.data = laborsByFarm;
      state.labors.filteredData = laborsByFarm;
      state.labors.filter = { name: '', value: '' };
    },
    resetFilteredLabors(state) {
      state.labors.filteredData = state.labors.data;
      state.labors.filter = { name: '', value: '' };
    },
    setFilteredLabors(state, action) {
      state.labors.filteredData = action.payload.filtered;
      state.labors.filter = { name: action.payload.param, value: action.payload.paramValue };
    },
    setSoils(state, action) {
      state.isLoading = false;
      state.error = null;
      const soilsByFarm = action.payload.data.filter(r => r.farmId.id === state.currentFarm.id);
      state.soils.data = soilsByFarm;
      state.soils.filteredData = soilsByFarm;
      state.soils.filter = { name: '', value: '' };
    },
    resetFilteredSoils(state) {
      state.soils.filteredData = state.soils.data;
      state.soils.filter = { name: '', value: '' };
    },
    setFilteredSoils(state, action) {
      state.soils.filteredData = action.payload.filtered;
      state.soils.filter = { name: action.payload.param, value: action.payload.paramValue };
    },
    setSowing(state, action) {
      state.isLoading = false;
      state.error = null;
      const sowingByFarm = action.payload.data.filter(r => r.farmId.id === state.currentFarm.id);
      state.sowing.data = sowingByFarm;
      state.sowing.filteredData = sowingByFarm;
      state.sowing.filter = { name: '', value: '' };
    },
    resetFilteredSowing(state) {
      state.sowing.filteredData = state.sowing.data;
      state.sowing.filter = { name: '', value: '' };
    },
    setFilteredSowing(state, action) {
      state.sowing.filteredData = action.payload.filtered;
      state.sowing.filter = { name: action.payload.param, value: action.payload.paramValue };
    },
    setPerformance(state, action) {
      state.isLoading = false;
      state.error = null;
      const performanceByFarm = action.payload.data.filter(r => r.farmId.id === state.currentFarm.id);
      state.performance.data = performanceByFarm;
      state.performance.filteredData = performanceByFarm;
      state.performance.filter = { name: '', value: '' };
    },
    resetFilteredPerformance(state) {
      state.performance.filteredData = state.performance.data;
      state.performance.filter = { name: '', value: '' };
    },
    setFilteredPerformance(state, action) {
      state.performance.filteredData = action.payload.filtered;
      state.performance.filter = { name: action.payload.param, value: action.payload.paramValue };
    },
    setProdInfo(state, action) {
      state.isLoading = false;
      state.error = null;
      const prodInfoByFarm = action.payload.data.filter(r => r.farmId.id === state.currentFarm.id);
      state.prodInfo.data = prodInfoByFarm;
      state.prodInfo.filteredData = prodInfoByFarm;
      state.prodInfo.filter = { name: '', value: '' };
    },
    resetFilteredProdInfo(state) {
      state.prodInfo.filteredData = state.prodInfo.data;
      state.prodInfo.filter = { name: '', value: '' };
    },
    setFilteredProdInfo(state, action) {
      state.prodInfo.filteredData = action.payload.filtered;
      state.prodInfo.filter = { name: action.payload.param, value: action.payload.paramValue };
    },
  },
});

// Reducer
export default slice.reducer;
export const {
  startLoading,
  hasError,
  getFarmsSuccess,
  setLotsSuccess,
  loadForm,
  setCurrentLots,
  setCurrentFarm,
  setGeneralInfoEdit,
  setSoil,
  setStaffInfo,
  setFilteredStaff,
  resetFilteredStaff,
  setStaffFilterChip,
  setSales,
  resetFilteredSales,
  setFilteredSales,
  setAgrochemical,
  resetFilteredAgrochemical,
  setFilteredAgrochemical,
  setSuppliers,
  resetFilteredSuppliers,
  setFilteredSuppliers,
  setRevenuesExpenses,
  resetFilteredRevenuesExpenses,
  setFilteredRevenuesExpenses,
  setPhyto,
  resetFilteredPhyto,
  setFilteredPhyto,
  setFertilizations,
  resetFilteredFertilizations,
  setFilteredFertilizations,
  setBioInputs,
  resetFilteredBioInputs,
  setFilteredBioInputs,
  setLabors,
  resetFilteredLabors,
  setFilteredLabors,
  setSoils,
  resetFilteredSoils,
  setFilteredSoils,
  setSowing,
  resetFilteredSowing,
  setFilteredSowing,
  setPerformance,
  resetFilteredPerformance,
  setFilteredPerformance,
  setProdInfo,
  resetFilteredProdInfo,
  setFilteredProdInfo
} = slice.actions;
// -----------------------------------
export const handleCurrentLots =
  (id, finishLoad = true) =>
  (dispatch, getState) => {
    const { farms } = getState().recordsSlice;
    const currentFarm = farms.find(farm => farm.id === id);
    dispatch(slice.actions.startLoading());
    if (currentFarm) {
      dispatch(slice.actions.setCurrentFarm(currentFarm));
      dispatch(slice.actions.setCurrentLots(currentFarm.lots));
    } else {
      dispatch(slice.actions.setCurrentFarm(null));
      dispatch(slice.actions.setCurrentLots(null));
    }
    if (finishLoad) dispatch(slice.actions.stopLoading());
  };

