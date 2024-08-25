document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.getElementById('jsonInput');
    const submitBtn = document.getElementById('submitBtn');
    const errorElement = document.getElementById('error');
    const dropdownContainer = document.getElementById('dropdownContainer');
    const optionsElement = document.getElementById('options');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsElement = document.getElementById('results');
  
    submitBtn.addEventListener('click', async () => {
      errorElement.textContent = '';
      resultsContainer.classList.add('hidden');
      resultsElement.innerHTML = '';
  
      try {
        const parsedInput = JSON.parse(jsonInput.value);
  
        if (!Array.isArray(parsedInput.data)) {
          throw new Error('Invalid JSON format: "data" should be an array.');
        }
  
        const response = await fetch('https://bfhl-kjgc.onrender.com/bfhl', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parsedInput),
        });
  
        const data = await response.json();
  
        // Show the dropdown and handle selection
        dropdownContainer.classList.remove('hidden');
        optionsElement.addEventListener('change', () => {
          resultsElement.innerHTML = '';
          const selectedOptions = Array.from(optionsElement.selectedOptions).map(option => option.value);
          
          selectedOptions.forEach(option => {
            if (data[option]) {
              const resultDiv = document.createElement('div');
              resultDiv.innerHTML = `
    <h3>Filtered Response</h3>
    <p>${option.charAt(0).toUpperCase() + option.slice(1)}: ${Array.isArray(data[option]) ? data[option].join(', ') : data[option]}</p>
`;

              resultsElement.appendChild(resultDiv);
            }
          });
          resultsContainer.classList.remove('hidden');
        });
      } catch (error) {
        errorElement.textContent = 'Invalid JSON or API error. Please check your input.';
        console.log(error)
      }
    });
  });