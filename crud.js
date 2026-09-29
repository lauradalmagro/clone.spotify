import { database } from "./configfirebase.js";

import {
ref,
push,
set,
onValue,
update,
remove
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

/* CRIAR MÚSICA */

export async function criarMusica(titulo, artista, estilo, duracao, capaUrl, audioUrl) {

const musicasRef = ref(database, "musicas");

const novaMusicaRef = push(musicasRef);

const musica = {
    id: novaMusicaRef.key,
    titulo: titulo,
    artista: artista,
    estilo: estilo,
    duracao: duracao,
    capaUrl: capaUrl,
    audioUrl: audioUrl
};

await set(novaMusicaRef, musica);
}

/* BUSCAR MÚSICAS */

export function buscarMusicas(callback) {

const musicasRef = ref(database, "musicas");

onValue(musicasRef, (snapshot) => {

    const dados = snapshot.val();

    const musicas = [];

    if (dados) {
        Object.values(dados).forEach((musica) => {
            musicas.push(musica);
        });
    }

    callback(musicas);
});

}

/* EDITAR MÚSICA */

export async function editarMusica(id, titulo, artista, estilo, duracao, capaUrl, audioUrl) {

const musicaRef = ref(database, `musicas/${id}`);

await update(musicaRef, {
    titulo: titulo,
    artista: artista,
    estilo: estilo,
    duracao: duracao,
    capaUrl: capaUrl,
    audioUrl: audioUrl
});
}

/* EXCLUIR MÚSICA */

export async function excluirMusica(id) {
const musicaRef = ref(database, `musicas/${id}`);

await remove(musicaRef);
}
