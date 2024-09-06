// Keep only the emergency diagnosis functionality here
const emergencyDiagnosisBtn = document.getElementById("emergencyDiagnosis");
const emergencySection = document.getElementById("emergencyDiagnosisSystem");
const resultSection = document.getElementById("result");

const symptoms = {
    "headache": { diagnosis: "Tension headache", prescription: "Ibuprofen" },
    "fever": { diagnosis: "Viral infection", prescription: "Acetaminophen" },
    "cough": { diagnosis: "Common cold", prescription: "Cough syrup" },
    "typhoid": { diagnosis: "High fever", prescription: "AntiBiotics" }
    // Add more symptoms and corresponding diagnoses/prescriptions
};

emergencyDiagnosisBtn.addEventListener("click", showEmergencyForm);

function showEmergencyForm() {
    emergencySection.classList.remove("hidden");
    resultSection.classList.add("hidden");
    
    emergencySection.innerHTML = `
        <h2 class="text-xl font-semibold mb-4">Emergency Diagnosis</h2>
        <form id="emergencyForm">
            <div class="mb-4">
                <label for="symptoms" class="block mb-2">Describe your symptoms:</label>
                <textarea id="symptoms" name="symptoms" required class="w-full p-2 border rounded"></textarea>
            </div>
            <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded">Get Diagnosis</button>
        </form>
    `;

    document.getElementById("emergencyForm").addEventListener("submit", performEmergencyDiagnosis);
}

function performEmergencyDiagnosis(event) {
    event.preventDefault();
    const userSymptoms = document.getElementById("symptoms").value.toLowerCase();
    
    let diagnosis = "Unable to determine";
    let prescription = "Please consult a physician";

    for (const [symptom, info] of Object.entries(symptoms)) {
        if (userSymptoms.includes(symptom)) {
            diagnosis = info.diagnosis;
            prescription = info.prescription;
            break;
        }
    }

    resultSection.classList.remove("hidden");
    resultSection.innerHTML = `
        <h2 class="text-xl font-semibold mb-4">Emergency Diagnosis</h2>
        <p><strong>Diagnosis:</strong> ${diagnosis}</p>
        <p><strong>Prescription:</strong> ${prescription}</p>
        <p class="mt-4 text-sm text-gray-600">Please note that this is an automated diagnosis. For severe symptoms, please consult a physician immediately.</p>
    `;
}
