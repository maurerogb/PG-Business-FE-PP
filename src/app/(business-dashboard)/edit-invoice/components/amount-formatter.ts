export const formatMoneyAmount = (event: any) => {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    // Add commas for every three digits from the right
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    input.value = formattedValue;
}
export const formatQuantity = (event: any) => {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    input.value = value;
}