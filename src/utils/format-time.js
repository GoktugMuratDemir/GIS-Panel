/* eslint-disable react-hooks/rules-of-hooks */
import { format, getTime, formatDistanceToNow } from 'date-fns';
import { tr as trTrLocale, enUS as enUsLocale } from 'date-fns/locale';
import { useLocales } from 'src/locales';

const localeOptions = {
 tr: trTrLocale,
 en: enUsLocale,
};

function getLocale(currentLang) {
 return localeOptions[currentLang];
}

function formatDateOrTime(date, defaultFormat, newFormat) {
 const { currentLang } = useLocales();
 const fm = newFormat || defaultFormat;
 const locale = getLocale(currentLang.value);

 return date ? format(new Date(date), fm, { locale }) : '';
}

export function fDate(date, newFormat) {
 return formatDateOrTime(date, 'dd MMM yyyy', newFormat);
}

export function fDateTime(date, newFormat) {
 return formatDateOrTime(date, 'dd MMM yyyy p', newFormat);
}

export function fTimestamp(date) {
 return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
 const { currentLang } = useLocales();
 const locale = getLocale(currentLang.value);

 return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale,
      })
    : '';
}