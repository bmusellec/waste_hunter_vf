/* ===== EVENTS DATA ===== */
const eventsData = [
  {
    title: 'Ramassage déchets – Rade de Brest',
    start: '2026-01-25T10:00:00',
    lieu: 'Rade de Brest',
    type: 'Zone polluée',
    places: 10,
    heure: '10:00',
    organisateur: 'Waste Hunter'
  }
];

/* ===== NEXT EVENT ===== */
function getNextEvent() {
  const now = new Date();
  const upcoming = eventsData
    .filter(e => new Date(e.start) > now)
    .sort((a,b) => new Date(a.start) - new Date(b.start));
  return upcoming.length ? upcoming[0] : null;
}

/* ===== COUNTDOWN ===== */
function updateCountdown() {
  const event = getNextEvent();
  if(!event) return;

  const now = new Date();
  const diff = new Date(event.start) - now;
  if(diff <= 0) return;

  document.getElementById('days').textContent = Math.floor(diff / (1000*60*60*24));
  document.getElementById('hours').textContent = Math.floor((diff / (1000*60*60)) % 24);
  document.getElementById('minutes').textContent = Math.floor((diff / (1000*60)) % 60);

  updateEventInfo(event);
}

/* ===== EVENT INFO ===== */
function updateEventInfo(event) {
  if(!event) return;
  document.getElementById('info-lieu').textContent = event.lieu || '–';
  document.getElementById('info-date').textContent = new Date(event.start).toLocaleDateString('fr-FR');
  document.getElementById('info-heure').textContent = event.heure || new Date(event.start).toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'});
  document.getElementById('info-type').textContent = event.type || '–';
  document.getElementById('info-places').textContent = event.places || '–';
  document.getElementById('info-organisateur').textContent = event.organisateur || '–';
}

setInterval(updateCountdown, 60000);

/* ===== CALENDAR ===== */
document.addEventListener('DOMContentLoaded', () => {
  const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
    initialView: 'dayGridMonth',
    locale: 'fr',
    selectable: true,
    editable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    events: eventsData,

    dateClick(info) {
      const title = prompt("Nom de l'événement :");
      if(!title) return;

      const lieu = prompt("Lieu :");
      const type = prompt("Type de zone :");
      const places = prompt("Nombre de places :");
      const heure = prompt("Heure (HH:MM) :", "10:00"); // demande l'heure
      const organisateur = prompt("Nom de l'organisateur :"); // demande organisateur

      // Construire start avec date + heure
      let startDate = info.dateStr; // ex: "2026-01-25"
      if(heure) startDate += "T" + heure + ":00"; // ex: "2026-01-25T14:30:00"

      const newEvent = { 
        title, 
        start: startDate, 
        lieu, 
        type, 
        places, 
        heure, 
        organisateur 
      };

      eventsData.push(newEvent);
      calendar.addEvent(newEvent);
      updateCountdown();
    },

    eventClick(info) {
      if(confirm('Supprimer cet événement ?')) {
        const start = info.event.start.toISOString();
        info.event.remove();
        const index = eventsData.findIndex(e => new Date(e.start).toISOString() === start);
        if(index !== -1) eventsData.splice(index,1);
        updateCountdown();
      }
    }
  });

  calendar.render();
  updateCountdown();
});

/* ===== MODAL ===== */
function openModal() {
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function sendForm() {
  const inputs = document.querySelectorAll('.modal-content input');
  if([...inputs].some(i=>!i.value)) {
    alert('Merci de remplir tous les champs');
    return;
  }
  alert('Participation enregistrée ! Merci 🌱');
  inputs.forEach(i=>i.value='');
  closeModal();
}
