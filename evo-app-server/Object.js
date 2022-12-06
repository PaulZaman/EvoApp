//Fill up our data base with some data

//Users
users = [
{
    firstname: "Paul",
    lastname: "Zamanian",
    password: "1234",
    email: "paul.c.zamanian@gmail.com",
    roomnumber: 1128,
    kitchenNumber: 518,
},
{
    firstname: "Capucine",
    lastname: "Foucher",
    password: "1384",
    email: "capucinefoucher@gmail.com",
    roomnumber: 1128,
    kitchenNumber: 518,
},
{
    firstname: "Layla",
    lastname: "Al Khoury",
    password: "1834",
    email: "Layla.al.khoury@gmail.com",
    roomnumber: 1112,
    kitchenNumber: 518,
},
{
    firstname: "Audrey",
    lastname: "Calmon",
    password: "1230",
    email: "audrey.calmon@gmail.com",
    roomnumber: 1126,
    kitchenNumber: 518,
},
{
    firstname: "Ulysse",
    lastname: "Juget",
    password: "0644",
    email: "ulysse.juget@gmail.com",
    roomnumber: 1127,
    kitchenNumber: 518,
},
{
    firstname: "Esteban",
    lastname: "Finance",
    password: "1924",
    email: "esteban.finance@gmail.com",
    roomnumber: 1127,
    kitchenNumber: 518,
},
{
    firstname: "Esteban",
    lastname: "Duffourd",
    password: "6543",
    email: "esteban.duffourd@gmail.com",
    roomnumber: 1111,
    kitchenNumber: 518,
},
{
    firstname: "Adrien",
    lastname: "Girard",
    password: "0982",
    email: "adrien.girard@gmail.com",
    roomnumber: 1111,
    kitchenNumber: 518,
},
{
    firstname: "Marion",
    lastname: "Menillet",
    password: "0482",
    email: "marion.menillet@gmail.com",
    roomnumber: 1127,
    kitchenNumber: 518,
},
{
    firstname: "Romain",
    lastname: "Castellari",
    password: "5748",
    email: "romain.castellari@gmail.com",
    roomnumber: 1130,
    kitchenNumber: 518,
},
{
    firstname: "Maxime",
    lastname: "Saunier",
    password: "0282",
    email: "maxime.saunier@gmail.com",
    roomnumber: 1130,
    kitchenNumber: 518,
},
{
    firstname: "Benjamin",
    lastname: "Rossignol",
    password: "0293",
    email: "benjamin.rossignol@gmail.com",
    roomnumber: 1129,
    kitchenNumber: 518,
},
{
    firstname: "Eliott",
    lastname: "Maisl",
    password: "8293",
    email: "eliott.maisl@gmail.com",
    roomnumber: 1129,
    kitchenNumber: 518,
},
{
    firstname: "Max",
    lastname: "Guilbert",
    password: "6409",
    email: "max.guilbert@gmail.com",
    roomnumber: 1110,
    kitchenNumber: 518,
},
{
    firstname: "Jules",
    lastname: "Gravier",
    password: "0088",
    email: "jules.gravier@gmail.com",
    roomnumber: 1110,
    kitchenNumber: 518,
},
]

//Utensils
utensils = [
{
    name: "Small Hob 1",
    kitchenNumber: 518,
},
{
    name: "Small Hob 2",
    kitchenNumber: 518,
},
{
    name: "Big Hob 1",
    kitchenNumber: 518,
},

{
    name: "Big Hob 2",
    kitchenNumber: 518,
}
]

//Uses
uses = [
{
    start: new Date("2022-10-18 04:00:00").toISOString(),
    end: new Date("2022-10-18 05:00:00").toISOString(),
    userId: 1,
    utensilId: 1
},
{
    start: new Date("2022-10-18 04:00:00").toISOString(),
    end: new Date("2022-10-18 05:00:00").toISOString(),
    userId: 2,
    utensilId: 2
},
{
    start: new Date("2022-10-19 04:00:00").toISOString(),
    end: new Date("2022-10-19 05:00:00").toISOString(),
    userId: 3,
    utensilId: 3
},
{
    start: new Date("2022-10-20 04:00:00").toISOString(),
    end: new Date("2022-10-20 05:00:00").toISOString(),
    userId: 4,
    utensilId: 4
},
{
    start: new Date("2022-10-21 04:00:00").toISOString(),
    end: new Date("2022-10-21 05:00:00").toISOString(),
    userId: 5,
    utensilId: 4
},
{
    start: new Date("2022-10-21 04:00:00").toISOString(),
    end: new Date("2022-10-21 05:00:00").toISOString(),
    userId: 6,
    utensilId: 3
},
{
    start: new Date("2022-10-21 04:00:00").toISOString(),
    end: new Date("2022-10-21 05:00:00").toISOString(),
    userId: 7,
    utensilId: 2
},
{
    start: new Date("2022-10-22 04:00:00").toISOString(),
    end: new Date("2022-10-22 05:00:00").toISOString(),
    userId: 8,
    utensilId: 1
},
{
    start: new Date("2022-10-22 04:00:00").toISOString(),
    end: new Date("2022-10-22 05:00:00").toISOString(),
    userId: 9,
    utensilId: 1
},
{
    start: new Date("2022-10-23 04:00:00").toISOString(),
    end: new Date("2022-10-23 05:00:00").toISOString(),
    userId: 10,
    utensilId: 3
},
{
    start: new Date("2022-10-18 10:00:00").toISOString(),
    end: new Date("2022-10-18 12:00:00").toISOString(),
    userId: 11,
    utensilId: 2
},
{
    start: new Date("2022-10-18 06:00:00").toISOString(),
    end: new Date("2022-10-18 07:00:00").toISOString(),
    userId: 12,
    utensilId: 4
},
{
    start: new Date("2022-10-18 04:00:00").toISOString(),
    end: new Date("2022-10-18 05:00:00").toISOString(),
    userId: 13,
    utensilId: 4
},
{
    start: new Date("2022-10-18 04:00:00").toISOString(),
    end: new Date("2022-10-18 05:00:00").toISOString(),
    userId: 14,
    utensilId: 3
},
{
    start: new Date("2022-10-18 04:00:00").toISOString(),
    end: new Date("2022-10-18 05:00:00").toISOString(),
    userId: 15,
    utensilId: 1
}
]

//Events
events = [
{
    name: "Christmas Dinner",
    description: "Come have christmas dinner with us!",
    date: new Date("2022-12-23 08:00:00").toISOString(),
    location: "Petit chalet à la montagne",
    organisatorId: 1,
},
{
    name: "Let's go for a hike !",
    description: "We are going to climb the Mont Royal to see the sunrise!",
    date: new Date("2022-10-22 14:00:00").toISOString(),
    location: "MontRoyal",
    organisatorId: 2,
},
{
    name: "Billard Tournament",
    description: "Little party at the billard room",
    date: new Date("2022-10-30 18:00:00").toISOString(),
    location: "Billard room at evo",
    organisatorId: 5,
},
{
    name: "Terrasse Party",
    description: "Come have a drink with us!",
    date: new Date("2022-11-02 15:00:00").toISOString(),
    location: "terrasse at evo",
    organisatorId: 8,
},
{
    name: "Going shopping",
    description: "Looking for new cloths wanna come ?",
    date: new Date("2022-10-23 10:00:00").toISOString(),
    location: "St Catherine Street",
    organisatorId: 3,
}
]

//Participations
participation = [
{
    userId: 1,
    eventId: 2,
    accepted: false,
},
{
    userId: 5,
    eventId: 2,
    accepted: false,
},
{   
    userId: 9,
    eventId: 2,
    accepted: false,
},
{
    userId: 3,
    eventId: 2,
    accepted: false,
},
{
    userId: 4,
    eventId: 2,
    accepted: false,
},
{
    userId: 12,
    eventId: 3,
    accepted: false,
},
{
    userId: 1,
    eventId: 3,
    accepted: false,
},
{
    userId: 4,
    eventId: 3,
    accepted: false,
},
{
    userId: 10,
    eventId: 3,
    accepted: false,
},
{
    userId: 4,
    eventId: 5,
    accepted: false,
},
{
    userId: 13,
    eventId: 4,
    accepted: false,
},
{
    userId: 13,
    eventId: 5,
    accepted: false,
},
{
    userId: 2,
    eventId: 5,
    accepted: false,
},
{
    userId: 15,
    eventId: 5,
    accepted: false,
},
{
    userId: 14,
    eventId: 5,
    accepted: false,
},
{
    userId: 1,
    eventId: 5,
    accepted: false,
},
{
    userId: 12,
    eventId: 5,
    accepted: false,
},
{
    userId: 1,
    eventId: 4,
    accepted: false,
},
{
    userId: 2,
    eventId: 4,
    accepted: false,
},
{
    userId: 3,
    eventId: 4,
    accepted: false,
},
{
    userId: 4,
    eventId: 4,
    accepted: false,
},
{
    userId: 15,
    eventId: 4,
    accepted: false,
},
{
    userId: 6,
    eventId: 1,
    accepted: false,
},
{
    userId: 3,
    eventId: 1,
    accepted: false,
},
{
    userId: 4,
    eventId: 1,
    accepted: false,
},
{
    userId: 15,
    eventId: 1,
    accepted: false,
},
{
    userId: 14,
    eventId: 1,
    accepted: false,
},
{
    userId: 13,
    eventId: 1,
    accepted: false,
},
{
    userId: 12,
    eventId: 1,
    accepted: false,
},
{
    userId: 11,
    eventId: 1,
    accepted: false,
},
{
    userId: 10,
    eventId: 1,
    accepted: false,
},
{
    userId: 9,
    eventId: 1,
    accepted: false,
},
{
    userId: 8,
    eventId: 1,
    accepted: false,
}
]


module.exports = {
	users,
    utensils,
    uses,
    events,
    participation
};
