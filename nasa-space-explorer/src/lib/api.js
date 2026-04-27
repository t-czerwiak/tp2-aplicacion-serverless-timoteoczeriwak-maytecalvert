import { supabase } from "./supabase";

// 🔹 DATA FAKE PARA DESARROLLO

let mockComments = {
  1: [
    { content: "Increíble imagen 🚀" },
    { content: "Quiero viajar ahí 🌌" }
  ],
  2: [
    { content: "La NASA siempre sorprende" }
  ]
};

let mockFavorites = [];

// 🔹 FUNCIONES (MISMO NOMBRE QUE BACK)

// TRAER TODOS LOS CUERPOS
export async function getAllBodies() {
  return [
    {
      id: 1,
      title: "Nebulosa de Orión",
      description: "Zona de formación estelar",
      category: "Nebulosa",
      image_url: "https://images-assets.nasa.gov/image/PIA08653/PIA08653~medium.jpg"
    },
    {
      id: 2,
      title: "Galaxia Andrómeda",
      description: "La galaxia más cercana",
      category: "Galaxia",
      image_url: "https://images-assets.nasa.gov/image/PIA04921/PIA04921~medium.jpg"
    }
  ];
}

// FAVORITOS
export async function addFavorite(bodyId) {
  mockFavorites.push(bodyId);
  console.log("Favorito agregado:", bodyId);
}

export async function removeFavorite(bodyId) {
  mockFavorites = mockFavorites.filter(id => id !== bodyId);
}

// COMENTARIOS
export async function getComments(bodyId) {
  return mockComments[bodyId] || [];
}

export async function addComment(bodyId, content) {
  if (!mockComments[bodyId]) {
    mockComments[bodyId] = [];
  }

  mockComments[bodyId].push({ content });

  console.log("Comentario agregado:", content);
}

// despues hay que cambiar estas funciones para que hagan conesión con el backend
// return mockComments[bodyId]
//const { data } = await supabase...
//* getAllBodies()
//*addFavorite(bodyId)
//*removeFavorite(bodyId)
//*getUserFavorites()
//*getComments(bodyId)
//*addComment(bodyId, content)
//*signIn(email, password)
//*signUp(email, password)
//*signOut()
//*getUser() 