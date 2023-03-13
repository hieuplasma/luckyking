import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment/min/moment-with-locales';
import en from './locales/en.json';
import vi from './locales/vi.json';
import {storage} from '../utils';

export const Locale = {
  Vietnamese: 'vi',
  English: 'en',
};

let initialized = false;
i18n.fallbacks = true;
i18n.translations = {vi, en};
i18n.defaultLocale = Locale.Vietnamese;
i18n.locale = Locale.Vietnamese;
moment.locale(Locale.Vietnamese);

export var currentLanguge = Locale.Vietnamese;

export const init = async () => {
  const fallback = () => {
    if (
      RNLocalize.getLocales()[0].languageCode === Locale.Vietnamese ||
      RNLocalize.getLocales()[0].languageCode === Locale.English
    ) {
      currentLanguge = RNLocalize.getLocales()[0].languageCode;
      i18n.defaultLocale = RNLocalize.getLocales()[0].languageCode;
      i18n.locale = RNLocalize.getLocales()[0].languageCode;
      moment.locale(RNLocalize.getLocales()[0].languageCode);
    }
  };

  try {
    const language = await storage.get('currentLocale');
    if (language) {
      await storage.set('currentLocale', 'vi');
      currentLanguge = Locale.Vietnamese;
      i18n.defaultLocale = Locale.Vietnamese;
      i18n.locale = Locale.Vietnamese;
      moment.locale(Locale.Vietnamese);
    } else {
      currentLanguge = RNLocalize.getLocales()[0].languageCode;
      await storage.set('currentLocale', 'vi');
      fallback();
    }
  } catch (error) {
    fallback();
  }
};

export const translate = (...params) => {
  if (!initialized) {
    init();
    initialized = true;
  }
  return i18n.t(...params);
};
