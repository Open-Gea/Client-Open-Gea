import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
// Guards
import AuthGuard from '../guards/AuthGuard';
// Components
import LoadingScreen from '../components/utils/LoadingScreen';
import { DashboardAdmin } from '../pages/admin/mainview/';
import { DashboardUser } from '../pages/user/mainview';

// ----------------------------------------------------------------------

const Loadable = Component => props => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return (
    <Routes>
      <Route index element={<Mainview />} />

      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        }
      >
        <Route path="main">
          <Route index element={<DashboardUser />} />
          <Route path="farms" element={<Farms />} />
          <Route path="user-profile" element={<Irrigation2 />} />
          <Route path="carbon-footprint" element={<CarbonFootprint />} />
          <Route path="agronomic-data" element={<AgronomicData />} />
          <Route path="weather-forecast" element={<WeatherForecast />} />
          <Route path="seasonal-forecast" element={<SeasonalForecast />} />
          <Route path="evotranspiration" element={<Evapotranspiration />} />
          <Route path="irrigation" element={<Irrigation />} />
          <Route path="mag" element={<Mag />} />
          <Route path="selectCriterio" element={<SelectCriterio />} />
          <Route path="qr" element={<Qr />} />
          <Route path="soil_regeneration" element={<Soil_Regeneration />} />
          <Route path="smart-planet" element={<SmartPlanet />} />s

          <Route path="records">
            <Route index element={<Records />} />
            {/* farms */}
            <Route path="farm/lots" element={<Lots />} />
            {/* production */}
            <Route path="production/fertilizationRecord" element={<FertilizationRecord />} />
            <Route path="production/bioinputs" element={<BioInputs />} />
            <Route path="production/sowing" element={<Sowing />} />
            <Route path="production/labors" element={<Labors />} />
            <Route path="production/soils" element={<Soils />} />
            <Route path="production/productionInfo" element={<ProdInfo />} />
            <Route path="production/agrochemical" element={<Agrochemical />} />
            <Route path="production/phyto" element={<Phyto />} />
            {/* accounting */}
            <Route path="accounting/performance" element={<Performance />} />
            <Route path="accounting/sales" element={<Sales />} />
            <Route path="accounting/revenuesExpenses" element={<RevenuesExpenses />} />
            {/* staff */}
            <Route path="staff/staffInfo" element={<StaffInfo />} />
            <Route path="staff/suppliers" element={<Suppliers />} />

            <Route path=":page" element={<Records />} />
          </Route>
          <Route path="organizations">
            <Route index element={<Organizations />} />
            <Route path="page/myOrganizations" element={<MyOrganizations />} />
            <Route path="page/requestsInformation" element={<RequestsInformation />} />
            <Route path="page/invitesInformation" element={<InvitesInformationUser />} />
            <Route path=":page" element={<Organizations />} />
          </Route>
          {/* Starting here we add all the routes for cooperative 
              IMPORTANT: Everytime you add a new route for cooperative
              you need to add the new route in routesAllowedByCooperative
              located in AuthGuard line 25.
           */}
          <Route path="myFarms">
            <Route index element={<MyFarms />} />
            <Route path="page/carboonFootprints" element={<CarbonFootprints />} />
            <Route path="page/waterFootprints" element={<WaterFootprints />} />
            <Route path="page/farmsInformation" element={<FarmsInformation />} />
            <Route path="page/agronomicData" element={<AgronomicDataCooperative />} />
            <Route path="page/wateringNeeds" element={<WateringNeedsCooperative />} />
            <Route path=":page" element={<MyFarms />} />
          </Route>
          <Route path="members">
            <Route index element={<MembersManagement />} />
            <Route path="page/myMembers" element={<MyMembers />} />
            <Route path="page/invitesInformation" element={<InvitesInformation />} />
            <Route path="page/requestsInformation" element={<RequestsInformationCooperative />} />
            <Route path=":page" element={<MembersManagement />} />
          </Route>
          <Route path="myOrganization">
            <Route index element={<MyOrganization />} />
            <Route path=":page" element={<MyOrganization />} />
          </Route>
          <Route path="georeferencing" element={<Georeferencing />} />
          <Route path="cooperativeProfile" element={<CooperativeProfile />} />
        </Route>

        <Route path="admin">
          <Route index element={<DashboardAdmin />} />
          <Route path="users" element={<Users />} />
          <Route path="gwpq" element={<Gwpq />} />
          <Route path="ef" element={<Ef />} />
          <Route path="products" element={<Products />} />
          <Route path="countries" element={<Countries />} />
          <Route path="administration">
            <Route index element={<Administration />} />
            <Route path="page/usersInformation" element={<UsersInformation />} />
            <Route path="page/countriesInformation" element={<CountriesInformation />} />
            <Route path=":page" element={<Administration />} />
          </Route>
          <Route path="statistics">
            <Route index element={<Statistics />} />
            <Route path="page/usersPerCountry" element={<UsersPerCountry />} />
            <Route path="page/usersRegisteredPerYear" element={<UsersRegisteredPerYear />} />
            <Route path=":page" element={<Statistics />} />
          </Route>
        </Route>

    
      </Route>

      <Route
        path="login"
        element={
          <AuthGuard>
            <LoginPage />
          </AuthGuard>
        }
      />
      <Route
        path="loginAdmin"
        element={
          <AuthGuard>
            <LoginPageAdmin />
          </AuthGuard>
        }
      />

      <Route
        path="selectRegister"
        element={
          // <AuthGuard>
          <SelectRegister />
          // </AuthGuard>
        }
      />
      <Route
        path="register"
        element={
          // <AuthGuard>
          <Register />
          // </AuthGuard>
        }
      />
      <Route
        path="registerCooperative"
        element={
          // <AuthGuard>
          <RegisterCooperative />
          // </AuthGuard>
        }
      />
      <Route
        path="password-recovery"
        element={
          // <AuthGuard>
          <PasswordRecovery />
          // </AuthGuard>
        }
      />
      <Route
        path="email-verification"
        element={
          <EmailVerification />
        }
      />
      <Route
        path="contact-us"
        element={
          <ContactUs />
        }
      />

      <Route path="qr-view/:id" element={<QRView />} />
      <Route path="404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
// Pages
// Auth
const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
const SelectRegister = Loadable(lazy(() => import('../pages/auth/SelectRegister')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const RegisterCooperative = Loadable(lazy(() => import('../pages/auth/RegisterCooperative')));
const PasswordRecovery = Loadable(lazy(() => import('../pages/auth/PasswordRecovery')));
const EmailVerification = Loadable(lazy(() => import('../pages/auth/EmailVerification')));
const ContactUs = Loadable(lazy(()=> import('../pages/auth/ContactUs')))

// Auth for Administrator 
const LoginPageAdmin = Loadable(lazy(() => import('../pages/auth/LoginPageAdmin')));

// Mainview
const Mainview = Loadable(lazy(() => import('../pages/mainview/Mainview')));

// User
const Farms = Loadable(lazy(() => import('../pages/user/farms')));
const CarbonFootprint = Loadable(lazy(() => import('../pages/user/carbon-footprint/CarbonFootprint')));
const AgronomicData = Loadable(lazy(() => import('../pages/user/agronomic-data/AgronomicData')));
const WeatherForecast = Loadable(lazy(() => import('../pages/user/weather-forecast/WeatherForecast')));
const SeasonalForecast = Loadable(lazy(() => import('../pages/user/seasonal-forecast/SeasonalForecast')));
const Evapotranspiration = Loadable(lazy(() => import('../pages/user/evapotranspiration/Evapotranspiration')));
const Irrigation = Loadable(lazy(() => import('../pages/user/wateringNeedIndex/WateringNeedIndex')));
const Irrigation2 = Loadable(lazy(() => import('../pages/user/userProfile/UserProfile')));
const Autodiag = Loadable(lazy(() => import('../pages/user/autodiag/components/Autodiag')));
const SelectCriterio = Loadable(lazy(() => import('../pages/user/autodiag/SelectCriterio')));
const Qr = Loadable(lazy(() => import('../pages/user/qr')));
const Soil_Regeneration = Loadable(lazy(() => import('../pages/user/soil_regeneration')));
const Records = Loadable(lazy(() => import('../pages/user/records')));
const SmartPlanet = Loadable(lazy(()=> import('../pages/user/autodiag/smart-planet/SmartPlanet')))
const Mag = Loadable(lazy(()=> import('../pages/user/autodiag/mag/Mag')))
// records
// FarmsInfo
const Lots = Loadable(lazy(() => import('../pages/user/records/sections/farmInformation/pages/lots/Lots')));

// AgricultureProd
const FertilizationRecord = Loadable(
  lazy(() => import('../pages/user/records/sections/agriculturalProduction/pages/fertilizationRecord/FertilizationRecord'))
);
const BioInputs = Loadable(lazy(() => import('../pages/user/records/sections/agriculturalProduction/pages/bioinputs/BioInputs')));
const Sowing = Loadable(lazy(() => import('../pages/user/records/sections/agriculturalProduction/pages/sowing/Sowing')));
const Labors = Loadable(
  lazy(() => import('../pages/user/records/sections/agriculturalProduction/pages/labors/Labors'))
);
const Soils = Loadable(lazy(() => import('../pages/user/records/sections/agriculturalProduction/pages/soils/Soils')));
const ProdInfo = Loadable(lazy(()=> import('../pages/user/records/sections/agriculturalProduction/pages/prodInfo/ProdInfo')))
const Agrochemical = Loadable(lazy(()=> import('../pages/user/records/sections/agriculturalProduction/pages/agrochemicals/Agrochemical')))
const Phyto = Loadable(lazy(()=> import('../pages/user/records/sections/agriculturalProduction/pages/phyto/Phyto')))

// Accounting
const Performance = Loadable(lazy(() => import('../pages/user/records/sections/accounting/pages/perform/Performance')));
const Sales = Loadable(lazy(() => import('../pages/user/records/sections/accounting/pages/sales/Sales')));
const RevenuesExpenses = Loadable(lazy(() => import('../pages/user/records/sections/accounting/pages/revenuesExpenses/RevenuesExpenses')));
// Staff
const StaffInfo = Loadable(lazy(() => import('../pages/user/records/sections/staff/pages/staffInfo/StaffInfo')));
const Suppliers = Loadable(lazy(() => import('../pages/user/records/sections/staff/pages/suppliers/Suppliers')));

// organizations
const Organizations = Loadable(lazy(() => import('../pages/user/organizations')));
const RequestsInformation = Loadable(lazy(() => import('../pages/user/organizations/requests-information')));
const InvitesInformationUser = Loadable(lazy(() => import('../pages/user/organizations/invites-information')));
const MyOrganizations = Loadable(lazy(() => import('../pages/user/organizations/my-organizations')));

// Cooperatives
// My Farms
const MyFarms = Loadable(lazy(() => import('../pages/cooperative/my-farms')));
const CarbonFootprints = Loadable(lazy(() => import('../pages/cooperative/my-farms/carboon-footprint/CarbonFootprints')));
const WaterFootprints = Loadable(lazy(() => import('../pages/cooperative/my-farms/water-footprint/Evapotranspiration')));
const FarmsInformation = Loadable(lazy(() => import('../pages/cooperative/my-farms/farmsInformation')));
const AgronomicDataCooperative = Loadable(lazy(() => import('../pages/cooperative/my-farms/agronomic-data/AgronomicData')));
const WateringNeedsCooperative = Loadable(lazy(() => import('../pages/cooperative/my-farms/wateringNeedIndex/WateringNeedIndex')));

// My Members Management
const MembersManagement = Loadable(lazy(() => import('../pages/cooperative/members-management')));
const MyMembers = Loadable(lazy(() => import('../pages/cooperative/members-management/my-members/')));
const InvitesInformation = Loadable(lazy(() => import('../pages/cooperative/members-management/invites-information')));
const RequestsInformationCooperative = Loadable(lazy(() => import('../pages/cooperative/members-management/requests-information')));

// Georeferencing
const Georeferencing = Loadable(lazy(() => import('../pages/cooperative/georeferencing')));

// My Cooperative
const MyOrganization = Loadable(lazy(() => import('../pages/cooperative/my-cooperative')));

// Cooperative Profile
const CooperativeProfile = Loadable(lazy(() => import('../pages/cooperative/cooperative-profile/CooperativeProfile')));

// Admin
// Old Pages
const Users = Loadable(lazy(() => import('../pages/admin/users')));
const Gwpq = Loadable(lazy(() => import('../pages/admin/gwpq/Gwpq')));
const Ef = Loadable(lazy(() => import('../pages/admin/ef/Ef')));
const Products = Loadable(lazy(() => import('../pages/admin/products')));
const Countries = Loadable(lazy(() => import('../pages/admin/countries')));
// Administration
const Administration = Loadable(lazy(() => import('../pages/admin/administration')));
const UsersInformation = Loadable(lazy(() => import('../pages/admin/administration/usersInformation')));
const CountriesInformation = Loadable(lazy(() => import('../pages/admin/administration/countriesInformation')));
// Statistics
const Statistics = Loadable(lazy(() => import('../pages/admin/statistics')));
const UsersPerCountry = Loadable(lazy(() => import('../pages/admin/statistics/usersPerCountry')));
const UsersRegisteredPerYear = Loadable(lazy(() => import('../pages/admin/statistics/usersRegisteredPerYear')));



// Other
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
const QRView = Loadable(lazy(() => import('../pages/user/qr-view')));
