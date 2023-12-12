import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const isDevEnvironment = process.env.NODE_ENV === 'development';

i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
        //debug: isDevEnvironment,
		backend: {
			loadPath: "/assets/i18n/{{ns}}/{{lng}}.json",
		},
		// TODO: I'm not sure if fallbackLng should be Spanish, just change it to 'en' if required.
		fallbackLng: "es",
		ns: [
			"agronomic-data",
			"carbon-footprint",
			"common",
			"errors",
			"farms",
			"irrigation",
			"landing-page",
			"navigation",
			"qr",
			"seasonal-forecast",
			"water-footprint",
			"weather-forecast"
		],
		interpolation: {
			espaceValue: false,
			formatSeparator: ",",
		},
		react: {
			wait: true,
		},
	});

export default i18n;
