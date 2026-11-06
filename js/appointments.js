/* =========================
   ELEMENTS
========================= */

const appointmentList = document.getElementById("appointmentList");
const emptyAppointments = document.getElementById("emptyAppointments");

/* =========================
   READ APPOINTMENTS
========================= */

function getAppointments() {
  try {
    const data = JSON.parse(
      localStorage.getItem("medcareAppointments") || "[]",
    );

    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

/* =========================
   FORMAT DATE
========================= */

function formatDate(dateString) {
  if (!dateString) return "Not specified";

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* =========================
   DISPLAY APPOINTMENTS
========================= */

function displayAppointments() {
  const appointments = getAppointments();

  appointmentList.innerHTML = "";

  emptyAppointments.hidden = appointments.length > 0;
  appointmentList.hidden = appointments.length === 0;

  // Display newest booking first
  appointments.sort((a, b) => b.id - a.id);

  appointments.forEach((appointment) => {
    const card = document.createElement("article");

    card.className = "appointment-card";

    const status = appointment.status || "Confirmed";

    const statusClass = status.toLowerCase();

    const canCancel = status === "Confirmed";

    card.innerHTML = `
            <div class="appointment-card-header">

                <h3>${appointment.doctorName}</h3>

                <span class="appointment-status status-${statusClass}">
                    ${status}
                </span>

            </div>

            <div class="appointment-details">

                <p>
                    <strong>Specialty:</strong>
                    ${appointment.specialty || "Not specified"}
                </p>

                <p>
                    <strong>Patient:</strong>
                    ${appointment.patientName}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${formatDate(appointment.date)}
                </p>

                <p>
                    <strong>Time:</strong>
                    ${appointment.time}
                </p>

                <p>
                    <strong>Booking ID:</strong>
                    ${appointment.id}
                </p>

                <p>
                    <strong>Reason:</strong>
                    ${appointment.reason || "General consultation"}
                </p>

            </div>

            <div class="appointment-card-footer">

                <strong>
                    Consultation: ₹${appointment.fee}
                </strong>

                <button
                    class="cancel-appointment-btn"
                    data-id="${appointment.id}"
                    ${canCancel ? "" : "disabled"}
                >
                    ${canCancel ? "Cancel Appointment" : status}
                </button>

            </div>
        `;

    appointmentList.appendChild(card);
  });
}

/* =========================
   CANCEL APPOINTMENT
========================= */

appointmentList.addEventListener("click", function (event) {
  const button = event.target.closest(".cancel-appointment-btn");

  if (!button || button.disabled) return;

  const appointmentId = Number(button.dataset.id);

  const confirmCancel = confirm(
    "Are you sure you want to cancel this appointment?",
  );

  if (!confirmCancel) return;

  const appointments = getAppointments();

  const updatedAppointments = appointments.map((appointment) => {
    if (appointment.id === appointmentId) {
      return {
        ...appointment,
        status: "Cancelled",
      };
    }

    return appointment;
  });

  try {
    localStorage.setItem(
      "medcareAppointments",
      JSON.stringify(updatedAppointments),
    );

    displayAppointments();
  } catch (error) {
    alert("Unable to update appointment. Please try again.");
  }
});

/* =========================
   INITIALIZE
========================= */

displayAppointments();
