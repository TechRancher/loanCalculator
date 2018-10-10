// Listen for submit
document.getElementById("loan-form").addEventListener("submit", calculateResults);
document.getElementById("resetBTN").addEventListener("click", formReset);

// Calculate Results
function calculateResults(e){
  // UI Vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;
  

  // Compute Monthly Payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if(isFinite(monthly)) {
    // Hide Results
    document.getElementById("results").style.display = "none";
    
    // Show loader
    document.getElementById("loading").style.display = "block";

    setTimeout(showResults, 2000);
    
  } else {
    showError('Please check your Numbers');
  }
  function showResults(){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show results
    document.getElementById("results").style.display = "block";

    // Hide Loader
    document.getElementById("loading").style.display = "none";
  };
  e.preventDefault();
};

function showError(error) {
  // Hide results
  document.getElementById("results").style.display = "none";

  // Hide Loader
  document.getElementById("loading").style.display = "none";

  // Create a div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  //Create text node append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
};

// Clear Error function
function clearError() {
  document.querySelector(".alert").remove();
};


// Reset form Function
function formReset(){
  // Clearing the form fields
  document.getElementById("amount").value = "";
  document.getElementById("interest").value = "";
  document.getElementById("years").value = "";

  // Hide Results
  document.getElementById("results").style.display = "none";
    
  // Hide loader
  document.getElementById("loading").style.display = "none";
};