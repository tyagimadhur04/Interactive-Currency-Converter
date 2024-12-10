document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://v6.exchangerate-api.com/v6/e457ac69b24f23ba2fb48ba5/latest/USD";
    const currencySelect = document.getElementById("currency");
    const convertBtn = document.getElementById("convert-btn");
    const resultDiv = document.getElementById("result");

    // Fetch exchange rates and populate dropdown
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rates = data.conversion_rates;

            // Populate the dropdown with currency options
            for (const currency in rates) {
                const option = document.createElement("option");
                option.value = rates[currency];
                option.textContent = `${currency}`;
                currencySelect.appendChild(option);
            }
        })
        .catch(error => {
            console.error("Error fetching exchange rates:", error);
            resultDiv.textContent = "Failed to load currency data. Please try again later.";
            resultDiv.style.color = "red";
        });

    // Handle conversion
    convertBtn.addEventListener("click", () => {
        const amount = parseFloat(document.getElementById("amount").value);
        const selectedRate = parseFloat(currencySelect.value);

        // Reset result style
        resultDiv.style.color = "#1e3c72";

        if (!amount || !selectedRate) {
            resultDiv.textContent = "❗ Please enter a valid amount and select a currency.";
            resultDiv.style.color = "red";
            return;
        }

        const convertedAmount = (amount * selectedRate).toFixed(2);
        const selectedCurrency = currencySelect.options[currencySelect.selectedIndex].text;

        resultDiv.textContent = `🎉 ${amount} USD = ${convertedAmount} ${selectedCurrency}`;
    });
});
