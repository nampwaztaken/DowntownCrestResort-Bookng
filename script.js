const rooms = {
  Standard: {
    price: 100,
    image: "https://ik.imagekit.io/dt3xs8pb5/1_X1K4Zi_mTg94imnWW-zfUw.jpg?updatedAt=1753878793851",
    description: "A cozy, well-appointed space perfect for solo travellers or short stays, offering comfort without compromise."
  },
  Superior: {
    price: 150,
    image: "https://ik.imagekit.io/dt3xs8pb5/bed-superior-deluxe-ocean-view-beach-palace_ab07beda98.jpg?updatedAt=1753878793941",
    description: "The Superior Suite features extra space and comfort with scenic views."
  },
  Deluxe: {
    price: 200,
    image: "https://ik.imagekit.io/dt3xs8pb5/Deluxe-King-Ocean-View-1.jpg?updatedAt=1753878793900",
    description: "Deluxe Suite offers luxurious design and partial ocean views."
  },
  Grand: {
    price: 300,
    image: "https://ik.imagekit.io/dt3xs8pb5/The+Retreat_Ocean+Retreat+Suits_366.jpg?updatedAt=1753878793846",
    description: "Enjoy a Grand Oceanview Retreat with panoramic sea scenery and elegance."
  },
  Presidential: {
    price: 500,
    image: "https://ik.imagekit.io/dt3xs8pb5/photo-sky-high-deluxe-presidential-penthouse-melbourne-8.jpeg?updatedAt=1753878793804",
    description: "The Presidential Sky Penthouse offers unmatched luxury with skyline views."
  }
};

const roomType = document.getElementById('roomType');
const roomImage = document.getElementById('roomImage');
const roomDescription = document.getElementById('roomDescription');
const roomCount = document.getElementById('roomCount');
const priceSummary = document.getElementById('price-summary');
const dateRangeInput = document.getElementById('dateRange');
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');
const paymentForm = document.getElementById('paymentForm');

function calculateNights(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

function updatePrice() {
  const selectedType = roomType.value;
  const count = parseInt(roomCount.value) || 1;
  const nights = calculateNights(checkInInput.value, checkOutInput.value);
  if (nights <= 0) {
    priceSummary.textContent = `Total: $0\n(Please select valid check-in and check-out dates)`;
    return;
  }
  const pricePerNight = rooms[selectedType].price;
  const total = pricePerNight * count * nights;
  priceSummary.textContent = `Total: $${total}\n(${count} room${count > 1 ? 's' : ''} × ${nights} night${nights > 1 ? 's' : ''} @ $${pricePerNight}/night)`;
}

function updateRoomDetails() {
  const selected = rooms[roomType.value];
  roomImage.src = selected.image;
  roomImage.alt = `${roomType.value} Room Preview`;
  roomDescription.textContent = selected.description;
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
      priceSummary.textContent = "Total: $0\n(Please select check-in and check-out dates)";
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
  e.preventDefault(); // For demo purposes
  window.location.href = "https://www.google.com";
});

updateRoomDetails();
