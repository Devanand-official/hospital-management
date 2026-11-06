/* =========================
   DOCTOR DATA
========================= */

const doctors = [
  {
    id: 1,
    name: "Dr. Arun Kumar",
    specialty: "Cardiology",
    experience: 10,
    fee: 800,
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialty: "Pediatrics",
    experience: 8,
    fee: 600,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Dr. Michael Raj",
    specialty: "Neurology",
    experience: 12,
    fee: 1000,
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Dr. Sneha Reddy",
    specialty: "Orthopedics",
    experience: 7,
    fee: 700,
    image:
      "https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Dr. Rahul Menon",
    specialty: "Dermatology",
    experience: 9,
    fee: 750,
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "Dr. Kavitha Iyer",
    specialty: "General Medicine",
    experience: 15,
    fee: 500,
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=80",
  },
];

/* =========================
   DOM ELEMENTS
========================= */

const doctorGrid = document.getElementById("doctorGrid");
const doctorSearch = document.getElementById("doctorSearch");
const specialtyFilter = document.getElementById("specialtyFilter");
const doctorCount = document.getElementById("doctorCount");
const noDoctors = document.getElementById("noDoctors");

/* =========================
   DISPLAY DOCTORS
========================= */

function displayDoctors(doctorList) {
  if (!doctorGrid) return;

  doctorGrid.innerHTML = "";

  doctorCount.textContent = `${doctorList.length} Doctor${doctorList.length !== 1 ? "s" : ""}`;

  noDoctors.hidden = doctorList.length !== 0;

  doctorList.forEach((doctor) => {
    const doctorCard = document.createElement("article");

    doctorCard.className = "directory-doctor-card";

    doctorCard.innerHTML = `
            <img
                src="${doctor.image}"
                alt="${doctor.name}"
                style="object-position: center 20%;"
                loading="lazy"
            >

            <div class="directory-doctor-info">

                <span class="doctor-specialty">
                    ${doctor.specialty}
                </span>

                <h3>${doctor.name}</h3>

                <p class="doctor-experience">
                    ${doctor.experience}+ years of experience
                </p>

                <div class="doctor-meta">

                    <span class="doctor-fee">
                        ₹${doctor.fee} / consultation
                    </span>

                    <a
                        href="appointments.html?doctorId=${doctor.id}"
                        class="directory-book-btn"
                    >
                        Book Appointment
                    </a>

                </div>

            </div>
        `;

    doctorGrid.appendChild(doctorCard);
  });
}

/* =========================
   SEARCH AND FILTER
========================= */

function filterDoctors() {
  const searchValue = doctorSearch.value.trim().toLowerCase();

  const selectedSpecialty = specialtyFilter.value;

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesName = doctor.name.toLowerCase().includes(searchValue);

    const matchesSpecialty =
      selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;

    return matchesName && matchesSpecialty;
  });

  displayDoctors(filteredDoctors);
}

/* =========================
   EVENT LISTENERS
========================= */

if (doctorSearch && specialtyFilter) {
  doctorSearch.addEventListener("input", filterDoctors);

  specialtyFilter.addEventListener("change", filterDoctors);

  // Display all doctors when the page loads
  displayDoctors(doctors);
}
