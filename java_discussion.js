// Depuis la page calendrier, ajouter un événement :
window.WasteHunter.addEvent({
    organizer: "ASSOCIATION TERRE OCÉANE",
    location: "PLOUGASTEL",
    date: "24/01/2026 - 16H00",
    participants: "10 personnes attendues",
    type: "GRANDE ZONE POLLUÉE"
});

// Ajouter un message depuis une autre page :
window.WasteHunter.addMessage("NOM", "Message ici");

// Récupérer les messages/événements :
window.WasteHunter.getMessages();
window.WasteHunter.getEvents();