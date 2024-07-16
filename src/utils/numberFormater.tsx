

export const numberFormat = (event: any) => {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    input.value = value;
}


export const numberWithDecimalFormat = (event: any) => {
    const input = event.target;
    let value = input.value;

    // Remove non-numeric characters except for decimal points
    value = value.replace(/[^\d.]/g, '');

    // Ensure the decimal part has at most 2 decimal places and allow only one decimal point
    const decimalIndex = value.indexOf('.');
    if (decimalIndex !== -1) {
        const integerPart = value.slice(0, decimalIndex);
        const decimalPart = value.slice(decimalIndex + 1).replace(/\./g, ''); // Remove extra decimal points
        value = `${integerPart}.${decimalPart.slice(0, 2)}`;
    }

    const numericValue = parseFloat(value);
    value = isNaN(numericValue) ? '' : value;

    // Update the input value
    input.value = value;
}


export const phoneNumberFormat = (event: any) => {
    const input = event.target
    let value = input.value.replace(/\D/g, "") // Remove non-numeric characters
    input.value = value
}

// export const formatMoneyAmount = (event: any) => {
//     const input = event.target;
//     // let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
//     let value = input.value.replace(/[^\d.]/g, ''); // Remove non-numeric characters except for decimal points

//     // Add commas for every three digits from the right
//     const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

//     input.value = formattedValue;
// }

export const formatMoneyAmount = (event: any) => {
    const input = event.target;
    let value = input.value;

    // Remove non-numeric characters except for decimal points
    value = value.replace(/[^\d.]/g, '');
    // console.log("formatter1: ", value)
    // Split the value into integer and decimal parts
    const parts = value.split('.');
    // console.log("formatter2: ", parts)

    // Format the integer part with commas for every three digits from the right
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Ensure the decimal part has at most 2 decimal places
    if (parts.length === 2) {
        parts[1] = parts[1] ? parts[1].slice(0, 2) : ''; // Take at most 2 decimal places
    }

    // Combine the integer and decimal parts, allowing only one decimal point
    input.value = parts.length === 1 ? parts[0] : `${parts[0]}.${parts[1] || ''}`;
}

export const formatPercentValue = (event: any) => {
    const input = event.target;
    let value = input.value;

    // Remove non-numeric characters except for decimal points
    value = value.replace(/[^\d.]/g, '');

    // Ensure the decimal part has at most 2 decimal places and allow only one decimal point
    const decimalIndex = value.indexOf('.');
    if (decimalIndex !== -1) {
        const integerPart = value.slice(0, decimalIndex);
        const decimalPart = value.slice(decimalIndex + 1).replace(/\./g, ''); // Remove extra decimal points
        value = `${integerPart}.${decimalPart.slice(0, 2)}`;
    }

    // Ensure the value does not exceed 100
    const numericValue = parseFloat(value);
    value = isNaN(numericValue) ? '' : (numericValue <= 100 ? value : '100');

    // Update the input value
    input.value = value;
};


export const formatLetters = (event: any) => {
    const input = event.target;
    let value = input.value.replace(/[^a-zA-Z]/g, ''); // Remove non-alphabetic characters
    input.value = value;
}


export const formatQuantity = (event: any) => {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    input.value = value;
}