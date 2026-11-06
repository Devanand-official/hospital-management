/* =========================
   DOCTOR DATA
========================= */

const bookingDoctors = [
  { id: 1, name: "Dr. Arun Kumar", specialty: "Cardiology", fee: 800 },
  { id: 2, name: "Dr. Priya Sharma", specialty: "Pediatrics", fee: 600 },
  { id: 3, name: "Dr. Michael Raj", specialty: "Neurology", fee: 1000 },
  { id: 4, name: "Dr. Sneha Reddy", specialty: "Orthopedics", fee: 700 },
  { id: 5, name: "Dr. Rahul Menon", specialty: "Dermatology", fee: 750 },
  { id: 6, name: "Dr. Kavitha Iyer", specialty: "General Medicine", fee: 500 },
];

/* =========================
   ELEMENTS
========================= */

const appointmentForm = document.getElementById("appointmentForm");
const doctorSelect = document.getElementById("doctorSelect");
const appointmentDate = document.getElementById("appointmentDate");
const bookingMessage = document.getElementById("bookingMessage");

/* =========================
   POPULATE DOCTOR SELECT
========================= */

function populateDoctors() {
  bookingDoctors.forEach((doctor) => {
    const option = document.createElement("option");

    option.value = doctor.id;

    option.textContent = `${doctor.name} - ${doctor.specialty} (₹${doctor.fee})`;

    doctorSelect.appendChild(option);
  });
}

/* =========================
   SET MINIMUM DATE
========================= */

function setMinimumDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  appointmentDate.min = `${year}-${month}-${day}`;
}

/* =========================
   PREFILL DOCTOR
========================= */

function prefillDoctor() {
  const params = new URLSearchParams(window.location.search);

  const doctorId = params.get("doctorId");

  if (
    doctorId &&
    bookingDoctors.some((doctor) => doctor.id === Number(doctorId))
  ) {
    doctorSelect.value = doctorId;
  }
}

/* =========================
   SHOW MESSAGE
========================= */

function showMessage(message, type) {
  bookingMessage.textContent = message;

  bookingMessage.className = `booking-message ${type}`;

  bookingMessage.hidden = false;

  bookingMessage.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}

/* =========================
   HANDLE FORM SUBMISSION
========================= */

appointmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const patientName = document.getElementById("patientName").value.trim();
  const patientEmail = document.getElementById("patientEmail").value.trim();
  const patientPhone = document.getElementById("patientPhone").value.trim();
  const selectedDoctorId = Number(doctorSelect.value);
  const date = appointmentDate.value;
  const time = document.getElementById("appointmentTime").value;
  const reason = document.getElementById("reason").value.trim();

  const selectedDoctor = bookingDoctors.find(
    (doctor) => doctor.id === selectedDoctorId,
  );

  if (!selectedDoctor) {
    showMessage("Please select a doctor.", "error");
    return;
  }

  // Validate appointment date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(`${date}T00:00:00`);

  if (!date || selectedDate < today) {
    showMessage("Please select today or a future date.", "error");
    return;
  }

  // Create appointment object
  const appointment = {
    id: Date.now(),
    patientName,
    patientEmail,
    patientPhone,
    doctorId: selectedDoctor.id,
    doctorName: selectedDoctor.name,
    specialty: selectedDoctor.specialty,
    fee: selectedDoctor.fee,
    date,
    time,
    reason,
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  };

  // Read existing appointments
  let appointments = [];

  try {
    appointments = JSON.parse(
      localStorage.getItem("medcareAppointments") || "[]",
    );

    if (!Array.isArray(appointments)) {
      appointments = [];
    }
  } catch (error) {
    appointments = [];
  }

  // Save appointment
  appointments.push(appointment);

  try {
    localStorage.setItem("medcareAppointments", JSON.stringify(appointments));
  } catch (error) {
    showMessage(
      "Unable to save booking in this browser. Please check storage settings.",
      "error",
    );
    return;
  }

  showMessage(
    `Appointment booked successfully! Your appointment ID is ${appointment.id}.`,
    "success",
  );

  appointmentForm.reset();

  setMinimumDate();
});

/* =========================
   INITIALIZE PAGE
========================= */

populateDoctors();
setMinimumDate();
prefillDoctor();
