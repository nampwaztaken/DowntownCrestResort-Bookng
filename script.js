// --- Room data ---
// You can freely edit this section to add/change rooms!
const rooms = {
  Standard: {
    price: 100,
    image: "https://ik.imagekit.io/dt3xs8pb5/1_X1K4Zi_mTg94imnWW-zfUw.jpg",
    description: "A cozy space perfect for solo travellers or short stays."
  },
  Superior: {
    price: 150,
    image: "https://ik.imagekit.io/dt3xs8pb5/bed-superior-deluxe-ocean-view-beach-palace_ab07beda98.jpg",
    description: "Extra space and comfort with scenic views."
  },
  Deluxe: {
    price: 200,
    image: "https://ik.imagekit.io/dt3xs8pb5/Deluxe-King-Ocean-View-1.jpg",
    description: "Luxurious design and partial ocean views."
  },
  Grand: {
    price: 300,
    image: "https://ik.imagekit.io/dt3xs8pb5/The+Retreat_Ocean+Retreat+Suits_366.jpg",
    description: "Grand Oceanview Retreat with panoramic sea scenery."
  },
  Presidential: {
    price: 500,
    image: "https://ik.imagekit.io/dt3xs8pb5/photo-sky-high-deluxe-presidential-penthouse-melbourne-8.jpeg",
    description: "Unmatched luxury with skyline views."
  }
};

/* ==== DO NOT CHANGE BELOW THIS LINE ==== */

const roomType = document.getElementById('roomType');
const roomImage = document.getElementById('roomImage');
const roomDescription = document.getElementById('roomDescription');
const roomCount = document.getElementById('roomCount');
const priceSummary = document.getElementById('price-summary');
const dateRangeInput = document.getElementById('dateRange');
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');
const paymentForm = document.getElementById('paymentForm');

function calculateNights(start, end) {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
}

function updatePrice() {
  const type = roomType.value;
  const count = Math.max(1, parseInt(roomCount.value) || 1);
  const nights = calculateNights(checkInInput.value, checkOutInput.value);

  if (nights <= 0) {
    priceSummary.textContent = "Total: $0 (Select valid dates)";
    return;
  }

  const pricePerNight = rooms[type].price;
  const total = pricePerNight * count * nights;

  priceSummary.textContent = `Total: $${total} (${count} room${count > 1 ? "s" : ""} × ${nights} night${nights > 1 ? "s" : ""} @ $${pricePerNight}/night)`;
}

function updateRoomDetails() {
  const room = rooms[roomType.value];
  roomImage.src = room.image;
  roomImage.alt = `${roomType.value} Room Preview`;
  roomDescription.textContent = room.description;
  updatePrice();
}

flatpickr(dateRangeInput, {
  mode: "range",
  minDate: "today",
  dateFormat: "d/m/Y",
  defaultDate: [new Date(), new Date(Date.now() + 86400000)],
  onChange: ([start, end]) => {
    if (start && end) {
      checkInInput.value = start.toISOString().slice(0, 10);
      checkOutInput.value = end.toISOString().slice(0, 10);
      updatePrice();
    } else {
      checkInInput.value = "";
      checkOutInput.value = "";
      priceSummary.textContent = "Total: $0 (Select check-in and check-out dates)";
    }
  }
});

roomType.addEventListener('change', updateRoomDetails);

roomCount.addEventListener('input', () => {
  if (roomCount.value < 1) roomCount.value = 1;
  updatePrice();
});

paymentForm.addEventListener('submit', e => {
  if (!paymentForm.checkValidity()) {
    e.preventDefault();
    paymentForm.reportValidity();
    return;
  }

  const nights = calculateNights(checkInInput.value, checkOutInput.value);
  if (nights <= 0) {
    e.preventDefault();
    alert("Please select valid check-in and check-out dates.");
    dateRangeInput.focus();
    return;
  }

  if (parseInt(roomCount.value) < 1) {
    e.preventDefault();
    alert("Please enter a valid number of rooms.");
    roomCount.focus();
    return;
  }

  e.preventDefault(); // remove this to enable real submission
  window.location.href = "https://www.google.com"; // demo redirect
});

updateRoomDetails();
