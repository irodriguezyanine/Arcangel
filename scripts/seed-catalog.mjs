import { writeFileSync, mkdirSync } from "node:fs";

const categories = [
  {
    id: "amor",
    name: "Amor",
    line: "Declaración, espera y enamoramiento.",
  },
  {
    id: "desamor",
    name: "Desamor",
    line: "Ruptura, celos y lo que quedó después.",
  },
  {
    id: "perreo",
    name: "Perreo",
    line: "Club, cuerpo y letra explícita.",
  },
  {
    id: "bichos",
    name: "Bichos",
    line: "El círculo, la lealtad y los suyos.",
  },
  {
    id: "calle",
    name: "Calle",
    line: "El relato de origen, la ruta y el peso.",
  },
  {
    id: "flex",
    name: "Flex",
    line: "Precio, marca y estatus.",
  },
  {
    id: "introspeccion",
    name: "Introspección",
    line: "Memoria, fe y la vida fuera del club.",
  },
];

const albums = [
  {
    slug: "el-fenomeno",
    title: "El fenómeno",
    year: 2008,
    released: "2008-12-09",
    kind: "estudio",
    label: "Machete",
    blurb:
      "Debut oficial. Parte del material venía del disco filtrado La Maravilla. Romance de radio y perreo de club en el mismo cuerpo.",
  },
  {
    slug: "sentimiento-elegancia-maldad",
    title: "Sentimiento, elegancia & maldad",
    year: 2013,
    released: "2013-11-19",
    kind: "estudio",
    label: "Pina",
    blurb:
      "El regreso después de los mixtapes. Austin ordena tres registros —sentimiento, elegancia y maldad— y los usa como mapa del disco.",
  },
  {
    slug: "los-favoritos",
    title: "Los favoritos",
    year: 2015,
    released: "2015-12-11",
    kind: "colaborativo",
    label: "Pina",
    blurb:
      "Disco con DJ Luian. Perreo de 2015, con 50 sombras de Austin como estandarte.",
  },
  {
    slug: "ares",
    title: "Ares",
    year: 2018,
    released: "2018-07-13",
    kind: "estudio",
    label: "Pina",
    blurb:
      "El giro al trap y al R&B. Menos romance de radio, más calle, lujo y perreo directo.",
  },
  {
    slug: "historias-de-un-capricornio",
    title: "Historias de un capricornio",
    year: 2019,
    released: "2019-12-20",
    kind: "estudio",
    label: "Rimas",
    blurb:
      "El disco más autobiográfico de la era Rimas. Sigues con él lo sacó del club hacia la radio pop.",
  },
  {
    slug: "los-favoritos-2",
    title: "Los favoritos 2",
    year: 2020,
    released: "2020-10-16",
    kind: "colaborativo",
    label: "Rimas",
    blurb:
      "Segunda vuelta con el formato de Los favoritos: colaboraciones, perreo y la segunda vida de Sigues con él.",
  },
  {
    slug: "los-favoritos-2-5",
    title: "Los favoritos 2.5",
    year: 2021,
    released: "2021-09-17",
    kind: "colaborativo",
    label: "Rimas",
    blurb:
      "Extensión del ciclo. Si te veo y Capos y bichotes marcan los dos polos: el romance y el círculo.",
  },
  {
    slug: "sr-santos",
    title: "Sr. Santos",
    year: 2022,
    released: "2022-12-01",
    kind: "estudio",
    label: "Rimas",
    blurb:
      "El apellido como título. La jumpa, con Bad Bunny, lo metió en el Billboard 200.",
  },
  {
    slug: "sentimiento-elegancia-mas-maldad",
    title: "Sentimiento, elegancia y más maldad",
    year: 2023,
    released: "2023-11-17",
    kind: "estudio",
    label: "Rimas",
    blurb:
      "Diez años después del disco de 2013, con invitados de corrido, regional y pop urbano.",
  },
  {
    slug: "papi-arca",
    title: "Papi Arca",
    year: 2024,
    released: "2024-12-19",
    kind: "estudio",
    label: "Rimas",
    blurb:
      "Disco corto. El círculo (BFF) y el perreo directo ocupan casi todo el metraje.",
  },
  {
    slug: "sr-santos-2",
    title: "Sr. Santos II: Sueños de grandeza",
    year: 2025,
    released: "2025-06-26",
    kind: "estudio",
    label: "Rimas",
    blurb:
      "Segunda parte del apellido. Flex, perreo y un cierre que vuelve a la ambición personal.",
  },
  {
    slug: "la-8va-maravilla",
    title: "La 8va maravilla",
    year: 2026,
    released: "2026-01-15",
    kind: "estudio",
    label: "Rimas",
    blurb:
      "El apodo del inicio, otra vez como título. Mezcla memoria, desamor y perreo de ahora.",
  },
];

/** [album, track, title, categories, flags] flags: v = versión, k = pista corta / interludio */
const rows = [
  ["el-fenomeno", 1, "Ahí eh", ["perreo"]],
  ["el-fenomeno", 2, "Por amar a ciegas", ["amor"]],
  ["el-fenomeno", 3, "Él no se va a enterar", ["perreo"]],
  ["el-fenomeno", 4, "Pienso en ti", ["amor"]],
  ["el-fenomeno", 5, "Demente bailando", ["perreo"]],
  ["el-fenomeno", 6, "Agresivo 3", ["perreo"]],
  ["el-fenomeno", 7, "Ta' bueno el ambiente", ["perreo"]],
  ["el-fenomeno", 8, "I Got Flow", ["flex"]],
  ["el-fenomeno", 9, "Fuiste tú quien perdió", ["desamor"]],
  ["el-fenomeno", 10, "Yo te enseño", ["perreo"]],
  ["el-fenomeno", 11, "Nada malo", []],
  ["el-fenomeno", 12, "Aprovecha el tiempo", ["perreo"]],
  ["el-fenomeno", 13, "Enamorado de ti", ["amor"]],
  ["el-fenomeno", 14, "Química sustancia", ["perreo"]],
  ["el-fenomeno", 15, "Pa' que la pases bien", ["perreo"]],
  ["el-fenomeno", 16, "Sí", ["perreo"]],
  ["el-fenomeno", 17, "Ganas de ti", ["amor"]],
  ["el-fenomeno", 18, "Mi primera canción", ["introspeccion"]],
  ["el-fenomeno", 19, "Chica virtual", ["amor"]],
  ["el-fenomeno", 20, "Ahí eh (Predi club version)", ["perreo"], "v"],
  ["el-fenomeno", 21, "Por amar a ciegas (hip-hop version)", ["amor"], "v"],

  ["sentimiento-elegancia-maldad", 1, "Dios te bendiga", ["introspeccion"]],
  ["sentimiento-elegancia-maldad", 2, "Hace mucho tiempo", ["introspeccion", "calle"]],
  ["sentimiento-elegancia-maldad", 3, "Contigo quiero amores", ["amor"]],
  ["sentimiento-elegancia-maldad", 4, "Sola", ["amor"]],
  ["sentimiento-elegancia-maldad", 5, "Iré a buscarte", ["amor"]],
  ["sentimiento-elegancia-maldad", 6, "Gucci Boys Club", ["bichos", "flex"]],
  ["sentimiento-elegancia-maldad", 7, "Cuando tú no estás", ["desamor"]],
  ["sentimiento-elegancia-maldad", 8, "Como tiene que ser", ["perreo"]],
  ["sentimiento-elegancia-maldad", 9, "Pakas de 100", ["flex"]],
  ["sentimiento-elegancia-maldad", 10, "SEM", ["introspeccion", "flex"]],
  ["sentimiento-elegancia-maldad", 11, "Diferente", ["flex"]],
  ["sentimiento-elegancia-maldad", 12, "Ayer escuché una voz", ["introspeccion"]],
  ["sentimiento-elegancia-maldad", 13, "Me, Myself and My Money", ["flex"]],
  ["sentimiento-elegancia-maldad", 14, "Que le den", ["desamor"]],
  ["sentimiento-elegancia-maldad", 15, "Le llego donde sea", ["calle", "flex"]],
  ["sentimiento-elegancia-maldad", 16, "Lentamente", ["perreo"]],
  ["sentimiento-elegancia-maldad", 17, "Tiene un piquete", ["perreo"]],
  ["sentimiento-elegancia-maldad", 18, "Por la plata baila el mono", ["flex", "calle"]],

  ["los-favoritos", 1, "Los favoritos", ["flex"]],
  ["los-favoritos", 2, "Pensándote", ["amor"]],
  ["los-favoritos", 3, "Soltera", ["perreo"]],
  ["los-favoritos", 4, "50 sombras de Austin", ["perreo"]],
  ["los-favoritos", 5, "Imagínate", ["amor"]],
  ["los-favoritos", 6, "Decídete", ["amor"]],
  ["los-favoritos", 7, "Más piquete que yo", ["perreo"]],
  ["los-favoritos", 8, "Sólo tú", ["amor"]],
  ["los-favoritos", 9, "Nadie", ["desamor"]],
  ["los-favoritos", 10, "Pura sensualidad", ["perreo"]],
  ["los-favoritos", 11, "La loca", ["perreo"]],
  ["los-favoritos", 12, "Pa'l muro", ["perreo"]],
  ["los-favoritos", 13, "El favorito de tu gata", ["perreo"]],
  ["los-favoritos", 14, "Chikiribón", ["perreo"]],
  ["los-favoritos", 15, "Vacilar y joder", ["perreo"]],
  ["los-favoritos", 16, "Mami, qué tú tienes", ["perreo"]],
  ["los-favoritos", 17, "Tu cuerpo me hace bien", ["perreo"]],
  ["los-favoritos", 18, "Soy dueño", ["flex"]],

  ["ares", 1, "Atmósfera", ["introspeccion"]],
  ["ares", 2, "Se supone", ["desamor"]],
  ["ares", 3, "Original", ["flex"]],
  ["ares", 4, "Date cuenta", ["desamor"]],
  ["ares", 5, "Mi primer kilo", ["calle"]],
  ["ares", 6, "Corte, porte y elegancia", ["flex"]],
  ["ares", 7, "Los 3", []],
  ["ares", 8, "Me gusta", ["perreo"]],
  ["ares", 9, "Victoria", ["introspeccion", "flex"]],
  ["ares", 10, "En su boca", ["perreo"]],
  ["ares", 11, "Pa' morir se nace", ["calle", "introspeccion"]],
  ["ares", 12, "De la renta", ["calle"]],
  ["ares", 13, "Lo que sea", []],
  ["ares", 14, "Piernas en el aire", ["perreo"]],
  ["ares", 15, "Un vacilón (Young Maelo)", ["perreo", "flex"]],
  ["ares", 16, "Caribbean Air", ["flex"]],
  ["ares", 17, "Balancéate", ["perreo"]],
  ["ares", 18, "El granjero", ["perreo"]],

  ["historias-de-un-capricornio", 1, "Mi testimonio", ["introspeccion"]],
  ["historias-de-un-capricornio", 2, "Al volante", ["flex"]],
  ["historias-de-un-capricornio", 3, "Rehén", ["amor"]],
  ["historias-de-un-capricornio", 4, "Ponte bonita", ["perreo"]],
  ["historias-de-un-capricornio", 5, "Infeliz", ["desamor"]],
  ["historias-de-un-capricornio", 6, "Video llamada", ["amor", "perreo"]],
  ["historias-de-un-capricornio", 7, "Doble cara", ["desamor"]],
  ["historias-de-un-capricornio", 8, "Hábitos", ["introspeccion"]],
  ["historias-de-un-capricornio", 9, "Lléname de luz", ["amor", "introspeccion"]],
  ["historias-de-un-capricornio", 10, "No salgo de casa", ["introspeccion"]],
  ["historias-de-un-capricornio", 11, "Sigues con él", ["desamor"]],
  ["historias-de-un-capricornio", 12, "Capricornio", ["introspeccion"]],
  ["historias-de-un-capricornio", 13, "Memoria rota", ["desamor"]],
  ["historias-de-un-capricornio", 14, "Te esperaré", ["amor"]],
  ["historias-de-un-capricornio", 15, "Invicto", ["introspeccion", "flex"]],

  ["los-favoritos-2", 1, "Payaso", ["desamor"]],
  ["los-favoritos-2", 2, "Amantes & amigos", ["amor", "perreo"]],
  ["los-favoritos-2", 3, "Satisfacción", ["perreo"]],
  ["los-favoritos-2", 4, "Sigas moviendo", ["perreo"]],
  ["los-favoritos-2", 5, "Normal", []],
  ["los-favoritos-2", 6, "Un año tarde", ["desamor"]],
  ["los-favoritos-2", 7, "Aparentemente 2", ["amor"]],
  ["los-favoritos-2", 8, "Emilio y Gloria", []],
  ["los-favoritos-2", 9, "No se enamora", ["desamor"]],
  ["los-favoritos-2", 10, "El bueno & El malo", ["introspeccion"]],
  ["los-favoritos-2", 11, "Matarse solita", ["perreo"]],
  ["los-favoritos-2", 12, "Pilonea", ["perreo"]],
  ["los-favoritos-2", 13, "Frío", []],
  ["los-favoritos-2", 14, "Todos la conocen", ["perreo"]],
  ["los-favoritos-2", 15, "Se porta mal", ["perreo"]],
  ["los-favoritos-2", 16, "Tussi", ["perreo"]],
  ["los-favoritos-2", 17, "El favorito", ["flex"]],
  ["los-favoritos-2", 18, "Sigues con él (remix)", ["desamor"], "v"],

  ["los-favoritos-2-5", 1, "Flow violento", ["calle"]],
  ["los-favoritos-2-5", 2, "Si te veo", ["amor", "perreo"]],
  ["los-favoritos-2-5", 3, "Con sus B", ["perreo"]],
  ["los-favoritos-2-5", 4, "Hijuepu", ["perreo"]],
  ["los-favoritos-2-5", 5, "Insegura", ["desamor"]],
  ["los-favoritos-2-5", 6, "Mía", ["amor"]],
  ["los-favoritos-2-5", 7, "Na’ de eso", []],
  ["los-favoritos-2-5", 8, "Todo caro", ["flex"]],
  ["los-favoritos-2-5", 9, "Enfermo", []],
  ["los-favoritos-2-5", 10, "No quiere novio", ["perreo"]],
  ["los-favoritos-2-5", 11, "Capos y bichotes", ["bichos", "calle"]],
  ["los-favoritos-2-5", 12, "Es complicado", ["desamor"]],
  ["los-favoritos-2-5", 13, "No hay perdón", ["desamor"]],
  ["los-favoritos-2-5", 14, "Nintendo", []],
  ["los-favoritos-2-5", 15, "Batman en Can Am", ["flex"]],

  ["sr-santos", 1, "JS4E", []],
  ["sr-santos", 2, "PortoBello", ["flex"]],
  ["sr-santos", 3, "La jumpa", ["flex", "perreo"]],
  ["sr-santos", 4, "La roca", []],
  ["sr-santos", 5, "Bottas", ["perreo"]],
  ["sr-santos", 6, "Subimos de precio", ["flex"]],
  ["sr-santos", 7, "Dígitos", ["flex"]],
  ["sr-santos", 8, "No te vayas", ["amor"]],
  ["sr-santos", 9, "La ruta", ["calle"]],
  ["sr-santos", 10, "Spicy Crab", []],
  ["sr-santos", 11, "Papá Noel", []],
  ["sr-santos", 12, "Kilimanjaro", ["flex"]],
  ["sr-santos", 13, "Sprinter", ["flex"]],
  ["sr-santos", 14, "De negro", ["flex"]],
  ["sr-santos", 15, "Entonces", []],
  ["sr-santos", 16, "Fendace", ["flex"]],
  ["sr-santos", 17, "Sin Scotti", ["introspeccion"]],
  ["sr-santos", 18, "MMB's", [], "k"],

  ["sentimiento-elegancia-mas-maldad", 1, "Glory", []],
  ["sentimiento-elegancia-mas-maldad", 2, "El palo", []],
  ["sentimiento-elegancia-mas-maldad", 3, "Me gusta tu flow", ["perreo"]],
  ["sentimiento-elegancia-mas-maldad", 4, "Plutón", []],
  ["sentimiento-elegancia-mas-maldad", 5, "ALV", ["amor"]],
  ["sentimiento-elegancia-mas-maldad", 6, "Antonio Banderas", ["flex"]],
  ["sentimiento-elegancia-mas-maldad", 7, "Rosita", []],
  ["sentimiento-elegancia-mas-maldad", 8, "Los Roques", ["flex"]],
  ["sentimiento-elegancia-mas-maldad", 9, "Psicópata", ["desamor"]],
  ["sentimiento-elegancia-mas-maldad", 10, "FP", ["perreo"]],
  ["sentimiento-elegancia-mas-maldad", 11, "Qué tengo que hacer", ["desamor"]],
  ["sentimiento-elegancia-mas-maldad", 12, "Condado", ["flex"]],
  ["sentimiento-elegancia-mas-maldad", 13, "Yoshi", []],
  ["sentimiento-elegancia-mas-maldad", 14, "Bali", ["flex"]],
  ["sentimiento-elegancia-mas-maldad", 15, "La chamba", ["calle"]],
  ["sentimiento-elegancia-mas-maldad", 16, "Rápido", ["perreo"]],
  ["sentimiento-elegancia-mas-maldad", 17, "No tiene nombre esta canción", ["introspeccion"]],
  ["sentimiento-elegancia-mas-maldad", 18, "Arca 10mil", ["flex"]],
  ["sentimiento-elegancia-mas-maldad", 19, "Los tiempos cambian", ["introspeccion"]],

  ["papi-arca", 1, "La franquicia", ["flex", "bichos"]],
  ["papi-arca", 2, "BFF", ["bichos"]],
  ["papi-arca", 3, "La pared", []],
  ["papi-arca", 4, "Éxito", ["flex"]],
  ["papi-arca", 5, "La varita", ["perreo"]],
  ["papi-arca", 6, "Pa’ allá", ["perreo"]],
  ["papi-arca", 7, "Bien duro", ["perreo"]],
  ["papi-arca", 8, "THC", ["perreo"]],
  ["papi-arca", 9, "Besitos pa’ esas nalgas", ["perreo"]],

  ["sr-santos-2", 1, "Apocalipsis", ["introspeccion"]],
  ["sr-santos-2", 2, "Noche de sexxx", ["perreo"]],
  ["sr-santos-2", 3, "Gohan y Goku", ["bichos"]],
  ["sr-santos-2", 4, "Wells Fargo", ["flex"]],
  ["sr-santos-2", 5, "5 pa las 12", ["perreo"]],
  ["sr-santos-2", 6, "Don Francisco", []],
  ["sr-santos-2", 7, "En tus sueños", ["desamor"]],
  ["sr-santos-2", 8, "Sin embargo", []],
  ["sr-santos-2", 9, "Flash foto", []],
  ["sr-santos-2", 10, "Mi peor momento", ["introspeccion", "desamor"]],
  ["sr-santos-2", 11, "ABC", []],
  ["sr-santos-2", 12, "Jack Jack interludio", [], "k"],
  ["sr-santos-2", 13, "Frank Sinatra", ["flex"]],
  ["sr-santos-2", 14, "Hasta que el de arriba me quite", ["introspeccion", "calle"]],
  ["sr-santos-2", 15, "Sativa", ["perreo"]],
  ["sr-santos-2", 16, "Quién contra mí", ["flex", "introspeccion"]],
  ["sr-santos-2", 17, "Mucho ticket", ["flex"]],
  ["sr-santos-2", 18, "Sueños de grandeza", ["introspeccion"]],

  ["la-8va-maravilla", 1, "Lúcido", ["introspeccion"]],
  ["la-8va-maravilla", 2, "La 8va maravilla", ["introspeccion"]],
  ["la-8va-maravilla", 3, "Honesto", ["introspeccion"]],
  ["la-8va-maravilla", 4, "Lluvia", []],
  ["la-8va-maravilla", 5, "HOY SE GUAYA", ["perreo"]],
  ["la-8va-maravilla", 6, "Chula", ["perreo"]],
  ["la-8va-maravilla", 7, "Fecha de vencimiento", ["desamor"]],
  ["la-8va-maravilla", 8, "Historia", ["introspeccion"]],
  ["la-8va-maravilla", 9, "Me dañas la mente", ["amor"]],
  ["la-8va-maravilla", 10, "Un shot", ["perreo"]],
  ["la-8va-maravilla", 11, "Te extraño", ["desamor"]],
  ["la-8va-maravilla", 12, "Mírame baby", ["perreo"]],
  ["la-8va-maravilla", 13, "Café tibio", []],
  ["la-8va-maravilla", 14, "Ese labial", ["perreo"]],
  ["la-8va-maravilla", 15, "Di amén", ["introspeccion"]],
  ["la-8va-maravilla", 16, "Misterio", []],
  ["la-8va-maravilla", 17, "En vivo", []],
  ["la-8va-maravilla", 18, "Cuánto cuesta", ["flex"]],
  ["la-8va-maravilla", 19, "Si estuvieras aquí", ["desamor"]],
  ["la-8va-maravilla", 20, "Vigente", ["flex"]],
];

const notes = {
  "el-fenomeno:2":
    "El sencillo que abrió el debut. Declaración de amor de la etapa romántica, antes del giro al trap.",
  "el-fenomeno:6":
    "Tercera vuelta de Agresivo, el tema del dúo con De La Ghetto. Ya en solitario, sigue siendo perreo de esa era.",
  "el-fenomeno:15":
    "Salió del disco filtrado La Maravilla y llegó a la radio urbana de Estados Unidos antes del álbum oficial. Perreo de fiesta.",
  "el-fenomeno:18":
    "Austin se presenta en primera persona, fuera del personaje de club.",
  "el-fenomeno:19":
    "Romance por internet, de cuando ese escenario todavía era novedad en el género.",
  "sentimiento-elegancia-maldad:2":
    "Mirada atrás al dúo, a la calle y al tiempo que pasó entre los mixtapes y este disco.",
  "sentimiento-elegancia-maldad:3":
    "La cara romántica del disco de 2013: quiere amores, no solo la noche.",
  "sentimiento-elegancia-maldad:6":
    "El club de los suyos. Estatus y pertenencia, el núcleo de la categoría bichos.",
  "sentimiento-elegancia-maldad:10":
    "La tesis del álbum en una pista: sentimiento, elegancia y maldad como tres registros del mismo artista.",
  "los-favoritos:4":
    "El hit explícito del disco con DJ Luian. El nombre Austin funciona aquí como marca de perreo.",
  "los-favoritos:17":
    "Uno de los perreos de radio del ciclo Los favoritos. El cuerpo es el tema entero.",
  "ares:3":
    "El puente con Bad Bunny. Defensa del estilo propio en el turno del trap latino.",
  "ares:5":
    "Relato de calle en primera persona. El más narrativo de Ares.",
  "ares:18":
    "Perreo directo, de los más explícitos del disco.",
  "historias-de-un-capricornio:1":
    "Apertura en modo testimonio. El disco avisa que va a hablar de él, no solo del club.",
  "historias-de-un-capricornio:11":
    "El corte que cruzó a la radio pop. Desamor después de la ruptura. El remix con Romeo Santos, en Los favoritos 2, fue su segunda vida.",
  "historias-de-un-capricornio:13":
    "Desamor que se queda en la memoria, pareja natural de Sigues con él dentro del mismo disco.",
  "historias-de-un-capricornio:14":
    "Espera romántica. De las pocas baladas limpias del disco.",
  "los-favoritos-2:7":
    "Segunda parte de Aparentemente, el clásico del dúo con De La Ghetto: la relación que se sostiene en secreto.",
  "los-favoritos-2-5:1":
    "El flow como amenaza. Calle, no conquista.",
  "los-favoritos-2-5:2":
    "El sencillo con Jay Wheeler y Myke Towers. Romance de club que entró en las listas de España.",
  "los-favoritos-2-5:11":
    "El corte donde el rango y el círculo son el tema. Aquí «bichotes» nombra a los suyos, no a una pareja.",
  "sr-santos:3":
    "Con Bad Bunny. El tema que empujó Sr. Santos hasta el Billboard 200. Flex y perreo de estadio.",
  "sr-santos:17":
    "Cierre íntimo de Sr. Santos, fuera del registro de club.",
  "sentimiento-elegancia-mas-maldad:5":
    "Con Grupo Frontera. Romance con acento regional, lejos del perreo de club.",
  "sentimiento-elegancia-mas-maldad:8":
    "Con Quevedo. Vacación, lujo y escape.",
  "sentimiento-elegancia-mas-maldad:10":
    "Con Rauw Alejandro. Perreo corto y directo.",
  "sentimiento-elegancia-mas-maldad:15":
    "Con Peso Pluma. El trabajo y la calle, en el idioma del corrido.",
  "papi-arca:2":
    "Con Eladio Carrión. Lealtad de círculo, no de pareja.",
  "sr-santos-2:3":
    "Metáfora de dúo: dos que pelean del mismo lado. Lealtad, no romance.",
  "sr-santos-2:18":
    "El título del disco como cierre. La ambición personal, después del flex.",
};

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const used = new Set();
const songs = rows.map(([album, track, title, cats, flags = ""]) => {
  let slug = `${album}-${slugify(title)}`;
  if (used.has(slug)) slug = `${slug}-${track}`;
  used.add(slug);
  const song = {
    slug,
    title,
    album,
    track,
    categories: cats,
  };
  if (flags.includes("v")) song.version = true;
  if (flags.includes("k")) song.skit = true;
  const note = notes[`${album}:${track}`];
  if (note) song.note = note;
  return song;
});

function pick(album, title) {
  const song = songs.find((item) => item.album === album && item.title === title);
  if (!song) throw new Error(`No está: ${album} / ${title}`);
  return song.slug;
}

const tops = [
  {
    id: "amor",
    title: "Top amor",
    slugs: [
      pick("el-fenomeno", "Por amar a ciegas"),
      pick("sentimiento-elegancia-maldad", "Contigo quiero amores"),
      pick("el-fenomeno", "Chica virtual"),
      pick("historias-de-un-capricornio", "Te esperaré"),
      pick("los-favoritos-2-5", "Si te veo"),
      pick("sentimiento-elegancia-mas-maldad", "ALV"),
    ],
  },
  {
    id: "desamor",
    title: "Top desamor",
    slugs: [
      pick("historias-de-un-capricornio", "Sigues con él"),
      pick("historias-de-un-capricornio", "Memoria rota"),
      pick("historias-de-un-capricornio", "Infeliz"),
      pick("el-fenomeno", "Fuiste tú quien perdió"),
      pick("los-favoritos-2", "Payaso"),
    ],
  },
  {
    id: "perreo",
    title: "Top perreo",
    slugs: [
      pick("el-fenomeno", "Pa' que la pases bien"),
      pick("los-favoritos", "50 sombras de Austin"),
      pick("los-favoritos", "Tu cuerpo me hace bien"),
      pick("ares", "El granjero"),
      pick("sr-santos", "La jumpa"),
      pick("el-fenomeno", "Agresivo 3"),
    ],
  },
  {
    id: "bichos",
    title: "Top bichos",
    slugs: [
      pick("sentimiento-elegancia-maldad", "Gucci Boys Club"),
      pick("los-favoritos-2-5", "Capos y bichotes"),
      pick("papi-arca", "BFF"),
      pick("sr-santos-2", "Gohan y Goku"),
      pick("papi-arca", "La franquicia"),
    ],
  },
  {
    id: "calle",
    title: "Top calle",
    slugs: [
      pick("ares", "Mi primer kilo"),
      pick("sentimiento-elegancia-maldad", "Hace mucho tiempo"),
      pick("sentimiento-elegancia-mas-maldad", "La chamba"),
      pick("los-favoritos-2-5", "Flow violento"),
      pick("ares", "Pa' morir se nace"),
    ],
  },
  {
    id: "flex",
    title: "Top flex",
    slugs: [
      pick("ares", "Original"),
      pick("sr-santos", "La jumpa"),
      pick("sentimiento-elegancia-mas-maldad", "Los Roques"),
      pick("ares", "Corte, porte y elegancia"),
      pick("sentimiento-elegancia-maldad", "Pakas de 100"),
    ],
  },
  {
    id: "introspeccion",
    title: "Top introspección",
    slugs: [
      pick("sentimiento-elegancia-maldad", "Hace mucho tiempo"),
      pick("historias-de-un-capricornio", "Mi testimonio"),
      pick("sr-santos", "Sin Scotti"),
      pick("historias-de-un-capricornio", "Invicto"),
      pick("sr-santos-2", "Sueños de grandeza"),
    ],
  },
];

const catalog = {
  artist: {
    name: "Arcángel",
    legalName: "Austin Agustín Santos",
    aka: "La Maravilla",
    born: "1985-12-23",
  },
  source:
    "Títulos, orden y fechas: MusicBrainz. Las categorías y las notas son lectura editorial del tema público de cada canción. Este archivo no contiene letras.",
  categories,
  albums,
  songs,
  tops,
};

mkdirSync("data", { recursive: true });
writeFileSync("data/catalog.json", JSON.stringify(catalog, null, 2) + "\n");
console.log(`albums ${albums.length} songs ${songs.length} notes ${Object.keys(notes).length}`);
