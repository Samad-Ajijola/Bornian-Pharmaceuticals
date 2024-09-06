const physicians = [
    { id: 1, name: "Dr. Smith", specialization: "General Practice", availableDays: ["Monday", "Wednesday", "Friday"] },
    { id: 2, name: "Dr. Johnson", specialization: "Cardiology", availableDays: ["Tuesday", "Thursday"] },
    { id: 3, name: "Dr. Hassan", specialization: "General Practice", availableDays: ["Monday", "Wednesday", "Friday"] },
    { id: 4, name: "Dr. Sadiq", specialization: "Neurology", availableDays: ["Tuesday", "Thursday"] },
    // Add more physicians as needed
];

document.addEventListener("DOMContentLoaded", function() {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
        alert("Please log in to book an appointment.");
        window.location.href = "login.html";
        return;
    }

    const physicianSelect = document.getElementById("physician");
    physicians.forEach(physician => {
        const option = document.createElement("option");
        option.value = physician.id;
        option.textContent = `${physician.name} - ${physician.specialization}`;
        physicianSelect.appendChild(option);
    });

    document.getElementById("appointmentForm").addEventListener("submit", bookAppointment);
});

function bookAppointment(event) {
    event.preventDefault();
    const physicianId = document.getElementById("physician").value;
    const appointmentDate = document.getElementById("appointmentDate").value;

    console.log("Physician ID:", physicianId);
    console.log("Appointment Date:", appointmentDate);
    
    const physician = physicians.find(p => p.id === parseInt(physicianId));
    console.log("Selected Physician:", physician);

    const appointmentDay = new Date(appointmentDate).toLocaleDateString('en-US', { weekday: 'long' });

    if (physician) {
        if (physician.availableDays.includes(appointmentDay)) {
            showBookingSuccess(physician.name, appointmentDate);
        } else {
            alert(`${physician.name} is not available on ${appointmentDay}. Please choose another date.`);
        }
    } else {
        console.error("Physician not found");
        alert("Selected physician is not valid. Please try again.");
    }
}

function showBookingSuccess(physicianName, appointmentDate) {
    console.log("showBookingSuccess called");
    const modal = document.getElementById('successModal');
    if (!modal) {
        console.error("successModal not found");
        return;
    }
    
    // Ensure the modal is visible
    modal.classList.remove('hidden');

    const modalContent = modal.querySelector('.text-sm.text-gray-500');
    if (modalContent) {
        modalContent.textContent = `Your appointment with ${physicianName} is scheduled for ${appointmentDate}.`;
    } else {
        console.error("Modal content element not found");
    }

    // Wait for the next frame to ensure the modal content is updated
    requestAnimationFrame(() => {
        const printButton = modal.querySelector('#printReceiptButton');
        if (!printButton) {
            console.error("printReceiptButton not found");
            return;
        }
        
        console.log("Adding click event listener to printReceiptButton");
        printButton.addEventListener('click', function() {
            console.log("Print button clicked");
            showAppointmentReceipt(physicianName, appointmentDate);
        });
    });
}

function showAppointmentReceipt(physicianName, appointmentDate) {
    console.log("showAppointmentReceipt called");
    const receiptModal = document.getElementById('receiptModal');
    if (!receiptModal) {
        console.error("receiptModal not found");
        return;
    }
    
    const receiptContent = document.getElementById('receiptContent');
    if (!receiptContent) {
        console.error("receiptContent not found");
        return;
    }
    
    receiptContent.innerHTML = `
        <p><strong>Physician:</strong> ${physicianName}</p>
        <p><strong>Date:</strong> ${appointmentDate}</p>
        <p>Thank you for booking with us!</p>
    `;
    
    receiptModal.classList.remove('hidden');

    const closeButton = receiptModal.querySelector('#closeReceiptButton');
    if (!closeButton) {
        console.error("closeReceiptButton not found");
        return;
    }
    
    closeButton.addEventListener('click', function() {
        console.log("Close button clicked");
        receiptModal.classList.add('hidden');
    });
}

// Function to download the receipt
function downloadReceipt() {
    // Get values from the form
    const patientName = document.getElementById('patientName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const physicianId = document.getElementById('physician').value; // Get the physician ID
    const appointmentDate = document.getElementById('appointmentDate').value;

    // Find the physician object by ID
    const physician = physicians.find(p => p.id === parseInt(physicianId));

    // Create receipt content with Tailwind CSS
    const receiptContent = `
        <div class="p-4 border border-gray-300 rounded-lg shadow-md">
            <h2 class="text-xl font-bold mb-2">Appointment Receipt</h2>
            <hr class="mb-4">
            <p class="text-sm"><strong>Patient Name:</strong> ${patientName}</p>
            <p class="text-sm"><strong>Phone Number:</strong> ${phoneNumber}</p>
            <p class="text-sm"><strong>Email:</strong> ${email}</p>
            <p class="text-sm"><strong>Physician:</strong> ${physician ? physician.name : 'Unknown'}</p>
            <p class="text-sm"><strong>Appointment Date:</strong> ${appointmentDate}</p>
        </div>
    `;

    const blob = new Blob([receiptContent], { type: 'text/html' }); // Create a blob with HTML type
    const url = URL.createObjectURL(blob); // Create a URL for the blob
    const a = document.createElement('a'); // Create an anchor element
    a.href = url; // Set the href to the blob URL
    a.download = 'appointment_receipt.html'; // Set the download filename
    document.body.appendChild(a); // Append the anchor to the body
    a.click(); // Programmatically click the anchor to trigger the download
    document.body.removeChild(a); // Remove the anchor from the document
    URL.revokeObjectURL(url); // Release the blob URL
}