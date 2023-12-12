import { useTranslation } from "react-i18next";
import AutoDiagV2 from "../components/AutoDiagV2";

export default function SmartPlanet(){
    const {t} = useTranslation('self-diagnosis')
    return (
        <AutoDiagV2 title={t('titles.smartPlanet')} rule={'SMART_PLANET'} t={t}/>
    )
}