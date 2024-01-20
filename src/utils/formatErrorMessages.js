export const renderErrorMessages = (errorMessages) => {
    const arrayFormatErrors = errorMessages ?  Object.values(errorMessages).map(item=>item[0]) : []
    // console.log(arrayFormatErrors);
    if (arrayFormatErrors?.length === 0) {
        return "Beklenmeyen Bir Hata Oluştu!";
    }
    const combinedErrors = arrayFormatErrors?.join('\n');
    // console.log(combinedErrors);

    return combinedErrors;
}
