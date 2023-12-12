import { useTranslation } from "react-i18next";
import AutoDiagV2 from "./../components/AutoDiagV2";

export default function Mag(){
    const {t} = useTranslation('self-diagnosis')
    return (
        <AutoDiagV2 title={t('titles.mag')} rule={'MAG'} t={t}/>
    )
}